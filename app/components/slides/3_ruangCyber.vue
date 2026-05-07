<template>
  <div class="slide-content slide-cyber-space">
    <!-- Ambient effects -->
    <div class="ambient-orb orb-1"></div>
    <div class="ambient-orb orb-2"></div>
    <div class="grid-overlay"></div>

    <div class="scroll-wrapper" ref="scrollWrapper">
      <div class="slide-inner">
      <!-- Header -->
      <div class="header-section">
        <div class="header-badge">
          <span class="badge-pulse"></span>
          <span class="badge-label">PARADIGMA BARU KEAMANAN</span>
        </div>
        <h1 class="slide-title">
          Ruang Siber = <span class="title-highlight">Ruang Kamtibmas Baru</span>
        </h1>
        <p class="slide-desc">Kejahatan, keresahan, bukti, dan konflik sosial kini juga terjadi di ruang digital.</p>
      </div>

      <!-- Comparison Deck -->
      <div class="comparison-deck">
        <!-- Physical Space -->
        <div class="comp-panel panel-physical">
          <div class="panel-border" :class="'border-physical'"></div>
          <div class="panel-inner">
            <div class="panel-header">
              <div class="panel-icon-wrap physical-icon">
                <i class="fa-solid fa-person-walking"></i>
              </div>
              <div>
                <h2 class="panel-title">Ruang Fisik</h2>
                <span class="panel-sub">Traditional Domain</span>
              </div>
            </div>
            <div class="panel-chips">
              <div v-for="(item, i) in physicalItems" :key="i" class="chip chip-physical">
                <i class="fa-solid fa-circle" style="font-size: 0.3rem"></i>
                <span>{{ item }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Arrow Connector -->
        <div class="connector-center">
          <div class="connector-line-top"></div>
          <div class="connector-badge">
            <i class="fa-solid fa-right-left"></i>
          </div>
          <div class="connector-line-bottom"></div>
        </div>

        <!-- Digital Space -->
        <div class="comp-panel panel-digital">
          <div class="panel-border border-digital"></div>
          <div class="panel-inner digital-inner">
            <div class="panel-header">
              <div class="panel-icon-wrap digital-icon">
                <i class="fa-solid fa-microchip"></i>
              </div>
              <div>
                <h2 class="panel-title">Ruang Digital</h2>
                <span class="panel-sub">Cyber Domain</span>
              </div>
            </div>
            <div class="panel-chips">
              <div v-for="(item, i) in digitalItems" :key="i" class="chip chip-digital">
                <i class="fa-solid fa-circle" style="font-size: 0.3rem"></i>
                <span>{{ item }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Threat Spectrum -->
      <div class="threat-section">
        <div class="section-label-row">
          <div class="section-line"></div>
          <span class="section-label">SPEKTRUM ANCAMAN BARU</span>
          <div class="section-line"></div>
        </div>

        <div class="threat-strip">
          <div v-for="(threat, index) in threats" :key="index" class="threat-item">
            <div class="threat-icon-wrap">
              <i :class="threat.icon"></i>
            </div>
            <span class="threat-name">{{ threat.title }}</span>
          </div>
        </div>
      </div>

      <!-- Chart Section -->
      <div class="chart-section">
        <div class="chart-header">
          <i class="fa-solid fa-spider"></i>
          <h3>Ancaman Dark Web pada Indonesia</h3>
        </div>
        <p class="chart-subtitle">Distribusi Ancaman Dark Web Berdasarkan Industri</p>
        
        <div class="chart-container">
          <ClientOnly>
            <apexchart type="bar" width="100%" height="450" :options="barChartOptions" :series="barChartSeries"></apexchart>
          </ClientOnly>
        </div>
        <p class="chart-source">Sumber: Indonesia Threat Landscape Report 2025</p>
      </div>

      <!-- Case Study / Alert Section -->
      <div class="alert-section">
        <div class="alert-header">
          <i class="fa-solid fa-triangle-exclamation text-danger pulse"></i>
          <h3>Aktivitas Dark Web Terkini: Penargetan Entitas Indonesia</h3>
        </div>
        <p class="alert-subtitle">Dugaan Penjualan Data Warga Negara Indonesia di Forum Bawah Tanah</p>

        <div class="alert-card">
          <!-- Mockup of the Dark Web Post -->
          <div class="forum-image-wrapper">
            <img src="/leak1.png" alt="Dark Web Post - Data Kab Lahat" class="forum-image" />
          </div>

          <!-- Description Text -->
          <div class="alert-text">
            <p><strong>SOCRadar</strong> telah mendeteksi unggahan baru di forum peretasan <em>dark web</em> yang mengiklankan penjualan data pribadi yang diklaim milik warga negara Indonesia. Daftar tersebut, yang dilabeli <strong>"DATA KAB LAHAT"</strong>, dilaporkan mencakup:</p>
            <ul class="alert-list">
              <li><i class="fa-solid fa-id-card"></i> Nomor Induk Kependudukan (NIK)</li>
              <li><i class="fa-solid fa-location-dot"></i> Alamat Lengkap Tempat Tinggal</li>
              <li><i class="fa-solid fa-database"></i> Rincian Data Pribadi Lainnya</li>
            </ul>
            <p>Kumpulan data tersebut ditawarkan seharga <strong>$100</strong>, dengan transaksi dan informasi kontak yang disediakan melalui platform Telegram.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import VueApexCharts from 'vue3-apexcharts';

const props = defineProps({
  active: Boolean
});

const physicalItems = ['Jalan', 'Kantor', 'Masyarakat', 'TKP'];
const digitalItems = ['Media Sosial', 'Mobile Banking', 'Marketplace', 'Cloud / Akun', 'Server / Metadata'];

const threats = [
  { title: 'Penipuan Online', icon: 'fa-solid fa-user-shield' },
  { title: 'Judi Online', icon: 'fa-solid fa-dice' },
  { title: 'APK Scam', icon: 'fa-solid fa-mobile-screen-button' },
  { title: 'Hoaks', icon: 'fa-solid fa-bullhorn' },
  { title: 'Deepfake', icon: 'fa-solid fa-mask' },
  { title: 'Data Leak', icon: 'fa-solid fa-database' },
  { title: 'Ransomware', icon: 'fa-solid fa-biohazard' }
];

const scrollWrapper = ref(null);

const handleKeyDown = (e) => {
  if (!props.active || !scrollWrapper.value) return;
  
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.stopPropagation();
    e.preventDefault();
    
    const direction = e.key === 'ArrowDown' ? 1 : -1;
    const distance = 400;
    
    gsap.to(scrollWrapper.value, {
      scrollTop: scrollWrapper.value.scrollTop + (distance * direction),
      duration: 0.6,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  }
};

const barChartSeries = [{
  name: 'Distribusi Industri',
  data: [34.93, 12.59, 6.30, 5.96, 3.95, 3.27, 3.02, 2.60, 2.52, 2.52]
}];

const barChartOptions = {
  chart: {
    type: 'bar',
    background: 'transparent',
    fontFamily: 'inherit',
    toolbar: { show: false }
  },
  plotOptions: {
    bar: {
      horizontal: true,
      borderRadius: 4,
      dataLabels: { position: 'top' }
    }
  },
  dataLabels: {
    enabled: true,
    offsetX: -6,
    style: { fontSize: '12px', colors: ['#fff'] },
    formatter: function(val) {
      return val.toFixed(2).replace('.', ',') + '%';
    }
  },
  xaxis: {
    categories: [
      'Administrasi Publik',
      'Layanan Pendidikan',
      'Keuangan & Asuransi',
      'Informasi',
      'Perdagangan Ritel',
      'Perbankan Komersial',
      'Layanan Teknis Profesional',
      'Seni & Hiburan',
      'Telekomunikasi',
      'Layanan Lainnya'
    ],
    labels: {
      style: { colors: '#94a3b8' },
      formatter: function(val) { return val + '%'; }
    },
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  yaxis: {
    labels: { style: { colors: '#cbd5e1', fontSize: '13px', fontWeight: 'bold' } }
  },
  colors: ['#60a5fa'], // blue similar to the image
  theme: { mode: 'dark' },
  grid: {
    borderColor: 'rgba(255, 255, 255, 0.1)',
    xaxis: { lines: { show: true } },
    yaxis: { lines: { show: false } }
  },
  tooltip: {
    theme: 'dark',
    y: {
      formatter: function (val) {
        return val.toFixed(2) + "%"
      }
    }
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown, { capture: true });
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown, { capture: true });
});

watch(() => props.active, (val) => {
  if (val) {
    if (scrollWrapper.value) {
      scrollWrapper.value.scrollTop = 0;
    }
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.slide-cyber-space .header-badge',
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    );
    tl.fromTo('.slide-cyber-space .slide-title',
      { y: 30, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
      { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 0.8 },
      '-=0.1'
    );
    tl.fromTo('.slide-cyber-space .slide-desc',
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      '-=0.2'
    );

    // Panels slide in
    tl.fromTo('.panel-physical',
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8 },
      '+=0.1'
    );
    tl.fromTo('.connector-center',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' },
      '-=0.4'
    );
    tl.fromTo('.panel-digital',
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8 },
      '-=0.4'
    );

    // Chips stagger
    tl.fromTo('.chip',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, stagger: 0.04 },
      '-=0.2'
    );

    // Threat strip
    tl.fromTo('.threat-section',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }
    );
    tl.fromTo('.threat-item',
      { y: 15, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.05 },
      '-=0.2'
    );

    // Chart Section
    tl.fromTo('.chart-section',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '+=0.1'
    );

    // Alert Section
    tl.fromTo('.alert-section',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.4'
    );

    // Ambient
    gsap.to('.orb-1', { x: 25, y: -15, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.orb-2', { x: -20, y: 12, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }
}, { immediate: true });
</script>

<style scoped>
.slide-content {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.scroll-wrapper {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  padding: 8rem 6vw 8rem 6vw;
  scrollbar-width: thin;
  scrollbar-color: var(--accent-light) transparent;
}

.scroll-wrapper::-webkit-scrollbar { width: 4px; }
.scroll-wrapper::-webkit-scrollbar-track { background: transparent; }
.scroll-wrapper::-webkit-scrollbar-thumb { background: var(--accent-light); border-radius: 10px; }

/* ─── Ambient ─── */
.ambient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(130px);
  pointer-events: none;
  z-index: 0;
}

.orb-1 {
  width: 420px;
  height: 420px;
  background: rgba(30, 64, 175, 0.1);
  top: -6%;
  right: -3%;
}

.orb-2 {
  width: 350px;
  height: 350px;
  background: rgba(16, 185, 129, 0.06);
  bottom: -5%;
  left: -2%;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.012) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.012) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  z-index: 0;
}

