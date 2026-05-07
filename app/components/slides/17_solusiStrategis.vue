<template>
  <div class="slide-content slide-nist-perfected">
    <div class="slide-inner">
      <div class="header-section text-center mb-5">
        <h2 class="sub-label">Strategic Framework</h2>
        <h1 class="slide-title">NIST <span class="text-accent">Cybersecurity Framework 2.0</span></h1>
      </div>

      <div class="nist-layout">
        <div class="wheel-container">
          <svg viewBox="0 0 500 500" class="nist-svg">
            <defs>
              <!-- Outer Ring Text Paths (Carefully oriented for readability) -->
              <!-- Top Right: Identify -->
              <path id="tp-identify" d="M 250,65 A 185,185 0 0,1 426,181" fill="none" />
              <!-- Bottom Right: Protect -->
              <path id="tp-protect" d="M 426,181 A 185,185 0 0,1 360,392" fill="none" />
              <!-- Bottom: Detect (Reversed to prevent upside down text) -->
              <path id="tp-detect" d="M 140,392 A 185,185 0 0,0 360,392" fill="none" />
              <!-- Bottom Left: Respond (Reversed to prevent upside down text) -->
              <path id="tp-respond" d="M 74,181 A 185,185 0 0,0 140,392" fill="none" />
              <!-- Top Left: Recover -->
              <path id="tp-recover" d="M 74,181 A 185,185 0 0,1 250,65" fill="none" />
              
              <!-- Middle Ring Path for GOVERN -->
              <path id="tp-govern" d="M 140,250 A 110,110 0 0,1 360,250" fill="none" />
            </defs>

            <!-- Outer Segments -->
            <g class="outer-ring">
              <!-- Identify -->
              <path d="M 250,30 A 220,220 0 0,1 459,181 L 393,201 A 150,150 0 0,0 250,98 Z" 
                class="segment seg-identify" :class="{ active: activeIndex === 1 }" @click="onSegmentSelect(1)" />
              <!-- Protect -->
              <path d="M 459,181 A 220,220 0 0,1 379,428 L 338,371 A 150,150 0 0,0 393,201 Z" 
                class="segment seg-protect" :class="{ active: activeIndex === 2 }" @click="onSegmentSelect(2)" />
              <!-- Detect -->
              <path d="M 379,428 A 220,220 0 0,1 120,428 L 161,371 A 150,150 0 0,0 338,371 Z" 
                class="segment seg-detect" :class="{ active: activeIndex === 3 }" @click="onSegmentSelect(3)" />
              <!-- Respond -->
              <path d="M 120,428 A 220,220 0 0,1 40,181 L 106,201 A 150,150 0 0,0 161,371 Z" 
                class="segment seg-respond" :class="{ active: activeIndex === 4 }" @click="onSegmentSelect(4)" />
              <!-- Recover -->
              <path d="M 40,181 A 220,220 0 0,1 250,30 L 250,98 A 150,150 0 0,0 106,201 Z" 
                class="segment seg-recover" :class="{ active: activeIndex === 5 }" @click="onSegmentSelect(5)" />
            </g>

            <!-- Middle Ring (Govern) -->
            <circle cx="250" cy="250" r="148" class="segment seg-govern" :class="{ active: activeIndex === 0 }" @click="onSegmentSelect(0)" />
            
            <!-- Inner Core -->
            <circle cx="250" cy="250" r="98" class="core-circle" />

            <!-- Labels -->
            <g class="labels-group">
              <text class="label-text">
                <textPath xlink:href="#tp-identify" startOffset="50%" text-anchor="middle">IDENTIFY</textPath>
              </text>
              <text class="label-text">
                <textPath xlink:href="#tp-protect" startOffset="50%" text-anchor="middle">PROTECT</textPath>
              </text>
              <text class="label-text">
                <textPath xlink:href="#tp-detect" startOffset="50%" text-anchor="middle">DETECT</textPath>
              </text>
              <text class="label-text">
                <textPath xlink:href="#tp-respond" startOffset="50%" text-anchor="middle">RESPOND</textPath>
              </text>
              <text class="label-text">
                <textPath xlink:href="#tp-recover" startOffset="50%" text-anchor="middle">RECOVER</textPath>
              </text>
              
              <!-- Govern Label -->
              <text class="label-text label-govern">
                <textPath xlink:href="#tp-govern" startOffset="50%" text-anchor="middle">GOVERN</textPath>
              </text>
            </g>

            <!-- Core Text -->
            <text x="250" y="238" class="core-brand" text-anchor="middle">NIST</text>
            <text x="250" y="260" class="core-sub" text-anchor="middle">Cybersecurity</text>
            <text x="250" y="278" class="core-sub" text-anchor="middle">Framework</text>
          </svg>
        </div>

        <!-- Details Section -->
        <div class="details-section glass">
          <transition name="fade-slide" mode="out-in">
            <div :key="activeIndex" class="detail-card">
              <div class="detail-header">
                <div class="status-dot" :style="{ backgroundColor: getCurrentColor }"></div>
                <h2 class="detail-title" :style="{ color: getCurrentColor }">
                  <span class="detail-number">0{{ activeIndex + 1 }}.</span> {{ getCurrentLabel }}
                </h2>
              </div>
              <p class="detail-desc">{{ getSegmentDesc(getCurrentLabel) }}</p>
              
              <div class="detail-stats">
                <div class="stat-item">
                  <span class="stat-label">STRATEGIC FOCUS</span>
                  <span class="stat-value">{{ getSegmentFocus(getCurrentLabel) }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">POLRI IMPLEMENTATION</span>
                  <span class="stat-value">{{ getSegmentPolri(getCurrentLabel) }}</span>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue';
import gsap from 'gsap';

const props = defineProps({
  active: Boolean
});

const activeIndex = ref(0);
const labels = ['GOVERN', 'IDENTIFY', 'PROTECT', 'DETECT', 'RESPOND', 'RECOVER'];
const colors = ['#fbbf24', '#3b82f6', '#8b5cf6', '#fb923c', '#f87171', '#34d399'];

let cycleInterval = null;

const startCycling = () => {
  stopCycling();
  cycleInterval = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % labels.length;
  }, 12000); // 12 seconds per segment - "lebih lambat"
};

