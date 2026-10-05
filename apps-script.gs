/**
 * NewsGen Studio — Backend SPREADSHEET per pelanggan (Apps Script Web App)
 * ========================================================================
 * Arsitektur (2026-10-04, revisi: Firebase dicoret):
 *  - Supabase            : pelanggan, halaman, ai_settings, antrean, draft (cepat & terstruktur)
 *  - Spreadsheet/pelanggan: KOMENTAR (utama), ARSIP, CONFIG — 1 file spreadsheet per pelanggan
 *  - Web App ini (1 pintu): terima webhook Facebook -> teruskan ke spreadsheet
 *    pelanggan yang tepat (berdasar Page ID) + layani baca/tulis dashboard.
 *
 * KENAPA 1 PINTU? Facebook hanya mengizinkan 1 URL webhook per aplikasi.
 * Jadi semua event masuk ke sini, lalu dipecah per pelanggan.
 *
 * MULTI-AKUN GOOGLE (buat jaga kuota harian): deploy file ini di akun Google
 * lain, lalu di dashboard isi BACKEND_CONFIG.spreadsheet.webAppByPid:
 *   webAppByPid: { 'cust3': 'https://script.google.com/.../exec' }
 * Pelanggan tanpa override memakai webAppUrl utama.
 *
 * CARA PAKAI:
 *  1. Buat spreadsheet MASTER baru (punya script ini) di Google Drive.
 *  2. Extensions > Apps Script, tempel seluruh file ini.
 *  3. Project Settings > Script Properties: tambah FB_VERIFY_TOKEN
 *     (isi token bebas, mis. 'newsgen123' — token yang sama dipasang di
 *     dashboard Meta Developer saat setting webhook).
 *  4. Deploy > New deployment > type: Web app
 *     - Execute as: Me
 *     - Who has access: Anyone
 *  5. Salin URL Web App -> isi ke BACKEND_CONFIG.spreadsheet.webAppUrl di app.js,
 *     lalu set CONFIG.dummy = false.
 *  6. Di Meta Developer > aplikasi > Webhooks > Page > Subscribe:
 *     URL = URL Web App ini, Verify Token = FB_VERIFY_TOKEN di atas,
 *     field: feed.
 *
 * Sheet MASTER "Pelanggan" (dibuat otomatis):
 *   pelanggan_id | nama | page_id | nama_halaman | spreadsheet_id
 *
 * Sheet di tiap SPREADSHEET PELANGGAN (dibuat otomatis):
 *   Komentar : id | nama | halaman | waktu | pesan | balasan | status
 *   Arsip    : waktu | aksi | judul | halaman | detail
 *   Config   : kunci | nilai   (mis. auto_reply = 1/0)
 */

/* ================= UTIL ================= */
function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
function teks(s) {
  return ContentService.createTextOutput(String(s))
    .setMimeType(ContentService.MimeType.TEXT);
}
function masterSS() { return SpreadsheetApp.getActiveSpreadsheet(); }

function getSheet(ss, name, headers) {
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    if (headers && headers.length) sh.getRange(1, 1, 1, headers.length).setValues([headers]);
  } else if (headers && headers.length && sh.getLastRow() === 0) {
    sh.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  return sh;
}
function sheetRows(sh) {
  var v = sh.getDataRange().getValues();
  if (v.length < 2) return { head: [], rows: [] };
  var head = v[0].map(function(h){ return String(h).trim(); });
  var rows = [];
  for (var i = 1; i < v.length; i++) {
    var r = { _row: i + 1 };
    for (var j = 0; j < head.length; j++) r[head[j]] = v[i][j];
    rows.push(r);
  }
  return { head: head, rows: rows };
}
function sheetAppendRow(sh, head, obj) {
  var arr = head.map(function(h){ return (obj && obj[h] !== undefined && obj[h] !== null) ? obj[h] : ''; });
  sh.appendRow(arr);
  return obj;
}

/* ================= MAPPING PELANGGAN =================
   Dibaca dari sheet MASTER "Pelanggan". */
var HEAD_PELANGGAN = ['pelanggan_id', 'nama', 'page_id', 'nama_halaman', 'spreadsheet_id'];
function pelangganMap() {
  var sh = getSheet(masterSS(), 'Pelanggan', HEAD_PELANGGAN);
  var d = sheetRows(sh), byPage = {}, byPid = {};
  d.rows.forEach(function(r){
    var pid = String(r.pelanggan_id || '').trim();
    var pageId = String(r.page_id || '').trim();
    if (pageId) byPage[pageId] = r;
    if (pid && !byPid[pid]) byPid[pid] = r;
  });
  return { byPage: byPage, byPid: byPid };
}
function custSS(spreadsheetId) {
  return SpreadsheetApp.openById(spreadsheetId);
}

