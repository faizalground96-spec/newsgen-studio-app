# Panduan Setup Backend Hybrid — NewsGen Studio

Target: aplikasi **siap jual**, tiap pelanggan punya akun sendiri (email + PIN)
dan datanya terisolasi per `pelanggan_id`.

## 1. Arsitektur (ringkas)

| Data | Backend utama | Fallback | Kenapa |
|---|---|---|---|
| halaman, ai_settings, antrean, draft, pelanggan | **Supabase** | Spreadsheet | Butuh cepat & terstruktur |
| komentar, status auto-reply | **Firebase RTDB** | Spreadsheet | Butuh realtime |
| arsip (log publish), arsip komentar | **Spreadsheet** | — | Murah, lambat OK, selalu gratis |

Aturan: bila backend utama gagal/limit → otomatis fallback ke Spreadsheet
agar layanan tetap jalan. Semua gratis di tier awal.

## 2. Supabase (gratis)

1. Daftar di https://supabase.com (bisa pakai akun Google).
2. New Project → catat **Project URL** dan **anon public key**.
3. Buat tabel via SQL Editor:

```sql
create table pelanggan (
  id text primary key,
  nama text, email text unique, pin text, paket text
);
create table halaman (
  id text primary key,
  pelanggan_id text, nama text, pageId text, token text, webhook text
);
create table ai_settings (
  id text primary key default gen_random_uuid()::text,
  pelanggan_id text, model text, apiKey text
);
create table antrean (
  id text primary key,
  pelanggan_id text, judul text, halaman text, jadwal text, tipe text
);
create table draft (
  id text primary key,
  pelanggan_id text, judul text, halaman text, caption text, pancingan text, tipe text
);
```

4. Isi ke `BACKEND_CONFIG.supabase` di `app.html`.

## 3. Firebase Realtime Database (gratis)

1. https://console.firebase.google.com → Add project.
2. Build > Realtime Database > Create database (region asia-southeast1).
3. Rules awal (ganti setelah produksi):

```json
{ "rules": { ".read": true, ".write": true } }
```

4. Salin **Database URL** → isi ke `BACKEND_CONFIG.firebase.databaseURL`.
5. Struktur data: `komentar/{pelanggan_id}/{pushId} = {nama, halaman, waktu, pesan, balasan, status}`.

## 4. Spreadsheet (gratis, arsip + fallback)

1. Buat spreadsheet baru.
2. Extensions > Apps Script → tempel `apps-script.gs` (satu folder dengan file ini).
3. Deploy > New deployment > Web app → Execute as: Me, Who has access: Anyone.
4. Salin URL Web App → isi ke `BACKEND_CONFIG.spreadsheet.webAppUrl`.

## 5. Mengaktifkan

1. Isi ketiga config di `BACKEND_CONFIG` dalam `app.html`.
2. Set `CONFIG.dummy = false`.
3. Publish ulang page Blogger.

## 6. Menambah pelanggan baru (saat jualan)

**Mode dummy (sekarang):** tambah ke `DUMMY_PELANGGAN` di kode:
```js
{ id:'cust3', nama:'Nama Pelanggan', email:'email@dia.com', pin:'XXXX', paket:'PROMO' },
```

**Mode backend:** insert ke tabel `pelanggan` (Supabase). Pelanggan login
dengan email + PIN tersebut di halaman app.

## 7. Catatan keamanan

- Kredensial backend (anon key, dsb) ada di kode halaman. Untuk produk
  berbayar, pertimbangkan memindah panggilan sensitif (AI, kirim FB)
  ke serverless function agar API key tidak terlihat pelanggan.
- PIN pelanggan sebaiknya di-hash bila sudah produksi (saat ini plain).
