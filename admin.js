/* NewsGen Studio — newsgen-app/admin.js (di-load via CDN) */
(function(){
  var root = document.getElementById('newsgen-admin-root');
  if(!root){ root = document.createElement('div'); root.id = 'newsgen-admin-root'; document.body.appendChild(root); }
  root.innerHTML = `
<style>
  /* paksa full width (tema Notable) */
  body { background:#0a0a0d !important; }
  .content-outer, .content-inner, .main-outer, .main-inner, .main, .columns-inner, .column-center-inner, .region-inner, .post, .post-body, .entry-content,
  main.centered-bottom, .widget.Blog, .blog-posts.hfeed.container, article.post-outer-container, .post-outer, .container,
  .post-content, .post-body-container, .main_content_container {
    max-width:100% !important; width:100% !important; margin-left:0 !important; margin-right:0 !important; padding-left:0 !important; padding-right:0 !important; background:transparent !important; border:none !important; box-shadow:none !important;
  }
  .header-outer, .footer-outer, .post-header, .post-footer, .blog-pager, .comments, #navbar-iframe, .navbar,
  .centered-top, header.centered-top, .blog-title, .blog-name, .header, .footer,
  .post-title-container, .post-share-buttons, .post-bottom, .post-sidebar, .widget.Profile, #footer {
    display:none !important;
  }
</style>
<style>/* FIX 2026-10-04: full-bleed dark canvas */html,body{background:#0a0a0d!important}.page,.all-container{max-width:none!important}</style>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  .nga { font-family:'Segoe UI',system-ui,-apple-system,Roboto,Arial,sans-serif; background:#0a0a0d; color:#e4e4e7; line-height:1.55; display:flex; min-height:100vh; font-size:15px; }
  .nga button { font-family:inherit; }
  /* ===== SIDEBAR ===== */
  .nga-sidebar { width:252px; flex-shrink:0; background:#0d0d10; border-right:1px solid #27272a; height:100vh; position:sticky; top:0; display:flex; flex-direction:column; padding:22px 14px; z-index:60; }
  .nga-brand { font-weight:900; font-size:19px; color:#fff; padding:0 10px 6px; }
  .nga-brand span { color:#8b5cf6; }
  .nga-adminbadge { display:inline-block; font-size:11px; font-weight:900; letter-spacing:2px; background:rgba(139,92,246,.14); border:1px solid rgba(139,92,246,.45); color:#c4b5fd; padding:4px 12px; border-radius:999px; margin:0 10px 18px; width:fit-content; }
  .nga-nav { display:flex; flex-direction:column; gap:4px; flex:1; }
  .nga-nav button { display:flex; align-items:center; gap:12px; width:100%; padding:12px 14px; border-radius:10px; background:none; border:none; color:#a1a1aa; font-size:15px; cursor:pointer; text-align:left; transition:background .15s,color .15s; }
  .nga-nav button:hover { background:#17171b; color:#fff; }
  .nga-nav button.active { background:rgba(139,92,246,.14); color:#c4b5fd; font-weight:700; }
  .nga-nav .ico { font-size:18px; width:24px; text-align:center; }
  .nga-side-foot { border-top:1px solid #27272a; padding:14px 10px 0; font-size:12px; color:#71717a; }
  /* ===== MAIN ===== */
  .nga-main { flex:1; min-width:0; display:flex; flex-direction:column; }
  .nga-topbar { position:sticky; top:0; z-index:50; background:rgba(10,10,13,.94); backdrop-filter:blur(8px); border-bottom:1px solid #27272a; padding:14px 28px; display:flex; align-items:center; justify-content:space-between; gap:12px; }
  .nga-topbar h1 { font-size:20px; color:#fff; font-weight:800; }
  .nga-topbar .sub { font-size:12px; color:#71717a; }
  .nga-burger { display:none; background:none; border:1px solid #27272a; color:#fff; border-radius:8px; font-size:18px; padding:6px 12px; cursor:pointer; }
  .nga-content { padding:28px; max-width:1220px; width:100%; margin:0 auto; }
  .nga-page { display:none; }
  .nga-page.active { display:block; animation:ngaFade .25s ease; }
  @keyframes ngaFade { from { opacity:0; transform:translateY(8px);} to { opacity:1; transform:none;} }
  /* ===== BUTTONS / INPUTS ===== */
  .nga-btn { display:inline-flex; align-items:center; gap:8px; background:#8b5cf6; color:#fff; font-weight:800; padding:10px 20px; border-radius:10px; font-size:14px; border:none; cursor:pointer; transition:transform .15s, box-shadow .15s; }
  .nga-btn:hover { transform:translateY(-1px); box-shadow:0 6px 18px rgba(139,92,246,.35); }
  .nga-btn.green { background:#22c55e; }
  .nga-btn.red { background:#ef4444; }
  .nga-btn.ghost { background:#1a1a1e; color:#e4e4e7; border:1px solid #3f3f46; }
  .nga-btn.ghost:hover { box-shadow:none; background:#222227; }
  .nga-btn.small { padding:6px 12px; font-size:12px; }
  .nga-input, .nga-select { width:100%; background:#141417; border:1px solid #3f3f46; color:#e4e4e7; border-radius:10px; padding:11px 14px; font-size:14px; font-family:inherit; }
  .nga-input:focus, .nga-select:focus { outline:none; border-color:#8b5cf6; }
  .nga-label { display:block; font-size:13px; font-weight:700; color:#a1a1aa; margin:0 0 8px; }
  .nga-field { margin-bottom:16px; }
  /* ===== CARDS / STATS ===== */
  .nga-card { background:#111113; border:1px solid #27272a; border-radius:14px; padding:20px; }
  .nga-card h3 { color:#fff; font-size:16px; margin-bottom:12px; }
  .nga-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:20px; }
  .nga-stat .num { font-size:30px; font-weight:900; color:#fff; }
  .nga-stat .lbl { font-size:13px; color:#a1a1aa; margin-top:2px; }
  .nga-stat .ico { font-size:22px; margin-bottom:8px; }
  .nga-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  .nga-chip { display:inline-block; font-size:11px; font-weight:800; padding:3px 10px; border-radius:999px; white-space:nowrap; }
  .nga-chip.green { background:rgba(34,197,94,.14); color:#4ade80; border:1px solid rgba(34,197,94,.35); }
  .nga-chip.red { background:rgba(239,68,68,.14); color:#fca5a5; border:1px solid rgba(239,68,68,.35); }
  .nga-chip.violet { background:rgba(139,92,246,.14); color:#c4b5fd; border:1px solid rgba(139,92,246,.35); }
  .nga-chip.gray { background:#1a1a1e; color:#a1a1aa; border:1px solid #3f3f46; }
  .nga-muted { color:#a1a1aa; font-size:13px; }
  .nga-title { font-size:22px; font-weight:900; color:#fff; margin-bottom:4px; }
  .nga-desc { color:#a1a1aa; font-size:14px; margin-bottom:20px; }
  .nga-badge-contoh { display:inline-block; font-size:11px; font-weight:800; letter-spacing:1px; background:#1a1a1e; border:1px dashed #52525b; color:#a1a1aa; padding:4px 12px; border-radius:999px; margin-bottom:14px; }
  /* ===== TABLE ===== */
  .nga-tablewrap { overflow-x:auto; }
  .nga-table { width:100%; border-collapse:collapse; font-size:14px; min-width:720px; }
  .nga-table th { text-align:left; font-size:12px; letter-spacing:1px; color:#71717a; font-weight:800; padding:10px 12px; border-bottom:1px solid #27272a; white-space:nowrap; }
  .nga-table td { padding:12px; border-bottom:1px solid #1c1c20; vertical-align:middle; }
  .nga-table tr:last-child td { border-bottom:none; }
  .nga-table tr:hover td { background:#141417; }
  .nga-aksi { display:flex; gap:6px; flex-wrap:wrap; }
  .nga-toolbar { display:flex; gap:10px; margin-bottom:16px; flex-wrap:wrap; align-items:center; justify-content:space-between; }
  .nga-search { max-width:320px; }
  /* ===== PAKET ===== */
  .nga-paket { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  .nga-paket .harga { font-size:38px; font-weight:900; color:#fff; margin:8px 0; }
  .nga-paket .coret { color:#71717a; text-decoration:line-through; font-size:16px; }
  /* ===== MODAL ===== */
  .nga-modal-bg { display:none; position:fixed; inset:0; background:rgba(0,0,0,.7); z-index:100; align-items:center; justify-content:center; padding:20px; }
  .nga-modal-bg.show { display:flex; }
  .nga-modal { background:#141417; border:1px solid #3f3f46; border-radius:16px; padding:26px; width:100%; max-width:440px; animation:ngaFade .2s ease; }
  .nga-modal h3 { color:#fff; font-size:18px; margin-bottom:18px; }
  /* ===== TOAST ===== */
  .nga-toast { position:fixed; bottom:24px; left:50%; transform:translateX(-50%) translateY(20px); background:#18181b; border:1px solid #3f3f46; color:#fff; padding:12px 22px; border-radius:12px; font-size:14px; opacity:0; pointer-events:none; transition:.25s; z-index:200; box-shadow:0 10px 30px rgba(0,0,0,.5); }
  .nga-toast.show { opacity:1; transform:translateX(-50%) translateY(0); }
  .nga-toast b { color:#c4b5fd; }
  .nga-overlay { display:none; }
  @media (max-width:1024px) {
    .nga-stats { grid-template-columns:1fr 1fr; }
    .nga-grid2, .nga-paket { grid-template-columns:1fr; }
  }
  @media (max-width:860px) {
    .nga-sidebar { position:fixed; left:0; top:0; transform:translateX(-100%); transition:transform .25s; box-shadow:20px 0 60px rgba(0,0,0,.5); }
    .nga-sidebar.open { transform:none; }
    .nga-overlay.show { display:block; position:fixed; inset:0; background:rgba(0,0,0,.6); z-index:55; }
    .nga-burger { display:block; }
    .nga-content { padding:18px 14px; }
    .nga-topbar { padding:12px 14px; }
    .nga-topbar h1 { font-size:17px; }
  }
</style>
<div class="nga">
  <div class="nga-overlay" id="ngaOverlay"></div>
  <!-- SIDEBAR -->
  <aside class="nga-sidebar" id="ngaSidebar">
    <div class="nga-brand">NewsGen <span>Studio</span></div>
    <div class="nga-adminbadge">ADMIN</div>
    <nav class="nga-nav" id="ngaNav">
      <button data-target="ringkasan" class="active"><span class="ico">📊</span> Ringkasan</button>
      <button data-target="pelanggan"><span class="ico">👥</span> Pelanggan</button>
      <button data-target="paket"><span class="ico">💳</span> Paket & Harga</button>
      <button data-target="setting"><span class="ico">⚙️</span> Setting</button>
    </nav>
    <div class="nga-side-foot">Faizal ground (Admin)</div>
  </aside>

  <!-- MAIN -->
  <div class="nga-main">
    <header class="nga-topbar">
      <div style="display:flex;align-items:center;gap:12px;">
        <button class="nga-burger" id="ngaBurger">☰</button>
        <div>
          <h1 id="ngaPageTitle">Ringkasan</h1>
          <div class="sub">Kelola penjualan NewsGen Studio</div>
        </div>
      </div>
      <button class="nga-btn small" onclick="ngaOpenModal()">＋ Tambah Pelanggan</button>
    </header>

    <div class="nga-content">

      <!-- RINGKASAN -->
      <section class="nga-page active" id="apage-ringkasan">
        <div class="nga-stats">
          <div class="nga-card nga-stat"><div class="ico">👥</div><div class="num" id="ngaStatTotal">37</div><div class="lbl">Total pelanggan</div></div>
          <div class="nga-card nga-stat"><div class="ico">✅</div><div class="num" id="ngaStatAktif">31</div><div class="lbl">Pelanggan aktif</div></div>
          <div class="nga-card nga-stat"><div class="ico">💰</div><div class="num">Rp6,2jt</div><div class="lbl">Pendapatan Okt 2026</div></div>
          <div class="nga-card nga-stat"><div class="ico">⏳</div><div class="num">3</div><div class="lbl">Expired &lt; 7 hari</div></div>
        </div>
        <div class="nga-grid2">
          <div class="nga-card">
            <h3>🆕 Pelanggan Terbaru</h3>
            <div class="nga-tablewrap"><table class="nga-table">
              <tr><th>Nama</th><th>Paket</th><th>Status</th></tr>
              <tr><td style="color:#fff">Maya Putri</td><td>Normal</td><td><span class="nga-chip green">AKTIF</span></td></tr>
              <tr><td style="color:#fff">Dedi Kurniawan</td><td>Promo</td><td><span class="nga-chip green">AKTIF</span></td></tr>
              <tr><td style="color:#fff">Dewi Lestari</td><td>Normal</td><td><span class="nga-chip green">AKTIF</span></td></tr>
              <tr><td style="color:#fff">Rina Wulandari</td><td>Promo</td><td><span class="nga-chip green">AKTIF</span></td></tr>
              <tr><td style="color:#fff">Siti Aminah</td><td>Promo</td><td><span class="nga-chip green">AKTIF</span></td></tr>
            </table></div>
          </div>
          <div class="nga-card">
            <h3>⚠️ Perlu Perhatian</h3>
            <div class="nga-tablewrap"><table class="nga-table">
              <tr><th>Nama</th><th>Expired</th><th>Aksi</th></tr>
              <tr><td style="color:#fff">Budi Santoso</td><td><span class="nga-chip red">8 Okt 2026</span></td><td><button class="nga-btn small green" onclick="ngaToast('Masa aktif <b>diperpanjang</b> (contoh)')">Perpanjang</button></td></tr>
              <tr><td style="color:#fff">Agus Wijaya</td><td><span class="nga-chip gray">Expired</span></td><td><button class="nga-btn small green" onclick="ngaToast('Masa aktif <b>diperpanjang</b> (contoh)')">Aktifkan</button></td></tr>
              <tr><td style="color:#fff">Joko Prasetyo</td><td><span class="nga-chip red">10 Okt 2026</span></td><td><button class="nga-btn small green" onclick="ngaToast('Masa aktif <b>diperpanjang</b> (contoh)')">Perpanjang</button></td></tr>
            </table></div>
            <p class="nga-muted" style="margin-top:12px">Kirim pengingat via WhatsApp sebelum expired biar pelanggan perpanjang.</p>
          </div>
        </div>
      </section>

      <!-- PELANGGAN -->
      <section class="nga-page" id="apage-pelanggan">
        <div class="nga-title">Pelanggan</div>
        <div class="nga-desc">Daftar semua pembeli NewsGen Studio. <span class="nga-badge-contoh">DATA CONTOH</span></div>
        <div class="nga-toolbar">
          <input class="nga-input nga-search" placeholder="🔍 Cari nama / WhatsApp…" oninput="ngaCari(this.value)">
          <button class="nga-btn" onclick="ngaOpenModal()">＋ Tambah Pelanggan</button>
        </div>
        <div class="nga-card" style="padding:8px 12px">
          <div class="nga-tablewrap"><table class="nga-table" id="ngaTabelPelanggan">
            <thead><tr><th>Nama</th><th>WhatsApp</th><th>Paket</th><th>Bergabung</th><th>Expired</th><th>Status</th><th>Aksi</th></tr></thead>
            <tbody id="ngaTabelBody"></tbody>
          </table></div>
        </div>
      </section>

      <!-- PAKET -->
      <section class="nga-page" id="apage-paket">
        <div class="nga-title">Paket & Harga</div>
        <div class="nga-desc">Paket yang tampil di sales page. <span class="nga-badge-contoh">DATA CONTOH</span></div>
        <div class="nga-paket">
          <div class="nga-card">
            <span class="nga-chip violet">PROMO</span>
            <div class="harga">Rp199.000</div>
            <div class="coret">Rp450.000</div>
            <p class="nga-muted" style="margin:12px 0">Paket promo yang tampil di sales page saat ini.</p>
            <button class="nga-btn small" onclick="ngaToast('Edit paket — <b>segera hadir</b>')">✏️ Edit Paket</button>
          </div>
          <div class="nga-card">
            <span class="nga-chip gray">NORMAL</span>
            <div class="harga">Rp450.000</div>
            <p class="nga-muted" style="margin:12px 0">Harga normal / harga coret di sales page.</p>
            <button class="nga-btn small" onclick="ngaToast('Edit paket — <b>segera hadir</b>')">✏️ Edit Paket</button>
          </div>
        </div>
      </section>

      <!-- SETTING -->
      <section class="nga-page" id="apage-setting">
        <div class="nga-title">Setting</div>
        <div class="nga-desc">Pengaturan admin & penjualan.</div>
        <div class="nga-card" style="max-width:520px">
          <h3>👤 Admin</h3>
          <div class="nga-field"><label class="nga-label">Nama admin</label><input class="nga-input" value="Faizal ground"></div>
          <div class="nga-field"><label class="nga-label">WhatsApp admin (tujuan tombol beli)</label><input class="nga-input" value="6280000000000"><p class="nga-muted" style="margin-top:6px">Ganti dengan nomor WhatsApp aslimu — tombol beli di sales page & dashboard pelanggan mengarah ke sini.</p></div>
          <button class="nga-btn" onclick="ngaToast('<b>Tersimpan</b> (contoh)')">💾 Simpan</button>
        </div>
      </section>

    </div>
  </div>
</div>

<!-- MODAL TAMBAH PELANGGAN -->
<div class="nga-modal-bg" id="ngaModalBg">
  <div class="nga-modal">
    <h3>＋ Tambah Pelanggan</h3>
    <div class="nga-field"><label class="nga-label">Nama</label><input class="nga-input" id="ngaFNama" placeholder="Nama pelanggan"></div>
    <div class="nga-field"><label class="nga-label">WhatsApp</label><input class="nga-input" id="ngaFWa" placeholder="62812xxxxxxx"></div>
    <div class="nga-field"><label class="nga-label">Paket</label><select class="nga-select" id="ngaFPaket"><option>Promo — Rp199.000</option><option>Normal — Rp450.000</option></select></div>
    <div class="nga-field"><label class="nga-label">Durasi</label><select class="nga-select" id="ngaFDurasi"><option>1 bulan</option><option>3 bulan</option><option>12 bulan</option></select></div>
    <div style="display:flex;gap:10px;justify-content:flex-end">
      <button class="nga-btn ghost" onclick="ngaCloseModal()">Batal</button>
      <button class="nga-btn" onclick="ngaSimpanPelanggan()">Simpan</button>
    </div>
  </div>
</div>
<div class="nga-toast" id="ngaToast"></div>
`;

(function(){
  /* ============================================================
     KONFIGURASI DATA
     - dummy: true  -> pakai DATA DUMMY di DUMMY_DB (bawah ini)
     - dummy: false -> pakai DATA ASLI dari backend yang dipilih
     - backend: 'spreadsheet' | 'firebase' | 'supabase'
     Cukup ubah satu flag ini untuk pindah sumber data.
  ============================================================ */
  const CONFIG = { dummy: true, backend: 'supabase' };

  /* ============ DATA DUMMY (dipakai saat dummy:true) ============ */
  const DUMMY_DB = {
    pelanggan: [
      { nama:'Budi Santoso',   wa:'0812-3456-7890', paket:'PROMO',  gabung:'12 Sep 2026', expired:'8 Okt 2026',  aktif:true  },
      { nama:'Siti Aminah',    wa:'0813-9876-5432', paket:'PROMO',  gabung:'28 Sep 2026', expired:'28 Okt 2026', aktif:true  },
      { nama:'Dewi Lestari',   wa:'0821-1122-3344', paket:'NORMAL', gabung:'3 Okt 2026',  expired:'3 Nov 2026',  aktif:true  },
      { nama:'Rina Wulandari', wa:'0819-2233-4455', paket:'PROMO',  gabung:'1 Okt 2026',  expired:'1 Nov 2026',  aktif:true  },
      { nama:'Dedi Kurniawan', wa:'0822-3344-5566', paket:'PROMO',  gabung:'2 Okt 2026',  expired:'2 Nov 2026',  aktif:true  },
      { nama:'Maya Putri',     wa:'0815-7788-9900', paket:'NORMAL', gabung:'4 Okt 2026',  expired:'4 Nov 2026',  aktif:true  },
      { nama:'Agus Wijaya',    wa:'0857-6655-4433', paket:'PROMO',  gabung:'15 Agu 2026', expired:'15 Sep 2026', aktif:false }
    ]
  };

  /* ============ BACKEND ASLI (dipakai saat dummy:false) ============
     Isi fungsi-fungsi ini saat backend sudah dikonfigurasi. */
  function backendBelum(nama){
    ngaToast('Backend <b>'+nama+'</b> belum dikonfigurasi');
    return Promise.resolve([]);
  }
  function stubBackend(nama){
    return { pelanggan: {
      list:    function(){ return backendBelum(nama); },
      tambah:  function(p){ return backendBelum(nama); },
      setAktif:function(wa, aktif){ return backendBelum(nama); },
      hapus:   function(wa){ return backendBelum(nama); }
    }};
  }
  const Backend = {
    spreadsheet: stubBackend('spreadsheet'),
    firebase:    stubBackend('firebase'),
    supabase:    stubBackend('supabase')
  };

  /* ============ DATA LAYER (satu pintu) ============
     Semua kode UI memanggil DB.pelanggan.*, bukan DUMMY_DB / Backend langsung. */
  const DB = {
    pelanggan: {
      list: function(){
        return CONFIG.dummy ? Promise.resolve(DUMMY_DB.pelanggan)
                            : Backend[CONFIG.backend].pelanggan.list();
      },
      tambah: function(p){
        if(CONFIG.dummy){ DUMMY_DB.pelanggan.push(p); return Promise.resolve(p); }
        return Backend[CONFIG.backend].pelanggan.tambah(p);
      },
      setAktif: function(wa, aktif){
        if(CONFIG.dummy){
          const x = DUMMY_DB.pelanggan.find(function(y){ return y.wa===wa; });
          if(x) x.aktif = aktif;
          return Promise.resolve(x);
        }
        return Backend[CONFIG.backend].pelanggan.setAktif(wa, aktif);
      },
      hapus: function(wa){
        if(CONFIG.dummy){
          const i = DUMMY_DB.pelanggan.findIndex(function(y){ return y.wa===wa; });
          if(i>=0) DUMMY_DB.pelanggan.splice(i,1);
          return Promise.resolve(true);
        }
        return Backend[CONFIG.backend].pelanggan.hapus(wa);
      }
    }
  };

  var titles = { ringkasan:'Ringkasan', pelanggan:'Pelanggan', paket:'Paket & Harga', setting:'Setting' };
  var filterQ = '';

  // Navigasi
  function goPage(name){
    document.querySelectorAll('#ngaNav button').forEach(function(b){ b.classList.toggle('active', b.dataset.target===name); });
    document.querySelectorAll('.nga-page').forEach(function(p){ p.classList.toggle('active', p.id==='apage-'+name); });
    document.getElementById('ngaPageTitle').textContent = titles[name] || name;
    document.getElementById('ngaSidebar').classList.remove('open');
    document.getElementById('ngaOverlay').classList.remove('show');
    window.scrollTo({top:0, behavior:'smooth'});
  }
  document.querySelectorAll('#ngaNav button').forEach(function(b){
    b.addEventListener('click', function(){ goPage(b.dataset.target); });
  });

  // Burger mobile
  document.getElementById('ngaBurger').addEventListener('click', function(){
    document.getElementById('ngaBurger').classList.toggle('open');
    document.getElementById('ngaSidebar').classList.toggle('open');
    document.getElementById('ngaOverlay').classList.toggle('show');
  });
  document.getElementById('ngaOverlay').addEventListener('click', function(){
    document.getElementById('ngaSidebar').classList.remove('open');
    this.classList.remove('show');
  });

  // Toast
  var toastEl = document.getElementById('ngaToast'), toastT;
  window.ngaToast = function(html){
    toastEl.innerHTML = html;
    toastEl.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(function(){ toastEl.classList.remove('show'); }, 2600);
  };

  // Modal tambah pelanggan
  window.ngaOpenModal = function(){ document.getElementById('ngaModalBg').classList.add('show'); };
  window.ngaCloseModal = function(){ document.getElementById('ngaModalBg').classList.remove('show'); };
  document.getElementById('ngaModalBg').addEventListener('click', function(e){
    if(e.target === this) ngaCloseModal();
  });

  function esc(s){ var d=document.createElement('div'); d.textContent=s; return d.innerHTML; }
  function tglExpired(durasi){
    var d = new Date();
    var bulan = durasi.indexOf('12')===0 ? 12 : (durasi.indexOf('3')===0 ? 3 : 1);
    d.setMonth(d.getMonth()+bulan);
    var bln = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
    return d.getDate()+' '+bln[d.getMonth()]+' '+d.getFullYear();
  }
  function hariIni(){
    var d=new Date(); var bln=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
    return d.getDate()+' '+bln[d.getMonth()]+' '+d.getFullYear();
  }

  // Render tabel pelanggan dari DB (sumber data ikut flag CONFIG.dummy)
  function barisPelanggan(p){
    const chipPaket = p.paket==='PROMO' ? '<span class="nga-chip violet">PROMO</span>' : '<span class="nga-chip gray">NORMAL</span>';
    const chipStatus = p.aktif ? '<span class="nga-chip green">AKTIF</span>' : '<span class="nga-chip red">NONAKTIF</span>';
    const btnToggle = p.aktif
      ? '<button class="nga-btn small ghost" data-aksi="toggle">Nonaktifkan</button>'
      : '<button class="nga-btn small green" data-aksi="toggle">Aktifkan</button>';
    const btnHapus = p.aktif ? '' : '<button class="nga-btn small red" data-aksi="hapus">Hapus</button>';
    return '<tr data-wa="'+esc(p.wa)+'">'
      + '<td style="color:#fff">'+esc(p.nama)+'</td>'
      + '<td class="nga-muted">'+esc(p.wa)+'</td>'
      + '<td>'+chipPaket+'</td>'
      + '<td class="nga-muted">'+esc(p.gabung)+'</td>'
      + '<td class="nga-muted">'+esc(p.expired)+'</td>'
      + '<td>'+chipStatus+'</td>'
      + '<td><div class="nga-aksi">'
      + '<button class="nga-btn small green" data-aksi="perpanjang">Perpanjang</button>'
      + btnToggle + btnHapus
      + '</div></td></tr>';
  }

  async function renderPelanggan(){
    const list = await DB.pelanggan.list();
    const q = filterQ.toLowerCase();
    const rows = list
      .filter(function(p){ return !q || (p.nama+' '+p.wa).toLowerCase().indexOf(q) >= 0; })
      .map(barisPelanggan).join('');
    document.getElementById('ngaTabelBody').innerHTML = rows;
    document.getElementById('ngaStatTotal').textContent = list.length;
    document.getElementById('ngaStatAktif').textContent = list.filter(function(p){ return p.aktif; }).length;
  }

  // Delegasi klik aksi di tabel
  document.getElementById('ngaTabelPelanggan').addEventListener('click', async function(e){
    const btn = e.target.closest('button[data-aksi]');
    if(!btn) return;
    const wa = btn.closest('tr').dataset.wa;
    const aksi = btn.dataset.aksi;
    if(aksi==='perpanjang'){
      ngaToast('Masa aktif <b>diperpanjang</b> (contoh)');
    } else if(aksi==='toggle'){
      const list = await DB.pelanggan.list();
      const p = list.find(function(x){ return x.wa===wa; });
      const wasAktif = p.aktif;
      await DB.pelanggan.setAktif(wa, !wasAktif);
      ngaToast(wasAktif ? 'Pelanggan <b>dinonaktifkan</b> (contoh)' : 'Pelanggan <b>diaktifkan</b> (contoh)');
      renderPelanggan();
    } else if(aksi==='hapus'){
      await DB.pelanggan.hapus(wa);
      ngaToast('Pelanggan <b>dihapus</b> (contoh)');
      renderPelanggan();
    }
  });

  // Simpan pelanggan baru via DB
  window.ngaSimpanPelanggan = async function(){
    const nama = document.getElementById('ngaFNama').value.trim();
    const wa = document.getElementById('ngaFWa').value.trim();
    const paket = document.getElementById('ngaFPaket').value;
    const durasi = document.getElementById('ngaFDurasi').value;
    if(!nama || !wa){ ngaToast('Isi <b>nama & WhatsApp</b> dulu bro'); return; }
    await DB.pelanggan.tambah({
      nama: nama, wa: wa,
      paket: paket.indexOf('Promo')===0 ? 'PROMO' : 'NORMAL',
      gabung: hariIni(), expired: tglExpired(durasi), aktif: true
    });
    document.getElementById('ngaFNama').value='';
    document.getElementById('ngaFWa').value='';
    ngaCloseModal();
    ngaToast('Pelanggan <b>'+esc(nama)+'</b> ditambahkan (contoh)');
    renderPelanggan();
  };

  // Cari pelanggan
  window.ngaCari = function(q){ filterQ = q; renderPelanggan(); };

  // Init
  renderPelanggan();
})();

})();
