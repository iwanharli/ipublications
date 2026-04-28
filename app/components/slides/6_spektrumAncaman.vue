<template>
  <div class="slide-content slide-spektrum-ancaman">
    <!-- Ambient effects -->
    <div class="ambient-orb orb-1"></div>
    <div class="ambient-orb orb-2"></div>
    <div class="grid-overlay"></div>

    <div class="scroll-wrapper" ref="scrollWrapper" @scroll="handleScroll">
      <div class="slide-inner">
        <!-- Header -->
        <div class="header-section">
          <div class="header-badge">
            <span class="badge-pulse"></span>
            <span class="badge-label">THREAT LANDSCAPE ANALYSIS</span>
          </div>
          <h1 class="slide-title">
            Spektrum <span class="title-highlight">Ancaman Siber Modern</span>
          </h1>
          <p class="slide-subtitle">Pemetaan ancaman berdasarkan tingkat kekritisan dan dampak strategis</p>
        </div>

        <!-- Threat Grid -->
        <div class="threat-grid">
          <div
            v-for="(threat, index) in threats"
            :key="index"
            class="threat-card"
            :class="`severity-${threat.severity}`"
          >
            <div class="card-border-glow" :class="`border-${threat.severity}`"></div>
            <div class="card-inner">
              <!-- Severity indicator -->
              <div class="card-top-row">
                <div class="threat-icon-wrap" :class="`icon-${threat.severity}`">
                  <i :class="threat.icon"></i>
                </div>
                <div class="severity-tag" :class="`tag-${threat.severity}`">
                  <span class="tag-dot" :class="`dot-${threat.severity}`"></span>
                  {{ threat.severityLabel }}
                </div>
              </div>

              <!-- Title -->
              <h3 class="threat-title">{{ threat.title }}</h3>

              <!-- Severity bar -->
              <div class="severity-bar">
                <div class="bar-track">
                  <div class="bar-fill" :class="`fill-${threat.severity}`" :data-width="threat.level"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Impact Section -->
        <div class="impact-strip">
          <div class="strip-label">
            <i class="fa-solid fa-bolt"></i>
            <span>DAMPAK STRATEGIS</span>
          </div>
          <div class="strip-divider"></div>
          <div class="strip-chips">
            <div v-for="(imp, i) in impacts" :key="i" class="impact-chip">
              <div class="chip-icon" :class="`chip-color-${i}`">
                <i class="fa-solid fa-circle-dot"></i>
              </div>
              <span>{{ imp }}</span>
            </div>
          </div>
        </div>

        <!-- Chart Section -->
        <div class="chart-section">
          <div class="chart-header">
            <i class="fa-solid fa-chart-pie"></i>
            <h3>Data Breaches Across Industries</h3>
          </div>
          <div class="chart-layout">
            <div class="chart-wrapper">
              <ClientOnly>
                <apexchart type="donut" width="100%" height="450" :options="chartOptions" :series="chartSeries"></apexchart>
              </ClientOnly>
            </div>
            
            <div class="custom-legend-container">
              <div class="custom-legend">
                <div v-for="(label, i) in chartLabels" :key="i" class="legend-item">
                  <div class="legend-marker" :style="{ backgroundColor: chartColors[i] }"></div>
                  <span class="legend-text">{{ label }}</span>
                </div>
              </div>
            </div>
          </div>
          <p class="chart-source">Sumber: Global Cyber Security Report 2025</p>
        </div>

        <!-- Top Ransomware Actors Section -->
        <div class="chart-section">
          <div class="chart-header">
            <i class="fa-solid fa-users-viewfinder"></i>
            <h3>Top Ransomware Actors 2025</h3>
          </div>
          <div class="chart-container" style="min-height: 350px;">
            <ClientOnly>
              <apexchart type="bar" width="100%" height="350" :options="barChartOptions" :series="barChartSeries"></apexchart>
            </ClientOnly>
          </div>
          <div class="actor-descriptions">
            <div class="actor-row">
              <span class="actor-name qilin">Qilin</span>
              <span class="actor-desc">— Target tersebar dengan fokus pada sektor Konstruksi dan Manufaktur.</span>
            </div>
            <div class="actor-row">
              <span class="actor-name akira">Akira</span>
              <span class="actor-desc">— Sangat produktif dan tanpa pandang bulu, menargetkan berbagai macam industri.</span>
            </div>
            <div class="actor-row">
              <span class="actor-name clop">CL0P</span>
              <span class="actor-desc">— Spesialis dalam serangan bervolume tinggi dan berdurasi pendek melalui eksploitasi <em>zero-day</em>.</span>
            </div>
            <div class="actor-row">
              <span class="actor-name play">Play</span>
              <span class="actor-desc">— Target luas dengan fokus utama pada sektor Konstruksi dan Layanan Profesional.</span>
            </div>
            <div class="actor-row">
              <span class="actor-name inc">INC Ransom</span>
              <span class="actor-desc">— Aktivitas konsisten yang menargetkan sektor kritis seperti Layanan Kesehatan dan Pemerintahan.</span>
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