/* ─── Layout ─── */
.slide-inner {
  width: 100%;
  max-width: 1350px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* ─── Header ─── */
.header-section {
  text-align: center;
  margin-bottom: 3.5rem;
  margin-top: 3rem;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.35rem 1.2rem;
  border-radius: 100px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  background: rgba(30, 64, 175, 0.08);
  margin-bottom: 1rem;
}

.badge-pulse {
  width: 6px;
  height: 6px;
  background: var(--accent-light);
  border-radius: 50%;
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
  50% { opacity: 0.8; box-shadow: 0 0 0 6px rgba(59, 130, 246, 0); }
}

.badge-label {
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.3em;
  color: var(--accent-light);
}

.slide-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text);
  line-height: 1.1;
}

.title-highlight {
  background: linear-gradient(135deg, var(--accent-light) 0%, #93C5FD 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.slide-desc {
  font-size: 1.1rem;
  color: var(--text-muted);
  max-width: 800px;
  margin: 0.8rem auto 0;
  line-height: 1.6;
}

/* ─── Comparison Deck ─── */
.comparison-deck {
  display: flex;
  align-items: stretch;
  gap: 0;
  position: relative;
}

.comp-panel {
  flex: 1;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.comp-panel:hover {
  transform: translateY(-4px);
}

/* ─── Panel Border ─── */
.panel-border {
  position: absolute;
  inset: 0;
  border-radius: 20px;
  padding: 1px;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  z-index: 2;
}

.border-physical {
  background: linear-gradient(180deg, rgba(148, 163, 184, 0.2) 0%, rgba(255, 255, 255, 0.03) 60%, rgba(148, 163, 184, 0.06) 100%);
}

.border-digital {
  background: linear-gradient(180deg, rgba(59, 130, 246, 0.35) 0%, rgba(255, 255, 255, 0.04) 50%, rgba(59, 130, 246, 0.12) 100%);
}

.panel-inner {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 20px;
  padding: 2rem 2.2rem;
  height: 100%;
  position: relative;
  z-index: 1;
}

.digital-inner {
  background: rgba(15, 23, 42, 0.7);
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
}

.panel-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.physical-icon {
  background: rgba(148, 163, 184, 0.1);
  border: 1px solid rgba(148, 163, 184, 0.15);
}

.physical-icon i {
  font-size: 1.3rem;
  color: #94a3b8;
}

.digital-icon {
  background: rgba(59, 130, 246, 0.12);
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.digital-icon i {
  font-size: 1.3rem;
  color: var(--accent-light);
  filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.3));
}

.panel-title {
  font-size: 1.3rem;
  font-weight: 800;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0;
  line-height: 1.2;
}

.panel-sub {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
}

.panel-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.chip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 1rem;
  border-radius: 10px;
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.chip-physical {
  background: rgba(148, 163, 184, 0.06);
  border: 1px solid rgba(148, 163, 184, 0.1);
  color: #94a3b8;
}

.chip-physical i { color: rgba(148, 163, 184, 0.4); }

.chip-digital {
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.15);
  color: white;
}

