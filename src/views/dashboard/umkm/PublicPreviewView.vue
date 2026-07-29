<template>
  <div class="space-y-6">

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 class="text-xl font-bold text-gray-800">Business Intelligence Dashboard</h1>
        <p class="text-sm text-gray-400 mt-0.5">Begini tampilan profil dan performa bisnismu di mata investor</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn-ghost" @click="copyLink">
          <span class="material-symbols-rounded" style="font-size:16px">link</span>
          Salin Link
        </button>
        <router-link to="/dashboard/umkm/profil" class="btn-primary">
          <span class="material-symbols-rounded" style="font-size:16px">edit</span>
          Edit Profil
        </router-link>
      </div>
    </div>

    <!-- Banner mode preview -->
    <div class="bg-warning-50 border border-warning-200 rounded-xl p-3 flex items-center gap-3">
      <span class="material-symbols-rounded text-warning-500 flex-shrink-0" style="font-size:18px">visibility</span>
      <p class="text-sm text-warning-800">Ini adalah tampilan <strong>preview</strong> — begini profil dan dashboard data bisnismu terlihat oleh investor yang sudah login dan terverifikasi.</p>
    </div>

    <!-- Profile Header -->
    <div class="card p-5">
      <div class="flex flex-col sm:flex-row sm:items-start gap-4">
        <div :style="{
          width:'64px', height:'64px', borderRadius:'14px', flexShrink:0,
          background: umkm.warna, color:'white',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontWeight:800, fontSize:'18px'
        }">{{ umkm.logo }}</div>

        <div class="flex-1 min-w-0">
          <div class="flex flex-wrap items-center gap-2 mb-1">
            <h1 class="text-xl font-bold text-gray-800">{{ umkm.nama }}</h1>
            <span :class="umkm.status === 'verified' ? 'badge-verified' : 'badge-pending'">
              <span class="material-symbols-rounded" style="font-size:12px">
                {{ umkm.status === 'verified' ? 'verified' : 'pending' }}
              </span>
              {{ umkm.status === 'verified' ? 'Terverifikasi' : 'Pending' }}
            </span>
          </div>
          <div class="flex flex-wrap items-center gap-3 text-sm text-gray-400">
            <span class="flex items-center gap-1">
              <span class="material-symbols-rounded" style="font-size:15px">location_on</span>
              {{ umkm.kota }}
            </span>
            <span class="flex items-center gap-1">
              <span class="material-symbols-rounded" style="font-size:15px">category</span>
              {{ umkm.sektor }}
            </span>
            <span class="flex items-center gap-1">
              <span class="material-symbols-rounded" style="font-size:15px">calendar_today</span>
              Berdiri {{ umkm.tahunBerdiri }}
            </span>
          </div>
          <p class="text-sm text-gray-500 mt-2 leading-relaxed">{{ umkm.deskripsi }}</p>
        </div>

        <!-- Score -->
        <div class="flex-shrink-0 text-center">
          <div :style="{
            width:'80px', height:'80px', borderRadius:'50%',
            background: `conic-gradient(${scoreColor} ${umkm.readinessScore * 3.6}deg, #F1F5F9 0deg)`,
            display:'flex', alignItems:'center', justifyContent:'center',
            position:'relative'
          }">
            <div style="width:60px;height:60px;border-radius:50%;background:white;
                        display:flex;flex-direction:column;align-items:center;justify-content:center">
              <span :style="{ fontSize:'18px', fontWeight:800, color: scoreColor }">
                {{ umkm.readinessScore }}
              </span>
              <span style="font-size:9px;color:#94a3b8">/100</span>
            </div>
          </div>
          <p class="text-xs text-gray-400 mt-2">Readiness Score</p>
          <p :style="{ fontSize:'11px', fontWeight:600, color: scoreColor }">{{ scoreLabel }}</p>
        </div>
      </div>

      <!-- Legalitas chips -->
      <div class="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
        <span v-for="doc in legalChips" :key="doc.label"
              :class="doc.ok ? 'badge-verified' : 'badge-pending'">
          <span class="material-symbols-rounded" style="font-size:12px">
            {{ doc.ok ? 'check_circle' : 'pending' }}
          </span>
          {{ doc.label }}
        </span>
      </div>
    </div>

    <!-- Metric Row -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card p-4 text-center" v-for="m in metricCards" :key="m.label">
        <p class="text-xs text-gray-400 mb-1">{{ m.label }}</p>
        <p class="text-xl font-bold text-gray-800">{{ m.value }}</p>
        <p v-if="m.trend" class="text-xs text-success-500 mt-0.5 flex items-center justify-center gap-0.5">
          <span class="material-symbols-rounded" style="font-size:13px">trending_up</span>
          {{ m.trend }}
        </p>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">

      <!-- Revenue Line Chart -->
      <div class="lg:col-span-2 card p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-gray-800">Tren Pendapatan (12 Bulan Terakhir)</h3>
          <span class="badge-info">2024</span>
        </div>
        <RevenueLineChart :data="umkm.omzetBulanan" />
      </div>

      <!-- Donut -->
      <div class="card p-5">
        <h3 class="font-bold text-gray-800 mb-1">Segmen Pelanggan</h3>
        <p class="text-xs text-gray-400 mb-4">Distribusi pasar saat ini</p>
        <SectorDonutChart :data="umkm.segmenPelanggan" />
        <div class="space-y-2 mt-4">
          <div v-for="(val, key) in umkm.segmenPelanggan" :key="key"
               class="flex items-center justify-between text-sm">
            <div class="flex items-center gap-2">
              <span :style="{ width:'8px', height:'8px', borderRadius:'50%', background: segmenColors[key], display:'inline-block' }" />
              <span class="text-gray-600 text-xs">{{ segmenLabel[key] }}</span>
            </div>
            <span class="font-semibold text-xs text-gray-800">{{ val }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Kelengkapan Profil -->
    <div class="card p-5">
      <h3 class="font-bold text-gray-800 mb-4">Analisis Kelengkapan Profil</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="dim in dimensions" :key="dim.label">
          <div class="flex justify-between text-xs mb-1.5">
            <span class="text-gray-500 flex items-center gap-1">
              <span class="material-symbols-rounded" style="font-size:14px">{{ dim.icon }}</span>
              {{ dim.label }}
            </span>
            <span class="font-bold" :style="{ color: dim.pct >= 80 ? '#1D9E75' : dim.pct >= 50 ? '#EF9F27' : '#E24B4A' }">
              {{ dim.pct }}%
            </span>
          </div>
          <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div :style="{
              width: dim.pct + '%',
              background: dim.pct >= 80 ? '#1D9E75' : dim.pct >= 50 ? '#EF9F27' : '#E24B4A',
              height: '100%', borderRadius: '99px', transition: 'width 0.6s ease'
            }" />
          </div>
        </div>
      </div>
      <p class="text-xs text-gray-400 mt-4">Lengkapi bagian yang masih rendah skornya melalui menu <router-link to="/dashboard/umkm/profil" class="text-brand-600 font-medium">Edit Profil</router-link> agar dashboard ini semakin menarik bagi investor.</p>
    </div>

    <!-- Rencana Investasi -->
    <div class="card p-5">
      <h3 class="font-bold text-gray-800 mb-4">Rencana Penggunaan Modal</h3>
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1 bg-brand-50 rounded-xl p-4">
          <p class="text-xs text-brand-600 font-medium mb-1">Total Modal Dibutuhkan</p>
          <p class="text-2xl font-black text-brand-800">{{ formatRp(umkm.kebutuhanModal) }}</p>
        </div>
        <div class="flex-1 bg-gray-50 rounded-xl p-4">
          <p class="text-xs text-gray-400 font-medium mb-2">Rencana Penggunaan</p>
          <p class="text-sm text-gray-700 leading-relaxed">{{ umkm.penggunaanModal }}</p>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <Transition name="toast">
      <div v-if="showToast" class="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl text-sm">
        <span class="material-symbols-rounded text-success-500" style="font-size:20px">check_circle</span>
        Link profil berhasil disalin!
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { umkmMock } from '../../../data/umkm.mock.js'
import RevenueLineChart from '../../../components/dashboard/charts/RevenueLineChart.vue'
import SectorDonutChart from '../../../components/dashboard/charts/SectorDonutChart.vue'