/* VERSI API — naikkan setiap ada perubahan action. Klien menyesuaikan. */
var NGS_VERSI = '2.2';

/* MODE MANDIRI: kalau sheet MASTER "Pelanggan" KOSONG (deploy milik pelanggan
   sendiri), script melayani pid apapun memakai spreadsheet ini langsung.
   Jadi pelanggan tidak perlu mengisi MASTER. */
function cfgUntuk(pid) {
  var map = pelangganMap();
  var cfg = map.byPid[String(pid)];
  if (cfg && cfg.spreadsheet_id) return cfg;
  var kosong = Object.keys(map.byPid).length === 0;
  if (kosong) {
    return { pelanggan_id: String(pid), nama: '', page_id: '',
             nama_halaman: '', spreadsheet_id: masterSS().getId() };
  }
  return null;
}
function custSheet(spreadsheetId, name, headers) {
  return getSheet(custSS(spreadsheetId), name, headers);
}

/* Daftarkan pelanggan baru ke MASTER (bisa dipanggil manual dari editor):
   tambahPelanggan('cust3','Budi','123456789','Berita Budi','1AbC...spreadsheetId') */
function tambahPelanggan(pelangganId, nama, pageId, namaHalaman, spreadsheetId) {
  var sh = getSheet(masterSS(), 'Pelanggan', HEAD_PELANGGAN);
  var d = sheetRows(sh);
  sheetAppendRow(sh, d.head.length ? d.head : HEAD_PELANGGAN,
    { pelanggan_id: pelangganId, nama: nama, page_id: pageId,
      nama_halaman: namaHalaman, spreadsheet_id: spreadsheetId });
  return 'OK: ' + pelangganId;
}
/* Buatkan spreadsheet kosong untuk pelanggan baru, kembalikan ID-nya:
   buatSpreadsheetPelanggan('Budi Santoso') */
function buatSpreadsheetPelanggan(nama) {
  var ss = SpreadsheetApp.create('NewsGen - ' + nama);
  return ss.getId();
}

/* ================= WEBHOOK FACEBOOK ================= */
function doGet(e) {
  var p = (e && e.parameter) || {};
  // 1) Verifikasi webhook oleh Meta
  if (p['hub.mode'] === 'subscribe') {
    var token = PropertiesService.getScriptProperties().getProperty('FB_VERIFY_TOKEN') || '';
    if (p['hub.verify_token'] === token && token !== '') return teks(p['hub.challenge'] || '');
    return teks('token salah').setResponseCode(403);
  }
  // 2) API baca untuk dashboard
  var action = p.action || '', pid = p.pid || '';
  if (action === 'komentar') return json({ ok: true, rows: komentarList(pid) });
  if (action === 'arsip')    return json({ ok: true, rows: arsipList(pid) });
  if (action === 'config')   return json({ ok: true, config: configGet(pid) });
  if (action === 'rss')      return json({ ok: true, items: rssBerita() });
  if (action === 'ambil_url') return json(ambilUrlBerita(p.url || ''));
  return json({ ok: true, pesan: 'NewsGen Studio Webhook aktif', versi: NGS_VERSI });
}

function doPost(e) {
  var data;
  try { data = JSON.parse(e.postData.contents); }
  catch (err) { return json({ ok: false, error: 'bukan JSON' }); }
  // 3) Event dari Facebook
  if (data.object === 'page') { fbHandleEvent(data); return json({ ok: true }); }
  // 4) API tulis untuk dashboard
  var action = data.action, pid = data.pid || '';
  if (!pid) return json({ ok: false, error: 'pid wajib' });
  if (action === 'komentar_update') return json({ ok: true, row: komentarUpdate(pid, data.id, data.patch || {}) });
  if (action === 'komentar_hapus')  return json({ ok: true, hapus: komentarHapus(pid, data.id) });
  if (action === 'config_set')     return json({ ok: true, config: configSet(pid, data.kunci, data.nilai) });
  if (action === 'arsip')          return json({ ok: true, row: arsipTulis(pid, data.row || {}) });
  if (action === 'pelanggan_register') return json({ ok: true, hasil: pelangganRegister(data) });
  // Fallback generik (kalau Supabase down): baca/tulis sheet milik pelanggan
  if (action === 'list')   return json({ ok: true, rows: custList(pid, data.sheet) });
  if (action === 'append') return json({ ok: true, row: custAppend(pid, data.sheet, data.row || {}) });
  return json({ ok: false, error: 'action tidak dikenal: ' + action });
}

