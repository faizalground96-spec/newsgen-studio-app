-- MIGRASI KEAMANAN NewsGen Studio: aktifkan RLS + kebijakan akses
-- JALANKAN INI SETELAH kode login Auth ter-deploy (jika dijalankan lebih dulu, aplikasi terkunci!)
-- Dijalankan via Supabase Dashboard → SQL Editor

-- 1. Tandai admin (via app_metadata, hanya bisa diubah pakai service_role)
UPDATE auth.users
SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
WHERE email = 'admin@newsgen.id';

-- 2. Aktifkan RLS
ALTER TABLE public.pelanggan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.halaman ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin ENABLE ROW LEVEL SECURITY;

-- 2b. Tabel admin lama: hanya role admin (tidak dipakai aplikasi baru, tapi amankan)
DROP POLICY IF EXISTS "admin_only" ON public.admin;
CREATE POLICY "admin_only" ON public.admin
  FOR ALL USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- 3. Kebijakan tabel pelanggan
DROP POLICY IF EXISTS "pelanggan_own_select" ON public.pelanggan;
CREATE POLICY "pelanggan_own_select" ON public.pelanggan
  FOR SELECT USING (email = (auth.jwt() ->> 'email'));

DROP POLICY IF EXISTS "pelanggan_own_update" ON public.pelanggan;
CREATE POLICY "pelanggan_own_update" ON public.pelanggan
  FOR UPDATE USING (email = (auth.jwt() ->> 'email'));

DROP POLICY IF EXISTS "pelanggan_admin_all" ON public.pelanggan;
CREATE POLICY "pelanggan_admin_all" ON public.pelanggan
  FOR ALL USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- 4. Kebijakan tabel halaman (milik pelanggan sendiri, atau admin)
DROP POLICY IF EXISTS "halaman_own_all" ON public.halaman;
CREATE POLICY "halaman_own_all" ON public.halaman
  FOR ALL USING (
    pelanggan_id IN (SELECT id FROM public.pelanggan WHERE email = (auth.jwt() ->> 'email'))
  );

DROP POLICY IF EXISTS "halaman_admin_all" ON public.halaman;
CREATE POLICY "halaman_admin_all" ON public.halaman
  FOR ALL USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- 5. Hapus PIN plaintext setelah migrasi terverifikasi (JALANKAN MANUAL TERAKHIR)
-- UPDATE public.pelanggan SET pin = '' WHERE pin <> '';
-- UPDATE public.admin SET pin = '' WHERE pin <> '';
