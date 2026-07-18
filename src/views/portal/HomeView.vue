<template>
  <div class="home-page">
    <NavbarPortal />

    <!-- HERO -->
    <section class="hero">
      <div class="hero-bg-pattern"></div>
      <div class="hero-inner">
        <div class="hero-content">
          <span class="hero-badge">
            <span class="material-symbols-rounded">verified</span>
            Platform Investasi UMKM Jawa Timur
          </span>
          <h1 class="hero-title">
            Hubungkan <span class="hero-highlight">UMKM Potensial</span><br />
            dengan Investor Tepat
          </h1>
          <p class="hero-desc">
            Connect.id mempertemukan pelaku UMKM Jawa Timur dengan investor melalui
            dashboard data bisnis yang transparan dan terverifikasi.
          </p>
          <div class="hero-actions">
            <router-link to="/daftar" class="btn-primary hero-btn">
              <span class="material-symbols-rounded">rocket_launch</span>
              Mulai Sekarang
            </router-link>
            <router-link to="/direktori" class="btn-secondary hero-btn">
              <span class="material-symbols-rounded">store</span>
              Lihat Direktori UMKM
            </router-link>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-card hero-card-main">
            <div class="hc-header">
              <span class="material-symbols-rounded hc-icon">store</span>
              <div>
                <div class="hc-name">Keripik Tempe Jaya</div>
                <div class="hc-sub">Sidoarjo · Kuliner</div>
              </div>
              <span class="badge-verified ml-auto">
                <span class="material-symbols-rounded" style="font-size:0.9rem">verified</span>
                Terverifikasi
              </span>
            </div>
            <div class="hc-stats">
              <div class="hc-stat">
                <span class="hc-stat-val">Rp 28,5 Jt</span>
                <span class="hc-stat-lbl">Omzet/Bln</span>
              </div>
              <div class="hc-stat">
                <span class="hc-stat-val">Rp 45 Jt</span>
                <span class="hc-stat-lbl">Butuh Modal</span>
              </div>
              <div class="hc-stat">
                <span class="hc-stat-val">3</span>
                <span class="hc-stat-lbl">Investor Minat</span>
              </div>
            </div>
          </div>
          <div class="hero-card hero-card-mini">
            <span class="material-symbols-rounded" style="color:#1A6FD4;font-size:1.25rem">trending_up</span>
            <div>
              <div style="font-weight:600;font-size:0.9rem;color:#0f172a">850+ Investor</div>
              <div style="font-size:0.75rem;color:#64748b">Terdaftar & Aktif</div>
            </div>
          </div>
          <div class="hero-card hero-card-mini hero-card-mini-2">
            <span class="material-symbols-rounded" style="color:#1A6FD4;font-size:1.25rem">handshake</span>
            <div>
              <div style="font-weight:600;font-size:0.9rem;color:#0f172a">Rp 150 M+</div>
              <div style="font-size:0.75rem;color:#64748b">Total Dana Tersalur</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="stats-section">
      <div class="stats-inner">
        <div class="stat-item" v-for="s in stats" :key="s.label">
          <span class="material-symbols-rounded stat-icon">{{ s.icon }}</span>
          <div class="stat-val">{{ s.value }}</div>
          <div class="stat-lbl">{{ s.label }}</div>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="how-section">
      <div class="section-inner">
        <div class="section-header">
          <span class="section-badge">Cara Kerja</span>
          <h2 class="section-title">4 Langkah Menuju Investasi</h2>
          <p class="section-desc">Proses yang sederhana, transparan, dan aman untuk semua pihak.</p>
        </div>
        <div class="steps-grid">
          <div class="step-card" v-for="(step, i) in steps" :key="i">
            <div class="step-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <span class="material-symbols-rounded step-icon">{{ step.icon }}</span>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-desc">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURED UMKM -->
    <section class="featured-section">
      <div class="section-inner">
        <div class="section-header">
          <span class="section-badge">Direktori</span>
          <h2 class="section-title">UMKM Unggulan Jawa Timur</h2>
          <p class="section-desc">Profil bisnis terverifikasi siap menarik investasi.</p>
        </div>
        <div class="umkm-grid">
          <div class="umkm-card" v-for="u in featuredUmkm" :key="u.id">
            <div class="umkm-card-header">
              <div class="umkm-avatar">{{ u.namaUmkm?.[0] ?? u.nama?.[0] ?? '?' }}</div>
              <div class="umkm-info">
                <div class="umkm-name">{{ u.namaUmkm ?? u.nama }}</div>
                <div class="umkm-sub">{{ u.pemilik ?? u.kota }}</div>
              </div>
              <span v-if="u.isLegalitasVerified || u.status === 'verified'" class="badge-verified ml-auto">
                <span class="material-symbols-rounded" style="font-size:0.9rem">verified</span>
              </span>
              <span v-else class="badge-pending ml-auto">
                <span class="material-symbols-rounded" style="font-size:0.9rem">pending</span>
              </span>
            </div>
            <p class="umkm-desc">{{ (u.deskripsi ?? '').slice(0, 100) }}...</p>
            <div class="umkm-tags">
              <span class="tag">{{ u.sektor }}</span>
              <span class="tag">{{ u.jumlahKaryawan }} karyawan</span>
              <span class="tag">{{ u.tahunBerdiri }}</span>
            </div>
            <div class="umkm-metrics">
              <div class="metric">
                <span class="metric-val">{{ formatRp(u.omzet) }}</span>
                <span class="metric-lbl">Omzet/bln</span>
              </div>
              <div class="metric">
                <span class="metric-val">{{ formatRp(u.kebutuhanModal) }}</span>
                <span class="metric-lbl">Butuh Modal</span>
              </div>
              <div class="metric">
                <span class="metric-val">{{ u.totalInvestorBerminat }}</span>
                <span class="metric-lbl">Investor</span>
              </div>
            </div>
            <router-link :to="`/umkm/${u.id}`" class="btn-primary umkm-btn">
              Lihat Profil
              <span class="material-symbols-rounded">arrow_forward</span>
            </router-link>
          </div>
        </div>
        <div class="text-center mt-10">
          <router-link to="/direktori" class="btn-secondary" style="display:inline-flex;align-items:center;gap:0.5rem">
            Lihat Semua UMKM
            <span class="material-symbols-rounded">arrow_forward</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- SECTOR HIGHLIGHT -->
    <section class="sector-section">
      <div class="section-inner">
        <div class="section-header">
          <span class="section-badge">Sektor</span>
          <h2 class="section-title">Peluang di Berbagai Sektor</h2>
        </div>
        <div class="sector-grid">
          <div class="sector-card" v-for="s in sectors" :key="s.name">
            <span class="material-symbols-rounded sector-icon">{{ s.icon }}</span>
            <div class="sector-name">{{ s.name }}</div>
            <div class="sector-count">{{ s.count }} UMKM</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA BANNER -->
    <section class="cta-section">
      <div class="cta-inner">
        <span class="material-symbols-rounded cta-icon">rocket_launch</span>
        <h2 class="cta-title">Siap Bergabung dengan Connect.id?</h2>
        <p class="cta-desc">Daftarkan diri kamu sekarang — gratis untuk UMKM, investor, dan mentor.</p>
        <div class="cta-actions">
          <router-link to="/daftar" class="cta-btn-primary">Daftar Sekarang</router-link>
          <router-link to="/login" class="cta-btn-secondary">Sudah Punya Akun? Masuk</router-link>
        </div>
      </div>
    </section>

    <FooterPortal />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import NavbarPortal from '../../components/portal/layout/NavbarPortal.vue'