const scrollWrapper = ref(null);

const handleScroll = () => {
  // Can be used to trigger animations on scroll if needed later
};

const handleKeyDown = (e) => {
  if (!props.active || !scrollWrapper.value) return;
  const step = 200;
  if (e.key === 'ArrowDown') {
    e.stopPropagation();
    e.preventDefault();
    scrollWrapper.value.scrollBy({ top: step, behavior: 'smooth' });
  } else if (e.key === 'ArrowUp') {
    e.stopPropagation();
    e.preventDefault();
    scrollWrapper.value.scrollBy({ top: -step, behavior: 'smooth' });
  }
};

const threats = [
  { title: 'Ransomware', icon: 'fa-solid fa-biohazard', severity: 'critical', severityLabel: 'KRITIS', level: '95%' },
  { title: 'Data Breach', icon: 'fa-solid fa-unlock-keyhole', severity: 'critical', severityLabel: 'KRITIS', level: '92%' },
  { title: 'Cyber Espionage', icon: 'fa-solid fa-user-secret', severity: 'critical', severityLabel: 'KRITIS', level: '90%' },
  { title: 'Cyber Fraud', icon: 'fa-solid fa-user-ninja', severity: 'high', severityLabel: 'TINGGI', level: '78%' },
  { title: 'Deepfake', icon: 'fa-solid fa-mask', severity: 'high', severityLabel: 'TINGGI', level: '75%' },
  { title: 'Cognitive Warfare', icon: 'fa-solid fa-brain', severity: 'high', severityLabel: 'TINGGI', level: '72%' },
  { title: 'Supply Chain', icon: 'fa-solid fa-link-slash', severity: 'medium', severityLabel: 'SEDANG', level: '60%' },
  { title: 'Judi Online', icon: 'fa-solid fa-dice', severity: 'medium', severityLabel: 'SEDANG', level: '55%' },
  { title: 'Malware / APK', icon: 'fa-solid fa-bug', severity: 'medium', severityLabel: 'SEDANG', level: '50%' }
];

const impacts = ['Ekonomi', 'Operasional', 'Sosial', 'Hukum', 'Reputasi'];

const chartSeries = [998, 634, 387, 362, 307, 208, 187, 166, 161, 147, 146, 117, 110, 99, 99, 74, 70, 56, 50, 209];
const chartLabels = [
  'Government & LEA', 'BFSI', 'Education', 'IT & ITES', 'Retail',
  'Telecommunication', 'Healthcare', 'Professional Services', 'Technology',
  'Transportation & Logistics', 'Media & Entertainment', 'Consumer Goods',
  'Automotive', 'Organisation', 'Energy & Utilities', 'Hospitality',
  'Manufacturing', 'Food & Beverages', 'Unknown', 'Others'
];