const stopCycling = () => {
  if (cycleInterval) {
    clearInterval(cycleInterval);
    cycleInterval = null;
  }
};

const onSegmentSelect = (idx) => {
  activeIndex.value = idx;
  startCycling(); // Restart interval on manual click
};

const getCurrentLabel = computed(() => labels[activeIndex.value]);
const getCurrentColor = computed(() => colors[activeIndex.value]);

const getSegmentDesc = (seg) => {
  const descs = {
    'GOVERN': 'Pusat tata kelola yang menentukan strategi dan kebijakan keamanan siber Polri secara terpusat.',
    'IDENTIFY': 'Memetakan seluruh aset digital dan data strategis Polri untuk memahami risiko secara utuh.',
    'PROTECT': 'Menerapkan protokol perlindungan berlapis dan Zero Trust untuk menjaga integritas infrastruktur.',
    'DETECT': 'Monitoring berkelanjutan untuk mendeteksi anomali dan serangan siber sedini mungkin.',
    'RESPOND': 'Tindakan respons cepat CSIRT untuk memitigasi dampak insiden siber yang terdeteksi.',
    'RECOVER': 'Pemulihan sistem dan data pasca-insiden untuk menjaga keberlanjutan layanan kepolisian.'
  };
  return descs[seg];
};

const getSegmentFocus = (seg) => {
  const focus = {
    'GOVERN': 'Command & Strategy',
    'IDENTIFY': 'Asset Intelligence',
    'PROTECT': 'Infrastructure Resilience',
    'DETECT': 'Continuous Monitoring',
    'RESPOND': 'Incident Response',
    'RECOVER': 'Service Restoration'
  };
  return focus[seg];
};

const getSegmentPolri = (seg) => {
  const polri = {
    'GOVERN': 'Keputusan Komando & Kebijakan Strategis',
    'IDENTIFY': 'Audit Aset IT & Klasifikasi Data',
    'PROTECT': 'Enkripsi & Zero Trust Architecture',
    'DETECT': 'Security Operations Center (SOC)',
    'RESPOND': 'Unit Taktis CSIRT Polri',
    'RECOVER': 'Disaster Recovery Plan (DRP)'
  };
  return polri[seg];
};

watch(() => props.active, (val) => {
  if (val) {
    activeIndex.value = 0;
    startCycling();
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('.slide-nist-perfected .header-section', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 });
    tl.fromTo('.nist-svg', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: 'back.out(1.5)' });
    tl.fromTo('.details-section', { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, '-=0.5');
  } else {
    stopCycling();
  }
}, { immediate: true });

onUnmounted(() => {
  stopCycling();
});
</script>

<style scoped>
.slide-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5vw;
  background: #020617;
}

.slide-inner { width: 100%; max-width: 1400px; }

.nist-layout {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 6rem;
  align-items: center;
}

.wheel-container { display: flex; justify-content: center; }

.nist-svg {
  width: 100%;
  max-width: 580px;
  filter: drop-shadow(0 0 40px rgba(0,0,0,0.6));
}

.segment {
  cursor: pointer;
  transition: all 0.3s ease;
  stroke: #020617;
  stroke-width: 4;
}

.segment:hover { filter: brightness(1.2); }
.segment.active { stroke: white; stroke-width: 3; }

.seg-govern { fill: #fbbf24; }
.seg-identify { fill: #3b82f6; }
.seg-protect { fill: #8b5cf6; }
.seg-detect { fill: #fb923c; }
.seg-respond { fill: #f87171; }
.seg-recover { fill: #34d399; }

.core-circle { fill: #fff; stroke: #020617; stroke-width: 5; }

.label-text {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 15px;
  fill: #000;
  pointer-events: none;
  letter-spacing: 0.05em;
}

.label-govern { font-size: 18px; }

.core-brand { font-weight: 900; font-size: 28px; fill: #000; }
.core-sub { font-weight: 700; font-size: 12px; fill: #475569; text-transform: uppercase; }

.details-section {
  padding: 3.5rem;
  border-radius: 40px;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(25px);
  min-height: 500px;
}

.detail-header { display: flex; align-items: center; gap: 1.2rem; margin-bottom: 2.5rem; }
.status-dot { width: 14px; height: 14px; border-radius: 50%; box-shadow: 0 0 20px currentColor; }
.detail-title { font-size: 3.2rem; font-weight: 900; text-transform: uppercase; }
.detail-desc { font-size: 1.35rem; color: #94a3b8; line-height: 1.6; margin-bottom: 3rem; }

.detail-stats { display: grid; gap: 2rem; }
.stat-item { display: flex; flex-direction: column; gap: 0.6rem; }
.stat-label { font-size: 0.8rem; text-transform: uppercase; color: #64748b; letter-spacing: 0.3em; font-weight: 800; }
.stat-value { font-size: 1.3rem; color: white; font-weight: 600; }

.slide-title { font-size: 3rem; font-weight: 900; }
.text-accent { color: #3b82f6; }
.sub-label { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5em; color: #3b82f6; opacity: 0.6; }

/* Transitions */
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.4s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateX(20px); }
.fade-slide-leave-to { opacity: 0; transform: translateX(-20px); }
</style>
