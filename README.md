# NewsGen Studio — App

Dashboard pelanggan NewsGen Studio. Live di:
https://newsgen-studio-app.blogspot.com/p/app-newsgen-studio.html
(via GitHub Pages: https://faizalground96-spec.github.io/newsgen-studio-app/)

## File

- `index.html` — aplikasi utama (single file, tanpa dependensi eksternal)
- `apps-script.gs` — backend Spreadsheet (Google Apps Script)
- `BACKEND-SETUP.md` — panduan setup backend hybrid

## Cara update

Edit `index.html`, commit & push — halaman Blogger otomatis ikut baru
(karena Blogger hanya me-load URL ini via iframe).

## Mode data

`CONFIG.dummy = true` → data dummy. Isi `BACKEND_CONFIG` lalu set
`dummy = false` untuk pakai backend asli (Supabase + Firebase + Spreadsheet).
