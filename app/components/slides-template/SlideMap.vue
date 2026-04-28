<template>
  <div class="slide-content slide-map">
    <div class="slide-inner">
      <div class="header-section">
        <span class="slide-number">13 / GEOSPATIAL MONITORING</span>
        <h2 class="sub-title">Kamtibmas <span class="italic-serif">Risk</span> Heatmap</h2>
      </div>

      <div class="map-layout">
        <!-- Indonesia Map Section -->
        <div class="map-wrapper reveal-map">
          <div class="map-container" v-html="svgContent" ref="mapRef"></div>
        </div>

        <!-- Sidebar context -->
        <div class="incident-sidebar reveal-sidebar">
          <div class="sidebar-header">
            <h3>REGION RISK ANALYSIS</h3>
            <div class="live-tag">LIVE DATA</div>
          </div>
          <div class="incident-list">
            <div v-for="(p, i) in heatmapData" :key="i" class="incident-item glass">
              <div class="risk-indicator" :style="{ background: p.color }"></div>
              <div class="incident-info">
                <div class="city">{{ p.name }}</div>
                <div class="type">{{ p.riskLevel }}</div>
                <div class="factors">{{ p.factors }}</div>
              </div>
              <div class="severity" :style="{ color: p.color, background: p.color + '1a' }">
                {{ p.value }}%
              </div>
            </div>
          </div>
          <div class="map-legend">
            <div class="legend-item">
              <div class="dot red"></div> <span>Critical</span>
            </div>
            <div class="legend-item">
              <div class="dot orange"></div> <span>High</span>
            </div>
            <div class="legend-item">
              <div class="dot yellow"></div> <span>Moderate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import gsap from 'gsap';

const props = defineProps({
  active: Boolean
});

const mapRef = ref(null);
const svgContent = ref('');

const heatmapData = ref([
  { id: 'IDJK', name: 'DKI JAKARTA', value: 94, riskLevel: 'CRITICAL', color: '#ef4444', factors: 'Kepadatan Tinggi, Cyber Crime' },
  { id: 'IDPA', name: 'PAPUA', value: 86, riskLevel: 'HIGH RISK', color: '#f97316', factors: 'Instabilitas Wilayah, Logistik' },
  { id: 'IDJI', name: 'JAWA TIMUR', value: 79, riskLevel: 'HIGH RISK', color: '#f97316', factors: 'Sentra Industri, Mobilitas' },
  { id: 'IDSN', name: 'SULAWESI SELATAN', value: 68, riskLevel: 'MODERATE', color: '#fbbf24', factors: 'Hub Regional, Perdagangan' },
  { id: 'IDAC', name: 'ACEH', value: 62, riskLevel: 'MODERATE', color: '#fbbf24', factors: 'Pengawasan Perbatasan' }
]);

onMounted(async () => {
  try {
    const response = await fetch('/id.svg');
    let text = await response.text();
    
    // Clean up SVG
    text = text.replace(/<?xml[^>]*?>/i, '')
               .replace(/<!DOCTYPE[^>]*?>/i, '')
               .replace(/width="[^"]*"/i, 'width="100%"')
               .replace(/height="[^"]*"/i, 'height="auto"');
    
    svgContent.value = text;
    
    await nextTick();
    applyHeatmapColors();
  } catch (e) {
    console.error('Failed to load map SVG', e);
  }
});

const applyHeatmapColors = () => {
  if (!mapRef.value) return;
  
  const svg = mapRef.value.querySelector('svg');
  if (!svg) return;
  
  const allPaths = svg.querySelectorAll('path, polygon');
  allPaths.forEach(path => {
    path.style.fill = 'rgba(255, 255, 255, 0.08)';
    path.style.stroke = 'rgba(251, 191, 36, 0.2)';
    path.style.strokeWidth = '0.5px';
    path.style.transition = 'all 0.5s ease';
  });
  
  heatmapData.value.forEach(data => {
    const el = svg.querySelector(`#${data.id}`);
    if (el) {
      el.style.fill = data.color + '66'; // 40% opacity
      el.style.stroke = data.color;
      el.style.strokeWidth = '1.5px';
      el.style.filter = `drop-shadow(0 0 8px ${data.color})`;
    }
  });
};

watch(() => props.active, (val) => {
  if (val) {
    gsap.fromTo('.slide-map .sub-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.2 });
    gsap.fromTo('.reveal-map', { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, delay: 0.4 });
    gsap.fromTo('.reveal-sidebar', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, delay: 0.8 });
    gsap.fromTo('.incident-item', { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 1 });
  }
}, { immediate: true });
</script>

<style scoped>
.slide-content {
  height: 100%;
  width: 100%;
}

.slide-inner {
  height: 100%;
  padding: 6rem 10vw;
  display: flex;
  flex-direction: column;
}

.slide-number {
  font-size: 0.8rem;
  letter-spacing: 0.4em;
  color: var(--accent);
  margin-bottom: 2rem;
  display: block;
}

.sub-title {
  font-size: 3.5rem;
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 3rem;
  color: white;
}

.italic-serif {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--accent);
}

.map-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 4rem;
  flex-grow: 1;
  align-items: flex-start;
}

.map-wrapper {
  position: relative;
  width: 100%;
  margin-top: 2rem;
}

.map-container {
  position: relative;
  width: 100%;
}

:deep(svg) {
  width: 100% !important;
  height: auto !important;
  display: block;
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.5));
}

:deep(path:hover), :deep(polygon:hover) {
  fill: rgba(251, 191, 36, 0.2) !important;
  stroke: var(--accent) !important;
  cursor: pointer;
}

/* Sidebar */
.incident-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-header h3 {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: white;
}

.live-tag {
  font-size: 0.6rem;
  font-weight: 900;
  color: var(--accent);
  border: 1px solid var(--accent);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
}

.incident-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.incident-item {
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.risk-indicator {
  width: 4px;
  height: 40px;
  border-radius: 2px;
}

.incident-info .city {
  font-size: 0.9rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.1rem;
}

.incident-info .type {
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--accent);
}

.incident-info .factors {
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.4;
}

.severity {
  margin-left: auto;
  font-size: 0.9rem;
  font-weight: 800;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
}

.map-legend {
  margin-top: 1rem;
  display: flex;
  gap: 1.5rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 600;
}

.legend-item .dot { width: 8px; height: 8px; border-radius: 50%; }
.legend-item .dot.red { background: #ef4444; }
.legend-item .dot.orange { background: #f97316; }
.legend-item .dot.yellow { background: #fbbf24; }

@media (max-width: 1024px) {
  .map-layout { grid-template-columns: 1fr; gap: 2rem; }
  .incident-sidebar { display: none; }
}
</style>