const chartColors = [
  '#2563eb', '#ea580c', '#16a34a', '#dc2626', '#9333ea', 
  '#0284c7', '#059669', '#ca8a04', '#e11d48', '#7c3aed', 
  '#0891b2', '#10b981', '#f59e0b', '#f43f5e', '#6366f1', 
  '#3b82f6', '#22c55e', '#f97316', '#8b5cf6', '#06b6d4'
];

const chartOptions = {
  chart: {
    type: 'donut',
    background: 'transparent',
    fontFamily: 'inherit',
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      dynamicAnimation: { enabled: true, speed: 350 }
    }
  },
  labels: chartLabels,
  theme: {
    mode: 'dark'
  },
  colors: chartColors,
  plotOptions: {
    pie: {
      donut: {
        size: '50%',
        labels: {
          show: true,
          name: { fontSize: '14px', color: '#cbd5e1' },
          value: { fontSize: '24px', fontWeight: 'bold', color: '#fff' },
          total: { show: true, label: 'Total Accesses', color: '#ef4444', fontSize: '12px' }
        }
      }
    }
  },
  stroke: {
    show: true,
    colors: ['#020617'],
    width: 2
  },
  dataLabels: {
    enabled: true,
    formatter: function (val, opts) {
        return opts.w.globals.seriesTotals[opts.seriesIndex]
    },
    style: {
      fontSize: '11px',
      fontWeight: 'bold',
      colors: ['#fff']
    },
    dropShadow: {
      enabled: true,
      top: 1,
      left: 1,
      blur: 2,
      opacity: 0.8
    }
  },
  legend: {
    show: false
  },
  tooltip: {
    theme: 'dark',
    y: {
      formatter: function (val) {
        return val + " accesses"
      }
    }
  }
};

