/**
 * NewsGen Studio — Backend SPREADSHEET (via Apps Script Web App)
 * ============================================================
 * Peran dalam arsitektur hybrid:
 *  - ARSIP & LOG (riwayat publish, arsip komentar) -> selalu ke sini (gratis)
 *  - FALLBACK darurat bila Supabase/Firebase gagal/limit
 *
 * CARA PAKAI:
 *  1. Buat spreadsheet baru di Google Drive.
 *  2. Buka Extensions > Apps Script, tempel seluruh file ini.
 *  3. Deploy > New deployment > type: Web app
 *     - Execute as: Me
 *     - Who has access: Anyone
 *  4. Salin URL Web App -> isi ke BACKEND_CONFIG.spreadsheet.webAppUrl
 *     di app.html, lalu set CONFIG.dummy = false.
 *
 * Sheet yang dipakai (dibuat otomatis bila belum ada):
 *  - Halaman   : id | pelanggan_id | nama | pageId | token | webhook
 *  - Antrean   : id | pelanggan_id | judul | halaman | jadwal | tipe
 *  - Komentar  : id | pelanggan_id | nama | halaman | waktu | pesan | balasan | status
 *  - Arsip     : waktu | pelanggan_id | aksi | judul | halaman | detail
 *  - Pelanggan : id | nama | email | pin | paket
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var action = data.action;
    if (action === 'list')   return json({ ok: true, rows: sheetList(data.sheet) });
    if (action === 'append') return json({ ok: true, row: sheetAppend(data.sheet, data.row) });
    if (action === 'clear')  return json({ ok: true, cleared: sheetClear(data.sheet) });
    return json({ ok: false, error: 'action tidak dikenal: ' + action });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  // Tes cepat: buka URL Web App di browser -> harus balikan {"ok":true,...}
  var sheet = (e && e.parameter && e.parameter.sheet) || 'Arsip';
  return json({ ok: true, rows: sheetList(sheet) });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  return sh;
}

function sheetList(name) {
  var sh = getSheet(name);
  var values = sh.getDataRange().getValues();
  if (values.length < 2) return [];
  var head = values[0].map(function(h){ return String(h).trim(); });
  var rows = [];
  for (var i = 1; i < values.length; i++) {
    var r = {};
    for (var j = 0; j < head.length; j++) r[head[j]] = values[i][j];
    rows.push(r);
  }
  return rows;
}

function sheetAppend(name, row) {
  var sh = getSheet(name);
  var values = sh.getDataRange().getValues();
  if (values.length === 0 || !String(values[0][0]).trim()) {
    // Buat header dari kunci row
    var head = Object.keys(row || {});
    sh.getRange(1, 1, 1, head.length).setValues([head]);
    values = sh.getDataRange().getValues();
  }
  var head = values[0].map(function(h){ return String(h).trim(); });
  var arr = head.map(function(h){ return (row && row[h] !== undefined) ? row[h] : ''; });
  sh.appendRow(arr);
  return row;
}

function sheetClear(name) {
  var sh = getSheet(name);
  var last = sh.getLastRow();
  if (last > 1) sh.deleteRows(2, last - 1);
  return true;
}
