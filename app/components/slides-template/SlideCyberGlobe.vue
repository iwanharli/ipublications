<template>
  <div class="slide-content slide-cyber">
    <div class="globe-container" ref="globeRef"></div>
    
    <div class="overlay-content">
      <span class="slide-number">SPECIAL / MONITORING</span>
      <h2 class="sub-title">Global <span class="italic-serif">Threat</span> Intelligence</h2>
      <div class="stats-panel">
        <div class="stat-item red">
          <span class="label">ACTIVE ATTACKS</span>
          <span class="value">1,284</span>
        </div>
        <div class="stat-item blue">
          <span class="label">NEUTRALIZED</span>
          <span class="value">99.8%</span>
        </div>
      </div>
    </div>
    
    <div class="cyber-log">
      <div class="log-header">LIVE THREAT FEED</div>
      <div class="log-entries">
        <div v-for="(log, i) in logs" :key="i" class="log-entry">
          <span class="time">{{ log.time }}</span>
          <span class="msg">{{ log.msg }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import gsap from 'gsap';

const props = defineProps({
  active: Boolean
});

const globeRef = ref(null);
let myGlobe = null;
const logs = ref([
  { time: '08:14:02', msg: 'DDoS mitigation active on Node-JKT-1' },
  { time: '08:14:05', msg: 'Inbound anomaly detected from [103.4.XX.XX]' },
  { time: '08:14:10', msg: 'Zero-day patch deployed to Border-Gate-4' },
  { time: '08:14:15', msg: 'Credential stuffing attempt blocked [99%]' }
]);

const arcsData = [...Array(20).keys()].map(() => ({
  startLat: (Math.random() - 0.5) * 180,
  startLng: (Math.random() - 0.5) * 360,
  endLat: (Math.random() - 0.5) * 180,
  endLng: (Math.random() - 0.5) * 360,
  color: ['#ff4d4d', '#ff0000', '#60a5fa'][Math.round(Math.random() * 2)]
}));

onMounted(async () => {
  if (process.client) {
    const GlobeModule = await import('globe.gl');
    const Globe = GlobeModule.default;
    
    const width = globeRef.value.clientWidth;
    const height = globeRef.value.clientHeight;

    myGlobe = Globe()(globeRef.value)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .backgroundColor('rgba(0,0,0,0)')
      .showAtmosphere(true)
      .atmosphereColor('#2563eb')
      .width(width)
      .height(height)
      .arcsData(arcsData)
      .arcColor('color')
      .arcDashLength(0.4)
      .arcDashGap(4)
      .arcDashAnimateTime(1500)
      .arcStroke(0.5);

    // Auto-rotate settings
    myGlobe.controls().autoRotate = props.active;
    myGlobe.controls().autoRotateSpeed = 0.5;
    myGlobe.controls().enableZoom = false;

    // Center the globe view
    myGlobe.pointOfView({ lat: 0, lng: 0, altitude: 2.5 });

    window.addEventListener('resize', handleResize);
    
    setTimeout(handleResize, 100);
  }
});

const handleResize = () => {
  if (myGlobe && globeRef.value) {
    myGlobe.width(globeRef.value.clientWidth).height(globeRef.value.clientHeight);
  }
};

// Optimization: Pause/Resume globe based on active state
watch(() => props.active, (isActive) => {
  if (myGlobe) {
    myGlobe.controls().autoRotate = isActive;
    
    // If not active, we can reduce the renderer's impact
    if (!isActive) {
      // Small delay before pausing rotation to avoid jitter
      myGlobe.controls().autoRotateSpeed = 0;
    } else {
      myGlobe.controls().autoRotateSpeed = 0.5;
      
      // Animate overlay content
      gsap.fromTo('.slide-cyber .overlay-content', { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, delay: 0.5 });
      gsap.fromTo('.slide-cyber .cyber-log', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.8 });
    }
  }
}, { immediate: true });

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.slide-content {
  height: 100%;
  width: 100%;
  position: relative;
  background: #000;
  overflow: hidden;
  padding: 0 !important;
}

.globe-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
}

.overlay-content {
  position: absolute;
  top: 15%;
  left: 10vw;
  z-index: 10;
  pointer-events: none;
}

.slide-number {
  font-size: 0.8rem;
  letter-spacing: 0.4em;
  color: var(--accent-light);
  margin-bottom: 2rem;
  display: block;
}

.sub-title {
  font-size: 4rem;
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 3rem;
  color: white;
}

.italic-serif {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--accent-light);
}

.stats-panel {
  display: flex;
  gap: 3rem;
  margin-top: 2rem;
}

.stat-item .label {
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.4);
  display: block;
  margin-bottom: 0.5rem;
}

.stat-item .value {
  font-size: 2.5rem;
  font-weight: 300;
  color: white;
}

.stat-item.red .value { color: #ff4d4d; }
.stat-item.blue .value { color: var(--accent-light); }

.cyber-log {
  position: absolute;
  bottom: 10%;
  right: 10vw;
  width: 350px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  z-index: 10;
}

.log-header {
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: var(--accent-light);
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.5rem;
}

.log-entries {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.log-entry {
  font-family: monospace;
  font-size: 0.8rem;
  display: flex;
  gap: 1rem;
}

.log-entry .time { color: rgba(255, 255, 255, 0.3); }
.log-entry .msg { color: rgba(255, 255, 255, 0.7); }

@media (max-width: 1024px) {
  .sub-title { font-size: 2.5rem; }
  .cyber-log { display: none; }
}
</style>
