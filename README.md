# NewsGen Studio — App

Dashboard pelanggan NewsGen Studio. Live di:
https://newsgen-studio-app.blogspot.com/p/app-newsgen-studio.html
(yang me-load file di bawah via CDN jsDelivr)

## File

- `app.js` — aplikasi utama (HTML + JS, di-load via CDN)
- `app.css` — stylesheet aplikasi (di-load via CDN)
- `apps-script.gs` — backend Spreadsheet (Google Apps Script)
- `BACKEND-SETUP.md` — panduan setup backend hybrid
- `blogger-loader.html` — isi Page Blogger (hanya manggil CDN, ~1,5KB)

## Cara update

Edit `app.js` / `app.css`, commit & push — lalu purge cache jsDelivr:

```
https://purge.jsdelivr.net/gh/faizalground96-spec/newsgen-studio-app@main/app.js
https://purge.jsdelivr.net/gh/faizalground96-spec/newsgen-studio-app@main/app.css
```

Halaman Blogger otomatis ikut baru tanpa diutak-atik.

## Mode data

`CONFIG.dummy = true` → data dummy. Isi `BACKEND_CONFIG` lalu set
`dummy = false` untuk pakai backend asli (Supabase + Firebase + Spreadsheet).