/* Terima event feed Facebook, simpan komentar ke spreadsheet pelanggan. */
function fbHandleEvent(data) {
  var map = pelangganMap();
  var mandiri = Object.keys(map.byPage).length === 0;
  (data.entry || []).forEach(function(entry){
    var pageId = String(entry.id || '');
    var cfg = map.byPage[pageId];
    if (mandiri && !cfg) cfg = { spreadsheet_id: masterSS().getId(), nama_halaman: pageId };
    if (!cfg || !cfg.spreadsheet_id) return; // page tidak terdaftar -> abaikan
    (entry.changes || []).forEach(function(ch){
      if (!ch || ch.field !== 'feed') return;
      var v = ch.value || {};
      if (v.item !== 'comment' || v.verb !== 'add') return;
      var waktu = v.created_time
        ? Utilities.formatDate(new Date(v.created_time * 1000), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm')
        : Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm');
      komentarAppend(cfg.spreadsheet_id, {
        id: String(v.comment_id || ('fb' + Date.now())),
        nama: String(v.sender_name || 'Pengunjung'),
        halaman: String(cfg.nama_halaman || pageId),
        waktu: waktu,
        pesan: String(v.message || ''),
        balasan: '',
        status: 'menunggu'
      });
    });
  });
}

/* ================= KOMENTAR (per pelanggan) ================= */
var HEAD_KOMENTAR = ['id', 'nama', 'halaman', 'waktu', 'pesan', 'balasan', 'status'];
function komentarSheet(spreadsheetId) {
  return custSheet(spreadsheetId, 'Komentar', HEAD_KOMENTAR);
}
function komentarAppend(spreadsheetId, k) {
  var sh = komentarSheet(spreadsheetId);
  var d = sheetRows(sh);
  return sheetAppendRow(sh, d.head.length ? d.head : HEAD_KOMENTAR, k);
}
function komentarList(pid) {
  var cfg = cfgUntuk(pid);
  if (!cfg || !cfg.spreadsheet_id) return [];
  var d = sheetRows(komentarSheet(cfg.spreadsheet_id));
  var rows = d.rows.map(function(r){ delete r._row; return r; });
  rows.reverse(); // terbaru dulu
  return rows.slice(0, 200);
}
function komentarUpdate(pid, id, patch) {
  var cfg = cfgUntuk(pid);
  if (!cfg || !cfg.spreadsheet_id) return null;
  var sh = komentarSheet(cfg.spreadsheet_id);
  var d = sheetRows(sh);
  var hit = null;
  d.rows.forEach(function(r){
    if (String(r.id) === String(id)) {
      hit = r;
      // Komentar yang sudah terbalas otomatis dihapus dari antrean
      // (sheet Komentar hanya berisi yang belum dibalas).
      if (patch && patch.status === 'terkirim') {
        sh.deleteRow(r._row);
        hit.dihapus = true;
        return;
      }
      var vals = [];
      d.head.forEach(function(h){
        var nv = (patch && patch[h] !== undefined) ? patch[h] : r[h];
        vals.push(nv);
      });
      sh.getRange(r._row, 1, 1, d.head.length).setValues([vals]);
    }
  });
  return hit;
}

/* ================= CONFIG (per pelanggan) =================
   Mis. auto_reply = 1/0. Disimpan di sheet "Config" milik pelanggan. */
var HEAD_CONFIG = ['kunci', 'nilai'];
function configGet(pid) {
  var cfg = cfgUntuk(pid);
  if (!cfg || !cfg.spreadsheet_id) return {};
  var sh = custSheet(cfg.spreadsheet_id, 'Config', HEAD_CONFIG);
  var d = sheetRows(sh), out = {};
  d.rows.forEach(function(r){ out[String(r.kunci)] = r.nilai; });
  return out;
}
function configSet(pid, kunci, nilai) {
  var cfg = cfgUntuk(pid);
  if (!cfg || !cfg.spreadsheet_id) return null;
  var sh = custSheet(cfg.spreadsheet_id, 'Config', HEAD_CONFIG);
  var d = sheetRows(sh), done = false;
  d.rows.forEach(function(r){
    if (String(r.kunci) === String(kunci)) {
      sh.getRange(r._row, 2).setValue(nilai);
      done = true;
    }
  });
  if (!done) sheetAppendRow(sh, d.head.length ? d.head : HEAD_CONFIG, { kunci: kunci, nilai: nilai });
  return configGet(pid);
}

/* ================= ARSIP (per pelanggan) ================= */
var HEAD_ARSIP = ['waktu', 'aksi', 'judul', 'halaman', 'detail'];
function arsipTulis(pid, row) {
  var cfg = cfgUntuk(pid);
  if (!cfg || !cfg.spreadsheet_id) return null;
  var sh = custSheet(cfg.spreadsheet_id, 'Arsip', HEAD_ARSIP);
  var d = sheetRows(sh);
  row.waktu = row.waktu || Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');
  return sheetAppendRow(sh, d.head.length ? d.head : HEAD_ARSIP, row);
}

/* ================= REGISTRASI PELANGGAN (dipakai dashboard admin) =================
   Buatkan spreadsheet untuk pelanggan baru + daftarkan ke sheet MASTER.
   Dipanggil: { action:'pelanggan_register', pelanggan_id, nama, page_id, nama_halaman } */
function pelangganRegister(d) {
  var ss = SpreadsheetApp.create('NewsGen - ' + (d.nama || d.pelanggan_id));
  var sh = getSheet(masterSS(), 'Pelanggan', HEAD_PELANGGAN);
  var dd = sheetRows(sh);
  sheetAppendRow(sh, dd.head.length ? dd.head : HEAD_PELANGGAN, {
    pelanggan_id: d.pelanggan_id || '', nama: d.nama || '',
    page_id: d.page_id || '', nama_halaman: d.nama_halaman || '',
    spreadsheet_id: ss.getId()
  });
  return { spreadsheet_id: ss.getId(), url: ss.getUrl() };
}

/* Hapus komentar (dipakai dashboard admin). */
function komentarHapus(pid, id) {
  var cfg = cfgUntuk(pid);
  if (!cfg || !cfg.spreadsheet_id) return 0;
  var sh = komentarSheet(cfg.spreadsheet_id);
  var d = sheetRows(sh), n = 0;
  for (var i = d.rows.length - 1; i >= 0; i--) {
    if (String(d.rows[i].id) === String(id)) { sh.deleteRow(d.rows[i]._row); n++; }
  }
  return n;
}

/* Baca arsip (dipakai dashboard admin). */
function arsipList(pid) {
  var cfg = cfgUntuk(pid);
  if (!cfg || !cfg.spreadsheet_id) return [];
  var sh = custSheet(cfg.spreadsheet_id, 'Arsip', HEAD_ARSIP);
  var d = sheetRows(sh);
  var rows = d.rows.map(function(r){ delete r._row; return r; });
  rows.reverse();
  return rows.slice(0, 200);
}

/* ============ FALLBACK GENERIK (kalau Supabase down) ============ */
function custList(pid, sheetName) {
  var cfg = cfgUntuk(pid);
  if (!cfg || !cfg.spreadsheet_id || !sheetName) return [];
  var d = sheetRows(custSheet(cfg.spreadsheet_id, sheetName, []));
  return d.rows.map(function(r){ delete r._row; return r; });
}
function custAppend(pid, sheetName, row) {
  var cfg = cfgUntuk(pid);
  if (!cfg || !cfg.spreadsheet_id || !sheetName) return null;
  var sh = custSheet(cfg.spreadsheet_id, sheetName, []);
  var d = sheetRows(sh);
  var head = d.head.length ? d.head : Object.keys(row || {});
  if (!d.head.length && head.length) sh.getRange(1, 1, 1, head.length).setValues([head]);
  return sheetAppendRow(sh, head, row);
}

/* ================= BERITA: RSS + AMBIL URL ================= */
var RSS_FEEDS = [
  { nama: 'Google News',        url: 'https://news.google.com/rss?hl=id&gl=ID&ceid=ID:id', kategori: '' },
  { nama: 'Google News', url: 'https://news.google.com/rss/search?q=politik+Indonesia&hl=id&gl=ID&ceid=ID:id',           kategori: '' },
  { nama: 'Google News',      url: 'https://news.google.com/rss/search?q=ekonomi+Indonesia&hl=id&gl=ID&ceid=ID:id',               kategori: '' },
  { nama: 'Google News',         url: 'https://news.google.com/rss/search?q=olahraga+Indonesia&hl=id&gl=ID&ceid=ID:id',   kategori: '' },
  { nama: 'Google News',       url: 'https://news.google.com/rss/search?q=teknologi+Indonesia&hl=id&gl=ID&ceid=ID:id',                   kategori: '' }
];

function rssTeks(el, nama) {
  try {
    var c = el.getChild(nama);
    if (c) return (c.getText() || '').trim();
    var ns = el.getChildren();
    for (var i = 0; i < ns.length; i++) {
      if (ns[i].getName && ns[i].getName() === nama) return (ns[i].getText() || '').trim();
    }
  } catch (e) {}
  return '';
}

function rssKategori(judul) {
  var t = (' ' + (judul || '')).toLowerCase();
  if (/bola|timnas|liga|\bgol\b|pertandingan|atlet|olahraga|bulu tangkis|motogp|balap|persib|persija|pssi/.test(t)) return 'olahraga';
  if (/cuaca|hujan|bmkg|banjir|longsor|kemarau|gelombang|angin kencang/.test(t)) return 'cuaca';
  if (/cilacap|jawa tengah|jateng|semarang|\bsolo\b|surakarta|purwokerto|tegal|pekalongan|banyumas|kebumen/.test(t)) return 'jateng';
  if (/viral|heboh|geger|kontroversi|skandal/.test(t)) return 'viral';
  return 'nasional';
}

function rssBerita() {
  var items = [];
  RSS_FEEDS.forEach(function (f) {
    try {
      var res = UrlFetchApp.fetch(f.url, { muteHttpExceptions: true, followRedirects: true, headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } });
      if (res.getResponseCode() !== 200) return;
      var xmlBersih = res.getContentText().replace(/&nbsp;/g, ' '); var root = XmlService.parse(xmlBersih).getRootElement();
      var els = [];
      var ch = root.getChild('channel');
      if (ch) els = ch.getChildren('item');
      if (!els.length) els = root.getChildren('entry'); // format Atom
      var ambil = Math.min(els.length, 6);
      for (var i = 0; i < ambil; i++) {
        var judul = rssTeks(els[i], 'title');
        if (!judul) continue;
        var desc = rssTeks(els[i], 'description') || rssTeks(els[i], 'summary') || '';
        desc = desc.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        var link = rssTeks(els[i], 'link');
        if (!link) { try { var l = els[i].getChild('link'); if (l && l.getAttribute('href')) link = l.getAttribute('href').getValue(); } catch (e2) {} }
        items.push({
          judul: judul,
          ringkasan: desc.substring(0, 160),
          sumber: f.nama,
          url: link,
          waktu: rssTeks(els[i], 'pubDate') || rssTeks(els[i], 'published') || rssTeks(els[i], 'updated') || '',
          kategori: rssKategori(judul)
        });
      }
    } catch (e) { /* feed gagal -> lewati, lanjut ke feed lain */ }
  });
  return items;
}