const barChartSeries = [{
  name: 'Jumlah Insiden',
  data: [953, 696, 517, 373, 339]
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
      borderRadius: 6,
      distributed: true,
      columnWidth: '40%'
    }
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '14px',
      fontWeight: 'bold',
      colors: ['#fff']
    },
    dropShadow: {
      enabled: true,
      top: 1,
      left: 1,
      blur: 2,
      opacity: 0.8
    }
  },
  xaxis: {
    categories: ['Qilin', 'Akira', 'CL0P', 'Play', 'INC Ransom'],
    labels: {
      style: { colors: '#cbd5e1', fontSize: '14px', fontWeight: 'bold' }
    },
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  yaxis: {
    labels: {
      style: { colors: '#94a3b8', fontSize: '13px' }
    }
  },
  colors: ['#3b82f6', '#8b5cf6', '#10b981', '#f97316', '#94a3b8'],
  theme: { mode: 'dark' },
  legend: { show: false },
  grid: {
    borderColor: 'rgba(255, 255, 255, 0.05)',
    strokeDashArray: 4
  },
  tooltip: {
    theme: 'dark'
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

    tl.fromTo('.slide-spektrum-ancaman .header-badge',
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    );
    tl.fromTo('.slide-spektrum-ancaman .slide-title',
      { y: 25, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
      { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 0.7 },
      '-=0.2'
    );
    tl.fromTo('.slide-spektrum-ancaman .slide-subtitle',
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4 },
      '-=0.3'
    );

    // Cards stagger in
    tl.fromTo('.threat-card',
      { scale: 0.85, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
      '-=0.1'
    );

    // Severity bars fill — read target from data-width attribute
    const barFills = document.querySelectorAll('.slide-spektrum-ancaman .bar-fill');
    barFills.forEach((el) => {
      gsap.set(el, { width: '0%' });
    });
    tl.to('.slide-spektrum-ancaman .bar-fill', {
      width: (i, el) => el.dataset.width || '50%',
      duration: 0.8,
      stagger: 0.06,
      ease: 'power2.out'
    }, '-=0.4');

    // Impact strip
    tl.fromTo('.impact-strip',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.3'
    );

    // Ambient
    gsap.to('.orb-1', { x: 20, y: -12, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.orb-2', { x: -15, y: 10, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
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
  padding: 8rem 5vw 8rem 5vw;
  scrollbar-width: thin;
  scrollbar-color: var(--accent) transparent;
}

.scroll-wrapper::-webkit-scrollbar { width: 4px; }
.scroll-wrapper::-webkit-scrollbar-track { background: transparent; }
.scroll-wrapper::-webkit-scrollbar-thumb { background: #ef4444; border-radius: 10px; }

/* ─── Ambient ─── */
.ambient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(130px);
  pointer-events: none;
  z-index: 0;
}

.orb-1 {
  width: 450px;
  height: 450px;
  background: rgba(239, 68, 68, 0.06);
  top: -8%;
  left: -3%;
}

.orb-2 {
  width: 380px;
  height: 380px;
  background: rgba(30, 64, 175, 0.08);
  bottom: -5%;
  right: -2%;
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
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* ─── Header ─── */
.header-section {
  text-align: center;
  margin-bottom: 2.5rem;
  margin-top: 3rem;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.35rem 1.2rem;
  border-radius: 100px;
  border: 1px solid rgba(239, 68, 68, 0.15);
  background: rgba(239, 68, 68, 0.04);
  margin-bottom: 1rem;
}

.badge-pulse {
  width: 6px;
  height: 6px;
  background: #ef4444;
  border-radius: 50%;
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
  50% { opacity: 0.7; box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
}

.badge-label {
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.3em;
  color: #ef4444;
  opacity: 0.8;
}

.slide-title {
  font-size: clamp(2rem, 3.5vw, 2.8rem);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text);
  line-height: 1.1;
}

.title-highlight {
  background: linear-gradient(135deg, #ef4444 0%, #f97316 60%, #fbbf24 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.slide-subtitle {
  font-size: 0.9rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  margin-top: 0.6rem;
}

/* ─── Threat Grid ─── */
.threat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
}

.threat-card {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.threat-card:hover {
  transform: translateY(-6px);
}

/* ─── Card Border Gradient ─── */
.card-border-glow {
  position: absolute;
  inset: 0;
  border-radius: 18px;
  padding: 1px;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  z-index: 2;
}

.border-critical {
  background: linear-gradient(180deg, rgba(239, 68, 68, 0.35) 0%, rgba(255, 255, 255, 0.03) 60%, rgba(239, 68, 68, 0.1) 100%);
}

.border-high {
  background: linear-gradient(180deg, rgba(245, 158, 11, 0.3) 0%, rgba(255, 255, 255, 0.03) 60%, rgba(245, 158, 11, 0.08) 100%);
}

.border-medium {
  background: linear-gradient(180deg, rgba(59, 130, 246, 0.2) 0%, rgba(255, 255, 255, 0.03) 60%, rgba(59, 130, 246, 0.06) 100%);
}

/* ─── Card Inner ─── */
.card-inner {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 18px;
  padding: 1.4rem 1.5rem;
  position: relative;
  z-index: 1;
}

.card-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

/* ─── Icon ─── */
.threat-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.threat-icon-wrap i {
  font-size: 1.2rem;
}

.icon-critical {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
}
.icon-critical i {
  color: #ef4444;
  filter: drop-shadow(0 0 6px rgba(239, 68, 68, 0.3));
}

.icon-high {
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.2);
}
.icon-high i {
  color: #f59e0b;
  filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.3));
}

.icon-medium {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.15);
}
.icon-medium i {
  color: var(--accent-light);
  filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.3));
}

/* ─── Severity Tag ─── */
.severity-tag {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.5rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  padding: 0.2rem 0.6rem;
  border-radius: 5px;
}

.tag-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}

.tag-critical {
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.25);
  background: rgba(239, 68, 68, 0.06);
}
.dot-critical { background: #ef4444; animation: blink 1.5s infinite; }

.tag-high {
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.25);
  background: rgba(245, 158, 11, 0.06);
}
.dot-high { background: #f59e0b; }

.tag-medium {
  color: var(--accent-light);
  border: 1px solid rgba(59, 130, 246, 0.2);
  background: rgba(59, 130, 246, 0.06);
}
.dot-medium { background: var(--accent-light); }

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* ─── Title ─── */
.threat-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.8rem;
  line-height: 1.2;
}