import FooterPortal from '../../components/portal/layout/FooterPortal.vue'
import { umkmMock } from '../../data/umkm.mock.js'

const featuredUmkm = computed(() => umkmMock.slice(0, 3))

const formatRp = (val) => {
  if (!val) return '-'
  if (val >= 1_000_000_000) return `Rp ${(val / 1_000_000_000).toFixed(0)} M`
  if (val >= 1_000_000) return `Rp ${(val / 1_000_000).toFixed(0)} Jt`
  return `Rp ${val.toLocaleString('id-ID')}`
}

const stats = [
  { icon: 'store',    value: '12.500+',   label: 'UMKM Terdaftar' },
  { icon: 'groups',   value: '850+',      label: 'Investor Aktif' },
  { icon: 'payments', value: 'Rp 150 M+', label: 'Dana Tersalur' },
  { icon: 'verified', value: '3.200+',    label: 'UMKM Terverifikasi' },
]

const steps = [
  { icon: 'app_registration', title: 'Daftar & Verifikasi',       desc: 'Buat akun sesuai peranmu. Admin akan memverifikasi kelengkapan dokumen legalitas.' },
  { icon: 'insert_chart',     title: 'Lengkapi Profil Bisnis',    desc: 'UMKM mengisi data keuangan, legalitas, dan media untuk membangun profil investor-ready.' },
  { icon: 'manage_search',    title: 'Investor Temukan Peluang',  desc: 'Investor menjelajahi direktori, menganalisis data BI dashboard, dan menghubungi UMKM pilihan.' },
  { icon: 'handshake',        title: 'Koneksi & Investasi',       desc: 'Komunikasi langsung terjadi di platform. Mentor mendampingi proses hingga deal tercapai.' },
]

