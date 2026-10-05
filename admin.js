/* NewsGen Studio — admin.js (di-load via CDN) */
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
<style>/* FIX: full-bleed dark canvas */html,body{background:#0a0a0d!important}.page,.all-container{max-width:none!important}</style>
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

  /* ===== TAMBAHAN: login, tabs, danger ===== */
  .nga-loginwrap { min-height:100vh; display:flex; align-items:center; justify-content:center; background:#0a0a0d; padding:20px; }
  .nga-logincard { background:#131316; border:1px solid #27272a; border-radius:16px; padding:36px 32px; width:100%; max-width:380px; }
  .nga-tabs { display:flex; gap:8px; margin:16px 0; flex-wrap:wrap; }
  .nga-tabs button { padding:10px 18px; border-radius:10px; border:1px solid #27272a; background:#131316; color:#a1a1aa; cursor:pointer; font-size:14px; }
  .nga-tabs button.active { background:rgba(139,92,246,.14); border-color:rgba(139,92,246,.45); color:#c4b5fd; font-weight:700; }
  .nga-danger { background:rgba(239,68,68,.12) !important; border:1px solid rgba(239,68,68,.4) !important; color:#fca5a5 !important; }
  .nga-backbtn { margin-bottom:12px; }
  .nga-gridform { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  @media (max-width:640px){ .nga-gridform { grid-template-columns:1fr; } }
</style>
<div id="nga-login" class="nga-loginwrap" style="display:none">
  <div class="nga-logincard">
    <div class="nga-brand">NewsGen <span>Studio</span></div>
    <div class="nga-adminbadge">ADMIN</div>
    <h2 style="color:#fff;margin:14px 0 4px;font-size:20px">Masuk Admin</h2>
    <p class="nga-muted" style="margin-bottom:20px">Kelola pelanggan & seluruh datanya.</p>
    <div class="nga-field"><label class="nga-label">Email</label><input class="nga-input" id="ngaLoginEmail" type="email" placeholder="admin@newsgen.id" autocomplete="username"></div>
    <div class="nga-field"><label class="nga-label">PIN</label><input class="nga-input" id="ngaLoginPin" type="password" inputmode="numeric" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;" autocomplete="current-password"></div>
    <div id="ngaLoginErr" style="display:none;color:#fca5a5;font-size:13px;margin-bottom:12px"></div>
    <button class="nga-btn" style="width:100%;justify-content:center" onclick="ngaDoLogin()">Masuk</button>
  </div>
</div>
<div class="nga" id="ngaApp" style="display:none">
  <div class="nga-overlay" id="ngaOverlay"></div>
  <aside class="nga-sidebar" id="ngaSidebar">
    <div class="nga-brand">NewsGen <span>Studio</span></div>
    <div class="nga-adminbadge">ADMIN</div>
    <nav class="nga-nav" id="ngaNav">
      <button data-target="ringkasan" class="active"><span class="ico">&#128202;</span> Ringkasan</button>
      <button data-target="pelanggan"><span class="ico">&#128101;</span> Pelanggan</button>
      <button data-target="paket"><span class="ico">&#128179;</span> Paket & Harga</button>
      <button data-target="setting"><span class="ico">&#9881;</span> Setting</button>
    </nav>
    <div class="nga-side-foot"><span id="ngaAdminName">Admin</span><br><a href="#" onclick="ngaLogout();return false;" style="color:#8b5cf6">Keluar</a></div>
  </aside>
  <div class="nga-main">
    <header class="nga-topbar">
      <div style="display:flex;align-items:center;gap:12px;">
        <button class="nga-burger" id="ngaBurger">&#9776;</button>
        <div><h1 id="ngaPageTitle">Ringkasan</h1><div class="sub">Kelola penjualan NewsGen Studio</div></div>
      </div>
      <button class="nga-btn small" onclick="pelangganTambah()">&#65291; Tambah Pelanggan</button>
    </header>
    <div class="nga-content">
      <section class="nga-page active" id="apage-ringkasan">
        <div class="nga-stats">
          <div class="nga-card nga-stat"><div class="ico">&#128101;</div><div class="num" id="ngaStatTotal">&ndash;</div><div class="lbl">Total pelanggan</div></div>
          <div class="nga-card nga-stat"><div class="ico">&#9989;</div><div class="num" id="ngaStatAktif">&ndash;</div><div class="lbl">Aktif</div></div>
          <div class="nga-card nga-stat"><div class="ico">&#128196;</div><div class="num" id="ngaStatHalaman">&ndash;</div><div class="lbl">Total halaman FB</div></div>
          <div class="nga-card nga-stat"><div class="ico">&#9208;</div><div class="num" id="ngaStatNonaktif">&ndash;</div><div class="lbl">Nonaktif</div></div>
        </div>
        <div class="nga-grid2">
          <div class="nga-card"><h3>&#128241; Pelanggan</h3><div class="nga-tablewrap"><table class="nga-table"><thead><tr><th>Nama</th><th>Email</th><th>Paket</th><th>Status</th></tr></thead><tbody id="ngaRecentBody"></tbody></table></div></div>
          <div class="nga-card"><h3>&#9888; Perlu Perhatian</h3><div class="nga-tablewrap"><table class="nga-table"><thead><tr><th>Nama</th><th>Status</th><th>Aksi</th></tr></thead><tbody id="ngaAtensiBody"></tbody></table></div><p class="nga-muted" style="margin-top:12px">Pelanggan nonaktif &mdash; hubungi untuk perpanjangan.</p></div>
        </div>
      </section>
      <section class="nga-page" id="apage-pelanggan">
        <div class="nga-title">Pelanggan</div>
        <div class="nga-desc">Klik <b>Kelola</b> untuk melihat &amp; mengubah seluruh data pelanggan (akun, halaman FB, komentar, arsip).</div>
        <div class="nga-toolbar">
          <input class="nga-input nga-search" placeholder="&#128269; Cari nama / email&hellip;" oninput="pelangganCari(this.value)">
          <button class="nga-btn" onclick="pelangganTambah()">&#65291; Tambah Pelanggan</button>
        </div>
        <div class="nga-card" style="padding:8px 12px"><div class="nga-tablewrap"><table class="nga-table"><thead><tr><th>Nama</th><th>Email</th><th>Paket</th><th>Status</th><th>Setup</th><th>Aksi</th></tr></thead><tbody id="ngaTabelBody"></tbody></table></div></div>
      </section>
      <section class="nga-page" id="apage-detail">
        <button class="nga-btn ghost small nga-backbtn" onclick="goPage('pelanggan')">&larr; Kembali</button>
        <div class="nga-title" id="ngaDetailNama">Detail Pelanggan</div>
        <div class="nga-desc" id="ngaDetailSub"></div>
        <div class="nga-tabs" id="ngaDetailTabs">
          <button data-tab="akun" class="active" onclick="detailTab('akun')">&#128100; Akun</button>
          <button data-tab="halaman" onclick="detailTab('halaman')">&#128196; Halaman FB</button>
          <button data-tab="komentar" onclick="detailTab('komentar')">&#128172; Komentar</button>
          <button data-tab="arsip" onclick="detailTab('arsip')">&#128193; Arsip</button>
          <button data-tab="config" onclick="detailTab('config')">&#9881; Config</button>
        </div>
        <div id="ngaDetailBody"></div>
      </section>
      <section class="nga-page" id="apage-paket">
        <div class="nga-title">Paket &amp; Harga</div>
        <div class="nga-desc">Paket yang tampil di sales page.</div>
        <div class="nga-paket">
          <div class="nga-card"><span class="nga-chip violet">PROMO</span><div class="harga">Rp199.000</div><div class="coret">Rp450.000</div><p class="nga-muted" style="margin:12px 0">Paket promo di sales page.</p></div>
          <div class="nga-card"><span class="nga-chip gray">NORMAL</span><div class="harga">Rp450.000</div><p class="nga-muted" style="margin:12px 0">Harga normal / harga coret.</p></div>
        </div>
      </section>
      <section class="nga-page" id="apage-setting">
        <div class="nga-title">Setting</div>
        <div class="nga-desc">Pengaturan akun admin ini.</div>
        <div class="nga-card" style="max-width:520px">
          <h3>&#128100; Admin</h3>
          <div class="nga-field"><label class="nga-label">Nama</label><input class="nga-input" id="ngaSetNama"></div>
          <div class="nga-field"><label class="nga-label">Email</label><input class="nga-input" id="ngaSetEmail" disabled></div>
          <div class="nga-field"><label class="nga-label">PIN baru</label><input class="nga-input" id="ngaSetPin" type="password" placeholder="Kosongkan bila tidak ganti"></div>
          <button class="nga-btn" onclick="adminSimpan()">&#128190; Simpan</button>
        </div>
      </section>
    </div>
  </div>
</div>
<div class="nga-modal-bg" id="ngaModalBg"><div class="nga-modal" id="ngaModalBox"></div></div>
<div class="nga-toast" id="ngaToast"></div>

`;

(function(){
  /* ============ KONFIGURASI ============ */
  const BACKEND_CONFIG = {
    supabase:    { url: 'https://ppenobzyzbkmdaiojygn.supabase.co', anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwZW5vYnp5emJrbWRhaW9qeWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExMTEwNjIsImV4cCI6MjEwNjY4NzA2Mn0.4HrDB0w9i4m3ScN9-Yz7p-gqsePuS9djgz_0Oi5GAY0' },
    spreadsheet: { webAppUrl: 'https://script.google.com/macros/s/AKfycbznky3kLVeMqD-gOQ2WhJZd_6ST32DHzMQq73QuB7coTljyMpXHhcT5cSAFpn5uqyLSPg/exec' }
  };

  /* ============ KLIEN SUPABASE ============ */
  const Supa = {
    authT: null,
    authHeaders(){
      var anonKey = BACKEND_CONFIG.supabase.anonKey;
      return { apikey: anonKey,
        Authorization: 'Bearer ' + (this.authT && this.authT.access ? this.authT.access : anonKey),
        'Content-Type': 'application/json', Prefer: 'return=representation' };
    },
    async authCall(path, body){
      var url = BACKEND_CONFIG.supabase.url.replace(/\/$/,'');
      var res = await fetch(url + path, { method:'POST',
        headers: { apikey: BACKEND_CONFIG.supabase.anonKey, 'Content-Type': 'application/json' },
        body: JSON.stringify(body || {}) });
      var j = await res.json().catch(function(){ return {}; });
      if(!res.ok) throw new Error(j.error_description || j.msg || j.error || ('Auth ' + res.status));
      return j;
    },
    async login(email, password){
      var j = await this.authCall('/auth/v1/token?grant_type=password', { email: email, password: password });
      this.authT = { access: j.access_token, refresh: j.refresh_token, exp: Date.now() + (j.expires_in || 3600) * 1000 };
      return j.user;
    },
    async req(table, method, body, query){
      var url = BACKEND_CONFIG.supabase.url.replace(/\/$/,'') + '/rest/v1/' + table + (query||'');
      var self = this;
      var res = await fetch(url, { method: method, headers: self.authHeaders(), body: body ? JSON.stringify(body) : undefined });
      if(res.status === 401 && self.authT){
        try {
          var j = await self.authCall('/auth/v1/token?grant_type=refresh_token', { refresh_token: self.authT.refresh });
          self.authT = { access: j.access_token, refresh: j.refresh_token, exp: Date.now() + (j.expires_in || 3600) * 1000 };
          try { var s = JSON.parse(sessionStorage.getItem('nga_admin') || 'null'); if(s){ s._auth = self.authT; sessionStorage.setItem('nga_admin', JSON.stringify(s)); } } catch(e){}
          res = await fetch(url, { method: method, headers: self.authHeaders(), body: body ? JSON.stringify(body) : undefined });
        } catch(e){ self.authT = null; throw new Error('sesi habis — silakan login ulang'); }
      }
      if(!res.ok) throw new Error('Supabase ' + res.status);
      var t = await res.text();
      return t ? JSON.parse(t) : [];
    },
    insert(table, row){ return this.req(table, 'POST', row); },
    update(table, id, row){ return this.req(table, 'PATCH', row, '?id=eq.' + encodeURIComponent(id)); },
    remove(table, id){ return this.req(table, 'DELETE', null, '?id=eq.' + encodeURIComponent(id)); }
  };

  /* ============ KLIEN WEB APP (spreadsheet per pelanggan) ============ */
  const WApp = {
    base(p){ var u = (p && p.webapp_url) || BACKEND_CONFIG.spreadsheet.webAppUrl || ''; return u.replace(/\/$/,''); },
    async get(base, params){
      var q = Object.keys(params).map(function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]); }).join('&');
      const res = await fetch(base + '?' + q);
      if(!res.ok) throw new Error('WebApp ' + res.status);
      return res.json();
    },
    async post(base, action, data){
      const res = await fetch(base, {
        method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(Object.assign({ action: action }, data || {}))
      });
      if(!res.ok) throw new Error('WebApp ' + res.status);
      return res.json();
    }
  };

  /* ============ SESI ADMIN ============ */
  function ngaSession(){
    try { return JSON.parse(sessionStorage.getItem('nga_admin') || 'null'); }
    catch(e){ return null; }
  }
  function ngaSetSession(a){
    if(a){
      var s = { id:a.id, nama:a.nama, email:a.email };
      if(a._auth) s._auth = a._auth;
      else if(Supa.authT) s._auth = { access:Supa.authT.access, refresh:Supa.authT.refresh, exp:Supa.authT.exp };
      sessionStorage.setItem('nga_admin', JSON.stringify(s));
      if(s._auth) Supa.authT = { access:s._auth.access, refresh:s._auth.refresh, exp:s._auth.exp };
    }
    else { sessionStorage.removeItem('nga_admin'); Supa.authT = null; }
  }
  function ngaJwtRole(token){
    try {
      var p = JSON.parse(atob(String(token).split('.')[1].replace(/-/g,'+').replace(/_/g,'/')));
      return p.app_metadata && p.app_metadata.role;
    } catch(e){ return null; }
  }
  window.ngaDoLogin = function(){
    var email = document.getElementById('ngaLoginEmail').value.trim().toLowerCase();
    var pin = document.getElementById('ngaLoginPin').value.trim();
    var err = document.getElementById('ngaLoginErr');
    err.style.display = 'none';
    if(!email || !pin){ err.textContent = 'Isi email dan PIN dulu.'; err.style.display = 'block'; return; }
    err.textContent = 'Memeriksa…'; err.style.display = 'block';
    (async function(){
      try {
        await Supa.login(email, pin);
        if(ngaJwtRole(Supa.authT.access) !== 'admin'){ Supa.authT = null; throw new Error('Bukan akun admin.'); }
        ngaSetSession({ id:'admin', nama:'Administrator', email:email });
        location.reload();
      } catch(e){
        err.textContent = /bukan akun admin/i.test(e.message) ? e.message : 'Email / PIN salah.';
        err.style.display = 'block';
      }
    })();
  };
  window.ngaLogout = function(){ ngaSetSession(null); location.reload(); };

  /* ============ DATA LAYER ============ */
  // Normalisasi kolom Supabase (lowercase di DB: apikey) <-> camelCase di aplikasi
  function ngaNormPelanggan(r){ if(r){ r.apiKey = r.apiKey || r.apikey || ''; } return r; }
  function ngaNormPelangganDb(p){ var o = Object.assign({}, p); if(o.apiKey !== undefined && o.apikey === undefined){ o.apikey = o.apiKey; delete o.apiKey; } return o; }
  const DB = {
    pelanggan: {
      list(){ return Supa.req('pelanggan','GET',null,'?select=*&order=id.desc').then(function(rows){ return (rows || []).map(ngaNormPelanggan); }); },
      tambah(p){ return Supa.insert('pelanggan', ngaNormPelangganDb(p)); },
      update(id, patch){ return Supa.update('pelanggan', id, ngaNormPelangganDb(patch)); },
      hapus(id){ return Supa.remove('pelanggan', id); }
    },
    halaman: {
      list(pid){ return Supa.req('halaman','GET',null,'?select=*&pelanggan_id=eq.'+encodeURIComponent(pid)+'&order=id').then(function(rows){ return (rows || []).map(function(r){ r.pageId = r.pageId || r.pageid || ''; return r; }); }); },
      tambah(h){ var row = Object.assign({}, h); if(row.pageId !== undefined && row.pageid === undefined){ row.pageid = row.pageId; delete row.pageId; } return Supa.insert('halaman', row); },
      update(id, patch){ var p = Object.assign({}, patch); if(p.pageId !== undefined && p.pageid === undefined){ p.pageid = p.pageId; delete p.pageId; } return Supa.update('halaman', id, p); },
      hapus(id){ return Supa.remove('halaman', id); }
    }
  };

  /* ============ UTIL ============ */
  function esc(s){ var d=document.createElement('div'); d.textContent=(s==null?'':s); return d.innerHTML; }
  var toastEl, toastT;
  window.ngaToast = function(html){
    toastEl.innerHTML = html; toastEl.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(function(){ toastEl.classList.remove('show'); }, 2600);
  };
  window.ngaModal = function(html){ document.getElementById('ngaModalBox').innerHTML = html; document.getElementById('ngaModalBg').classList.add('show'); };
  window.ngaCloseModal = function(){ document.getElementById('ngaModalBg').classList.remove('show'); };
  window.goPage = function(name){
    document.querySelectorAll('#ngaNav button').forEach(function(b){ b.classList.toggle('active', b.dataset.target===name); });
    document.querySelectorAll('.nga-page').forEach(function(p){ p.classList.toggle('active', p.id==='apage-'+name); });
    var t = { ringkasan:'Ringkasan', pelanggan:'Pelanggan', detail:'Detail Pelanggan', paket:'Paket & Harga', setting:'Setting' };
    document.getElementById('ngaPageTitle').textContent = t[name] || name;
    document.getElementById('ngaSidebar').classList.remove('open');
    document.getElementById('ngaOverlay').classList.remove('show');
    window.scrollTo({top:0, behavior:'smooth'});
    if(name==='ringkasan') ringkasanMuat();
    if(name==='pelanggan') pelangganMuat();
  };

  var NGA = { pelanggan: [], q: '', detail: null, dtab: 'akun' };
  function chipAktif(p){
    return (p.aktif === false) ? '<span class="nga-chip gray">NONAKTIF</span>' : '<span class="nga-chip green">AKTIF</span>';
  }
  function chipSetup(p){
    return p.webapp_url ? '<span class="nga-chip green">SIAP</span>' : '<span class="nga-chip gray">MENUNGGU SETUP</span>';
  }

  /* ============ RINGKASAN ============ */
  async function ringkasanMuat(){
    try {
      var pl = await DB.pelanggan.list();
      var hl = await Supa.req('halaman','GET',null,'?select=id');
      var aktif = pl.filter(function(p){ return p.aktif !== false; }).length;
      document.getElementById('ngaStatTotal').textContent = pl.length;
      document.getElementById('ngaStatAktif').textContent = aktif;
      document.getElementById('ngaStatNonaktif').textContent = pl.length - aktif;
      document.getElementById('ngaStatHalaman').textContent = hl.length;
      document.getElementById('ngaRecentBody').innerHTML = pl.slice(0,5).map(function(p){
        return '<tr><td style="color:#fff">' + esc(p.nama) + '</td><td>' + esc(p.email) + '</td><td>' + esc(p.paket||'-') + '</td><td>' + chipAktif(p) + '</td></tr>';
      }).join('') || '<tr><td colspan="4" style="text-align:center;color:#71717a">Belum ada pelanggan.</td></tr>';
      var non = pl.filter(function(p){ return p.aktif === false; });
      document.getElementById('ngaAtensiBody').innerHTML = non.map(function(p){
        return '<tr><td style="color:#fff">' + esc(p.nama) + '</td><td><span class="nga-chip gray">NONAKTIF</span></td><td><button class="nga-btn small green" onclick="pelangganSetAktif(\'' + p.id + '\',true)">Aktifkan</button></td></tr>';
      }).join('') || '<tr><td colspan="3" style="text-align:center;color:#71717a">Semua pelanggan aktif. &#128077;</td></tr>';
    } catch(e){ ngaToast('Gagal muat data: ' + esc(e.message)); }
  }

  /* ============ PELANGGAN: LIST + CRUD ============ */
  async function pelangganMuat(){
    try {
      NGA.pelanggan = await DB.pelanggan.list();
      pelangganRender();
    } catch(e){ ngaToast('Gagal muat pelanggan: ' + esc(e.message)); }
  }
  window.pelangganCari = function(q){ NGA.q = (q||'').toLowerCase(); pelangganRender(); };
  function pelangganRender(){
    var list = NGA.pelanggan.filter(function(p){
      return !NGA.q || (p.nama+' '+p.email).toLowerCase().indexOf(NGA.q) >= 0;
    });
    document.getElementById('ngaTabelBody').innerHTML = list.map(function(p){
      return '<tr><td style="color:#fff">' + esc(p.nama) + '</td><td>' + esc(p.email) + '</td><td>' + esc(p.paket||'-') + '</td><td>' + chipAktif(p) + '</td><td>' + chipSetup(p) + '</td>' +
        '<td style="white-space:nowrap">' +
        '<button class="nga-btn small" onclick="detailBuka(\'' + p.id + '\')">Kelola</button> ' +
        ((p.aktif === false)
          ? '<button class="nga-btn small green" onclick="pelangganSetAktif(\'' + p.id + '\',true)">Aktifkan</button>'
          : '<button class="nga-btn small ghost" onclick="pelangganSetAktif(\'' + p.id + '\',false)">Nonaktifkan</button>') +
        ' <button class="nga-btn small nga-danger" onclick="pelangganHapus(\'' + p.id + '\')">Hapus</button>' +
        '</td></tr>';
    }).join('') || '<tr><td colspan="6" style="text-align:center;color:#71717a">Belum ada pelanggan.</td></tr>';
  }
  window.pelangganSetAktif = async function(id, aktif){
    try { await DB.pelanggan.update(id, { aktif: aktif }); ngaToast(aktif ? 'Pelanggan <b>diaktifkan</b>' : 'Pelanggan <b>dinonaktifkan</b>'); pelangganMuat(); if(document.getElementById('apage-ringkasan').classList.contains('active')) ringkasanMuat(); }
    catch(e){ ngaToast('Gagal: ' + esc(e.message)); }
  };
  window.pelangganHapus = async function(id){
    var p = NGA.pelanggan.find(function(x){ return x.id === id; });
    if(!confirm('Hapus pelanggan "' + (p ? p.nama : id) + '"?\n\nData akun & halamannya dihapus dari Supabase.\nSpreadsheet miliknya TIDAK ikut terhapus (hapus manual di Drive bila perlu).')) return;
    try {
      var hl = await DB.halaman.list(id);
      for(var i = 0; i < hl.length; i++) await DB.halaman.hapus(hl[i].id);
      await DB.pelanggan.hapus(id);
      ngaToast('Pelanggan <b>dihapus</b>');
      pelangganMuat();
    } catch(e){ ngaToast('Gagal: ' + esc(e.message)); }
  };
  function pinAcak(){ return String(Math.floor(1000 + Math.random()*9000)); }
  window.pelangganTambah = function(){
    var pin = pinAcak();
    ngaModal(
      '<h3>&#65291; Tambah Pelanggan</h3>' +
      '<div class="nga-gridform">' +
      '<div class="nga-field"><label class="nga-label">Nama *</label><input class="nga-input" id="mNama" placeholder="Nama pelanggan"></div>' +
      '<div class="nga-field"><label class="nga-label">Email *</label><input class="nga-input" id="mEmail" type="email" placeholder="email@dia.com"></div>' +
      '<div class="nga-field"><label class="nga-label">PIN *</label><input class="nga-input" id="mPin" value="' + pin + '"></div>' +
      '<div class="nga-field"><label class="nga-label">Paket</label><select class="nga-select" id="mPaket"><option>PROMO</option><option>NORMAL</option><option>REGULER</option></select></div>' +
      '<div class="nga-field"><label class="nga-label">Model AI</label><select class="nga-select" id="mModel"><option>gemini-2.5-flash</option><option>gemini-2.5-pro</option><option>gpt-4o-mini</option><option>gpt-4o</option></select></div>' +
      '<div class="nga-field"><label class="nga-label">Web App URL (opsional)</label><input class="nga-input" id="mWebapp" placeholder="Kosongkan = pakai utama"></div>' +
      '<div class="nga-field"><label class="nga-label">Maks. Halaman</label><input class="nga-input" id="mMaxHalaman" type="number" min="1" max="50" value="3"></div>' +
      '</div>' +
      '<p class="nga-muted" style="margin:10px 0">Sistem otomatis: buatkan spreadsheet pelanggan + daftarkan ke Web App.</p>' +
      '<div style="display:flex;gap:10px;justify-content:flex-end"><button class="nga-btn ghost" onclick="ngaCloseModal()">Batal</button><button class="nga-btn" onclick="pelangganSimpanBaru()">Simpan</button></div>'
    );
  };
  window.pelangganSimpanBaru = async function(){
    var nama = document.getElementById('mNama').value.trim();
    var email = document.getElementById('mEmail').value.trim().toLowerCase();
    var pin = document.getElementById('mPin').value.trim();
    if(!nama || !email || !pin){ ngaToast('Nama, email, dan PIN <b>wajib diisi</b>'); return; }
    if(pin.length < 6){ ngaToast('PIN minimal <b>6 karakter</b>'); return; }
    var id = 'cust' + Date.now().toString(36);
    var p = { id: id, nama: nama, email: email, pin: pin,
      paket: document.getElementById('mPaket').value,
      model: document.getElementById('mModel').value, apiKey: '',
      webapp_url: document.getElementById('mWebapp').value.trim(), aktif: true,
      max_halaman: parseInt(document.getElementById('mMaxHalaman').value, 10) || 3 };
    try {
      // Model baru: pelanggan bawa Apps Script + aplikasi Meta sendiri.
      // Spreadsheet TIDAK lagi dibuatkan otomatis — pelanggan ikuti panduan setup,
      // lalu tempel URL Web App-nya (di Setting aplikasi atau kolom Akun di sini).
      await DB.pelanggan.tambah(p);
      try {
        var wu = BACKEND_CONFIG.spreadsheet.webAppUrl;
        var rz = await WApp.post(wu, 'auth_buat', { admin_jwt: Supa.authT.access, email: email, password: pin });
        if(!rz || !rz.ok) throw new Error((rz && rz.error) || 'gagal buat user');
        ngaToast('Pelanggan <b>ditambahkan</b> + user login dibuat &#10003;');
      } catch(e){
        ngaToast('Pelanggan ditambahkan, tapi <b>user login gagal</b>: ' + esc(e.message));
      }
      ngaCloseModal(); pelangganMuat();
    } catch(e){ ngaToast('Gagal: ' + esc(e.message)); }
  };

  /* ============ DETAIL PELANGGAN ============ */
  window.detailBuka = async function(id){
    try {
      var rows = await Supa.req('pelanggan','GET',null,'?select=*&id=eq.'+encodeURIComponent(id));
      if(!rows || !rows[0]){ ngaToast('Pelanggan tidak ditemukan'); return; }
      NGA.detail = rows[0]; NGA.dtab = 'akun';
      document.getElementById('ngaDetailNama').textContent = NGA.detail.nama;
      document.getElementById('ngaDetailSub').textContent = NGA.detail.email + ' • ' + (NGA.detail.paket || '-');
      goPage('detail'); detailTab('akun');
    } catch(e){ ngaToast('Gagal: ' + esc(e.message)); }
  };
  window.detailTab = function(tab){
    NGA.dtab = tab;
    document.querySelectorAll('#ngaDetailTabs button').forEach(function(b){ b.classList.toggle('active', b.dataset.tab === tab); });
    var body = document.getElementById('ngaDetailBody');
    body.innerHTML = '<div class="nga-card" style="text-align:center;color:#71717a">Memuat…</div>';
    if(tab === 'akun') dtabAkun();
    if(tab === 'halaman') dtabHalaman();
    if(tab === 'komentar') dtabKomentar();
    if(tab === 'arsip') dtabArsip();
    if(tab === 'config') dtabConfig();
  };
  function dtabAkun(){
    var p = NGA.detail;
    document.getElementById('ngaDetailBody').innerHTML =
      '<div class="nga-card" style="max-width:640px"><h3>&#128100; Data Akun</h3>' +
      '<div class="nga-gridform">' +
      '<div class="nga-field"><label class="nga-label">Nama</label><input class="nga-input" id="dNama" value="' + esc(p.nama) + '"></div>' +
      '<div class="nga-field"><label class="nga-label">Email</label><input class="nga-input" id="dEmail" value="' + esc(p.email) + '"></div>' +
      '<div class="nga-field"><label class="nga-label">PIN</label><input class="nga-input" id="dPin" value="' + esc(p.pin) + '"></div>' +
      '<div class="nga-field"><label class="nga-label">Paket</label><select class="nga-select" id="dPaket">' +
        ['PROMO','NORMAL','REGULER'].map(function(x){ return '<option' + (p.paket === x ? ' selected' : '') + '>' + x + '</option>'; }).join('') + '</select></div>' +
      '<div class="nga-field"><label class="nga-label">Model AI</label><select class="nga-select" id="dModel">' +
        ['gemini-2.5-flash','gemini-2.5-pro','gpt-4o-mini','gpt-4o'].map(function(x){ return '<option' + (p.model === x ? ' selected' : '') + '>' + x + '</option>'; }).join('') + '</select></div>' +
      '<div class="nga-field"><label class="nga-label">API Key AI</label><input class="nga-input" id="dApiKey" value="' + esc(p.apiKey || '') + '" placeholder="Kosongkan bila belum ada"></div>' +
      '</div>' +
      '<div class="nga-field"><label class="nga-label">Web App URL (akun Google pelaksana)</label><input class="nga-input" id="dWebapp" value="' + esc(p.webapp_url || '') + '" placeholder="Kosongkan = pakai Web App utama"></div>' +
      '<div class="nga-card" style="margin:14px 0"><h3>&#128248; Instagram & Threads</h3>' +
      '<div class="nga-grid2">' +
      '<div class="nga-field"><label class="nga-label">Instagram User ID</label><input class="nga-input" id="dIgUserId" value="' + esc(p.ig_user_id || '') + '" placeholder="cth: 17841400000000000"></div>' +
      '<div class="nga-field"><label class="nga-label">Instagram Access Token</label><input class="nga-input" id="dIgToken" type="password" value="' + esc(p.ig_token || '') + '" placeholder="Token instagram_business_content_publish"></div>' +
      '<div class="nga-field"><label class="nga-label">Threads User ID</label><input class="nga-input" id="dThUserId" value="' + esc(p.threads_user_id || '') + '"></div>' +
      '<div class="nga-field"><label class="nga-label">Threads Access Token</label><input class="nga-input" id="dThToken" type="password" value="' + esc(p.threads_token || '') + '" placeholder="Token threads_content_publish"></div>' +
      '</div></div>' +
      '<div class="nga-field"><label class="nga-label">Status</label><select class="nga-select" id="dAktif"><option value="1"' + (p.aktif !== false ? ' selected' : '') + '>Aktif</option><option value="0"' + (p.aktif === false ? ' selected' : '') + '>Nonaktif</option></select></div>' +
      '<div class="nga-field"><label class="nga-label">Maks. Halaman FB</label><input class="nga-input" id="dMaxHalaman" type="number" min="1" max="50" value="' + (p.max_halaman === undefined || p.max_halaman === null ? 3 : p.max_halaman) + '"><p class="nga-muted" style="margin-top:6px">Standar 3. Tambah 1 halaman = Rp80.000.</p></div>' +
      '<button class="nga-btn" onclick="akunSimpan()">&#128190; Simpan Perubahan</button></div>' +
      '<div class="nga-card" style="max-width:640px;border-color:rgba(239,68,68,.35)"><h3 style="color:#fca5a5">&#9888; Zona Berbahaya</h3>' +
      '<p class="nga-muted" style="margin-bottom:12px">Menghapus akun + seluruh halaman FB-nya dari Supabase. Spreadsheet miliknya tidak ikut terhapus.</p>' +
      '<button class="nga-btn nga-danger" onclick="pelangganHapus(\'' + p.id + '\')">Hapus Pelanggan Ini</button></div>';
  }
  window.akunSimpan = async function(){
    var p = NGA.detail;
    var patch = {
      nama: document.getElementById('dNama').value.trim(),
      email: document.getElementById('dEmail').value.trim().toLowerCase(),
      pin: document.getElementById('dPin').value.trim(),
      paket: document.getElementById('dPaket').value,
      model: document.getElementById('dModel').value,
      apiKey: document.getElementById('dApiKey').value.trim(),
      webapp_url: document.getElementById('dWebapp').value.trim(),
      ig_user_id: document.getElementById('dIgUserId').value.trim(),
      ig_token: document.getElementById('dIgToken').value.trim(),
      threads_user_id: document.getElementById('dThUserId').value.trim(),
      threads_token: document.getElementById('dThToken').value.trim(),
      aktif: document.getElementById('dAktif').value === '1',
      max_halaman: parseInt(document.getElementById('dMaxHalaman').value, 10) || 3
    };
    if(!patch.nama || !patch.email || !patch.pin){ ngaToast('Nama, email, PIN wajib diisi'); return; }
    try {
      await DB.pelanggan.update(p.id, patch);
      Object.assign(NGA.detail, patch);
      document.getElementById('ngaDetailNama').textContent = patch.nama;
      document.getElementById('ngaDetailSub').textContent = patch.email + ' • ' + patch.paket;
      ngaToast('<b>Tersimpan</b>');
    } catch(e){ ngaToast('Gagal: ' + esc(e.message)); }
  };

  /* ---- Tab Halaman ---- */
  async function dtabHalaman(){
    var body = document.getElementById('ngaDetailBody');
    try {
      var list = await DB.halaman.list(NGA.detail.id);
      body.innerHTML =
        '<div class="nga-card"><div class="nga-rowflex" style="justify-content:space-between;margin-bottom:12px"><h3>&#128196; Halaman Facebook (' + list.length + ')</h3><button class="nga-btn small" onclick="halamanTambah()">&#65291; Tambah</button></div>' +
        '<div class="nga-tablewrap"><table class="nga-table"><thead><tr><th>Nama</th><th>Page ID</th><th>Token</th><th>Webhook</th><th>Aksi</th></tr></thead><tbody>' +
        (list.map(function(h){
          var tok = h.token ? esc(String(h.token).slice(0,6)) + '••••••' : '<span class="nga-muted">-</span>';
          return '<tr><td style="color:#fff">' + esc(h.nama) + '</td><td>' + esc(h.pageId || '-') + '</td><td>' + tok + '</td><td>' + esc(h.webhook || '-') + '</td>' +
            '<td style="white-space:nowrap"><button class="nga-btn small ghost" onclick="halamanEdit(\'' + h.id + '\')">Edit</button> ' +
            '<button class="nga-btn small nga-danger" onclick="halamanHapus(\'' + h.id + '\')">Hapus</button></td></tr>';
        }).join('') || '<tr><td colspan="5" style="text-align:center;color:#71717a">Belum ada halaman.</td></tr>') +
        '</tbody></table></div></div>';
      NGA._halaman = list;
    } catch(e){ body.innerHTML = '<div class="nga-card" style="color:#fca5a5">Gagal: ' + esc(e.message) + '</div>'; }
  }
  window.halamanTambah = function(){
    ngaModal('<h3>&#65291; Tambah Halaman</h3>' +
      '<div class="nga-field"><label class="nga-label">Nama Halaman *</label><input class="nga-input" id="hNama"></div>' +
      '<div class="nga-field"><label class="nga-label">Page ID *</label><input class="nga-input" id="hPageId"></div>' +
      '<div class="nga-field"><label class="nga-label">Akses Token</label><input class="nga-input" id="hToken"></div>' +
      '<div class="nga-field"><label class="nga-label">Kode Webhook</label><input class="nga-input" id="hWebhook"></div>' +
      '<div style="display:flex;gap:10px;justify-content:flex-end"><button class="nga-btn ghost" onclick="ngaCloseModal()">Batal</button><button class="nga-btn" onclick="halamanSimpanBaru()">Simpan</button></div>');
  };
  window.halamanSimpanBaru = async function(){
    var nama = document.getElementById('hNama').value.trim();
    var pageId = document.getElementById('hPageId').value.trim();
    if(!nama || !pageId){ ngaToast('Nama & Page ID wajib diisi'); return; }
    try {
      await DB.halaman.tambah({ id: 'h' + Date.now().toString(36), pelanggan_id: NGA.detail.id, nama: nama, pageId: pageId,
        token: document.getElementById('hToken').value.trim(), webhook: document.getElementById('hWebhook').value.trim() });
      ngaCloseModal(); ngaToast('Halaman <b>ditambahkan</b>'); dtabHalaman();
    } catch(e){ ngaToast('Gagal: ' + esc(e.message)); }
  };
  window.halamanEdit = function(id){
    var h = (NGA._halaman || []).find(function(x){ return x.id === id; });
    if(!h) return;
    ngaModal('<h3>&#9998; Edit Halaman</h3>' +
      '<div class="nga-field"><label class="nga-label">Nama Halaman</label><input class="nga-input" id="hNama" value="' + esc(h.nama) + '"></div>' +
      '<div class="nga-field"><label class="nga-label">Page ID</label><input class="nga-input" id="hPageId" value="' + esc(h.pageId || '') + '"></div>' +
      '<div class="nga-field"><label class="nga-label">Akses Token</label><input class="nga-input" id="hToken" value="' + esc(h.token || '') + '"></div>' +
      '<div class="nga-field"><label class="nga-label">Kode Webhook</label><input class="nga-input" id="hWebhook" value="' + esc(h.webhook || '') + '"></div>' +
      '<div style="display:flex;gap:10px;justify-content:flex-end"><button class="nga-btn ghost" onclick="ngaCloseModal()">Batal</button><button class="nga-btn" onclick="halamanSimpanEdit(\'' + h.id + '\')">Simpan</button></div>');
  };
  window.halamanSimpanEdit = async function(id){
    try {
      await DB.halaman.update(id, { nama: document.getElementById('hNama').value.trim(), pageId: document.getElementById('hPageId').value.trim(),
        token: document.getElementById('hToken').value.trim(), webhook: document.getElementById('hWebhook').value.trim() });
      ngaCloseModal(); ngaToast('<b>Tersimpan</b>'); dtabHalaman();
    } catch(e){ ngaToast('Gagal: ' + esc(e.message)); }
  };
  window.halamanHapus = async function(id){
    if(!confirm('Hapus halaman ini?')) return;
    try { await DB.halaman.hapus(id); ngaToast('<b>Dihapus</b>'); dtabHalaman(); }
    catch(e){ ngaToast('Gagal: ' + esc(e.message)); }
  };

  /* ---- Tab Komentar ---- */
  function wbase(){ return WApp.base(NGA.detail); }
  async function dtabKomentar(){
    var body = document.getElementById('ngaDetailBody');
    try {
      var r = await WApp.get(wbase(), { action: 'komentar', pid: NGA.detail.id });
      var list = (r && r.rows) || [];
      NGA._komentar = list;
      body.innerHTML =
        '<div class="nga-card"><div class="nga-rowflex" style="justify-content:space-between;margin-bottom:12px"><h3>&#128172; Komentar (' + list.length + ')</h3><button class="nga-btn small ghost" onclick="detailTab(\'komentar\')">Muat ulang</button></div>' +
        '<p class="nga-muted" style="margin-bottom:12px">Dari spreadsheet pelanggan via Web App.</p>' +
        '<div class="nga-tablewrap"><table class="nga-table"><thead><tr><th>Nama</th><th>Halaman</th><th>Waktu</th><th>Pesan</th><th>Balasan</th><th>Status</th><th>Aksi</th></tr></thead><tbody>' +
        (list.map(function(k){
          var chip = k.status === 'terkirim' ? '<span class="nga-chip green">TERKIRIM</span>' : '<span class="nga-chip orange">REVIEW</span>';
          return '<tr><td style="color:#fff">' + esc(k.nama) + '</td><td>' + esc(k.halaman || '') + '</td><td>' + esc(k.waktu || '') + '</td>' +
            '<td style="max-width:220px">' + esc(k.pesan || '') + '</td><td style="max-width:220px">' + esc(k.balasan || '-') + '</td><td>' + chip + '</td>' +
            '<td style="white-space:nowrap"><button class="nga-btn small ghost" onclick="komentarEditBalasan(\'' + k.id + '\')">Balasan</button> ' +
            '<button class="nga-btn small nga-danger" onclick="komentarHapus(\'' + k.id + '\')">Hapus</button></td></tr>';
        }).join('') || '<tr><td colspan="7" style="text-align:center;color:#71717a">Belum ada komentar.</td></tr>') +
        '</tbody></table></div></div>';
    } catch(e){ body.innerHTML = '<div class="nga-card" style="color:#fca5a5">Gagal: ' + esc(e.message) + '</div>'; }
  }
  window.komentarEditBalasan = function(id){
    var k = (NGA._komentar || []).find(function(x){ return String(x.id) === String(id); });
    if(!k) return;
    ngaModal('<h3>&#128172; Balasan untuk ' + esc(k.nama) + '</h3>' +
      '<p class="nga-muted" style="margin-bottom:10px">"' + esc(k.pesan || '') + '"</p>' +
      '<div class="nga-field"><label class="nga-label">Balasan</label><textarea class="nga-input" id="kBalasan" rows="4">' + esc(k.balasan || '') + '</textarea></div>' +
      '<div class="nga-field"><label class="nga-label">Status</label><select class="nga-select" id="kStatus"><option value="menunggu"' + (k.status !== 'terkirim' ? ' selected' : '') + '>Review</option><option value="terkirim"' + (k.status === 'terkirim' ? ' selected' : '') + '>Terkirim</option></select></div>' +
      '<div style="display:flex;gap:10px;justify-content:flex-end"><button class="nga-btn ghost" onclick="ngaCloseModal()">Batal</button><button class="nga-btn" onclick="komentarSimpanBalasan(\'' + k.id + '\')">Simpan</button></div>');
  };
  window.komentarSimpanBalasan = async function(id){
    try {
      await WApp.post(wbase(), 'komentar_update', { pid: NGA.detail.id, id: id,
        patch: { balasan: document.getElementById('kBalasan').value, status: document.getElementById('kStatus').value } });
      ngaCloseModal(); ngaToast('<b>Tersimpan</b>'); dtabKomentar();
    } catch(e){ ngaToast('Gagal: ' + esc(e.message)); }
  };
  window.komentarHapus = async function(id){
    if(!confirm('Hapus komentar ini dari spreadsheet pelanggan?')) return;
    try { await WApp.post(wbase(), 'komentar_hapus', { pid: NGA.detail.id, id: id }); ngaToast('<b>Dihapus</b>'); dtabKomentar(); }
    catch(e){ ngaToast('Gagal: ' + esc(e.message)); }
  };

  /* ---- Tab Arsip ---- */
  async function dtabArsip(){
    var body = document.getElementById('ngaDetailBody');
    try {
      var r = await WApp.get(wbase(), { action: 'arsip', pid: NGA.detail.id });
      var list = (r && r.rows) || [];
      body.innerHTML = '<div class="nga-card"><h3 style="margin-bottom:12px">&#128193; Arsip Publish (' + list.length + ')</h3>' +
        '<div class="nga-tablewrap"><table class="nga-table"><thead><tr><th>Waktu</th><th>Aksi</th><th>Judul</th><th>Halaman</th><th>Detail</th></tr></thead><tbody>' +
        (list.map(function(a){
          return '<tr><td>' + esc(a.waktu || '') + '</td><td>' + esc(a.aksi || '') + '</td><td style="color:#fff;max-width:260px">' + esc(a.judul || '') + '</td><td>' + esc(a.halaman || '') + '</td><td>' + esc(a.detail || '') + '</td></tr>';
        }).join('') || '<tr><td colspan="5" style="text-align:center;color:#71717a">Arsip kosong.</td></tr>') +
        '</tbody></table></div></div>';
    } catch(e){ body.innerHTML = '<div class="nga-card" style="color:#fca5a5">Gagal: ' + esc(e.message) + '</div>'; }
  }

  /* ---- Tab Config ---- */
  async function dtabConfig(){
    var body = document.getElementById('ngaDetailBody');
    try {
      var r = await WApp.get(wbase(), { action: 'config', pid: NGA.detail.id });
      var cfg = (r && r.config) || {};
      var on = String(cfg.auto_reply) === '1';
      body.innerHTML = '<div class="nga-card" style="max-width:520px"><h3>&#9881; Config Pelanggan</h3>' +
        '<div class="nga-field"><label class="nga-label">Auto-reply komentar</label><select class="nga-select" id="cAutoReply"><option value="1"' + (on ? ' selected' : '') + '>ON</option><option value="0"' + (!on ? ' selected' : '') + '>OFF</option></select></div>' +
        '<button class="nga-btn" onclick="configSimpan()">&#128190; Simpan</button>' +
        '<p class="nga-muted" style="margin-top:12px">Disimpan di sheet Config milik spreadsheet pelanggan.</p></div>';
    } catch(e){ body.innerHTML = '<div class="nga-card" style="color:#fca5a5">Gagal: ' + esc(e.message) + '</div>'; }
  }
  window.configSimpan = async function(){
    try {
      await WApp.post(wbase(), 'config_set', { pid: NGA.detail.id, kunci: 'auto_reply', nilai: document.getElementById('cAutoReply').value });
      ngaToast('<b>Tersimpan</b>');
    } catch(e){ ngaToast('Gagal: ' + esc(e.message)); }
  };

  /* ============ SETTING ADMIN ============ */
  window.adminSimpan = async function(){
    var s = ngaSession(); if(!s) return;
    var patch = { nama: document.getElementById('ngaSetNama').value.trim() };
    var pin = document.getElementById('ngaSetPin').value.trim();
    if(pin) patch.pin = pin;
    try {
      await Supa.update('admin', s.id, patch);
      s.nama = patch.nama; sessionStorage.setItem('nga_admin', JSON.stringify(s));
      document.getElementById('ngaAdminName').textContent = s.nama;
      document.getElementById('ngaSetPin').value = '';
      ngaToast('<b>Tersimpan</b>');
    } catch(e){ ngaToast('Gagal: ' + esc(e.message)); }
  };

  /* ============ INIT ============ */
  toastEl = document.getElementById('ngaToast');
  document.getElementById('ngaModalBg').addEventListener('click', function(e){ if(e.target === this) ngaCloseModal(); });
  document.querySelectorAll('#ngaNav button').forEach(function(b){ b.addEventListener('click', function(){ goPage(b.dataset.target); }); });
  document.getElementById('ngaBurger').addEventListener('click', function(){
    document.getElementById('ngaBurger').classList.toggle('open');
    document.getElementById('ngaSidebar').classList.toggle('open');
    document.getElementById('ngaOverlay').classList.toggle('show');
  });
  document.getElementById('ngaOverlay').addEventListener('click', function(){
    document.getElementById('ngaSidebar').classList.remove('open'); this.classList.remove('show');
  });
  ['ngaLoginEmail','ngaLoginPin'].forEach(function(id){
    document.getElementById(id).addEventListener('keydown', function(e){ if(e.key === 'Enter') ngaDoLogin(); });
  });

  if(!ngaSession()){
    document.getElementById('nga-login').style.display = 'flex';
  } else {
    var s = ngaSession();
    if(s && s._auth) Supa.authT = { access:s._auth.access, refresh:s._auth.refresh, exp:s._auth.exp };
    document.getElementById('ngaApp').style.display = 'flex';
    document.getElementById('ngaAdminName').textContent = s.nama || 'Admin';
    document.getElementById('ngaSetNama').value = s.nama || '';
    document.getElementById('ngaSetEmail').value = s.email || '';
    ringkasanMuat();
  }
})();

})();