/* Ambil teks berita dari URL (dipanggil dashboard agar lolos CORS). */
function ambilUrlBerita(url) {
  if (!url || !/^https?:\/\//i.test(url)) return { ok: false, error: 'URL tidak valid' };
  try {
    var res = UrlFetchApp.fetch(url, { muteHttpExceptions: true, followRedirects: true });
    if (res.getResponseCode() !== 200) return { ok: false, error: 'Gagal membuka halaman (HTTP ' + res.getResponseCode() + ')' };
    var html = res.getContentText() || '';
    var mj = /<title[^>]*>([^<]+)<\/title>/i.exec(html);
    var judul = mj ? mj[1].replace(/\s+/g, ' ').trim() : '';
    var teks = html.replace(/<script[\s\S]*?<\/script>/gi, ' ')
                   .replace(/<style[\s\S]*?<\/style>/gi, ' ')
                   .replace(/<[^>]+>/g, ' ')
                   .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
                   .replace(/\s+/g, ' ').trim();
    if (!teks || teks.length < 200) return { ok: false, error: 'Isi halaman terlalu sedikit / tidak terbaca' };
    return { ok: true, judul: judul, teks: teks.substring(0, 12000) };
  } catch (e) {
    return { ok: false, error: String(e).substring(0, 140) };
  }
}
