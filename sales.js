/* NewsGen Studio — sales.js (di-load via CDN) */
(function(){
  var root = document.getElementById('newsgen-sales-root');
  if(!root){ root = document.createElement('div'); root.id = 'newsgen-sales-root'; document.body.appendChild(root); }
  root.innerHTML = `
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  .ngs { font-family:'Segoe UI',system-ui,-apple-system,Roboto,Arial,sans-serif; background:#0a0a0d; color:#e4e4e7; line-height:1.6; }
  .ngs a { text-decoration:none; }
  .ngs-wrap { max-width:1120px; margin:0 auto; padding:0 20px; }
  /* header */
  .ngs-header { position:sticky; top:0; z-index:50; background:rgba(10,10,13,.92); backdrop-filter:blur(8px); border-bottom:1px solid #27272a; }
  .ngs-header .ngs-wrap { display:flex; align-items:center; justify-content:space-between; padding-top:12px; padding-bottom:12px; }
  .ngs-logo { font-weight:900; font-size:18px; color:#fff; }
  .ngs-logo span { color:#f59e0b; }
  .ngs-btn { display:inline-block; background:#f59e0b; color:#000; font-weight:800; padding:12px 28px; border-radius:999px; font-size:15px; border:none; cursor:pointer; transition:transform .15s, box-shadow .15s; }
  .ngs-btn:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(245,158,11,.35); }
  .ngs-btn.small { padding:9px 20px; font-size:13px; }
  .ngs-btn.big { padding:16px 40px; font-size:18px; width:100%; text-align:center; }
  .ngs-btn.green { background:#22c55e; color:#fff; }
  .ngs-btn.green:hover { box-shadow:0 8px 24px rgba(34,197,94,.35); }
  /* hero */
  .ngs-hero { text-align:center; padding:56px 0 40px; }
  .ngs-badge { display:inline-block; background:rgba(245,158,11,.12); border:1px solid rgba(245,158,11,.4); color:#fbbf24; font-size:12px; font-weight:700; letter-spacing:2px; padding:8px 18px; border-radius:999px; margin-bottom:20px; }
  .ngs-hero h1 { font-size:34px; line-height:1.25; font-weight:900; color:#fff; margin-bottom:16px; }
  .ngs-hero h1 .hl { color:#f59e0b; }
  .ngs-hero p.sub { font-size:17px; color:#a1a1aa; margin-bottom:28px; }
  .ngs-price-anchor { margin:24px 0; }
  .ngs-price-anchor .coret { color:#71717a; text-decoration:line-through; font-size:20px; }
  .ngs-price-anchor .harga { color:#fff; font-size:46px; font-weight:900; display:block; margin:4px 0; }
  .ngs-price-anchor .hemat { display:inline-block; background:#22c55e; color:#fff; font-size:13px; font-weight:800; padding:4px 14px; border-radius:999px; }
  .ngs-note { font-size:13px; color:#71717a; margin-top:14px; }
  /* sections */
  .ngs-section { padding:44px 0; }
  .ngs-section h2 { font-size:26px; font-weight:900; color:#fff; text-align:center; margin-bottom:8px; }
  .ngs-section .desc { text-align:center; color:#a1a1aa; margin-bottom:28px; font-size:15px; }
  /* pain */
  .ngs-pain { background:#111113; border:1px solid #27272a; border-radius:16px; padding:8px 0; }
  .ngs-pain li { list-style:none; padding:14px 20px; border-bottom:1px solid #1f1f23; font-size:15px; display:flex; gap:12px; align-items:flex-start; }
  .ngs-pain li:last-child { border-bottom:none; }
  .ngs-pain .x { color:#f87171; font-weight:900; flex-shrink:0; }
  /* features */
  .ngs-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; }
  .ngs-card { background:#111113; border:1px solid #27272a; border-radius:16px; padding:20px 16px; }
  .ngs-card .ico { font-size:28px; margin-bottom:10px; }
  .ngs-card h3 { font-size:15px; color:#fff; margin-bottom:6px; }
  .ngs-card p { font-size:13px; color:#a1a1aa; }
  /* steps */
  .ngs-step { display:flex; gap:16px; margin-bottom:20px; align-items:flex-start; }
  .ngs-step .num { background:#f59e0b; color:#000; font-weight:900; width:38px; height:38px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:17px; }
  .ngs-step h3 { color:#fff; font-size:16px; margin-bottom:4px; }
  .ngs-step p { color:#a1a1aa; font-size:14px; }
  /* pricing */
  .ngs-pricing { background:linear-gradient(180deg,#141417,#0e0e11); border:2px solid #f59e0b; border-radius:20px; padding:36px 28px; text-align:center; position:relative; }
  .ngs-pricing .tag { position:absolute; top:-16px; left:50%; transform:translateX(-50%); background:#f59e0b; color:#000; font-size:12px; font-weight:900; letter-spacing:1px; padding:6px 20px; border-radius:999px; white-space:nowrap; }
  .ngs-pricing .coret { color:#71717a; text-decoration:line-through; font-size:22px; }
  .ngs-pricing .harga { color:#fff; font-size:56px; font-weight:900; line-height:1.1; margin:6px 0; }
  .ngs-pricing ul { text-align:left; margin:24px 0; }
  .ngs-pricing li { list-style:none; padding:10px 0; border-bottom:1px solid #1f1f23; font-size:15px; display:flex; gap:10px; }
  .ngs-pricing li:last-child { border-bottom:none; }
  .ngs-pricing .cek { color:#22c55e; font-weight:900; flex-shrink:0; }
  /* faq */
  .ngs-faq-item { background:#111113; border:1px solid #27272a; border-radius:12px; margin-bottom:10px; overflow:hidden; }
  .ngs-faq-q { width:100%; background:none; border:none; color:#fff; font-size:15px; font-weight:700; text-align:left; padding:16px 18px; cursor:pointer; display:flex; justify-content:space-between; align-items:center; gap:10px; font-family:inherit; }
  .ngs-faq-q .arr { color:#f59e0b; transition:transform .2s; flex-shrink:0; }
  .ngs-faq-item.open .ngs-faq-q .arr { transform:rotate(180deg); }
  .ngs-faq-a { max-height:0; overflow:hidden; transition:max-height .25s ease; color:#a1a1aa; font-size:14px; }
  .ngs-faq-a div { padding:0 18px 16px; }
  /* final cta */
  .ngs-final { text-align:center; padding:56px 0 64px; }
  .ngs-final h2 { font-size:30px; margin-bottom:12px; }
  /* floating wa */
  .ngs-wa-float { position:fixed; bottom:20px; right:20px; z-index:60; background:#22c55e; color:#fff; width:58px; height:58px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:28px; box-shadow:0 6px 20px rgba(34,197,94,.45); }
  /* reveal */
  .ngs-reveal { opacity:0; transform:translateY(24px); transition:opacity .5s, transform .5s; }
  .ngs-reveal.show { opacity:1; transform:none; }
  @media (max-width:860px) {
    .ngs-grid { grid-template-columns:1fr 1fr; }
  }
  @media (max-width:520px) {
    .ngs-hero h1 { font-size:27px; }
    .ngs-grid { grid-template-columns:1fr; }
    .ngs-price-anchor .harga { font-size:38px; }
    .ngs-pricing .harga { font-size:44px; }
  }
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

<div class="ngs">

  <!-- HEADER -->
  <div class="ngs-header">
    <div class="ngs-wrap">
      <div class="ngs-logo">NewsGen <span>Studio</span></div>
      <a class="ngs-btn small" href="#harga">Dapatkan Sekarang</a>
    </div>
  </div>

  <!-- HERO -->
  <div class="ngs-wrap">
    <div class="ngs-hero ngs-reveal">
      <div class="ngs-badge">TOOL KONTEN BERITA FACEBOOK</div>
      <h1>Kelola 4 Halaman Berita Facebook <span class="hl">Tanpa Begadang</span> Setiap Malam</h1>
      <p class="sub">NewsGen Studio: cari berita yang lagi viral &rarr; jadi kartu siap posting + caption AI + komentar kebalas otomatis. Semua dari satu dashboard, cukup buka browser.</p>
      <div class="ngs-price-anchor">
        <span class="coret">Rp450.000</span>
        <span class="harga">Rp199.000</span>
        <span class="hemat">HEMAT 56%</span>
      </div>
      <a class="ngs-btn big green" href="https://wa.me/6280000000000?text=Halo%2C%20saya%20mau%20beli%20NewsGen%20Studio%20(Rp199.000)" target="_blank" rel="noopener">&#128241; Pesan via WhatsApp</a>
      <p class="ngs-note">Klik tombol di atas, kamu langsung terhubung via WhatsApp.</p>
    </div>
  </div>

  <!-- MASALAH -->
  <div class="ngs-wrap">
    <div class="ngs-section ngs-reveal">
      <h2>Kedengarannya Familiar?</h2>
      <p class="desc">Kalau kamu admin halaman berita, pasti pernah ngerasain ini:</p>
      <ul class="ngs-pain">
        <li><span class="x">&#10007;</span> Tiap hari scroll cari berita viral, satu-satu, makan waktu berjam-jam.</li>
        <li><span class="x">&#10007;</span> Bikin gambar kartu + ngetik caption manual untuk tiap halaman — capek dan nggak konsisten.</li>
        <li><span class="x">&#10007;</span> Komentar penonton numpuk nggak kebalas, engagement halaman turun pelan-pelan.</li>
        <li><span class="x">&#10007;</span> Mau posting terjadwal? Harus online terus atau pakai banyak tool terpisah.</li>
      </ul>
    </div>
  </div>

  <!-- FITUR -->
  <div class="ngs-wrap">
    <div class="ngs-section ngs-reveal">
      <h2>Kenalin: NewsGen Studio</h2>
      <p class="desc">Satu dashboard untuk seluruh alur konten beritamu:</p>
      <div class="ngs-grid">
        <div class="ngs-card"><div class="ico">&#128246;</div><h3>Radar Berita</h3><p>Berita terbaru dari berbagai sumber terkumpul otomatis, urut dari yang paling baru.</p></div>
        <div class="ngs-card"><div class="ico">&#127912;</div><h3>Studio Konten</h3><p>Berita jadi kartu gambar 1080&times;1350 siap posting, lengkap dengan judul dan deskripsi.</p></div>
        <div class="ngs-card"><div class="ico">&#9997;</div><h3>Caption AI</h3><p>Caption + komentar pancingan dibuatkan AI, tinggal edit sedikit lalu terbit.</p></div>
        <div class="ngs-card"><div class="ico">&#128172;</div><h3>Auto-Balas Komentar</h3><p>Komentar masuk terjawab otomatis dengan gaya bahasa yang natural.</p></div>
        <div class="ngs-card"><div class="ico">&#128197;</div><h3>Antrean Publish</h3><p>Jadwalkan postingan untuk berhari-hari ke depan. Sekali setting, jalan sendiri.</p></div>
        <div class="ngs-card"><div class="ico">&#128202;</div><h3>Insight Halaman</h3><p>Lihat postingan mana yang performanya paling bagus, jadi tahu pola yang works.</p></div>
      </div>
    </div>
  </div>

  <!-- CARA KERJA -->
  <div class="ngs-wrap">
    <div class="ngs-section ngs-reveal">
      <h2>Cara Kerjanya Simpel</h2>
      <p class="desc">Tiga langkah, beres:</p>
      <div class="ngs-step"><div class="num">1</div><div><h3>Cari berita di Radar</h3><p>Buka menu Radar, pilih berita yang lagi panas. Bisa juga tempel teks berita sendiri.</p></div></div>
      <div class="ngs-step"><div class="num">2</div><div><h3>Generate jadi konten</h3><p>Klik Generate — AI buatkan judul, kartu gambar, caption, dan komentar pancingan.</p></div></div>
      <div class="ngs-step"><div class="num">3</div><div><h3>Terbitkan / jadwalkan</h3><p>Posting sekarang atau masuk antrean terjadwal. Komentar yang masuk kebalas otomatis.</p></div></div>
    </div>
  </div>

  <!-- HARGA -->
  <div class="ngs-wrap" id="harga">
    <div class="ngs-section ngs-reveal">
      <h2>Harga Spesial</h2>
      <p class="desc">Satu harga, semua fitur kebuka:</p>
      <div class="ngs-pricing">
        <div class="tag">PROMO TERBATAS</div>
        <div class="coret">Rp450.000</div>
        <div class="harga">Rp199.000</div>
        <ul>
          <li><span class="cek">&#10003;</span> Akses penuh NewsGen Studio</li>
          <li><span class="cek">&#10003;</span> Radar Berita + Studio Konten + Caption AI</li>
          <li><span class="cek">&#10003;</span> Auto-balas komentar + antrean publish</li>
          <li><span class="cek">&#10003;</span> Kelola banyak halaman Facebook sekaligus</li>
          <li><span class="cek">&#10003;</span> Panduan pemakaian lengkap</li>
        </ul>
        <a class="ngs-btn big green" href="https://wa.me/6280000000000?text=Halo%2C%20saya%20mau%20beli%20NewsGen%20Studio%20(Rp199.000)" target="_blank" rel="noopener">&#128241; Ya, Saya Mau — Rp199.000</a>
        <p class="ngs-note">Setelah klik, kamu diarahkan ke WhatsApp untuk proses selanjutnya.</p>
      </div>
    </div>
  </div>

  <!-- FAQ -->
  <div class="ngs-wrap">
    <div class="ngs-section ngs-reveal">
      <h2>Pertanyaan Umum</h2>
      <p class="desc">Yang sering ditanyakan:</p>
      <div class="ngs-faq-item">
        <button class="ngs-faq-q">Apakah perlu install aplikasi? <span class="arr">&#9660;</span></button>
        <div class="ngs-faq-a"><div>Tidak. NewsGen Studio jalan langsung di browser HP atau laptop — buka link-nya, login, langsung pakai.</div></div>
      </div>
      <div class="ngs-faq-item">
        <button class="ngs-faq-q">Bagaimana cara bayarnya? <span class="arr">&#9660;</span></button>
        <div class="ngs-faq-a"><div>Klik tombol WhatsApp di halaman ini, kamu akan diarahkan untuk chat langsung dan dipandu proses pembayarannya.</div></div>
      </div>
      <div class="ngs-faq-item">
        <button class="ngs-faq-q">Apakah bisa untuk lebih dari 1 halaman Facebook? <span class="arr">&#9660;</span></button>
        <div class="ngs-faq-a"><div>Bisa. Kamu bisa daftarkan dan kelola banyak halaman sekaligus dari satu dashboard.</div></div>
      </div>
      <div class="ngs-faq-item">
        <button class="ngs-faq-q">Saya gaptek, apakah sulit dipakai? <span class="arr">&#9660;</span></button>
        <div class="ngs-faq-a"><div>Alurnya dibuat simpel: cari berita &rarr; generate &rarr; terbit. Ada panduan lengkapnya juga.</div></div>
      </div>
    </div>
  </div>

  <!-- FINAL CTA -->
  <div class="ngs-wrap">
    <div class="ngs-final ngs-reveal">
      <h2>Siap Naik Level Konten Beritamu?</h2>
      <p class="desc">Harga promo Rp199.000 <span style="text-decoration:line-through;color:#71717a">Rp450.000</span> — amankan sekarang.</p>
      <a class="ngs-btn big green" href="https://wa.me/6280000000000?text=Halo%2C%20saya%20mau%20beli%20NewsGen%20Studio%20(Rp199.000)" target="_blank" rel="noopener">&#128241; Pesan via WhatsApp</a>
    </div>
  </div>

  <div class="ngs-wrap" style="text-align:center;padding-bottom:40px;">
    <p class="ngs-note">&copy; 2026 NewsGen Studio</p>
  </div>

  <a class="ngs-wa-float" href="https://wa.me/6280000000000?text=Halo%2C%20saya%20mau%20beli%20NewsGen%20Studio%20(Rp199.000)" target="_blank" rel="noopener" aria-label="Chat WhatsApp">&#128241;</a>

</div>
`;

(function(){
  // FAQ accordion
  document.querySelectorAll('.ngs-faq-q').forEach(function(btn){
    btn.addEventListener('click', function(){
      var item = btn.parentElement;
      var ans = item.querySelector('.ngs-faq-a');
      var open = item.classList.contains('open');
      document.querySelectorAll('.ngs-faq-item.open').forEach(function(o){
        o.classList.remove('open');
        o.querySelector('.ngs-faq-a').style.maxHeight = null;
      });
      if (!open) {
        item.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });
  // Reveal on scroll
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.ngs-reveal').forEach(function(el){ io.observe(el); });
  // Smooth scroll untuk link #harga
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(ev){
      var t = document.querySelector(a.getAttribute('href'));
      if (t) { ev.preventDefault(); t.scrollIntoView({ behavior:'smooth' }); }
    });
  });
})();

})();
