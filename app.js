/* NewsGen Studio — App JS (di-load via CDN) */
(function(){
  var root = document.getElementById('newsgen-root');
  if(!root){ root = document.createElement('div'); root.id = 'newsgen-root'; document.body.appendChild(root); }
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
  .ngt { font-family:'Segoe UI',system-ui,-apple-system,Roboto,Arial,sans-serif; background:#0a0a0d; color:#e4e4e7; line-height:1.55; display:flex; min-height:100vh; font-size:15px; }
  .ngt button { font-family:inherit; }
  /* ===== SIDEBAR ===== */
  .ngt-sidebar { width:252px; flex-shrink:0; background:#0d0d10; border-right:1px solid #27272a; height:100vh; position:sticky; top:0; display:flex; flex-direction:column; padding:22px 14px; z-index:60; }
  .ngt-brand { font-weight:900; font-size:19px; color:#fff; padding:0 10px 20px; }
  .ngt-brand span { color:#f59e0b; }
  .ngt-nav { display:flex; flex-direction:column; gap:4px; flex:1; }
  .ngt-nav button { display:flex; align-items:center; gap:12px; width:100%; padding:12px 14px; border-radius:10px; background:none; border:none; color:#a1a1aa; font-size:15px; cursor:pointer; text-align:left; transition:background .15s,color .15s; }
  .ngt-nav button:hover { background:#17171b; color:#fff; }
  .ngt-nav button.active { background:rgba(245,158,11,.12); color:#fbbf24; font-weight:700; }
  .ngt-nav .ico { font-size:18px; width:24px; text-align:center; }
  .ngt-side-foot { border-top:1px solid #27272a; padding:14px 10px 0; font-size:12px; color:#71717a; }
  .ngt-side-foot .plan { display:inline-block; background:rgba(245,158,11,.12); border:1px solid rgba(245,158,11,.4); color:#fbbf24; font-weight:800; font-size:11px; padding:3px 10px; border-radius:999px; margin-top:6px; }
  /* ===== MAIN ===== */
  .ngt-main { flex:1; min-width:0; display:flex; flex-direction:column; }
  .ngt-topbar { position:sticky; top:0; z-index:50; background:rgba(10,10,13,.94); backdrop-filter:blur(8px); border-bottom:1px solid #27272a; padding:14px 28px; display:flex; align-items:center; justify-content:space-between; gap:12px; }
  .ngt-topbar h1 { font-size:20px; color:#fff; font-weight:800; }
  .ngt-topbar .sub { font-size:12px; color:#71717a; }
  .ngt-burger { display:none; background:none; border:1px solid #27272a; color:#fff; border-radius:8px; font-size:18px; padding:6px 12px; cursor:pointer; }
  .ngt-content { padding:28px; max-width:1220px; width:100%; margin:0 auto; }
  .ngt-page { display:none; }
  .ngt-page.active { display:block; animation:ngtFade .25s ease; }
  @keyframes ngtFade { from { opacity:0; transform:translateY(8px);} to { opacity:1; transform:none;} }
  /* ===== BUTTONS / INPUTS ===== */
  .ngt-btn { display:inline-flex; align-items:center; gap:8px; background:#f59e0b; color:#000; font-weight:800; padding:10px 20px; border-radius:10px; font-size:14px; border:none; cursor:pointer; transition:transform .15s, box-shadow .15s; }
  .ngt-btn:hover { transform:translateY(-1px); box-shadow:0 6px 18px rgba(245,158,11,.3); }
  .ngt-btn.green { background:#22c55e; color:#fff; }
  .ngt-btn.green:hover { box-shadow:0 6px 18px rgba(34,197,94,.3); }
  .ngt-btn.ghost { background:#1a1a1e; color:#e4e4e7; border:1px solid #3f3f46; }
  .ngt-btn.ghost:hover { box-shadow:none; background:#222227; }
  .ngt-btn.small { padding:7px 14px; font-size:13px; }
  .ngt-btn:disabled { opacity:.6; cursor:wait; transform:none; }
  .ngt-input, .ngt-select, .ngt-area { width:100%; background:#141417; border:1px solid #3f3f46; color:#e4e4e7; border-radius:10px; padding:11px 14px; font-size:14px; font-family:inherit; }
  .ngt-input:focus, .ngt-select:focus, .ngt-area:focus { outline:none; border-color:#f59e0b; }
  .ngt-area { min-height:110px; resize:vertical; }
  .ngt-label { display:block; font-size:13px; font-weight:700; color:#a1a1aa; margin:0 0 8px; }
  .ngt-field { margin-bottom:16px; }
  /* ===== CARDS / STATS ===== */
  .ngt-card { background:#111113; border:1px solid #27272a; border-radius:14px; padding:20px; }
  .ngt-card h3 { color:#fff; font-size:16px; margin-bottom:12px; }
  .ngt-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:20px; }
  .ngt-stat .num { font-size:30px; font-weight:900; color:#fff; }
  .ngt-stat .lbl { font-size:13px; color:#a1a1aa; margin-top:2px; }
  .ngt-stat .ico { font-size:22px; margin-bottom:8px; }
  .ngt-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  .ngt-list { display:flex; flex-direction:column; gap:10px; }
  .ngt-row { display:flex; align-items:center; gap:14px; padding:14px 16px; background:#111113; border:1px solid #27272a; border-radius:12px; }
  .ngt-row:hover { border-color:#3f3f46; }
  .ngt-chip { display:inline-block; font-size:11px; font-weight:800; padding:3px 10px; border-radius:999px; white-space:nowrap; }
  .ngt-chip.orange { background:rgba(245,158,11,.14); color:#fbbf24; border:1px solid rgba(245,158,11,.35); }
  .ngt-chip.green { background:rgba(34,197,94,.14); color:#4ade80; border:1px solid rgba(34,197,94,.35); }
  .ngt-chip.blue { background:rgba(96,165,250,.14); color:#93c5fd; border:1px solid rgba(96,165,250,.35); }
  .ngt-chip.gray { background:#1a1a1e; color:#a1a1aa; border:1px solid #3f3f46; }
  .ngt-muted { color:#a1a1aa; font-size:13px; }
  .ngt-title { font-size:22px; font-weight:900; color:#fff; margin-bottom:4px; }
  .ngt-desc { color:#a1a1aa; font-size:14px; margin-bottom:20px; }
  .ngt-badge-contoh { display:inline-block; font-size:11px; font-weight:800; letter-spacing:1px; background:#1a1a1e; border:1px dashed #52525b; color:#a1a1aa; padding:4px 12px; border-radius:999px; margin-bottom:14px; }
  /* ===== RADAR ===== */
  .ngt-filters { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px; }
  .ngt-filters button { background:#141417; border:1px solid #3f3f46; color:#a1a1aa; font-size:13px; padding:7px 16px; border-radius:999px; cursor:pointer; }
  .ngt-filters button.active { background:rgba(245,158,11,.14); border-color:#f59e0b; color:#fbbf24; font-weight:700; }
  .ngt-news { display:flex; gap:14px; align-items:flex-start; }
  .ngt-news .body { flex:1; min-width:0; }
  .ngt-news h4 { color:#fff; font-size:15px; margin:6px 0 4px; line-height:1.45; }
  .ngt-news p { font-size:13px; color:#a1a1aa; }
  .ngt-news .meta { display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
  .ngt-newsgrid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
  .ngt-newscard { background:#111113; border:1px solid #27272a; border-radius:14px; overflow:hidden; display:flex; flex-direction:column; transition:transform .15s,border-color .15s; }
  .ngt-newscard:hover { transform:translateY(-2px); border-color:#52525b; }
  .ngt-newscard .thumb { height:128px; display:flex; align-items:center; justify-content:center; font-size:44px; }
  .ngt-newscard .t-viral { background:linear-gradient(135deg,#7c2d12,#431407); }
  .ngt-newscard .t-jateng { background:linear-gradient(135deg,#1e3a8a,#172554); }
  .ngt-newscard .t-cuaca { background:linear-gradient(135deg,#334155,#0f172a); }
  .ngt-newscard .t-kuliner { background:linear-gradient(135deg,#92400e,#451a03); }
  .ngt-newscard .t-warga { background:linear-gradient(135deg,#14532d,#052e16); }
  .ngt-newscard .body { padding:16px; flex:1; display:flex; flex-direction:column; gap:8px; }
  .ngt-newscard h4 { color:#fff; font-size:15px; line-height:1.45; margin:0; }
  .ngt-newscard p { font-size:13px; color:#a1a1aa; margin:0; flex:1; }
  .ngt-newscard .meta { display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
  .ngt-newscard .ngt-btn { align-self:flex-start; }
  @media (max-width:1024px) { .ngt-newsgrid { grid-template-columns:1fr 1fr; } }
  @media (max-width:640px) { .ngt-newsgrid { grid-template-columns:1fr; } }
  /* ===== STUDIO ===== */
  .ngt-studio { display:grid; grid-template-columns:1fr 380px; gap:18px; align-items:start; }
  .ngt-preview-card { width:100%; max-width:340px; margin:0 auto; aspect-ratio:4/5; border-radius:14px; overflow:hidden; position:relative; background:linear-gradient(160deg,#1c1917 0%,#451a03 55%,#0a0a0d 100%); border:1px solid #3f3f46; display:flex; flex-direction:column; justify-content:flex-end; padding:22px; }
  .ngt-preview-card .kicker { font-size:11px; letter-spacing:2px; color:#fbbf24; font-weight:800; margin-bottom:8px; }
  .ngt-preview-card h4 { color:#fff; font-size:21px; line-height:1.3; font-weight:900; }
  .ngt-preview-card .src { margin-top:10px; font-size:11px; color:#a1a1aa; }
  .ngt-preview-card .ph { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; color:#52525b; font-size:14px; text-align:center; padding:30px; }
  .ngt-out { background:#141417; border:1px solid #27272a; border-radius:10px; padding:14px; font-size:14px; color:#e4e4e7; white-space:pre-wrap; margin-bottom:12px; min-height:60px; }
  .ngt-out:empty::before { content:'Hasil generate muncul di sini…'; color:#52525b; }
  .ngt-spin { display:inline-block; width:16px; height:16px; border:2px solid #00000040; border-top-color:#000; border-radius:50%; animation:ngtSpin .7s linear infinite; vertical-align:-3px; }
  @keyframes ngtSpin { to { transform:rotate(360deg);} }
  /* ===== STUDIO TABS ===== */
  .ngt-tabs { display:flex; gap:8px; margin-bottom:18px; }
  .ngt-tabs button { background:#141417; border:1px solid #3f3f46; color:#a1a1aa; font-size:14px; font-weight:700; padding:10px 22px; border-radius:12px; cursor:pointer; font-family:inherit; }
  .ngt-tabs button.active { background:rgba(245,158,11,.14); border-color:#f59e0b; color:#fbbf24; }
  .ngt-subpage { display:none; }
  .ngt-subpage.active { display:block; animation:ngtFade .2s ease; }
  .ngt-jenis { display:flex; gap:8px; flex-wrap:wrap; }
  .ngt-jenis button { background:#141417; border:1px solid #3f3f46; color:#a1a1aa; font-size:13px; padding:9px 16px; border-radius:999px; cursor:pointer; font-family:inherit; }
  .ngt-jenis button.active { background:rgba(245,158,11,.14); border-color:#f59e0b; color:#fbbf24; font-weight:700; }
  .ngt-drop { border:2px dashed #3f3f46; border-radius:12px; padding:26px; text-align:center; cursor:pointer; color:#a1a1aa; font-size:14px; transition:.15s; }
  .ngt-drop:hover { border-color:#f59e0b; color:#e4e4e7; }
  /* ===== KOMENTAR ===== */
  .ngt-avatar { width:42px; height:42px; border-radius:50%; background:linear-gradient(135deg,#f59e0b,#b45309); color:#000; font-weight:900; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:16px; }
  .ngt-komen .body { flex:1; min-width:0; }
  .ngt-komen .reply { margin-top:10px; background:#141417; border-left:3px solid #22c55e; border-radius:0 10px 10px 0; padding:10px 14px; font-size:13px; color:#d4d4d8; }
  .ngt-komen .reply b { color:#4ade80; font-size:12px; display:block; margin-bottom:2px; }
  .ngt-switch { position:relative; width:46px; height:26px; flex-shrink:0; }
  .ngt-switch input { opacity:0; width:0; height:0; }
  .ngt-switch .sl { position:absolute; inset:0; background:#3f3f46; border-radius:999px; cursor:pointer; transition:.2s; }
  .ngt-switch .sl::before { content:''; position:absolute; width:20px; height:20px; border-radius:50%; background:#fff; top:3px; left:3px; transition:.2s; }
  .ngt-switch input:checked + .sl { background:#22c55e; }
  .ngt-switch input:checked + .sl::before { transform:translateX(20px); }
  /* ===== INSIGHT ===== */
  .ngt-bar { height:8px; background:#1a1a1e; border-radius:999px; overflow:hidden; margin-top:8px; }
  .ngt-bar i { display:block; height:100%; background:linear-gradient(90deg,#f59e0b,#fbbf24); border-radius:999px; }
  /* ===== TOAST ===== */
  .ngt-toast { position:fixed; bottom:24px; left:50%; transform:translateX(-50%) translateY(20px); background:#18181b; border:1px solid #3f3f46; color:#fff; padding:12px 22px; border-radius:12px; font-size:14px; opacity:0; pointer-events:none; transition:.25s; z-index:200; box-shadow:0 10px 30px rgba(0,0,0,.5); }
  .ngt-toast.show { opacity:1; transform:translateX(-50%) translateY(0); }
  .ngt-toast b { color:#4ade80; }
  .ngt-modal-bg { display:none; position:fixed; inset:0; background:rgba(0,0,0,.7); z-index:100; align-items:center; justify-content:center; padding:20px; }
  .ngt-modal-bg.show { display:flex; }
  .ngt-modal { background:#141417; border:1px solid #3f3f46; border-radius:16px; padding:26px; width:100%; max-width:440px; animation:ngtFade .2s ease; }
  .ngt-modal h3 { color:#fff; font-size:18px; margin-bottom:18px; }
  .ngt-pw-wrap { display:flex; gap:8px; }
  .ngt-pw-wrap .ngt-input { flex:1; }
  /* ===== RESPONSIVE ===== */
  .ngt-overlay { display:none; }
  @media (max-width:1024px) {
    .ngt-stats { grid-template-columns:1fr 1fr; }
    .ngt-studio { grid-template-columns:1fr; }
    .ngt-grid2 { grid-template-columns:1fr; }
  }
  @media (max-width:860px) {
    .ngt-sidebar { position:fixed; left:0; top:0; transform:translateX(-100%); transition:transform .25s; box-shadow:20px 0 60px rgba(0,0,0,.5); }
    .ngt-sidebar.open { transform:none; }
    .ngt-overlay.show { display:block; position:fixed; inset:0; background:rgba(0,0,0,.6); z-index:55; }
    .ngt-burger { display:block; }
    .ngt-content { padding:18px 14px; }
    .ngt-topbar { padding:12px 14px; }
    .ngt-topbar h1 { font-size:17px; }
  }
/* Wizard AI News */
  .ngt-steps { display:flex; align-items:center; justify-content:center; gap:0; margin:6px 0 22px; }
  .ngt-step { display:flex; flex-direction:column; align-items:center; gap:6px; flex:1; position:relative; }
  .ngt-step .dot { width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:800; background:#1c1c1f; color:#52525b; border:1px solid #2c2c33; transition:all .3s; z-index:1; }
  .ngt-step .lbl { font-size:10px; text-transform:uppercase; letter-spacing:1px; font-weight:700; color:#52525b; }
  .ngt-step.done .dot { background:#22c55e; color:#fff; border-color:#22c55e; }
  .ngt-step.done .lbl { color:#a1a1aa; }
  .ngt-step.now .dot { background:#7c3aed; color:#fff; border-color:#7c3aed; box-shadow:0 0 14px rgba(124,58,237,.5); }
  .ngt-step.now .lbl { color:#fff; }
  .ngt-step::before { content:''; position:absolute; top:17px; left:-50%; width:100%; height:2px; background:#26262b; }
  .ngt-step:first-child::before { display:none; }
  .ngt-step.done::before { background:#22c55e; }
  .ngt-opt { padding:10px 12px; border:1px solid #2c2c33; border-radius:12px; font-size:13px; cursor:pointer; margin-bottom:8px; background:#17171a; transition:all .2s; }
  .ngt-opt:hover { border-color:#7c3aed; }
  .ngt-opt.sel { border-color:#7c3aed; background:rgba(124,58,237,.12); }
  .ngt-wiznav { display:flex; gap:10px; margin-top:18px; flex-wrap:wrap; }
</style>
<!-- ============ LAYAR LOGIN PELANGGAN ============ -->
<div id="ngt-login" style="display:none;min-height:100vh;align-items:center;justify-content:center;padding:20px;background:radial-gradient(1000px 500px at 50% -10%,#1a1a22,#0a0a0c);">
  <div style="width:100%;max-width:380px;background:#121215;border:1px solid #26262b;border-radius:20px;padding:32px 28px;">
    <div style="text-align:center;margin-bottom:24px;">
      <div style="font-size:32px;margin-bottom:8px;">&#128240;</div>
      <div style="font-weight:800;font-size:20px;">NewsGen Studio</div>
      <div style="color:#8b8b93;font-size:12px;margin-top:4px;">Masuk ke dashboard pelanggan</div>
    </div>
    <label style="font-size:11px;color:#8b8b93;font-weight:700;">EMAIL</label>
    <input id="login-email" type="email" placeholder="nama@email.com" style="width:100%;margin:6px 0 14px;padding:11px 13px;background:#1b1b1f;border:1px solid #2c2c33;border-radius:12px;color:#fff;font-size:14px;box-sizing:border-box;">
    <label style="font-size:11px;color:#8b8b93;font-weight:700;">PIN</label>
    <input id="login-pin" type="password" placeholder="&#8226;&#8226;&#8226;&#8226;" style="width:100%;margin:6px 0 18px;padding:11px 13px;background:#1b1b1f;border:1px solid #2c2c33;border-radius:12px;color:#fff;font-size:14px;box-sizing:border-box;">
    <button onclick="ngtDoLogin()" style="width:100%;padding:12px;border:none;border-radius:12px;background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#fff;font-weight:800;font-size:14px;cursor:pointer;">Masuk</button>
    <div id="login-err" style="display:none;color:#ff7b7b;font-size:12px;text-align:center;margin-top:12px;"></div>
    <div style="color:#55555e;font-size:11px;text-align:center;margin-top:16px;">Mode demo: <b style="color:#8b8b93">demo@newsgen.id</b> / PIN <b style="color:#8b8b93">1234</b></div>
  </div>
</div>

<div class="ngt">
  <div class="ngt-overlay" id="ngtOverlay"></div>
  <!-- SIDEBAR -->
  <aside class="ngt-sidebar" id="ngtSidebar">
    <div class="ngt-brand">NewsGen <span>Studio</span></div>
    <nav class="ngt-nav" id="ngtNav">
      <button data-target="pengaturan"><span class="ico">⚙️</span> Setting</button>
      <button data-target="radar" class="active"><span class="ico">📡</span> News Aggregator</button>
      <button data-target="studio"><span class="ico">🎨</span> Studio Konten</button>
      <button data-target="antrean"><span class="ico">📅</span> Antrean Publish</button>
      <button data-target="komentar"><span class="ico">💬</span> Komentar</button>
      <button data-target="insight"><span class="ico">📊</span> Insight</button>
    </nav>
    <div class="ngt-side-foot">
      <div id="ngtUser" style="font-weight:700;color:#e8e8ea;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"></div>
      <button onclick="ngtDoLogout()" style="margin-top:6px;width:100%;padding:7px;border:1px solid #2c2c33;background:#1b1b1f;color:#c9c9d1;border-radius:9px;font-size:11px;font-weight:700;cursor:pointer;">Keluar</button>
      <br><span class="plan">PROTOTYPE</span>
    </div>
  </aside>

  <!-- MAIN -->
  <div class="ngt-main">
    <header class="ngt-topbar">
      <div style="display:flex;align-items:center;gap:12px;">
        <button class="ngt-burger" id="ngtBurger">☰</button>
        <div>
          <h1 id="ngtPageTitle">News Aggregator</h1>
          <div class="sub">Kelola konten beritamu dari satu tempat</div>
        </div>
      </div>
      <button class="ngt-btn small" onclick="ngtToast('Hubungkan halaman — fitur penuh menyusul')">＋ Hubungkan Halaman</button>
    </header>

    <div class="ngt-content">

      <!-- NEWS AGGREGATOR -->
      <section class="ngt-page active" id="page-radar">
        <div class="ngt-title">News Aggregator</div>
        <div class="ngt-desc">Berita terbaru yang lagi panas. <span class="ngt-badge-contoh">DATA CONTOH</span></div>
        <div class="ngt-filters" id="ngtFilters">
          <button class="active" data-f="semua">Semua</button><button data-f="viral">Viral</button><button data-f="jateng">Jateng</button><button data-f="olahraga">Olahraga</button><button data-f="cuaca">Cuaca</button>
        </div>
        <div class="ngt-newsgrid" id="ngtNewsList">
          <div class="ngt-newscard" data-kategori="viral"><div class="thumb t-viral">🔥</div><div class="body"><div class="meta"><span class="ngt-chip orange">VIRAL</span><span class="ngt-muted">Folk Jateng • 12 mnt lalu</span></div><h4>Harga Cabai Rawit di Pasar Induk Naik 40% dalam Sepekan, Pedagang Keluhkan Sepi Pembeli</h4><p>Para pedagang menyebut pasokan dari petani berkurang akibat cuaca ekstrem pekan lalu…</p><button class="ngt-btn small" onclick="ngtBuatKonten(this)">Buat Konten →</button></div></div>
          <div class="ngt-newscard" data-kategori="jateng"><div class="thumb t-jateng">🏛️</div><div class="body"><div class="meta"><span class="ngt-chip blue">JATENG</span><span class="ngt-muted">Arsip Peristiwa • 35 mnt lalu</span></div><h4>Jembatan Baru Cilacap Resmi Dibuka untuk Umum Hari Ini, Urai Kemacetan Jalur Selatan</h4><p>Peresmian dilakukan langsung oleh bupati dan dihadiri ratusan warga sekitar…</p><button class="ngt-btn small" onclick="ngtBuatKonten(this)">Buat Konten →</button></div></div>
          <div class="ngt-newscard" data-kategori="viral"><div class="thumb t-viral">🔥</div><div class="body"><div class="meta"><span class="ngt-chip orange">VIRAL</span><span class="ngt-muted">Faizal Izall • 1 jam lalu</span></div><h4>Timnas Indonesia Menang 2-0 atas Vietnam di Kualifikasi, Suporter Penuhi Stadion</h4><p>Dua gol kemenangan dicetak di babak kedua lewat skema serangan balik cepat…</p><button class="ngt-btn small" onclick="ngtBuatKonten(this)">Buat Konten →</button></div></div>
          <div class="ngt-newscard" data-kategori="cuaca"><div class="thumb t-cuaca">🌧️</div><div class="body"><div class="meta"><span class="ngt-chip blue">CUACA</span><span class="ngt-muted">Folk Jateng • 2 jam lalu</span></div><h4>Waspada! BMKG Prediksi Hujan Lebat Guyur Jateng 3 Hari ke Depan</h4><p>Masyarakat diimbau waspada potensi banjir dan tanah longsor di daerah rawan…</p><button class="ngt-btn small" onclick="ngtBuatKonten(this)">Buat Konten →</button></div></div>
          <div class="ngt-newscard" data-kategori="kuliner"><div class="thumb t-kuliner">🍜</div><div class="body"><div class="meta"><span class="ngt-chip gray">KULINER</span><span class="ngt-muted">Arsip Peristiwa • 3 jam lalu</span></div><h4>Festival Kuliner Malam Minggu Meriahkan Alun-alun, 80 UMKM Ikut Serta</h4><p>Pengunjung memadati puluhan stan makanan khas daerah sejak sore hari…</p><button class="ngt-btn small" onclick="ngtBuatKonten(this)">Buat Konten →</button></div></div>
          <div class="ngt-newscard" data-kategori="warga"><div class="thumb t-warga">👥</div><div class="body"><div class="meta"><span class="ngt-chip gray">WARGA</span><span class="ngt-muted">Berita Cilacap • 5 jam lalu</span></div><h4>Ribuan Warga Antusias Ikuti Jalan Sehat Berhadiah Umroh di Cilacap</h4><p>Acara jalan sehat dimulai pukul 06.00 dengan rute mengelilingi pusat kota…</p><button class="ngt-btn small" onclick="ngtBuatKonten(this)">Buat Konten →</button></div></div>
        </div>
        <p class="ngt-muted" id="ngtNewsEmpty" style="display:none;text-align:center;padding:24px">Belum ada berita di kategori ini.</p>
      </section>

      <!-- STUDIO -->
      <section class="ngt-page" id="page-studio">
        <div class="ngt-title">Studio Konten</div>
        <div class="ngt-desc">Buat konten pakai AI atau posting manual. <span class="ngt-badge-contoh">DATA CONTOH</span></div>
        <div class="ngt-tabs">
          <button class="active" data-tab="ai" onclick="ngtTabStudio('ai')">✨ AI News</button>
          <button data-tab="manual" onclick="ngtTabStudio('manual')">📝 Post Manual</button>
        </div>

        <!-- TAB: AI NEWS -->
        <div class="ngt-subpage active" id="tab-ai">
        <div class="ngt-steps" id="aiSteps">
          <div class="ngt-step now" data-s="1"><div class="dot">1</div><div class="lbl">Sumber</div></div>
          <div class="ngt-step" data-s="2"><div class="dot">2</div><div class="lbl">Kurasi</div></div>
          <div class="ngt-step" data-s="3"><div class="dot">3</div><div class="lbl">Visual &amp; Kartu</div></div>
        </div>

        <!-- LANGKAH 1: SUMBER -->
        <div id="aiStep1" class="ngt-card" style="max-width:640px;margin:0 auto;">
          <h3>&#128196; Sumber Berita</h3>
          <div class="ngt-field"><label class="ngt-label">Tempel teks berita</label>
            <textarea class="ngt-area" id="aiSumber" placeholder="Tempel teks berita di sini, atau klik &quot;Buat Konten&quot; dari News Aggregator&hellip;"></textarea></div>
          <div class="ngt-field"><label class="ngt-label">atau ambil otomatis dari URL berita</label>
            <div style="display:flex;gap:8px;">
              <input class="ngt-input" id="aiUrl" placeholder="https://contoh.com/berita/..." style="flex:1;">
              <button class="ngt-btn ghost" onclick="aiAmbilUrl()">Ambil</button>
            </div></div>
          <div class="ngt-field"><label class="ngt-label">Tayangkan ke halaman</label>
            <select class="ngt-select" id="aiHalaman"></select></div>
          <div class="ngt-wiznav"><button class="ngt-btn" onclick="aiKeStep(2)" style="flex:1;">Lanjut ke Kurasi &rarr;</button></div>
        </div>

        <!-- LANGKAH 2: KURASI -->
        <div id="aiStep2" class="ngt-card" style="max-width:640px;margin:0 auto;display:none;">
          <h3>&#10024; Kurasi AI</h3>
          <p class="ngt-muted" style="margin-top:-8px;">AI menulis ulang berita jadi konten siap posting: judul, caption, hashtag &amp; komentar pancingan.</p>
          <button class="ngt-btn" id="aiGenBtn" onclick="aiGenerate()">&#10024; Generate dengan AI</button>
          <div id="aiHasil" style="display:none;margin-top:18px;">
            <div class="ngt-field"><label class="ngt-label">Pilih judul (klik salah satu)</label><div id="aiJudulOpts"></div></div>
            <div class="ngt-field"><label class="ngt-label">Ringkasan</label><div class="ngt-out" id="aiRingkasan"></div></div>
            <div class="ngt-field"><label class="ngt-label">Caption (bisa diedit)</label>
              <textarea class="ngt-area" id="aiCaption" style="min-height:110px;"></textarea></div>
            <div class="ngt-field"><label class="ngt-label">Komentar pancingan (bisa diedit, satu per baris)</label>
              <textarea class="ngt-area" id="aiPancingan" style="min-height:96px;"></textarea></div>
          </div>
          <div class="ngt-wiznav">
            <button class="ngt-btn ghost" onclick="aiKeStep(1)">&larr; Kembali</button>
            <button class="ngt-btn" onclick="aiKeStep(3)" style="flex:1;">Lanjut ke Visual &rarr;</button>
          </div>
        </div>

        <!-- LANGKAH 3: VISUAL -->
        <div id="aiStep3" style="display:none;">
          <div class="ngt-studio">
            <div class="ngt-card">
              <h3>&#127912; Kartu Visual</h3>
              <p class="ngt-muted" style="margin-top:-8px;">Judul terpilih otomatis tampil di kartu. Ukuran 1080&times;1350.</p>
              <div class="ngt-wiznav" style="margin-top:0;margin-bottom:14px;">
                <button class="ngt-btn ghost" onclick="aiDownload()">&#11015; Download PNG</button>
              </div>
              <div class="ngt-field"><label class="ngt-label">Aksi</label>
                <div style="display:flex;gap:10px;flex-wrap:wrap;">
                  <button class="ngt-btn green" onclick="aiTerbit()">&#128640; Terbitkan Sekarang</button>
                  <button class="ngt-btn ghost" onclick="aiDraft()">&#128190; Simpan Draft</button>
                  <button class="ngt-btn ghost" onclick="aiAntre()">&#10133; Masuk Antrean</button>
                </div></div>
              <div class="ngt-wiznav"><button class="ngt-btn ghost" onclick="aiKeStep(2)">&larr; Kembali ke Kurasi</button></div>
            </div>
            <div class="ngt-card">
              <h3>&#128444;&#65039; Preview Kartu (1080&times;1350)</h3>
              <div class="ngt-preview-card" id="aiPreview"><div class="ph">Preview muncul<br>setelah Generate</div></div>
            </div>
          </div>
        </div>
        </div>

        <!-- TAB: POST MANUAL -->
        <div class="ngt-subpage" id="tab-manual">
          <div class="ngt-card">
            <h3>📝 Post Manual</h3>
            <div class="ngt-field"><label class="ngt-label">Jenis Postingan</label>
              <div class="ngt-jenis" id="ngtJenisPost">
                <button class="active" data-j="teks">📝 Teks</button><button data-j="gambar">🖼️ Gambar</button><button data-j="video">🎬 Video</button><button data-j="story">📱 Story</button>
              </div>
            </div>
            <div class="ngt-field"><label class="ngt-label">Tayangkan ke halaman</label><select class="ngt-select" id="ngtManualHalaman"></select></div>
            <div class="ngt-field"><label class="ngt-label">Teks / Caption</label><textarea class="ngt-area" id="ngtManualTeks" placeholder="Tulis caption di sini…"></textarea></div>
            <div class="ngt-field" id="ngtManualMediaWrap" style="display:none"><label class="ngt-label">Media</label>
              <input type="file" id="ngtManualFile" accept="image/*,video/*" style="display:none">
              <div class="ngt-drop" id="ngtManualDrop" onclick="document.getElementById('ngtManualFile').click()">
                <div id="ngtManualDropLabel">📁 Klik untuk pilih gambar / video</div>
                <img id="ngtManualImgPrev" style="display:none;max-width:100%;border-radius:10px" alt="">
                <video id="ngtManualVidPrev" style="display:none;max-width:100%;border-radius:10px" controls></video>
              </div>
              <p class="ngt-muted" id="ngtManualFileName" style="margin-top:8px"></p>
            </div>
            <div style="display:flex;gap:10px;flex-wrap:wrap">
              <button class="ngt-btn green" onclick="ngtManualTerbit()">🚀 Terbitkan Sekarang</button>
              <button class="ngt-btn ghost" onclick="ngtManualAntre()">＋ Masuk Antrean</button>
            </div>
          </div>
        </div>
      </section>

      <!-- ANTREAN -->
      <section class="ngt-page" id="page-antrean">
        <div class="ngt-title">Antrean Publish</div>
        <div class="ngt-desc">Postingan terjadwal. Sekali setting, jalan sendiri. <span class="ngt-badge-contoh">DATA CONTOH</span></div>
        <div class="ngt-card" style="margin-bottom:14px;">
          <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;">
            <div style="flex:2;min-width:180px;"><label class="ngt-label">Judul</label><input class="ngt-input" id="anJudul" placeholder="Judul postingan..."></div>
            <div style="flex:1;min-width:130px;"><label class="ngt-label">Halaman</label><select class="ngt-select" id="anHalaman"></select></div>
            <div style="flex:1;min-width:130px;"><label class="ngt-label">Jadwal</label><input class="ngt-input" id="anJadwal" placeholder="cth: Hari ini 18:00"></div>
            <button class="ngt-btn small" onclick="anTambah()">&#10133; Tambah</button>
          </div>
        </div>
        <div class="ngt-list" id="ngtQueueList"></div>
      </section>

      <!-- KOMENTAR -->
      <section class="ngt-page" id="page-komentar">
        <div class="ngt-title">Komentar</div>
        <div class="ngt-desc">Komentar masuk dari semua halaman. AI menyiapkan balasan, kamu yang kirim. <span class="ngt-badge-contoh">DATA CONTOH</span></div>
        <div class="ngt-card" style="margin-bottom:14px;">
          <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
            <input class="ngt-input" id="kmSearch" placeholder="Cari komentar..." style="flex:1;min-width:160px;" oninput="kmCari(this.value)">
            <button class="ngt-btn small ghost" id="kmPollBtn" onclick="kmPolling()">&#128260; Auto-Polling: OFF</button>
            <button class="ngt-btn small ghost" onclick="kmGenSemua()">&#10024; Generate Semua Balasan</button>
            <button class="ngt-btn small green" onclick="kmKirimSemua()">&#128640; Kirim Semua</button>
          </div>
          <div style="display:flex;align-items:center;gap:10px;margin-top:12px;">
            <label class="ngt-switch"><input type="checkbox" checked id="kmAutoReply"><span class="sl"></span></label>
            <div style="font-size:12px;color:#a1a1aa;">Auto-reply: balasan AI otomatis disiapkan untuk komentar baru</div>
          </div>
        </div>
        <div class="ngt-filters" id="kmTabs" style="margin-bottom:14px;"></div>
        <div class="ngt-list" id="kmList"></div>
      </section>

      <!-- INSIGHT -->
      <section class="ngt-page" id="page-insight">
        <div class="ngt-title">Insight</div>
        <div class="ngt-desc">Performa 7 hari terakhir. <span class="ngt-badge-contoh">DATA CONTOH</span></div>
        <div class="ngt-stats">
          <div class="ngt-card ngt-stat"><div class="ico">👁️</div><div class="num">128rb</div><div class="lbl">Jangkauan</div></div>
          <div class="ngt-card ngt-stat"><div class="ico">❤️</div><div class="num">12,4rb</div><div class="lbl">Interaksi</div></div>
          <div class="ngt-card ngt-stat"><div class="ico">💬</div><div class="num">3,2rb</div><div class="lbl">Komentar</div></div>
          <div class="ngt-card ngt-stat"><div class="ico">🚀</div><div class="num">96</div><div class="lbl">Postingan terbit</div></div>
        </div>
        <div class="ngt-card">
          <h3>🏆 Postingan Teratas</h3>
          <div class="ngt-list">
            <div><div style="display:flex;justify-content:space-between;font-size:14px"><b style="color:#fff">Timnas Indonesia Menang 2-0 atas Vietnam</b><span class="ngt-muted">48rb reach</span></div><div class="ngt-bar"><i style="width:100%"></i></div></div>
            <div><div style="display:flex;justify-content:space-between;font-size:14px"><b style="color:#fff">Harga Cabai Rawit Naik 40%</b><span class="ngt-muted">32rb reach</span></div><div class="ngt-bar"><i style="width:67%"></i></div></div>
            <div><div style="display:flex;justify-content:space-between;font-size:14px"><b style="color:#fff">Waspada Hujan Lebat 3 Hari</b><span class="ngt-muted">25rb reach</span></div><div class="ngt-bar"><i style="width:52%"></i></div></div>
            <div><div style="display:flex;justify-content:space-between;font-size:14px"><b style="color:#fff">Jembatan Baru Cilacap Dibuka</b><span class="ngt-muted">18rb reach</span></div><div class="ngt-bar"><i style="width:38%"></i></div></div>
          </div>
        </div>
      </section>

      <!-- PENGATURAN -->
      <section class="ngt-page" id="page-pengaturan">
        <div class="ngt-title">Setting</div>
        <div class="ngt-desc">Kelola halaman Facebook & API key AI.</div>

        <!-- PENGATURAN HALAMAN -->
        <div class="ngt-card" style="margin-bottom:14px">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:4px;flex-wrap:wrap">
            <h3 style="margin:0">📄 Pengaturan Halaman</h3>
            <button class="ngt-btn small" onclick="ngtOpenHalamanModal()">＋ Tambah Halaman</button>
          </div>
          <p class="ngt-muted" style="margin:0 0 12px">Daftar halaman Facebook yang terhubung ke NewsGen Studio.<br><span id="ngtHalamanInfo"></span></p>
          <div class="ngt-list" id="ngtHalamanList"></div>
        </div>

        <!-- PENGATURAN AI -->
        <div class="ngt-card" style="margin-bottom:14px">
          <h3>🤖 Pengaturan API Key AI</h3>
          <div class="ngt-field"><label class="ngt-label">Model AI</label><select class="ngt-select" id="ngtAiModel">
            <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
            <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
            <option value="gpt-4o-mini">GPT-4o Mini</option>
            <option value="gpt-4o">GPT-4o</option>
          </select></div>
          <div class="ngt-field"><label class="ngt-label">API Key</label>
            <div class="ngt-pw-wrap"><input class="ngt-input" type="password" id="ngtAiKey" placeholder="Masukkan API key…"><button class="ngt-btn ghost" type="button" onclick="ngtTogglePw('ngtAiKey', this)">👁️</button></div>
          </div>
          <div style="display:flex;gap:10px;flex-wrap:wrap">
            <button class="ngt-btn" onclick="ngtSimpanAi()">💾 Simpan</button>
            <button class="ngt-btn ghost" onclick="ngtTesAi()">🔌 Tes Koneksi</button>
          </div>
          <p class="ngt-muted" id="ngtAiStatus" style="margin:10px 0 0"></p>
        </div>

        <!-- UMUM -->
        <div class="ngt-card">
          <h3>⚙️ Umum</h3>
          <div class="ngt-field"><label class="ngt-label">Zona waktu posting</label><select class="ngt-select"><option>Asia/Jakarta (WIB)</option><option>Asia/Makassar (WITA)</option><option>Asia/Jayapura (WIT)</option></select></div>
          <div class="ngt-row" style="border:none;background:none;padding:4px 0"><div style="flex:1"><b style="color:#fff;font-size:14px">Mode contoh</b><div class="ngt-muted">Semua data di prototype ini adalah dummy</div></div><label class="ngt-switch"><input type="checkbox" checked disabled><span class="sl"></span></label></div>
        </div>
      </section>

    </div>
  </div>
</div>
<div class="ngt-toast" id="ngtToast"></div>
<div class="ngt-modal-bg" id="ngtHalamanModalBg">
  <div class="ngt-modal">
    <h3>＋ Tambah Halaman</h3>
    <div class="ngt-field"><label class="ngt-label">Nama Halaman</label><input class="ngt-input" id="ngtHNama" placeholder="cth: Berita Cilacap"></div>
    <div class="ngt-field"><label class="ngt-label">Page ID</label><input class="ngt-input" id="ngtHPageId" placeholder="cth: 123456789012345"></div>
    <div class="ngt-field"><label class="ngt-label">Akses Token</label>
      <div class="ngt-pw-wrap"><input class="ngt-input" type="password" id="ngtHToken" placeholder="EAAB…"><button class="ngt-btn ghost" type="button" onclick="ngtTogglePw('ngtHToken', this)">👁️</button></div>
    </div>
    <div class="ngt-field"><label class="ngt-label">Kode Webhook</label><input class="ngt-input" id="ngtHWebhook" placeholder="cth: newsgen123"></div>
    <div style="display:flex;gap:10px;justify-content:flex-end">
      <button class="ngt-btn ghost" onclick="ngtCloseHalamanModal()">Batal</button>
      <button class="ngt-btn" onclick="ngtSimpanHalaman()">Simpan</button>
    </div>
  </div>
</div>
<div class="ngt-modal-bg" id="ngtUpsellModalBg">
  <div class="ngt-modal" style="text-align:center">
    <div style="font-size:44px;margin-bottom:8px">&#128176;</div>
    <h3>Batas Halaman Tercapai</h3>
    <p class="ngt-muted" style="margin:10px 0 18px">Paketmu mencakup <b style="color:#fff">3 halaman</b>.<br>Tambah <b style="color:#fff">1 halaman</b> lagi cuma <b style="color:#4ade80">Rp80.000</b>.</p>
    <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      <button class="ngt-btn ghost" onclick="ngtTutupUpsell()">Nanti Saja</button>
      <a class="ngt-btn" style="background:#22c55e;text-decoration:none" id="ngtUpsellWa" href="#" target="_blank" rel="noopener">&#128222; Hubungi Admin</a>
    </div>
  </div>
</div>
`;

(function(){
  /* ============ SESI PELANGGAN (multi-tenant) ============
     Setiap pelanggan login (email + PIN). Session di sessionStorage.
     Semua data difilter per pelanggan_id (pid). */
  function ngtSession(){
    try { return JSON.parse(sessionStorage.getItem('ngt_session') || 'null'); }
    catch(e){ return null; }
  }
  function ngtPid(){ var s = ngtSession(); return s ? s.id : null; }
  function ngtSetSession(p){
    if(p) sessionStorage.setItem('ngt_session', JSON.stringify({ id:p.id, nama:p.nama, email:p.email, paket:p.paket, model:p.model, apiKey:p.apiKey, webapp_url:p.webapp_url, max_halaman:((p.max_halaman===undefined||p.max_halaman===null)?3:p.max_halaman) }));
    else sessionStorage.removeItem('ngt_session');
  }
  window.ngtDoLogin = function(){
    var email = document.getElementById('login-email').value.trim().toLowerCase();
    var pin = document.getElementById('login-pin').value.trim();
    var err = document.getElementById('login-err');
    err.style.display = 'none';
    if(!email || !pin){ err.textContent = 'Isi email dan PIN dulu.'; err.style.display = 'block'; return; }
    function ok(p){ ngtSetSession(p); location.reload(); }
    function gagal(){ err.textContent = 'Email / PIN salah.'; err.style.display = 'block'; }
    if(CONFIG.dummy){
      var p = DUMMY_PELANGGAN.find(function(x){ return x.email === email && x.pin === pin; });
      if(p) ok(p); else gagal();
    } else {
      Supa.req('pelanggan','GET',null,'?select=*&email=eq.'+encodeURIComponent(email)+'&pin=eq.'+encodeURIComponent(pin))
        .then(function(r){ if(r && r[0]) ok(r[0]); else gagal(); })
        .catch(gagal);
    }
  };
  window.ngtDoLogout = function(){
    if(!confirm('Keluar dari dashboard?')) return;
    ngtSetSession(null);
    location.reload();
  };
  /* ============================================================
     KONFIGURASI DATA & BACKEND (arsitektur final 2026-10-04)
     - dummy: true  -> pakai DATA DUMMY (DUMMY_DB + localStorage).
     - dummy: false -> pakai BACKEND ASLI.

     Supabase (2 tabel ringan, tidak bisa bengkak):
       pelanggan : id, nama, email, pin, paket, model, apiKey, webapp_url
       halaman   : id, pelanggan_id, nama, pageId, token, webhook
     Spreadsheet per pelanggan (via Web App apps-script.gs, 1 pintu):
       Komentar (utama), Arsip, Config. Tiap pelanggan bisa diarahkan
       ke Web App (akun Google) berbeda lewat kolom webapp_url di tabel
       pelanggan — buat jaga kuota harian.
     localStorage browser: draft (selalu lokal, tidak ke backend).
     Facebook: antrean/jadwal publish (scheduled posts) — aplikasi
       menjadwalkan via Graph API, lalu tinggal menampilkan.

     CARA AKTIFKAN: isi BACKEND_CONFIG di bawah, lalu set
     CONFIG.dummy = false.
  ============================================================ */
  const CONFIG = { dummy: false };

  const BACKEND_CONFIG = {
    supabase:    { url: 'https://ppenobzyzbkmdaiojygn.supabase.co', anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwZW5vYnp5emJrbWRhaW9qeWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExMTEwNjIsImV4cCI6MjEwNjY4NzA2Mn0.4HrDB0w9i4m3ScN9-Yz7p-gqsePuS9djgz_0Oi5GAY0' },
    spreadsheet: { webAppUrl: 'https://script.google.com/macros/s/AKfycbznky3kLVeMqD-gOQ2WhJZd_6ST32DHzMQq73QuB7coTljyMpXHhcT5cSAFpn5uqyLSPg/exec' }
  };

  /* ============ DATA DUMMY (dipakai saat dummy:true) ============
     Setiap pelanggan punya akun sendiri (email + PIN) dan datanya
     terisolasi per pelanggan_id (pid). */
  const DUMMY_PELANGGAN = [
    { id:'cust1', nama:'Demo Pelanggan', email:'demo@newsgen.id', pin:'1234', paket:'PROMO' },
    { id:'cust2', nama:'Budi Santoso',   email:'budi@contoh.id',  pin:'5678', paket:'NORMAL' }
  ];
  const DUMMY_DB = {
    halaman: [
      { id:'h1', pid:'cust1', nama:'Faizal Izall',    pageId:'101234567890111', token:'EAABdummytokenFaizalIzall',    webhook:'newsgen_fi', aktif:true },
      { id:'h2', pid:'cust1', nama:'Folk Jateng',     pageId:'101234567890222', token:'EAABdummytokenFolkJateng',     webhook:'newsgen_fj', aktif:true },
      { id:'h3', pid:'cust1', nama:'Arsip Peristiwa', pageId:'101234567890333', token:'EAABdummytokenArsipPeristiwa', webhook:'newsgen_ap', aktif:true },
      { id:'h4', pid:'cust1', nama:'Berita Cilacap',  pageId:'101234567890444', token:'EAABdummytokenBeritaCilacap',  webhook:'newsgen_bc', aktif:true }
    ],
    ai: { model:'gemini-2.5-flash', apiKey:'' },
    _catatan: 'ai disimpan per-pelanggan via key ai_<pid>',
    antrean: [
      { id:'a1', pid:'cust1', judul:'Harga Cabai Rawit di Pasar Induk Naik 40%', halaman:'Folk Jateng', jadwal:'Hari ini 18:00', tipe:'AI News' },
      { id:'a2', pid:'cust1', judul:'Jembatan Baru Cilacap Resmi Dibuka', halaman:'Arsip Peristiwa', jadwal:'Hari ini 20:30', tipe:'AI News' },
      { id:'a3', pid:'cust1', judul:'Timnas Indonesia Menang 2-0 atas Vietnam', halaman:'Faizal Izall', jadwal:'Besok 07:00', tipe:'AI News' }
    ],
    draft: [],
    komentar: [
      { id:'k1', pid:'cust1', nama:'Budi Santoso', halaman:'Folk Jateng', waktu:'5 mnt lalu', pesan:'Min, ini beneran naik 40%? Di pasar dekat rumahku masih murah tuh', balasan:'Betul kak, data dari Pasar Induk pagi ini. Harga di pasar kecil biasanya nyusul 1-2 hari. Makasih infonya! 🙏', status:'terkirim' },
      { id:'k2', pid:'cust1', nama:'Siti Aminah', halaman:'Arsip Peristiwa', waktu:'18 mnt lalu', pesan:'Alhamdulillah akhirnya dibuka, tiap hari macet lewat situ 😅', balasan:'Iya kak, semoga arus lalu lintas jadi lebih lancar ya. Hati-hati di jalan! 🙏', status:'terkirim' },
      { id:'k3', pid:'cust1', nama:'Rina Wulandari', halaman:'Faizal Izall', waktu:'32 mnt lalu', pesan:'GOLLLL!! Siapa yang cetak gol kedua min?', balasan:'Gol kedua dicetak lewat serangan balik cepat di menit 78 kak! Nontonnya deg-degan ya 😄', status:'terkirim' },
      { id:'k4', pid:'cust1', nama:'Dedi Kurniawan', halaman:'Berita Cilacap', waktu:'1 jam lalu', pesan:'Daftar jalan sehatnya masih bisa? Syaratnya apa aja?', balasan:'', status:'menunggu' },
      { id:'k5', pid:'cust1', nama:'Agus Wijaya', halaman:'Folk Jateng', waktu:'1 jam lalu', pesan:'BMKG kok sering meleset sih min, kemarin katanya hujan ternyata panas 😂', balasan:'', status:'menunggu' },
      { id:'k6', pid:'cust1', nama:'Maya Putri', halaman:'Faizal Izall', waktu:'2 jam lalu', pesan:'Keren timnas! Kapan main lagi min?', balasan:'', status:'menunggu' },
      { id:'k7', pid:'cust1', nama:'Joko Prasetyo', halaman:'Arsip Peristiwa', waktu:'3 jam lalu', pesan:'Festivalnya sampai jam berapa? Parkirnya di mana?', balasan:'', status:'menunggu' },
      { id:'k8', pid:'cust1', nama:'Dewi Lestari', halaman:'Berita Cilacap', waktu:'4 jam lalu', pesan:'Umroh gratis?? Serius ini? Cara ikutnya gimana', balasan:'', status:'menunggu' }
    ]
  };

  /* ============ KLIEN SUPABASE (REST, tanpa SDK) ============
     Tabel yang dipakai: pelanggan, halaman */
  const Supa = {
    ok(){ return !!(BACKEND_CONFIG.supabase.url && BACKEND_CONFIG.supabase.anonKey); },
    async req(table, method, body, query){
      const { url, anonKey } = BACKEND_CONFIG.supabase;
      const res = await fetch(url.replace(/\/$/,'') + '/rest/v1/' + table + (query||''), {
        method: method,
        headers: { apikey: anonKey, Authorization: 'Bearer ' + anonKey, 'Content-Type': 'application/json', Prefer: 'return=representation' },
        body: body ? JSON.stringify(body) : undefined
      });
      if(!res.ok) throw new Error('Supabase ' + res.status);
      const t = await res.text();
      return t ? JSON.parse(t) : [];
    },
    list(table){ return this.req(table, 'GET', null, '?select=*'); },
    insert(table, row){ return this.req(table, 'POST', row); },
    update(table, id, row){ return this.req(table, 'PATCH', row, '?id=eq.' + encodeURIComponent(id)); },
    remove(table, id){ return this.req(table, 'DELETE', null, '?id=eq.' + encodeURIComponent(id)); }
  };

  /* ============ KLIEN SPREADSHEET (via Apps Script Web App) ============
     1 Web App melayani banyak pelanggan; routing per pid dikerjakan di
     sisi Web App (sheet MASTER "Pelanggan": page_id -> spreadsheet).
     URL Web App diambil dari kolom webapp_url baris pelanggan (saat login),
     fallback ke BACKEND_CONFIG.spreadsheet.webAppUrl. */
  const Sheet = {
    base(){
      var s = ngtSession();
      var u = (s && s.webapp_url) || BACKEND_CONFIG.spreadsheet.webAppUrl || '';
      return u.replace(/\/$/,'');
    },
    ok(){ return !!this.base(); },
    async callg(params){
      var q = Object.keys(params).map(function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]); }).join('&');
      const res = await fetch(this.base() + '?' + q);
      if(!res.ok) throw new Error('WebApp ' + res.status);
      return res.json();
    },
    async callp(action, data){
      const res = await fetch(this.base(), {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(Object.assign({ action: action, pid: ngtPid() }, data || {}))
      });
      if(!res.ok) throw new Error('WebApp ' + res.status);
      return res.json();
    },
    komentarList(){ return this.callg({ action:'komentar', pid:ngtPid() }).then(function(r){ return (r && r.rows) || []; }); },
    komentarUpdate(id, patch){ return this.callp('komentar_update', { id:id, patch:patch }); },
    configGet(){ return this.callg({ action:'config', pid:ngtPid() }).then(function(r){ return (r && r.config) || {}; }); },
    configSet(kunci, nilai){ return this.callp('config_set', { kunci:kunci, nilai:nilai }); },
    arsip(row){ return this.callp('arsip', { row:row }).catch(function(){ return null; }); },
    list(sheet){ return this.callp('list', { sheet:sheet }).then(function(r){ return (r && r.rows) || []; }); },
    append(sheet, row){ return this.callp('append', { sheet:sheet, row:row }); }
  };

  /* ============ KLIEN FACEBOOK GRAPH API ============
     Dipakai untuk antrean: baca scheduled_posts, jadwalkan, hapus jadwal.
     Token diambil dari tabel halaman (menu Setting). */
  const FB = {
    ver: 'v21.0',
    async api(pageId, token, edge, method, params){
      var q = Object.keys(params || {}).map(function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]); }).join('&');
      var url = 'https://graph.facebook.com/' + this.ver + '/' + pageId + '/' + edge + '?access_token=' + encodeURIComponent(token) + (q ? '&' + q : '');
      const res = await fetch(url, { method: method || 'GET' });
      const j = await res.json();
      if(!res.ok || j.error) throw new Error((j.error && j.error.message) || ('FB ' + res.status));
      return j;
    },
    async scheduledPosts(halamanList){
      var out = [];
      for(var i = 0; i < halamanList.length; i++){
        var h = halamanList[i];
        if(!h.pageId || !h.token) continue;
        try {
          var j = await this.api(h.pageId, h.token, 'scheduled_posts', 'GET', { fields: 'id,message,scheduled_publish_time', limit: 50 });
          (j.data || []).forEach(function(p){
            var t = p.scheduled_publish_time ? new Date(p.scheduled_publish_time * 1000) : null;
            out.push({
              id: p.id, _pageId: h.pageId, _token: h.token,
              judul: (p.message || '(tanpa teks)').slice(0, 80),
              halaman: h.nama,
              jadwal: t ? t.toLocaleString('id-ID') : '-',
              tipe: 'Facebook', _ts: t ? t.getTime() : 0
            });
          });
        } catch(e){ /* halaman tanpa token valid dilewati */ }
      }
      out.sort(function(a,b){ return a._ts - b._ts; });
      FB._cache = out;
      return out;
    },
    async schedulePost(halaman, message, datetimeStr){
      // datetimeStr format: "2026-10-05 18:00" (WIB)
      var ts = Math.floor(new Date(datetimeStr.replace(' ', 'T') + ':00+07:00').getTime() / 1000);
      if(!ts || isNaN(ts)) throw new Error('Format jadwal salah. Contoh: 2026-10-05 18:00');
      if(ts < Math.floor(Date.now()/1000) + 600) throw new Error('Jadwal minimal 10 menit dari sekarang');
      return this.api(halaman.pageId, halaman.token, 'feed', 'POST', { message: message, published: 'false', scheduled_publish_time: String(ts) });
    },
    async hapusJadwal(row){
      // DELETE langsung ke node post: /{post-id}
      var url = 'https://graph.facebook.com/' + this.ver + '/' + encodeURIComponent(row.id) + '?access_token=' + encodeURIComponent(row._token);
      const res = await fetch(url, { method: 'DELETE' });
      const j = await res.json();
      if(!res.ok || j.error) throw new Error((j.error && j.error.message) || ('FB ' + res.status));
      return true;
    }
  };

  function backendBelum(nama){
    ngtToast('Backend <b>' + nama + '</b> belum dikonfigurasi — isi BACKEND_CONFIG dulu');
    return Promise.resolve(null);
  }

  /* ============ SESI PELANGGAN (multi-tenant) ============
     Setiap pelanggan login (email + PIN) -> session di sessionStorage.
     Semua data difilter per pelanggan_id, baik mode dummy maupun backend. */
  function ngtSession(){
    try { return JSON.parse(sessionStorage.getItem('ngt_session') || 'null'); }
    catch(e){ return null; }
  }
  function ngtPid(){ var s = ngtSession(); return s ? s.id : null; }
  function ngtSetSession(p){
    if(p) sessionStorage.setItem('ngt_session', JSON.stringify({ id:p.id, nama:p.nama, email:p.email, paket:p.paket, model:p.model, apiKey:p.apiKey, webapp_url:p.webapp_url, max_halaman:((p.max_halaman===undefined||p.max_halaman===null)?3:p.max_halaman) }));
    else sessionStorage.removeItem('ngt_session');
  }

  /* ============ DATA LAYER HYBRID (satu pintu) ============
     dummy:true  -> DUMMY_DB + localStorage (persist di browser)
     dummy:false -> backend sesuai tabel routing di bawah */
  function dummyLoad(key, fallback){
    try { var v = localStorage.getItem('ngt_dummy_' + key); return v ? JSON.parse(v) : fallback; }
    catch(e){ return fallback; }
  }
  function dummySave(key, val){
    try { localStorage.setItem('ngt_dummy_' + key, JSON.stringify(val)); } catch(e){}
  }
  function dummyCRUD(key){
    return {
      list: function(){
        var all = dummyLoad(key, DUMMY_DB[key] || []);
        var pid = ngtPid();
        return Promise.resolve(pid ? all.filter(function(x){ return !x.pid || x.pid === pid; }) : all);
      },
      tambah: function(row){
        var list = dummyLoad(key, DUMMY_DB[key] || []);
        row.id = row.id || ('d' + Date.now());
        row.pid = ngtPid() || row.pid || null;
        list.push(row); dummySave(key, list);
        return Promise.resolve(row);
      },
      hapus: function(id){
        var list = dummyLoad(key, DUMMY_DB[key] || []).filter(function(x){ return x.id !== id; });
        dummySave(key, list);
        return Promise.resolve(true);
      },
      update: function(id, patch){
        var list = dummyLoad(key, DUMMY_DB[key] || []);
        var x = list.find(function(y){ return y.id === id; });
        if(x) Object.assign(x, patch);
        dummySave(key, list);
        return Promise.resolve(x);
      }
    };
  }

  /* Routing hybrid per entitas:
     - halaman, ai, antrean, draft : Supabase (cepat) -> fallback Spreadsheet
     - komentar                     : Firebase (realtime) -> fallback Spreadsheet
     - arsip (log publish)         : Spreadsheet langsung (murah, lambat OK) */
  const DB = {
    halaman: {
      list: function(){
        if(CONFIG.dummy) return dummyCRUD('halaman').list();
        if(Supa.ok()) return Supa.req('halaman','GET',null,'?select=*&pelanggan_id=eq.'+ngtPid()).catch(function(){ return Sheet.ok() ? Sheet.list('Halaman') : backendBelum('supabase'); });
        return backendBelum('supabase');
      },
      tambah: function(h){
        if(CONFIG.dummy) return dummyCRUD('halaman').tambah(h);
        if(Supa.ok()) return Supa.insert('halaman', Object.assign({pelanggan_id: ngtPid()}, h)).catch(function(){ return Sheet.ok() ? Sheet.append('Halaman', h) : backendBelum('supabase'); });
        return backendBelum('supabase');
      },
      hapus: function(id){
        if(CONFIG.dummy) return dummyCRUD('halaman').hapus(id);
        if(Supa.ok()) return Supa.remove('halaman', id).catch(function(){ return backendBelum('supabase'); });
        return backendBelum('supabase');
      }
    },
    ai: {
      get: function(){
        if(CONFIG.dummy) return Promise.resolve(dummyLoad('ai_' + ngtPid(), DUMMY_DB.ai));
        var s = ngtSession();
        if(s && (s.model || s.apiKey)) return Promise.resolve({ model:s.model || '', apiKey:s.apiKey || '' });
        if(Supa.ok()) return Supa.req('pelanggan','GET',null,'?select=model,apiKey&id=eq.'+ngtPid()).then(function(r){ return (r && r[0]) || null; }).catch(function(){ return backendBelum('supabase'); });
        return backendBelum('supabase');
      },
      simpan: function(d){
        if(CONFIG.dummy){ dummySave('ai_' + ngtPid(), d); return Promise.resolve(d); }
        if(Supa.ok()) return Supa.update('pelanggan', ngtPid(), { model:d.model, apiKey:d.apiKey }).then(function(){
          var s = ngtSession();
          if(s){ s.model = d.model; s.apiKey = d.apiKey; sessionStorage.setItem('ngt_session', JSON.stringify(s)); }
          return d;
        }).catch(function(){ return backendBelum('supabase'); });
        return backendBelum('supabase');
      }
    },
    antrean: {
      list: function(){
        if(CONFIG.dummy) return dummyCRUD('antrean').list();
        // Produksi: baca scheduled posts langsung dari Facebook
        return DB.halaman.list().then(function(hl){
          var valid = (hl || []).filter(function(h){ return h.pageId && h.token; });
          if(!valid.length){ ngtToast('Hubungkan <b>halaman Facebook</b> di menu Setting dulu'); return []; }
          return FB.scheduledPosts(valid);
        }).catch(function(){ return []; });
      },
      tambah: function(a){
        if(CONFIG.dummy) return dummyCRUD('antrean').tambah(a);
        // Produksi: jadwalkan via Facebook API -> masuk scheduled posts
        return DB.halaman.list().then(function(hl){
          var h = (hl || []).find(function(x){ return x.nama === a.halaman; }) || (hl || [])[0];
          if(!h || !h.token){ ngtToast('Pilih halaman yang <b>sudah terhubung</b> di Setting'); return null; }
          var dt = prompt('Jadwal publish ke ' + h.nama + ' (format: 2026-10-05 18:00 WIB)', '');
          if(!dt) return null;
          return FB.schedulePost(h, (a.judul || '') + (a.caption ? '\n\n' + a.caption : ''), dt.trim())
            .then(function(){ ngtToast('Terjadwal di <b>' + esc(h.nama) + '</b>'); return true; })
            .catch(function(e){ ngtToast('Gagal menjadwalkan: ' + esc(e.message)); return null; });
        });
      },
      hapus: function(id){
        if(CONFIG.dummy) return dummyCRUD('antrean').hapus(id);
        var row = (FB._cache || []).find(function(x){ return x.id === id; });
        if(!row || !row._token){ ngtToast('Data jadwal tidak ditemukan'); return Promise.resolve(false); }
        if(!confirm('Batalkan jadwal ini di Facebook?')) return Promise.resolve(false);
        return FB.hapusJadwal(row)
          .then(function(){ ngtToast('Jadwal <b>dibatalkan</b>'); return true; })
          .catch(function(e){ ngtToast('Gagal: ' + esc(e.message)); return false; });
      }
    },
    draft: {
      // Draft SELALU di localStorage browser (tidak ke backend, biar Supabase tidak bengkak)
      list: function(){ return dummyCRUD('draft').list(); },
      tambah: function(d){ return dummyCRUD('draft').tambah(d); },
      hapus: function(id){ return dummyCRUD('draft').hapus(id); }
    },
    komentar: {
      list: function(){
        if(CONFIG.dummy) return dummyCRUD('komentar').list();
        if(Sheet.ok()) return Sheet.komentarList().catch(function(){ return backendBelum('spreadsheet'); });
        return backendBelum('spreadsheet');
      },
      update: function(id, patch){
        if(CONFIG.dummy) return dummyCRUD('komentar').update(id, patch);
        if(Sheet.ok()) return Sheet.komentarUpdate(id, patch).catch(function(){ return backendBelum('spreadsheet'); });
        return backendBelum('spreadsheet');
      },
      tambah: function(k){
        if(CONFIG.dummy) return dummyCRUD('komentar').tambah(k);
        // Produksi: komentar masuk via webhook Facebook -> Web App -> spreadsheet pelanggan.
        return Promise.resolve(k);
      }
    },
    arsip: {
      tulis: function(row){
        if(CONFIG.dummy) return Promise.resolve(true);
        if(Sheet.ok()) return Sheet.arsip(Object.assign({ pelanggan_id: ngtPid() }, row));
        return Promise.resolve(null);
      }
    }
  };

  // Gate: belum login -> tampilkan layar login, hentikan init
  if(!ngtSession()){
    document.getElementById('ngt-login').style.display = 'flex';
    var appEl = document.querySelector('.ngt');
    if(appEl) appEl.style.display = 'none';
    var em = document.getElementById('login-email'), pn = document.getElementById('login-pin');
    [em, pn].forEach(function(i){ if(i) i.addEventListener('keydown', function(e){ if(e.key === 'Enter') window.ngtDoLogin(); }); });
    return;
  }

  /* ============ UI: PENGATURAN HALAMAN ============ */
  function maskToken(t){
    if(!t) return '&mdash;';
    return t.length <= 10 ? '&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;' : esc(t.slice(0,4)) + '&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;' + esc(t.slice(-4));
  }
  async function renderHalaman(){
    var list = await DB.halaman.list() || [];
    var el = document.getElementById('ngtHalamanList');
    var info = document.getElementById('ngtHalamanInfo');
    if(info) info.innerHTML = '<b style="color:#fff">' + list.length + '</b>/' + ngtMaxHalaman() + ' halaman terpakai' +
      (list.length >= ngtMaxHalaman() ? ' &mdash; <a href="#" onclick="ngtBukaUpsell();return false;" style="color:#8b5cf6">tambah halaman Rp80rb</a>' : '');
    if(!list.length){
      el.innerHTML = '<p class="ngt-muted">Belum ada halaman terhubung. Klik &ldquo;&#65291; Tambah Halaman&rdquo;.</p>';
      return;
    }
    el.innerHTML = list.map(function(h){
      var inisial = h.nama.split(' ').map(function(w){ return w[0]; }).join('').slice(0,2).toUpperCase();
      return '<div class="ngt-row">'
        + '<div class="ngt-avatar">' + esc(inisial) + '</div>'
        + '<div style="flex:1;min-width:0"><b style="color:#fff;font-size:14px">' + esc(h.nama) + '</b>'
        + '<div class="ngt-muted">ID: ' + esc(h.pageId) + ' &middot; Token: ' + maskToken(h.token)
        + '<br>Webhook: <code style="color:#4ade80">' + esc(h.webhook) + '</code></div></div>'
        + '<div style="display:flex;gap:6px;flex-shrink:0"><button class="ngt-btn small ghost" onclick="ngtUjiHalaman(\'' + h.id + '\')">Uji</button>'
        + '<button class="ngt-btn small red" onclick="ngtHapusHalaman(\'' + h.id + '\')">Hapus</button></div></div>';
    }).join('');
  }
  window.ngtOpenHalamanModal = function(){ document.getElementById('ngtHalamanModalBg').classList.add('show'); };
  window.ngtCloseHalamanModal = function(){ document.getElementById('ngtHalamanModalBg').classList.remove('show'); };
  function ngtMaxHalaman(){
    var s = ngtSession();
    var m = s ? parseInt(s.max_halaman, 10) : NaN;
    return isNaN(m) ? 3 : m;
  }
  window.ngtBukaUpsell = function(){
    ngtCloseHalamanModal();
    var s = ngtSession();
    var teks = 'Halo admin, saya mau tambah 1 halaman Facebook (Rp80.000). Akun: ' + (s ? s.email : '');
    document.getElementById('ngtUpsellWa').href = 'https://wa.me/6280000000000?text=' + encodeURIComponent(teks);
    document.getElementById('ngtUpsellModalBg').classList.add('show');
  };
  window.ngtTutupUpsell = function(){ document.getElementById('ngtUpsellModalBg').classList.remove('show'); };
  window.ngtSimpanHalaman = async function(){
    var sudah = await DB.halaman.list() || [];
    if(sudah.length >= ngtMaxHalaman()){
      ngtBukaUpsell();
      return;
    }
    var nama = document.getElementById('ngtHNama').value.trim();
    var pageId = document.getElementById('ngtHPageId').value.trim();
    var token = document.getElementById('ngtHToken').value.trim();
    var webhook = document.getElementById('ngtHWebhook').value.trim();
    if(!nama || !pageId || !token || !webhook){ ngtToast('Lengkapi <b>semua kolom</b> dulu'); return; }
    await DB.halaman.tambah({ nama:nama, pageId:pageId, token:token, webhook:webhook });
    ['ngtHNama','ngtHPageId','ngtHToken','ngtHWebhook'].forEach(function(id){ document.getElementById(id).value=''; });
    ngtCloseHalamanModal();
    ngtToast('Halaman <b>' + esc(nama) + '</b> ditambahkan');
    renderHalaman();
  };
  window.ngtHapusHalaman = async function(id){
    var list = await DB.halaman.list() || [];
    var h = list.find(function(x){ return x.id===id; });
    if(!h) return;
    if(!confirm('Hapus halaman "' + h.nama + '"?')) return;
    await DB.halaman.hapus(id);
    ngtToast('Halaman <b>' + esc(h.nama) + '</b> dihapus');
    renderHalaman();
  };
  window.ngtUjiHalaman = async function(id){
    var list = await DB.halaman.list() || [];
    var h = list.find(function(x){ return x.id===id; });
    if(!h) return;
    ngtToast('Menguji koneksi ke <b>' + esc(h.nama) + '</b>&hellip;');
    setTimeout(function(){
      if(CONFIG.dummy) ngtToast('<b>' + esc(h.nama) + '</b> terhubung &#10003; (simulasi)');
      else ngtToast('Mode backend: isi BACKEND_CONFIG dulu (lihat BACKEND-SETUP.md)');
    }, 1200);
  };

  /* ============ UI: PENGATURAN AI ============ */
  window.ngtTogglePw = function(inputId, btn){
    var inp = document.getElementById(inputId);
    var show = inp.type === 'password';
    inp.type = show ? 'text' : 'password';
    btn.textContent = show ? '&#128065;&#8205;&#128488;' : '&#128065;';
  };
  window.ngtSimpanAi = async function(){
    var d = { model: document.getElementById('ngtAiModel').value, apiKey: document.getElementById('ngtAiKey').value.trim() };
    await DB.ai.simpan(d);
    document.getElementById('ngtAiStatus').innerHTML = 'Tersimpan &#10003; <span class="ngt-muted">(' + esc(d.model) + ')</span>';
    ngtToast('Pengaturan AI <b>tersimpan</b>');
  };
  window.ngtTesAi = async function(){
    var key = document.getElementById('ngtAiKey').value.trim();
    var model = document.getElementById('ngtAiModel').value;
    if(!key){ ngtToast('Isi <b>API key</b> dulu'); return; }
    ngtToast('Mengetes koneksi AI&hellip;');
    setTimeout(function(){
      if(CONFIG.dummy) ngtToast('Koneksi <b>' + esc(model) + '</b> berhasil &#10003; (simulasi)');
    }, 1200);
  };
  async function initSetting(){
    renderHalaman();
    var ai = await DB.ai.get();
    if(ai){
      document.getElementById('ngtAiModel').value = ai.model || 'gemini-2.5-flash';
      document.getElementById('ngtAiKey').value = ai.apiKey || '';
      if(ai.apiKey) document.getElementById('ngtAiStatus').innerHTML = 'API key tersimpan &#10003;';
    }
    var mb = document.getElementById('ngtHalamanModalBg');
    if(mb) mb.addEventListener('click', function(e){ if(e.target===this) ngtCloseHalamanModal(); });
  }
  (function(){ var s = ngtSession(); var el = document.getElementById('ngtUser'); if(el && s) el.textContent = s.nama; })();
  initSetting();
  ngtIsiHalamanSelect();
  var titles = { pengaturan:'Setting', radar:'News Aggregator', studio:'Studio Konten', antrean:'Antrean Publish', komentar:'Komentar', insight:'Insight' };

  // Navigasi sidebar
  function goPage(name){
    if(name==='komentar') kmLoad();
    if(name==='antrean') anMuat();
    document.querySelectorAll('#ngtNav button').forEach(function(b){ b.classList.toggle('active', b.dataset.target===name); });
    document.querySelectorAll('.ngt-page').forEach(function(p){ p.classList.toggle('active', p.id==='page-'+name); });
    document.getElementById('ngtPageTitle').textContent = titles[name] || name;
    document.getElementById('ngtSidebar').classList.remove('open');
    document.getElementById('ngtOverlay').classList.remove('show');
    window.scrollTo({top:0, behavior:'smooth'});
  }
  document.querySelectorAll('#ngtNav button').forEach(function(b){
    b.addEventListener('click', function(){ goPage(b.dataset.target); });
  });
  window.ngtGo = goPage;

  // Burger mobile
  document.getElementById('ngtBurger').addEventListener('click', function(){
    document.getElementById('ngtSidebar').classList.toggle('open');
    document.getElementById('ngtOverlay').classList.toggle('show');
  });
  document.getElementById('ngtOverlay').addEventListener('click', function(){
    document.getElementById('ngtSidebar').classList.remove('open');
    this.classList.remove('show');
  });

  // Filter radar per kategori
  document.querySelectorAll('#ngtFilters button').forEach(function(b){
    b.addEventListener('click', function(){
      document.querySelectorAll('#ngtFilters button').forEach(function(x){ x.classList.remove('active'); });
      b.classList.add('active');
      var f = b.dataset.f, ada = false;
      document.querySelectorAll('#ngtNewsList .ngt-newscard').forEach(function(c){
        var show = f==='semua' || c.dataset.kategori===f;
        c.style.display = show ? '' : 'none';
        if(show) ada = true;
      });
      document.getElementById('ngtNewsEmpty').style.display = ada ? 'none' : 'block';
    });
  });

  // Toast
  var toastEl = document.getElementById('ngtToast'), toastT;
  window.ngtToast = function(html){
    toastEl.innerHTML = html;
    toastEl.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(function(){ toastEl.classList.remove('show'); }, 2600);
  };

  /* ===== STUDIO: 2 TAB ===== */
  window.ngtTabStudio = function(t){
    document.querySelectorAll('.ngt-tabs button').forEach(function(b){ b.classList.toggle('active', b.dataset.tab===t); });
    document.getElementById('tab-ai').classList.toggle('active', t==='ai');
    document.getElementById('tab-manual').classList.toggle('active', t==='manual');
  };
  var ngtJenisAktif = 'teks';
  function ngtJenisLabel(){ return {teks:'Teks', gambar:'Gambar', video:'Video', story:'Story'}[ngtJenisAktif] || 'Postingan'; }
  document.querySelectorAll('#ngtJenisPost button').forEach(function(b){
    b.addEventListener('click', function(){
      document.querySelectorAll('#ngtJenisPost button').forEach(function(x){ x.classList.remove('active'); });
      b.classList.add('active');
      ngtJenisAktif = b.dataset.j;
      document.getElementById('ngtManualMediaWrap').style.display = ngtJenisAktif==='teks' ? 'none' : '';
    });
  });
  document.getElementById('ngtManualFile').addEventListener('change', function(){
    var f = this.files[0]; if(!f) return;
    var url = URL.createObjectURL(f);
    var isVid = f.type.indexOf('video') === 0;
    var img = document.getElementById('ngtManualImgPrev'), vid = document.getElementById('ngtManualVidPrev');
    img.style.display = isVid ? 'none' : 'block';
    vid.style.display = isVid ? 'block' : 'none';
    if(isVid) vid.src = url; else img.src = url;
    document.getElementById('ngtManualDropLabel').style.display = 'none';
    document.getElementById('ngtManualFileName').textContent = f.name;
  });
  async function ngtIsiHalamanSelect(){
    var list = await DB.halaman.list() || [];
    var opts = list.map(function(h){ return '<option value="' + esc(h.nama) + '">' + esc(h.nama) + '</option>'; }).join('');
    var s2 = document.getElementById('ngtManualHalaman');
    var s3 = document.getElementById('aiHalaman');
    if(s2) s2.innerHTML = opts;
    if(s3) s3.innerHTML = opts;
  }
  function ngtValidasiManual(){
    var teks = document.getElementById('ngtManualTeks').value.trim();
    var file = document.getElementById('ngtManualFile').files[0];
    if(ngtJenisAktif==='teks' && !teks){ ngtToast('Tulis dulu <b>teksnya</b>'); return null; }
    if(ngtJenisAktif!=='teks' && !file){ ngtToast('Pilih dulu <b>file media</b>nya'); return null; }
    return { halaman: document.getElementById('ngtManualHalaman').value, teks: teks, file: file };
  }
  window.ngtManualTerbit = function(){
    var d = ngtValidasiManual(); if(!d) return;
    ngtToast('<b>' + ngtJenisLabel() + '</b> diterbitkan ke <b>' + esc(d.halaman) + '</b> (simulasi)');
  };
  window.ngtManualAntre = function(){
    var d = ngtValidasiManual(); if(!d) return;
    ngtToast('<b>' + ngtJenisLabel() + '</b> masuk <b>antrean</b> (simulasi)');
  };

  // Dari Radar -> Studio AI News dengan teks terisi
  window.ngtBuatKonten = function(btn){
    var card = btn.closest('.ngt-newscard');
    var judul = card.querySelector('h4').textContent.trim();
    var ringkas = card.querySelector('p').textContent.trim();
    goPage('studio');
    if(window.ngtTabStudio) ngtTabStudio('ai');
    document.getElementById('aiSumber').value = judul + '\n' + ringkas;
    aiKeStep(1);
    ngtToast('Berita dimuat ke <b>AI News</b> — lanjut ke Kurasi');
  };

  // ============ WIZARD AI NEWS (3 langkah ala contoh) ============
  var aiW = { step:1, judulOpts:[], judul:'', ringkasan:'', caption:'', pancingan:[] };
  window.aiKeStep = function(n){
    if(n === 2 && !document.getElementById('aiSumber').value.trim()){
      ngtToast('Tempel dulu <b>teks beritanya</b>'); return;
    }
    if(n === 3 && !aiW.judul){
      ngtToast('Generate dulu & <b>pilih judul</b> di langkah Kurasi'); return;
    }
    aiW.step = n;
    [1,2,3].forEach(function(i){
      document.getElementById('aiStep'+i).style.display = (i===n) ? '' : 'none';
      var st = document.querySelector('#aiSteps .ngt-step[data-s="'+i+'"]');
      st.classList.toggle('now', i===n);
      st.classList.toggle('done', i<n);
      st.querySelector('.dot').innerHTML = (i<n) ? '&#10003;' : i;
    });
    if(n === 3) aiRenderPreview();
    window.scrollTo({top:0, behavior:'smooth'});
  };
  window.aiAmbilUrl = function(){
    var u = document.getElementById('aiUrl').value.trim();
    if(!u){ ngtToast('Isi dulu <b>URL beritanya</b>'); return; }
    ngtToast('Mengambil berita dari URL&hellip; (simulasi)');
    setTimeout(function(){
      document.getElementById('aiSumber').value =
        'Judul berita dari ' + (u.split('//')[1] || u).split('/')[0] + '\n' +
        'Isi berita hasil ambil otomatis (simulasi). Pada versi produksi, teks asli berita akan ditarik langsung dari URL ini.';
      ngtToast('Berita <b>berhasil</b> diambil (simulasi)');
    }, 1200);
  };
  // Simulasi AI: olah teks jadi judul/caption/pancingan (produksi: panggil API via backend)
  function aiSimulasi(teks){
    var kalimat = teks.split(/[\n\.]+/).map(function(s){ return s.trim(); }).filter(Boolean);
    var inti = (kalimat[0] || teks).slice(0, 110);
    var kata = teks.replace(/[^a-zA-Z\s]/g,'').split(/\s+/).filter(function(w){ return w.length > 4; });
    var topik = (kata[0] || 'info').toLowerCase();
    var judulOpts = [
      '🔥 ' + inti,
      'VIRAL: ' + inti,
      'BREAKING: ' + inti,
      'Fakta Terbaru: ' + inti,
      'Jangan Kaget! ' + inti
    ];
    var ringkasan = kalimat.slice(0,3).join('. ') + (kalimat.length > 3 ? '.' : '');
    var halaman = document.getElementById('aiHalaman').value || '';
    var caption = '🔥 ' + inti + '\n\n' + ringkasan +
      '\n\nGimana menurut kalian? Tulis pendapatmu di kolom komentar 👇\nJangan lupa LIKE & SHARE biar makin viral!' +
      '\n\n#berita #' + topik.replace(/\s+/g,'') + ' #viral #' + halaman.replace(/\s+/g,'');
    var pancingan = [
      'Setuju banget min, di tempatku juga gitu!',
      'Wah baru tahu, makasih infonya 🙏',
      'Tag temenmu yang perlu tahu ini 👇',
      'Menurut kalian gimana? Setuju atau enggak?'
    ];
    return { judulOpts:judulOpts, ringkasan:ringkasan, caption:caption, pancingan:pancingan };
  }
  window.aiGenerate = function(){
    var teks = document.getElementById('aiSumber').value.trim();
    if(!teks){ ngtToast('Tempel dulu <b>teks beritanya</b>'); return; }
    var btn = document.getElementById('aiGenBtn');
    btn.disabled = true;
    btn.innerHTML = '<span class="ngt-spin"></span> AI sedang menulis&hellip;';
    setTimeout(function(){
      var h = aiSimulasi(teks);
      aiW.judulOpts = h.judulOpts; aiW.judul = h.judulOpts[0];
      aiW.ringkasan = h.ringkasan; aiW.caption = h.caption; aiW.pancingan = h.pancingan;
      document.getElementById('aiHasil').style.display = '';
      document.getElementById('aiRingkasan').textContent = h.ringkasan;
      document.getElementById('aiCaption').value = h.caption;
      document.getElementById('aiPancingan').value = h.pancingan.join('\n');
      aiRenderJudulOpts();
      btn.disabled = false;
      btn.innerHTML = '&#10024; Generate dengan AI';
      ngtToast('Kurasi <b>selesai!</b> Pilih judul favoritmu');
    }, 1600);
  };
  function aiRenderJudulOpts(){
    document.getElementById('aiJudulOpts').innerHTML = aiW.judulOpts.map(function(j, i){
      return '<div class="ngt-opt' + (j===aiW.judul ? ' sel' : '') + '" onclick="aiPilihJudul(' + i + ')">' + esc(j) + '</div>';
    }).join('');
  }
  window.aiPilihJudul = function(i){
    aiW.judul = aiW.judulOpts[i];
    aiRenderJudulOpts();
  };
  function aiRenderPreview(){
    document.getElementById('aiPreview').innerHTML =
      '<div class="kicker">NEWSGEN STUDIO</div><h4>' + esc(aiW.judul) + '</h4>' +
      '<div class="src">' + esc(document.getElementById('aiHalaman').value || '') + ' &bull; ' + hariIni() + '</div>';
  }
  // Download PNG 1080x1350 via canvas
  window.aiDownload = function(){
    if(!aiW.judul){ ngtToast('Generate dulu di langkah <b>Kurasi</b>'); return; }
    var c = document.createElement('canvas'); c.width = 1080; c.height = 1350;
    var x = c.getContext('2d');
    var g = x.createLinearGradient(0,0,1080,1350);
    g.addColorStop(0,'#1c1917'); g.addColorStop(.55,'#451a03'); g.addColorStop(1,'#0a0a0d');
    x.fillStyle = g; x.fillRect(0,0,1080,1350);
    x.fillStyle = '#fbbf24'; x.font = '800 34px sans-serif';
    x.fillText('N E W S G E N   S T U D I O', 70, 90);
    x.fillStyle = '#fff'; x.font = '900 64px sans-serif';
    var kata = aiW.judul.split(' '), baris = '', y = 220;
    kata.forEach(function(k){
      if((baris + ' ' + k).length > 26){ x.fillText(baris, 70, y); y += 84; baris = k; }
      else baris = (baris ? baris + ' ' : '') + k;
    });
    x.fillText(baris, 70, y);
    x.fillStyle = '#a1a1aa'; x.font = '400 30px sans-serif';
    x.fillText((document.getElementById('aiHalaman').value || '') + '  •  ' + hariIni(), 70, 1250);
    var a = document.createElement('a');
    a.download = 'newsgen-kartu.png';
    a.href = c.toDataURL('image/png');
    a.click();
    ngtToast('Kartu <b>terdownload</b> (1080&times;1350)');
  };
  function aiPayload(){
    return {
      judul: aiW.judul,
      halaman: document.getElementById('aiHalaman').value || '',
      caption: document.getElementById('aiCaption').value,
      pancingan: document.getElementById('aiPancingan').value,
      tipe: 'AI News'
    };
  }
  window.aiTerbit = function(){
    if(!aiW.judul){ ngtToast('Generate dulu di langkah <b>Kurasi</b>'); return; }
    var p = aiPayload();
    DB.arsip.tulis({ aksi:'terbit', judul:p.judul, halaman:p.halaman, waktu:new Date().toISOString() });
    ngtToast('<b>Diterbitkan</b> ke ' + esc(p.halaman) + ' (simulasi)');
  };
  window.aiDraft = function(){
    if(!aiW.judul){ ngtToast('Generate dulu di langkah <b>Kurasi</b>'); return; }
    DB.draft.tambah(aiPayload()).then(function(){
      ngtToast('<b>Draft</b> tersimpan');
    });
  };
  window.aiAntre = function(){
    if(!aiW.judul){ ngtToast('Generate dulu di langkah <b>Kurasi</b>'); return; }
    var p = aiPayload();
    p.jadwal = 'Belum dijadwalkan';
    DB.antrean.tambah(p).then(function(){
      ngtToast('Masuk <b>antrean</b> publish');
      goPage('antrean');
    });
  };

  // ============ SISTEM KOMENTAR (ala contoh) ============
  var kmState = { list:[], tab:'semua', q:'', polling:false, timer:null };
  // Simulasi AI: balas komentar dengan gaya natural (produksi: panggil AI via backend)
  function kmAiReply(pesan){
    var p = pesan.toLowerCase();
    if(/berapa|harga|daftar|cara|gimana|bagaimana|kapan|dimana|di mana|jam|syarat/.test(p))
      return 'Halo kak! Makasih pertanyaannya 🙏 Info lengkapnya sudah kami rangkum di postingan ya. Kalau masih kurang jelas, tulis lagi di sini, nanti kami bantu jawab!';
    if(/setuju|betul|benar|keren|mantap|bagus|hebat/.test(p))
      return 'Setuju kak! Seneng banget dengarnya 😄 Makasih sudah mampir dan komen, jangan lupa share ke temen-temen ya!';
    if(/gol|menang|main|timnas|skor/.test(p))
      return 'Seru banget ya kak pertandingannya! 😄 Makasih sudah nonton bareng, sampai jumpa di laga berikutnya!';
    if(/macet|jalan|buka|tutup/.test(p))
      return 'Iya kak, semoga aksesnya makin lancar ya. Hati-hati di jalan dan makasih infonya! 🙏';
    return 'Halo kak, makasih banyak komentarnya! 🙏 Senang bisa diskusi bareng di sini.';
  }
  function kmAvatar(nama){ return esc((nama||'?').trim().charAt(0).toUpperCase()); }
  async function kmLoad(){
    kmState.list = (await DB.komentar.list()) || [];
    // Produksi: status auto-reply diambil dari Config spreadsheet pelanggan
    if(!CONFIG.dummy && Sheet.ok()){
      try {
        var cfg = await Sheet.configGet();
        var tgl = document.getElementById('kmAutoReply');
        if(tgl && cfg.auto_reply !== undefined) tgl.checked = (String(cfg.auto_reply) === '1');
      } catch(e){}
    }
    kmRenderTabs();
    kmRender();
  }
  // Toggle auto-reply -> simpan ke Config (produksi) / lokal (dummy)
  document.addEventListener('change', function(e){
    if(e.target && e.target.id === 'kmAutoReply' && !CONFIG.dummy && Sheet.ok()){
      Sheet.configSet('auto_reply', e.target.checked ? '1' : '0').catch(function(){});
      ngtToast('Auto-reply <b>' + (e.target.checked ? 'ON' : 'OFF') + '</b>');
    }
  });
  function kmRenderTabs(){
    var pages = ['semua'].concat(kmState.list.map(function(k){ return k.halaman; }).filter(function(v,i,a){ return v && a.indexOf(v)===i; }));
    document.getElementById('kmTabs').innerHTML = pages.map(function(p){
      return '<button class="' + (kmState.tab===p?'active':'') + '" onclick="kmTab(\'' + esc(p).replace(/'/g,"\\'") + '\')">' + esc(p==='semua'?'Semua':p) + '</button>';
    }).join('');
  }
  window.kmTab = function(p){ kmState.tab = p; kmRenderTabs(); kmRender(); };
  window.kmCari = function(q){ kmState.q = q.toLowerCase(); kmRender(); };
  function kmRender(){
    var list = kmState.list.filter(function(k){
      var okTab = kmState.tab==='semua' || k.halaman===kmState.tab;
      var okQ = !kmState.q || (k.nama+' '+k.pesan).toLowerCase().indexOf(kmState.q) >= 0;
      return okTab && okQ;
    });
    var el = document.getElementById('kmList');
    if(!list.length){ el.innerHTML = '<div class="ngt-card" style="text-align:center;color:#71717a;">Belum ada komentar.</div>'; return; }
    el.innerHTML = list.map(function(k){
      var chip = k.status==='terkirim'
        ? '<span class="ngt-chip green">TERKIRIM &#10003;</span>'
        : '<span class="ngt-chip orange">REVIEW</span>';
      var balasanHtml = k.status==='terkirim'
        ? '<div class="reply"><b>&#129302; Balasan terkirim</b>' + esc(k.balasan||'') + '</div>'
        : '<div class="reply"><b>&#129302; Saran balasan AI (bisa diedit)</b>' +
          '<textarea class="ngt-area" id="kmBalas_' + k.id + '" style="min-height:70px;margin-top:8px;">' + esc(k.balasan||'') + '</textarea>' +
          '<div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;">' +
          '<button class="ngt-btn small ghost" onclick="kmGenSatu(\'' + k.id + '\')">&#10024; Generate Ulang</button>' +
          '<button class="ngt-btn small green" onclick="kmKirim(\'' + k.id + '\')">&#128640; Kirim Balasan</button>' +
          '</div></div>';
      return '<div class="ngt-card ngt-komen"><div class="ngt-news"><div class="ngt-avatar">' + kmAvatar(k.nama) +
        '</div><div class="body"><div class="meta"><b style="color:#fff;font-size:14px">' + esc(k.nama) +
        '</b><span class="ngt-muted"> &bull; ' + esc(k.halaman||'') + ' &bull; ' + esc(k.waktu||'') + '</span></div>' +
        '<p style="margin-top:6px">' + esc(k.pesan) + '</p>' + balasanHtml +
        '</div>' + chip + '</div></div>';
    }).join('');
  }
  window.kmGenSatu = function(id){
    var k = kmState.list.find(function(x){ return x.id===id; });
    if(!k) return;
    k.balasan = kmAiReply(k.pesan);
    var ta = document.getElementById('kmBalas_' + id);
    if(ta) ta.value = k.balasan;
    DB.komentar.update(id, { balasan:k.balasan });
    ngtToast('Balasan AI <b>dibuat</b> — silakan edit lalu kirim');
  };
  window.kmGenSemua = function(){
    var n = 0;
    kmState.list.forEach(function(k){
      if(k.status!=='terkirim' && !k.balasan){ k.balasan = kmAiReply(k.pesan); DB.komentar.update(k.id, { balasan:k.balasan }); n++; }
    });
    kmRender();
    ngtToast(n ? ('<b>'+n+'</b> balasan AI dibuat') : 'Semua komentar sudah ada balasannya');
  };
  window.kmKirim = function(id){
    var k = kmState.list.find(function(x){ return x.id===id; });
    if(!k) return;
    var ta = document.getElementById('kmBalas_' + id);
    var balasan = ta ? ta.value : (k.balasan || '');
    DB.komentar.update(id, { balasan:balasan, status:'terkirim' }); // backend otomatis menghapus barisnya
    kmState.list = kmState.list.filter(function(x){ return x.id !== id; });
    kmRender();
    ngtToast('Balasan ke <b>' + esc(k.nama) + '</b> terkirim (simulasi) & dihapus dari daftar');
  };
  window.kmKirimSemua = function(){
    var n = 0, ids = [];
    kmState.list.forEach(function(k){
      if(k.status!=='terkirim'){
        var ta = document.getElementById('kmBalas_' + k.id);
        var balasan = ta ? ta.value : (k.balasan || kmAiReply(k.pesan));
        DB.komentar.update(k.id, { balasan:balasan, status:'terkirim' }); // backend otomatis menghapus barisnya
        ids.push(k.id);
        n++;
      }
    });
    kmState.list = kmState.list.filter(function(x){ return ids.indexOf(x.id) < 0; });
    kmRender();
    ngtToast(n ? ('<b>'+n+'</b> balasan terkirim (simulasi) & dihapus dari daftar') : 'Tidak ada yang perlu dikirim');
  };
  // Auto-polling: produksi = cek komentar baru dari Web App tiap 60 detik;
  // dummy = simulasi komentar baru tiap 20 detik
  window.kmPolling = function(){
    kmState.polling = !kmState.polling;
    var btn = document.getElementById('kmPollBtn');
    btn.innerHTML = kmState.polling ? '&#128260; Auto-Polling: ON' : '&#128260; Auto-Polling: OFF';
    if(kmState.polling){
      if(!CONFIG.dummy){
        kmState.timer = setInterval(function(){
          kmLoad().then(function(){ ngtToast('Komentar <b>diperbarui</b>'); });
        }, 60000);
        ngtToast('<b>Auto-polling ON</b> — cek komentar baru tiap 60 detik');
        return;
      }
      var contoh = [
        { nama:'Rudi Hartono', pesan:'Min, info lokernya masih ada?' },
        { nama:'Nina Kurnia', pesan:'Setuju banget sama beritanya!' },
        { nama:'Tono Prasetyo', pesan:'Kapan tayang lagi min?' }
      ];
      var i = 0;
      kmState.timer = setInterval(function(){
        var c = contoh[i % contoh.length]; i++;
        var halaman = (kmState.list[0] && kmState.list[0].halaman) || 'Folk Jateng';
        DB.komentar.tambah({ nama:c.nama, halaman:halaman, waktu:'baru saja', pesan:c.pesan,
          balasan: document.getElementById('kmAutoReply').checked ? kmAiReply(c.pesan) : '', status:'menunggu' })
          .then(function(){ return kmLoad(); })
          .then(function(){ ngtToast('Komentar baru dari <b>' + esc(c.nama) + '</b>'); });
      }, 20000);
      ngtToast('<b>Auto-polling ON</b> — cek komentar baru tiap 20 detik (simulasi)');
    } else {
      clearInterval(kmState.timer);
      ngtToast('Auto-polling <b>OFF</b>');
    }
  };
  // Muat komentar saat halaman komentar dibuka
  // ============ ANTREAN (DB-driven) ============
  async function anMuat(){
    var sel = document.getElementById('anHalaman');
    if(sel && !sel.options.length){
      var hp = await DB.halaman.list() || [];
      sel.innerHTML = hp.map(function(h){ return '<option>' + esc(h.nama) + '</option>'; }).join('');
    }
    var list = (await DB.antrean.list()) || [];
    var el = document.getElementById('ngtQueueList');
    if(!list.length){ el.innerHTML = '<div class="ngt-card" style="text-align:center;color:#71717a;">Antrean kosong. Tambahkan jadwal di atas.</div>'; return; }
    el.innerHTML = list.map(function(a){
      return '<div class="ngt-row"><div style="flex:1"><b style="color:#fff;font-size:14px">' + esc(a.judul) +
        '</b><div class="ngt-muted">' + esc(a.halaman||'') + ' &bull; ' + esc(a.jadwal||'') +
        (a.tipe ? ' &bull; ' + esc(a.tipe) : '') + '</div></div>' +
        '<span class="ngt-chip orange">TERJADWAL</span>' +
        '<button class="ngt-btn ghost small" onclick="anHapus(\'' + a.id + '\')">Hapus</button></div>';
    }).join('');
  }
  window.anTambah = function(){
    var judul = document.getElementById('anJudul').value.trim();
    if(!judul){ ngtToast('Isi dulu <b>judulnya</b>'); return; }
    DB.antrean.tambah({
      judul: judul,
      halaman: document.getElementById('anHalaman').value,
      jadwal: document.getElementById('anJadwal').value.trim() || 'Belum dijadwalkan',
      tipe: 'Manual'
    }).then(function(){
      document.getElementById('anJudul').value = '';
      document.getElementById('anJadwal').value = '';
      anMuat();
      ngtToast('Jadwal <b>ditambahkan</b>');
    });
  };
  window.anHapus = function(id){
    if(!confirm('Hapus jadwal ini?')) return;
    DB.antrean.hapus(id).then(function(){ anMuat(); ngtToast('Jadwal <b>dihapus</b>'); });
  };
  // Hapus antrean (legacy, tidak dipakai lagi)
  window.ngtHapusAntrean = function(btn){
    btn.closest('.ngt-row').remove();
    ngtToast('Jadwal <b>dihapus</b> (contoh)');
  };

  function esc(s){ var d=document.createElement('div'); d.textContent=s; return d.innerHTML; }
  function hariIni(){ var d=new Date(); return d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear(); }
})();

})();
