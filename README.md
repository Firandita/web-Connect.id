# Connect.id

Connect.id adalah platform investasi UMKM berbasis web yang mempertemukan UMKM lintas provinsi dengan investor melalui *Business Intelligence dashboard* interaktif, dilengkapi mekanisme komunikasi dua arah terverifikasi dan panel pemantauan bagi pemerintah provinsi.

## Fitur Utama
- **Portal publik**: beranda, direktori UMKM, halaman profil UMKM (interactive pitch deck), registrasi, dan login multi-role.
- **Dashboard UMKM**: profile builder, data keuangan, legalitas, unggah media, kotak masuk investor, dan pratinjau publik.
- **Dashboard Investor**: direktori UMKM dengan filter wilayah/sektor, watchlist, verifikasi, dan riwayat interaksi.
- **Dashboard Admin**: manajemen pengguna, antrean verifikasi, dan aktivitas platform.
- **Dashboard Pemerintah**: ringkasan ekosistem UMKM per provinsi, peta sebaran (heatmap), analisis sektor, dan ekspor laporan.
- **Dashboard Mentor**: pendampingan progres UMKM, checklist kelengkapan profil, dan pemberian feedback.

## Tech Stack
Vue 3 (Composition API), Vite, Pinia, Vue Router, Tailwind CSS, Chart.js (vue-chartjs).

## Menjalankan Proyek

```bash
# install dependencies
npm install
# atau: yarn install

# jalankan development server
npm run dev
# atau: yarn dev

# build untuk production
npm run build
# atau: yarn build

# preview hasil build
npm run preview
# atau: yarn preview
```

## Catatan
Data yang digunakan pada dashboard pemerintah saat ini menampilkan Provinsi Jawa Timur sebagai contoh wilayah percontohan. Struktur data (`src/data/kabupaten-jatim.js`, `JatimHeatmap.vue`) dapat diperluas ke provinsi lain mengikuti pola data yang sama.