/* ─── Severity Bar ─── */
.severity-bar {
  margin-top: auto;
}

.bar-track {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.8s ease;
}

.fill-critical {
  background: linear-gradient(90deg, #ef4444, #f87171);
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.4);
}

.fill-high {
  background: linear-gradient(90deg, #f59e0b, #fbbf24);
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.3);
}

.fill-medium {
  background: linear-gradient(90deg, var(--accent), var(--accent-light));
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.3);
}

/* ─── Impact Strip ─── */
.impact-strip {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
  padding: 1rem 1.8rem;
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.04);
}

.strip-label {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  white-space: nowrap;
  flex-shrink: 0;
}

.strip-label i {
  color: #f59e0b;
  font-size: 0.85rem;
}

.strip-label span {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  color: #f59e0b;
  opacity: 0.8;
}

.strip-divider {
  width: 1px;
  height: 24px;
  background: rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
}

.strip-chips {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  flex-grow: 1;
}

.impact-chip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.9rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.3s ease;
}

.impact-chip:hover {
  background: rgba(245, 158, 11, 0.06);
  border-color: rgba(245, 158, 11, 0.15);
  transform: translateY(-2px);
}

.chip-icon i {
  font-size: 0.45rem;
}

.chip-color-0 i { color: #ef4444; }
.chip-color-1 i { color: #f59e0b; }
.chip-color-2 i { color: var(--accent-light); }
.chip-color-3 i { color: #8b5cf6; }
.chip-color-4 i { color: #10b981; }

.impact-chip span {
  font-size: 0.8rem;
  font-weight: 700;
  color: white;
  letter-spacing: 0.05em;
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
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.chart-header i {
  font-size: 1.8rem;
  color: #60a5fa;
}

.chart-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
  letter-spacing: 0.02em;
}

.chart-container {
  width: 100%;
}

.chart-layout {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.chart-wrapper {
  flex: 1;
  min-height: 450px;
}

/* ─── Custom HTML Legend ─── */
.custom-legend-container {
  width: 320px;
  background: #0f172a;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
  flex-shrink: 0;
}

.custom-legend {
  height: 350px;
  overflow-y: auto;
  padding-right: 1rem;
  scrollbar-width: thin;
  scrollbar-color: #fbbf24 transparent;
}

.custom-legend::-webkit-scrollbar { width: 8px; }
.custom-legend::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); border-radius: 10px; }
.custom-legend::-webkit-scrollbar-thumb { background: #fbbf24; border-radius: 10px; }

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.9rem;
}

.legend-marker {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1.5px solid #ffffff;
  flex-shrink: 0;
}

.legend-text {
  font-size: 0.9rem;
  color: #e2e8f0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.chart-source {
  font-size: 0.75rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.4);
  text-align: right;
  margin-top: 1rem;
  letter-spacing: 0.05em;
}

/* ─── Actor Descriptions ─── */
.actor-descriptions {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.5rem 1rem 0.5rem 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.actor-row {
  display: flex;
  align-items: baseline;
  gap: 0.8rem;
  font-size: 1.1rem;
  line-height: 1.6;
}

.actor-name {
  font-weight: 800;
  font-size: 1.15rem;
  min-width: 110px;
  flex-shrink: 0;
}

.actor-name.qilin { color: #3b82f6; }
.actor-name.akira { color: #8b5cf6; }
.actor-name.clop { color: #10b981; }
.actor-name.play { color: #f97316; }
.actor-name.inc { color: #94a3b8; }

.actor-desc {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 300;
  letter-spacing: 0.02em;
}

/* ─── Responsive ─── */
@media (max-width: 1100px) {
  .threat-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .impact-strip {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}

@media (max-width: 700px) {
  .threat-grid {
    grid-template-columns: 1fr;
  }
}
</style>