const sectors = [
  { icon: 'restaurant',              name: 'Kuliner',      count: 4820 },
  { icon: 'checkroom',               name: 'Fashion',      count: 2150 },
  { icon: 'agriculture',             name: 'Pertanian',    count: 1890 },
  { icon: 'precision_manufacturing', name: 'Manufaktur',   count: 1340 },
  { icon: 'storefront',              name: 'Perdagangan',  count: 1620 },
  { icon: 'spa',                     name: 'Kecantikan',   count: 680  },
]
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Inter', sans-serif;
  background: #F0F6FF;
}

/* ── HERO ───────────────────────────────────── */
.hero {
  position: relative;
  background: linear-gradient(135deg, #EBF3FF 0%, #F0F6FF 50%, #E3EDFF 100%);
  overflow: hidden;
  padding: 5rem 0 4rem;
}

.hero-bg-pattern {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 20% 50%, rgba(26,111,212,0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(13,79,163,0.05) 0%, transparent 40%);
  pointer-events: none;
}

.hero-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: white;
  color: #1A6FD4;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.4rem 0.9rem;
  border-radius: 99px;
  border: 1px solid #9DC4FF;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 4px rgba(26,111,212,0.1);
}
.hero-badge .material-symbols-rounded { font-size: 1rem; }

.hero-title {
  font-size: 2.75rem;
  font-weight: 800;
  color: #0A3570;
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin-bottom: 1.25rem;
}

.hero-highlight {
  color: #1A6FD4;
}

.hero-desc {
  font-size: 1rem;
  color: #4A6080;
  line-height: 1.7;
  max-width: 480px;
  margin-bottom: 2rem;
}

.hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }

.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  padding: 0.7rem 1.4rem;
}

/* Hero Visual */
.hero-visual { position: relative; height: 320px; }

.hero-card {
  position: absolute;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(26,111,212,0.12);
  border: 1px solid #C5DCFF;
}

.hero-card-main { width: 100%; padding: 1.25rem; top: 20px; }

.hc-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.hc-icon {
  font-size: 1.5rem;
  color: #1A6FD4;
  background: #EBF3FF;
  padding: 0.5rem;
  border-radius: 0.6rem;
}

