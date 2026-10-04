# Panduan Setup Backend — NewsGen Studio (arsitektur final 2026-10-04, revisi model 2026-10-04)

Target: aplikasi **siap jual**, tiap pelanggan punya akun sendiri (email + PIN)
dan datanya terisolasi.

## Model kepemilikan (keputusan 2026-10-04)

- **Milik KITA (pusat):** kode aplikasi NewsGen + database **Supabase**
  (akun pelanggan, halaman, token, URL Web App). Inilah yang menjaga
  publish/komentar tidak "nyasar" — sistem selalu tahu pelanggan ini →
  halamannya yang itu → Web App-nya yang itu.
- **Milik PELANGGAN:** aplikasi **Meta Developer** sendiri + deploy
  **Apps Script** sendiri (kuota & spreadsheet di akun Google mereka).
  Panduan untuk pelanggan: `PANDUAN-SETUP-PELANGGAN.md`.

Alur pelanggan baru: admin tambah akun di dashboard (status otomatis
"MENUNGGU SETUP") → pelanggan ikuti panduan → tempel URL Web App di
menu Setting → status jadi "SIAP".

## 1. Arsitektur (ringkas)

| Data | Disimpan di | Kenapa |
|---|---|---|
| pelanggan, halaman | **Supabase** (2 tabel) | Butuh cepat & terstruktur; ringan, tidak bisa bengkak |
| komentar, arsip, config | **Spreadsheet per pelanggan** (via Web App) | Gratis, terpisah per pelanggan |
| draft | **localStorage browser** | Selalu lokal, tidak ke backend |
| antrean/jadwal | **Facebook** (scheduled posts) | FB yang simpan & terbitkan otomatis |

Firebase **tidak dipakai**.

**Supabase — tabel pelanggan**
`id | nama | email | pin | paket | model | apiKey | webapp_url | max_halaman | aktif`
- Dicek saat login (email + PIN).
- `webapp_url` = URL Web App **milik pelanggan** (hasil deploy Apps Script
  mereka sendiri, lihat `PANDUAN-SETUP-PELANGGAN.md`). Kosong = pelanggan
  belum selesai setup (badge "MENUNGGU SETUP" di dashboard admin);
  fallback ke Web App pusat bila diisi.
- Web App pusat (akun kita) tetap dipakai untuk akun demo.

**Supabase — tabel halaman**
`id | pelanggan_id | nama | pageId | token | webhook`
- 1 pelanggan bisa punya banyak halaman (1 baris per halaman).

```sql
create table pelanggan (
  id text primary key,
  nama text, email text unique, pin text, paket text,
  model text, apiKey text, webapp_url text,
  max_halaman integer default 3, aktif boolean default true
);
create table halaman (
  id text primary key,
  pelanggan_id text, nama text, pageId text, token text, webhook text
);
```

## 2. Supabase (gratis)

1. Daftar di https://supabase.com (bisa pakai akun Google).
2. New Project → catat **Project URL** dan **anon public key**.
3. Buat 2 tabel via SQL Editor (lihat SQL di atas).
4. Isi `BACKEND_CONFIG.supabase` di `app.js`, set `CONFIG.dummy = false`.

## 3. Spreadsheet + Web App (gratis)

Satu Web App = **1 pintu** untuk semua pelanggan (Facebook hanya
mengizinkan 1 URL webhook per aplikasi). Web App meneruskan komentar
ke spreadsheet milik pelanggan yang tepat (berdasar Page ID).

1. Buat spreadsheet **MASTER** baru di Google Drive.
2. Extensions > Apps Script → tempel `apps-script.gs` (satu folder dengan file ini).
3. Project Settings > Script Properties: tambah `FB_VERIFY_TOKEN`
   (isi bebas, mis. `newsgen123`).
4. Deploy > New deployment > Web app → Execute as: **Me**,
   Who has access: **Anyone**. Salin URL-nya.
5. Di Meta Developer > aplikasi > Webhooks > Page > Subscribe:
   URL = URL Web App, Verify Token = token di langkah 3, field: **feed**.
6. Isi URL Web App ke `BACKEND_CONFIG.spreadsheet.webAppUrl` di `app.js`
   (dipakai bila baris pelanggan belum punya `webapp_url` sendiri).

**Sheet MASTER "Pelanggan"** (dibuat otomatis oleh script):
`pelanggan_id | nama | page_id | nama_halaman | spreadsheet_id`

**Tiap spreadsheet pelanggan** (dibuat otomatis saat ada tulis pertama):
- `Komentar`: id | nama | halaman | waktu | pesan | balasan | status
- `Arsip`: waktu | aksi | judul | halaman | detail
- `Config`: kunci | nilai (mis. `auto_reply` = 1/0)

> **CATATAN:** sheet `Komentar` berfungsi sebagai **ANTREAN** — baris yang statusnya diubah menjadi `terkirim` **otomatis dihapus** oleh `komentarUpdate()`. Jadi sheet ini hanya berisi komentar yang belum dibalas.

Fungsi bantu di editor Apps Script (Run manual):
- `buatSpreadsheetPelanggan('Nama Pelanggan')` → kembalikan ID spreadsheet.
- `tambahPelanggan('cust3','Nama','pageId','Nama Halaman','spreadsheetId')`
  → daftarkan ke sheet MASTER.

## 4. Multi-akun Google (nanti, kalau kuota mepet)

1. Deploy `apps-script.gs` di akun Google lain → dapat URL Web App baru.
2. Isi kolom `webapp_url` di baris pelanggan yang dipindah dengan URL baru.
3. Daftarkan pelanggan itu di sheet MASTER milik Web App yang baru.

Selesai — tanpa ubah kode, tanpa deploy ulang aplikasi.

## 5. Menambah pelanggan baru (saat jualan)

1. Insert 1 baris ke tabel `pelanggan` (Supabase) → pelanggan bisa login.
2. Buatkan spreadsheet → catat ID-nya → daftarkan di sheet MASTER
   (`tambahPelanggan`), beserta Page ID halaman Facebook-nya.
3. Pelanggan atur sendiri daftar halaman + API key AI di menu Setting.

## 6. Catatan

- **Kuota**: akun Google gratis ±20.000 request Web App/hari. Dashboard
  polling komentar tiap 60 detik (±1.400 request/hari per dashboard aktif).
  Kalau pelanggan membludak: naikkan interval polling atau sebar ke
  beberapa akun Google (lihat bagian 4).
- **Keamanan**: token FB & API key ada di kode/Supabase. Untuk produk
  berbayar, pertimbangkan memindah panggilan sensitif (AI, kirim FB)
  ke serverless function agar tidak terlihat pelanggan.
- **PIN** sebaiknya di-hash bila sudah produksi (saat ini plain).
- **Antrean**: dijadwalkan via Graph API (`scheduled_publish_time`) —
  Facebook yang simpan & terbitkan. Aplikasi hanya menampilkan
  `scheduled_posts`. Syarat: token halaman valid & jadwal ≥10 menit
  dari sekarang, ≤75 hari ke depan (aturan Facebook).
