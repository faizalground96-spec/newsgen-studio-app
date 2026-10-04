# Panduan Setup NewsGen Studio (untuk Pelanggan)

Agar komentar Facebook masuk otomatis dan bisa dibalas dari dashboard,
pelanggan menyiapkan 2 hal milik sendiri: **Web App (Google)** dan
**Aplikasi Meta (Facebook)**. Ikuti langkahnya berurutan — sekitar 20 menit.

Siapkan dulu 3 catatan kecil (ditulis di kertas/notepad):
- `KODE_WEBHOOK`: buat kode rahasia sendiri, mis. `toko-saya-123`
- `URL_WEBAPP`: (diisi nanti di Bagian A)
- `PAGE_ID`, `TOKEN`: (diisi nanti di Bagian B)

---

## Bagian A — Web App di Google (10 menit)

1. Buka **Google Drive** → **New** → **Google Sheets**. Beri nama mis.
   `NewsGen - NamaUsahaSaya`.
2. Di spreadsheet itu klik **Extensions** → **Apps Script**.
3. Di editor, hapus semua isi file `Code.gs`.
4. Buka link ini di tab baru, salin **seluruh** isinya:
   https://raw.githubusercontent.com/faizalground96-spec/newsgen-studio-app/main/apps-script.gs
5. Tempel ke `Code.gs` → **Save** (ikon disket / Ctrl+S).
6. Klik ikon **gerigi** (Project Settings) → bagian **Script Properties** →
   **Add script property**:
   - Property: `FB_VERIFY_TOKEN`
   - Value: `KODE_WEBHOOK` buatanmu tadi
   → **Save script properties**.
7. Klik **Deploy** → **New deployment** → ikon gerigi → pilih **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
   → **Deploy** → **Authorize access** (ikuti sampai selesai).
8. **Salin URL Web App** yang muncul (bentuknya
   `https://script.google.com/macros/s/…/exec`). Ini adalah `URL_WEBAPP`.
   ✅ Bagian A selesai — tidak perlu isi apa pun lagi di spreadsheet.

## Bagian B — Aplikasi di Meta Developer (10 menit)

1. Buka https://developers.facebook.com → login → **My Apps** →
   **Create App**. Pilih tipe **Business**, isi nama, buat.
2. Di dashboard aplikasi, cari produk **Webhooks** → **Add**/**Set up**.
3. Pilih objek **Page** → **Subscribe**, isi:
   - Callback URL: `URL_WEBAPP` dari Bagian A
   - Verify Token: `KODE_WEBHOOK` buatanmu
   → **Verify and Save**. Di bagian **Subscription Fields**, centang **feed**.
4. Dapatkan **Page ID**: buka halaman Facebook-mu → **Settings** →
   **Page info** (atau: `https://www.facebook.com/<nama-halaman>/about`) —
   catat angka Page ID.
5. Dapatkan **Akses Token**:
   - Buka https://developers.facebook.com/tools/explorer
   - Pilih aplikasimu, klik **Generate Access Token**, login dengan akun
     yang menjadi **admin halaman**
   - Tambahkan permission: `pages_read_engagement`, `pages_manage_posts`
   - Klik ikon info di token → **Open in Access Token Tool** →
     **Extend Access Token** (agar tidak cepat kedaluwarsa) → salin token
     yang panjang itu. Ini adalah `TOKEN`.
   - ⚠️ Token ini rahasia — jangan disebar.
6. Supaya halamanmu terhubung ke aplikasi: di **App Dashboard** →
   **Webhooks** → **Page** → **Add Subscription** untuk halamanmu
   (atau lewat pengaturan halaman → Linked apps, tergantung tampilan Meta).

## Bagian C — Masukkan ke NewsGen (3 menit)

1. Login ke aplikasi NewsGen Studio.
2. Buka menu **Setting** → bagian **🔗 Web App Pribadi**:
   tempel `URL_WEBAPP` → **Simpan** → **Tes Koneksi**
   (harus muncul "Web App aktif ✓").
3. Masih di **Setting** → **📄 Pengaturan Halaman** → **＋ Tambah Halaman**:
   - Nama Halaman: nama halamanmu
   - Page ID: `PAGE_ID`
   - Akses Token: `TOKEN`
   - Kode Webhook: `KODE_WEBHOOK`
   → **Simpan**.
4. Buka menu **Komentar** → nyalakan **Auto-Polling**.
   Setiap ada komentar baru di halaman Facebook-mu, akan muncul di sini
   dan bisa dibalas. 🎉

---

## Kalau ada masalah

| Gejala | Periksa |
|---|---|
| Tes Koneksi gagal | URL Web App disalin lengkap? Deploy-nya "Who has access: Anyone"? |
| Komentar tidak masuk | Di Meta → Webhooks → Page: status subscribe hijau? Field `feed` dicentang? Verify Token sama dengan `FB_VERIFY_TOKEN`? |
| Gagal simpan halaman | Page ID angka semua? Token tidak terpotong saat disalin? |
| Token tiba-tiba tidak jalan | Token kedaluwarsa — buat ulang di Bagian B langkah 5 |

Butuh bantuan? Hubungi admin via WhatsApp yang tertera di halaman penjualan.