.hc-name { font-weight: 700; font-size: 0.95rem; color: #0A3570; }
.hc-sub  { font-size: 0.75rem; color: #7A9BBF; }

.hc-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  background: #F0F6FF;
  border-radius: 0.75rem;
  padding: 0.875rem;
}

.hc-stat { text-align: center; }
.hc-stat-val { display: block; font-weight: 700; font-size: 0.95rem; color: #1A6FD4; }
.hc-stat-lbl { display: block; font-size: 0.7rem; color: #9BB5CF; margin-top: 0.2rem; }

.hero-card-mini {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  bottom: 30px;
  left: -20px;
}
.hero-card-mini-2 { left: auto; right: -10px; bottom: 80px; }

/* ── STATS ──────────────────────────────────── */
.stats-section {
  background: linear-gradient(135deg, #1A6FD4 0%, #0D4FA3 100%);
  padding: 2.5rem 1.5rem;
}

.stats-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.stat-item { text-align: center; padding: 1.5rem 1rem; }

.stat-icon {
  font-size: 1.75rem;
  color: rgba(255,255,255,0.45);
  display: block;
  margin-bottom: 0.5rem;
}

.stat-val {
  font-size: 1.75rem;
  font-weight: 800;
  color: white;
  letter-spacing: -0.02em;
}

.stat-lbl {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.6);
  margin-top: 0.25rem;
}

/* ── SECTIONS ───────────────────────────────── */
.section-inner { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }

.section-header { text-align: center; margin-bottom: 3rem; }

.section-badge {
  display: inline-block;
  background: #EBF3FF;
  color: #1A6FD4;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.3rem 0.9rem;
  border-radius: 99px;
  margin-bottom: 0.75rem;
}

.section-title {
  font-size: 1.875rem;
  font-weight: 800;
  color: #0A3570;
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
}

.section-desc {
  font-size: 0.95rem;
  color: #6A8BAA;
  max-width: 480px;
  margin: 0 auto;
  line-height: 1.7;
}

/* ── HOW IT WORKS ───────────────────────────── */
.how-section { padding: 5rem 1.5rem; background: white; }

.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.step-card {
  background: #F0F6FF;
  border-radius: 1rem;
  padding: 1.75rem 1.25rem;
  border: 1px solid #C5DCFF;
  transition: transform 0.2s, box-shadow 0.2s;
}

.step-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(26,111,212,0.12);
}

.step-num {
  font-size: 2.5rem;
  font-weight: 900;
  color: #9DC4FF;
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.step-icon {
  font-size: 1.75rem;
  color: #1A6FD4;
  display: block;
  margin-bottom: 1rem;
}

.step-title { font-size: 0.95rem; font-weight: 700; color: #0A3570; margin-bottom: 0.5rem; }
.step-desc  { font-size: 0.82rem; color: #6A8BAA; line-height: 1.6; }

/* ── FEATURED UMKM ──────────────────────────── */
.featured-section { padding: 5rem 1.5rem; background: #F0F6FF; }

.umkm-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.umkm-card {
  background: white;
  border: 1px solid #C5DCFF;
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: box-shadow 0.2s, transform 0.2s;
}

.umkm-card:hover {
  box-shadow: 0 8px 28px rgba(26,111,212,0.12);
  transform: translateY(-3px);
}

.umkm-card-header { display: flex; align-items: center; gap: 0.75rem; }

.umkm-avatar {
  width: 44px;
  height: 44px;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, #1A6FD4, #0D4FA3);
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.umkm-name { font-weight: 700; font-size: 0.9rem; color: #0A3570; }
.umkm-sub  { font-size: 0.75rem; color: #7A9BBF; }
.umkm-desc { font-size: 0.82rem; color: #6A8BAA; line-height: 1.6; flex: 1; }

.umkm-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }

.tag {
  background: #EBF3FF;
  color: #1A6FD4;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 99px;
}

.umkm-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: #F0F6FF;
  border-radius: 0.75rem;
  padding: 0.75rem;
  gap: 0.5rem;
}

.metric { text-align: center; }
.metric-val { display: block; font-weight: 700; font-size: 0.875rem; color: #1A6FD4; }
.metric-lbl { display: block; font-size: 0.68rem; color: #9BB5CF; margin-top: 0.15rem; }

.umkm-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  padding: 0.6rem 1rem;
}

/* ── SECTORS ────────────────────────────────── */
.sector-section { padding: 5rem 1.5rem; background: white; }

.sector-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
}

.sector-card {
  text-align: center;
  background: #F0F6FF;
  border: 1px solid #C5DCFF;
  border-radius: 1rem;
  padding: 1.5rem 1rem;
  transition: all 0.2s;
  cursor: default;
}

.sector-card:hover {
  background: #EBF3FF;
  border-color: #1A6FD4;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(26,111,212,0.1);
}

.sector-icon {
  font-size: 2rem;
  color: #1A6FD4;
  display: block;
  margin-bottom: 0.75rem;
}

.sector-name { font-weight: 700; font-size: 0.85rem; color: #0A3570; margin-bottom: 0.25rem; }
.sector-count { font-size: 0.75rem; color: #7A9BBF; }

/* ── CTA ────────────────────────────────────── */
.cta-section {
  background: linear-gradient(135deg, #1A6FD4 0%, #0A3570 100%);
  padding: 5rem 1.5rem;
}

.cta-inner { max-width: 600px; margin: 0 auto; text-align: center; }

.cta-icon {
  font-size: 3rem;
  color: rgba(255,255,255,0.35);
  display: block;
  margin-bottom: 1.5rem;
}

.cta-title {
  font-size: 2rem;
  font-weight: 800;
  color: white;
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
}

.cta-desc {
  font-size: 0.95rem;
  color: rgba(255,255,255,0.65);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.cta-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

.cta-btn-primary {
  background: white;
  color: #1A6FD4;
  font-size: 0.9rem;
  font-weight: 700;
  padding: 0.75rem 1.75rem;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.15s;
}
.cta-btn-primary:hover { background: #EBF3FF; transform: translateY(-1px); }

.cta-btn-secondary {
  color: rgba(255,255,255,0.85);
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.75rem 1.75rem;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.15s;
}
.cta-btn-secondary:hover { background: rgba(255,255,255,0.1); color: white; }

.ml-auto   { margin-left: auto; }
.text-center { text-align: center; }
.mt-10     { margin-top: 2.5rem; }

/* ── RESPONSIVE ─────────────────────────────── */
@media (max-width: 1024px) {
  .sector-grid { grid-template-columns: repeat(3, 1fr); }
  .steps-grid  { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .hero-inner  { grid-template-columns: 1fr; gap: 2rem; }
  .hero-visual { display: none; }
  .hero-title  { font-size: 2rem; }
  .stats-inner { grid-template-columns: repeat(2, 1fr); }
  .umkm-grid   { grid-template-columns: 1fr; }
  .steps-grid  { grid-template-columns: 1fr; }
  .sector-grid { grid-template-columns: repeat(2, 1fr); }
  .cta-actions { flex-direction: column; align-items: center; }
}
</style>