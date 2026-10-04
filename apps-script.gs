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
  if (action === 'config')   return json({ ok: true, config: configGet(pid) });
  return json({ ok: true, pesan: 'NewsGen Studio Webhook aktif' });
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
  if (action === 'config_set')     return json({ ok: true, config: configSet(pid, data.kunci, data.nilai) });
  if (action === 'arsip')          return json({ ok: true, row: arsipTulis(pid, data.row || {}) });
  // Fallback generik (kalau Supabase down): baca/tulis sheet milik pelanggan
  if (action === 'list')   return json({ ok: true, rows: custList(pid, data.sheet) });
  if (action === 'append') return json({ ok: true, row: custAppend(pid, data.sheet, data.row || {}) });
  return json({ ok: false, error: 'action tidak dikenal: ' + action });
}

/* Terima event feed Facebook, simpan komentar ke spreadsheet pelanggan. */
function fbHandleEvent(data) {
  var map = pelangganMap();
  (data.entry || []).forEach(function(entry){
    var pageId = String(entry.id || '');
    var cfg = map.byPage[pageId];
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
  var cfg = pelangganMap().byPid[String(pid)];
  if (!cfg || !cfg.spreadsheet_id) return [];
  var d = sheetRows(komentarSheet(cfg.spreadsheet_id));
  var rows = d.rows.map(function(r){ delete r._row; return r; });
  rows.reverse(); // terbaru dulu
  return rows.slice(0, 200);
}
function komentarUpdate(pid, id, patch) {
  var cfg = pelangganMap().byPid[String(pid)];
  if (!cfg || !cfg.spreadsheet_id) return null;
  var sh = komentarSheet(cfg.spreadsheet_id);
  var d = sheetRows(sh);
  var hit = null;
  d.rows.forEach(function(r){
    if (String(r.id) === String(id)) {
      hit = r;
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
  var cfg = pelangganMap().byPid[String(pid)];
  if (!cfg || !cfg.spreadsheet_id) return {};
  var sh = custSheet(cfg.spreadsheet_id, 'Config', HEAD_CONFIG);
  var d = sheetRows(sh), out = {};
  d.rows.forEach(function(r){ out[String(r.kunci)] = r.nilai; });
  return out;
}
function configSet(pid, kunci, nilai) {
  var cfg = pelangganMap().byPid[String(pid)];
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
  var cfg = pelangganMap().byPid[String(pid)];
  if (!cfg || !cfg.spreadsheet_id) return null;
  var sh = custSheet(cfg.spreadsheet_id, 'Arsip', HEAD_ARSIP);
  var d = sheetRows(sh);
  row.waktu = row.waktu || Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');
  return sheetAppendRow(sh, d.head.length ? d.head : HEAD_ARSIP, row);
}

/* ============ FALLBACK GENERIK (kalau Supabase down) ============ */
function custList(pid, sheetName) {
  var cfg = pelangganMap().byPid[String(pid)];
  if (!cfg || !cfg.spreadsheet_id || !sheetName) return [];
  var d = sheetRows(custSheet(cfg.spreadsheet_id, sheetName, []));
  return d.rows.map(function(r){ delete r._row; return r; });
}
function custAppend(pid, sheetName, row) {
  var cfg = pelangganMap().byPid[String(pid)];
  if (!cfg || !cfg.spreadsheet_id || !sheetName) return null;
  var sh = custSheet(cfg.spreadsheet_id, sheetName, []);
  var d = sheetRows(sh);
  var head = d.head.length ? d.head : Object.keys(row || {});
  if (!d.head.length && head.length) sh.getRange(1, 1, 1, head.length).setValues([head]);
  return sheetAppendRow(sh, head, row);
}