const umkm = umkmMock[0]
const showToast = ref(false)

const scoreColor = computed(() =>
  umkm.readinessScore >= 80 ? '#1D9E75' :
  umkm.readinessScore >= 60 ? '#EF9F27' : '#E24B4A'
)
const scoreLabel = computed(() =>
  umkm.readinessScore >= 80 ? 'Tingkat A — Sangat Siap' :
  umkm.readinessScore >= 60 ? 'Tingkat B — Siap' : 'Tingkat C — Perlu Perbaikan'
)

const legalChips = [
  { label: 'NIB',       ok: umkm.hasNib },
  { label: 'PIRT',      ok: umkm.hasPirt },
  { label: 'Halal MUI', ok: umkm.hasHalal },
]

const metricCards = [
  { label: 'Omzet Tahunan',      value: formatRp(umkm.omzet * 12), trend: '+12% YoY' },
  { label: 'Margin Laba Bersih', value: umkm.laba ? ((umkm.laba / umkm.omzet) * 100).toFixed(1) + '%' : '-', trend: null },
  { label: 'Jumlah Karyawan',    value: umkm.jumlahKaryawan + ' orang', trend: null },
  { label: 'Berdiri Sejak',      value: umkm.tahunBerdiri, trend: null },
]

const dimensions = [
  { label: 'Deskripsi Bisnis', icon: 'description',   pct: umkm.deskripsi ? 95 : 0 },
  { label: 'Data Keuangan',    icon: 'bar_chart',      pct: umkm.omzet ? 82 : 0 },
  { label: 'Legalitas',        icon: 'verified',       pct: umkm.hasNib ? (umkm.hasPirt ? (umkm.hasHalal ? 100 : 70) : 50) : 20 },
  { label: 'Foto & Media',     icon: 'photo_library',  pct: 40 },
  { label: 'Video Profil',     icon: 'videocam',       pct: 0 },
  { label: 'Kontak & Sosmed',  icon: 'share',          pct: umkm.instagram ? 90 : 30 },
]

const segmenColors = { b2c: '#185FA5', b2b: '#1D9E75', ekspor: '#EF9F27' }
const segmenLabel  = { b2c: 'B2C (Retail)', b2b: 'B2B (Korporat)', ekspor: 'Ekspor' }

function formatRp(val) {
  if (!val) return '-'
  if (val >= 1e9) return 'Rp ' + (val / 1e9).toFixed(1) + ' M'
  if (val >= 1e6) return 'Rp ' + (val / 1e6).toFixed(0) + ' Jt'
  return 'Rp ' + val.toLocaleString('id-ID')
}

function copyLink() {
  navigator.clipboard.writeText(`https://connect.id/umkm/${umkm.id}`)
  showToast.value = true
  setTimeout(() => { showToast.value = false }, 3000)
}
</script>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(12px); }
</style>