.chip-digital i { color: var(--accent-light); }

.chip-digital:hover {
  background: rgba(59, 130, 246, 0.14);
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateY(-2px);
}

/* ─── Connector ─── */
.connector-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60px;
  flex-shrink: 0;
  z-index: 5;
}

.connector-line-top,
.connector-line-bottom {
  width: 1px;
  flex: 1;
  background: linear-gradient(180deg, transparent, rgba(59, 130, 246, 0.2), transparent);
}

.connector-badge {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(30, 64, 175, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0;
}

.connector-badge i {
  font-size: 0.9rem;
  color: var(--accent-light);
  opacity: 0.7;
}

/* ─── Threat Section ─── */
.threat-section {
  margin-top: 2.5rem;
}

.section-label-row {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
}

.section-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.06), transparent);
}

.section-label {
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.35em;
  color: var(--accent-light);
  opacity: 0.6;
  white-space: nowrap;
}

.threat-strip {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.threat-item {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.6rem 1.2rem;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.threat-item:hover {
  background: rgba(239, 68, 68, 0.06);
  border-color: rgba(239, 68, 68, 0.15);
  transform: translateY(-3px);
}

.threat-icon-wrap {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}

.threat-icon-wrap i {
  font-size: 0.85rem;
  color: #f87171;
}

.threat-name {
  font-size: 0.8rem;
  font-weight: 700;
  color: white;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

/* ─── Chart Section ─── */
.chart-section {
  margin-top: 4rem;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2.5rem;
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 40px rgba(0,0,0,0.4);
}

.chart-header {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 0.5rem;
}

.chart-header i {
  font-size: 1.8rem;
  color: #60a5fa;
}

.chart-header h3 {
  font-size: 1.6rem;
  font-weight: 700;
  color: white;
  margin: 0;
  letter-spacing: 0.02em;
}

.chart-subtitle {
  font-size: 1rem;
  color: #94a3b8;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.chart-container {
  width: 100%;
  min-height: 450px;
}

.chart-source {
  font-size: 0.75rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.4);
  text-align: right;
  margin-top: 1rem;
  letter-spacing: 0.05em;
}

/* ─── Alert Section ─── */
.alert-section {
  margin-top: 5rem;
}

.alert-header {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 0.5rem;
}

.alert-header i {
  font-size: 1.8rem;
}

.text-danger { color: #ef4444; }
.pulse { animation: pulse 2s infinite; }

.alert-header h3 {
  font-size: 1.6rem;
  font-weight: 700;
  color: white;
  margin: 0;
  letter-spacing: 0.02em;
}

.alert-subtitle {
  font-size: 1rem;
  color: #94a3b8;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.alert-card {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 20px;
  padding: 2.5rem;
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 40px rgba(0,0,0,0.4);
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

/* ─── Forum Image Wrapper ─── */
.forum-image-wrapper {
  background: #1e293b;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #334155;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  width: 100%;
}

.forum-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
}

/* ─── Alert Text ─── */
.alert-text {
  font-size: 1.15rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.85);
}

.alert-text strong {
  color: white;
}

.alert-list {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.alert-list li {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.03);
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.alert-list li i {
  color: #3b82f6;
  width: 20px;
  text-align: center;
}

/* ─── Responsive ─── */
@media (max-width: 1000px) {
  .comparison-deck {
    flex-direction: column;
    gap: 1.5rem;
  }

  .connector-center {
    flex-direction: row;
    width: auto;
    height: 40px;
  }

  .connector-line-top,
  .connector-line-bottom {
    width: auto;
    height: 1px;
    flex: 1;
    background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.2), transparent);
  }

  .threat-strip {
    gap: 0.6rem;
  }
}
</style>
