<template>
  <div class="slide-content slide-globe-threat">
    <!-- Full-screen Globe -->
    <div class="globe-container" ref="globeRef"></div>

    <!-- Scanline overlay -->
    <div class="scanline-overlay"></div>

    <!-- Top-left: Header -->
    <div class="overlay-header">
      <div class="header-badge live-badge">
        <span class="live-dot"></span>
        <span class="live-label">LIVE THREAT INTELLIGENCE</span>
      </div>
      <h1 class="globe-title">
        Global <span class="title-accent">IP Abuse</span> Monitor
      </h1>
      <p class="globe-subtitle">Ancaman siber bersifat masif, terus berjalan, dan tidak pernah berhenti</p>
    </div>

    <!-- Bottom-left: Stats -->
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-value" ref="statAttacks">0</div>
        <div class="stat-label">ATTACKS / MIN</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" ref="statCountries">0</div>
        <div class="stat-label">SOURCE COUNTRIES</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" ref="statBlocked">0</div>
        <div class="stat-label">IP BLOCKED TODAY</div>
      </div>
    </div>

    <!-- Bottom-right: Live Feed -->
    <div class="live-feed">
      <div class="feed-header">
        <i class="fa-solid fa-terminal"></i>
        <span>INCOMING ATTACKS → INDONESIA</span>
      </div>
      <div class="feed-entries">
        <TransitionGroup name="feed-item" tag="div">
          <div v-for="entry in visibleFeed" :key="entry.id" class="feed-row">
            <span class="feed-time">{{ entry.time }}</span>
            <span class="feed-type" :class="entry.typeClass">{{ entry.type }}</span>
            <span class="feed-ip">{{ entry.srcIP }}</span>
            <span class="feed-arrow">→</span>
            <span class="feed-target">{{ entry.targetIP }}</span>
          </div>
        </TransitionGroup>
      </div>
    </div>

    <!-- Right: Message pills -->
    <div class="center-pills">
      <div v-for="(pill, i) in messagePills" :key="i" class="msg-pill">
        <i :class="pill.icon"></i>
        <span>{{ pill.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import gsap from 'gsap';

const props = defineProps({
  active: Boolean
});

const globeRef = ref(null);
const statAttacks = ref(null);
const statCountries = ref(null);
const statBlocked = ref(null);

let myGlobe = null;
let feedInterval = null;
let arcRefreshInterval = null;
let feedIdCounter = 0;

const messagePills = [
  { icon: 'fa-solid fa-globe', text: 'GLOBAL' },
  { icon: 'fa-solid fa-infinity', text: 'NON-STOP' },
  { icon: 'fa-solid fa-explosion', text: 'MASIF' },
  { icon: 'fa-solid fa-clock', text: 'REAL-TIME' }
];

// Realistic source locations (known IP abuse origins)
const attackSources = [
  { city: 'Moscow', country: 'RU', lat: 55.75, lng: 37.62, ipPrefix: '185.220' },
  { city: 'Beijing', country: 'CN', lat: 39.9, lng: 116.4, ipPrefix: '112.85' },
  { city: 'Shanghai', country: 'CN', lat: 31.2, lng: 121.5, ipPrefix: '61.160' },
  { city: 'São Paulo', country: 'BR', lat: -23.5, lng: -46.6, ipPrefix: '177.54' },
  { city: 'New York', country: 'US', lat: 40.7, lng: -74.0, ipPrefix: '198.51' },
  { city: 'Amsterdam', country: 'NL', lat: 52.4, lng: 4.9, ipPrefix: '185.107' },
  { city: 'Mumbai', country: 'IN', lat: 19.08, lng: 72.88, ipPrefix: '103.87' },
  { city: 'Pyongyang', country: 'KP', lat: 39.02, lng: 125.75, ipPrefix: '175.45' },
  { city: 'Tehran', country: 'IR', lat: 35.69, lng: 51.39, ipPrefix: '5.160' },
  { city: 'Bangkok', country: 'TH', lat: 13.76, lng: 100.5, ipPrefix: '122.155' },
  { city: 'Seoul', country: 'KR', lat: 37.57, lng: 126.98, ipPrefix: '211.234' }
];

// Indonesia target locations
const indonesiaTargets = [
  { city: 'Jakarta', lat: -6.2, lng: 106.85, ipPrefix: '103.28' },
  { city: 'Surabaya', lat: -7.25, lng: 112.75, ipPrefix: '36.92' },
  { city: 'Bandung', lat: -6.91, lng: 107.61, ipPrefix: '180.252' },
  { city: 'Medan', lat: 3.6, lng: 98.67, ipPrefix: '114.124' },
  { city: 'Makassar', lat: -5.14, lng: 119.42, ipPrefix: '103.56' }
];

const attackTypes = [
  { type: 'DDoS', typeClass: 'type-red', weight: 3 },
  { type: 'BRUTE', typeClass: 'type-orange', weight: 4 },
  { type: 'SCAN', typeClass: 'type-blue', weight: 5 },
  { type: 'PHISH', typeClass: 'type-purple', weight: 2 },
  { type: 'EXFIL', typeClass: 'type-red', weight: 1 },
  { type: 'C2', typeClass: 'type-orange', weight: 1 },
  { type: 'SQLI', typeClass: 'type-blue', weight: 3 },
  { type: 'RCE', typeClass: 'type-red', weight: 1 },
  { type: 'XSS', typeClass: 'type-purple', weight: 2 }
];

const randOctet = () => Math.floor(Math.random() * 254) + 1;
const randomIP = (prefix) => `${prefix}.${randOctet()}.${randOctet()}`;
const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Weighted random attack type
const randomAttackType = () => {
  const totalWeight = attackTypes.reduce((s, a) => s + a.weight, 0);
  let r = Math.random() * totalWeight;
  for (const atk of attackTypes) {
    r -= atk.weight;
    if (r <= 0) return atk;
  }
  return attackTypes[0];
};

const visibleFeed = ref([]);

const generateFeedEntry = () => {
  const src = randomFrom(attackSources);
  const tgt = randomFrom(indonesiaTargets);
  const atk = randomAttackType();
  const now = new Date();
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

  return {
    id: feedIdCounter++,
    time,
    type: atk.type,
    typeClass: atk.typeClass,
    srcIP: randomIP(src.ipPrefix),
    targetIP: randomIP(tgt.ipPrefix),
    srcCity: src.city,
    targetCity: tgt.city
  };
};

let feedTimeout = null;
let arcTimeout = null;

const addRandomFeed = () => {
  if (!props.active) return;
  visibleFeed.value.unshift(generateFeedEntry());
  if (visibleFeed.value.length > 8) visibleFeed.value.pop();
  
  // Random tempo between 200ms and 2500ms
  const randomDelay = Math.random() * 2300 + 200;
  feedTimeout = setTimeout(addRandomFeed, randomDelay);
};

const addRandomArc = () => {
  if (!myGlobe || !props.active) return;
  
  const currentArcs = myGlobe.arcsData();
  const newArc = generateArcs(1)[0];
  
  // Keep maximum 35 arcs on screen to prevent lag
  if (currentArcs.length > 35) currentArcs.shift();
  
  myGlobe.arcsData([...currentArcs, newArc]);
  
  // Random tempo between 300ms and 1500ms
  const randomDelay = Math.random() * 1200 + 300;
  arcTimeout = setTimeout(addRandomArc, randomDelay);
};

const startFeed = () => {
  visibleFeed.value = [];
  for (let i = 0; i < 8; i++) {
    visibleFeed.value.push(generateFeedEntry());
  }
  addRandomFeed();
};

const stopFeed = () => {
  if (feedTimeout) { clearTimeout(feedTimeout); feedTimeout = null; }
  if (arcTimeout) { clearTimeout(arcTimeout); arcTimeout = null; }
};

// Generate realistic arcs: all targeting Indonesia
const generateArcs = (count = 25) => {
  return [...Array(count)].map(() => {
    const src = randomFrom(attackSources);
    const tgt = randomFrom(indonesiaTargets);
    const jitter = () => (Math.random() - 0.5) * 2;
    const colors = ['#ff4d4d', '#ff6b35', '#ef4444', '#f97316'];
    return {
      startLat: src.lat + jitter(),
      startLng: src.lng + jitter(),
      endLat: tgt.lat + jitter(),
      endLng: tgt.lng + jitter(),
      color: randomFrom(colors)
    };
  });
};

// Indonesia ring highlights
const ringsData = indonesiaTargets.map(t => ({
  lat: t.lat,
  lng: t.lng,
  maxR: 2.5,
  propagationSpeed: 2,
  repeatPeriod: 1200 + Math.random() * 800,
  color: 'rgba(239, 68, 68, 0.6)'
}));

onMounted(async () => {
  if (process.client) {
    try {
      const GlobeModule = await import('globe.gl');
      const Globe = GlobeModule.default;

      await nextTick();
      if (!globeRef.value) return;

      const width = globeRef.value.clientWidth;
      const height = globeRef.value.clientHeight;

      myGlobe = Globe()(globeRef.value)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
        .backgroundColor('rgba(0,0,0,0)')
        .showAtmosphere(true)
        .atmosphereColor('lightskyblue')
        .atmosphereAltitude(0.15)
        .width(width)
        .height(height)
        // Attack arcs
        .arcsData(generateArcs(15))
        .arcColor('color')
        .arcDashLength(0.8)
        .arcDashGap(4)
        .arcDashAnimateTime(() => Math.random() * 1500 + 1000)
        .arcStroke(0.6)
        .arcAltitudeAutoScale(0.4)
        // Target rings (pulsing)
        .ringsData(ringsData)
        .ringColor('color')
        .ringMaxRadius('maxR')
        .ringPropagationSpeed('propagationSpeed')
        .ringRepeatPeriod('repeatPeriod')
        // Source/target points
        .pointsData([
          ...attackSources.map(s => ({ lat: s.lat, lng: s.lng, size: 0.03, color: '#f97316' })),
          ...indonesiaTargets.map(t => ({ lat: t.lat, lng: t.lng, size: 0.08, color: '#ef4444' }))
        ])
        .pointAltitude('size')
        .pointColor('color')
        .pointRadius(0.3)
        .pointsMerge(true);

      myGlobe.controls().autoRotate = props.active;
      myGlobe.controls().autoRotateSpeed = 0.4;
      myGlobe.controls().enableZoom = false;
      myGlobe.controls().enablePan = false;

      // Start focused on Indonesia
      myGlobe.pointOfView({ lat: -2, lng: 118, altitude: 2.1 });

      window.addEventListener('resize', handleResize);
      setTimeout(handleResize, 100);

      // Start random arc generation
      addRandomArc();
    } catch (e) {
      console.error('Globe init failed', e);
    }
  }
});

const handleResize = () => {
  if (myGlobe && globeRef.value) {
    myGlobe.width(globeRef.value.clientWidth).height(globeRef.value.clientHeight);
  }
};

watch(() => props.active, (isActive) => {
  if (myGlobe) {
    myGlobe.controls().autoRotate = isActive;
    myGlobe.controls().autoRotateSpeed = isActive ? 0.35 : 0;
  }

  if (isActive) {
    startFeed();

    // Animate stats with realistic numbers
    if (statAttacks.value) {
      gsap.fromTo(statAttacks.value, { innerText: 0 }, {
        innerText: 12847,
        duration: 2.5,
        ease: 'power2.out',
        snap: { innerText: 1 },
        onUpdate() { statAttacks.value.textContent = Math.round(parseFloat(statAttacks.value.innerText)).toLocaleString(); }
      });
    }
    if (statCountries.value) {
      gsap.fromTo(statCountries.value, { innerText: 0 }, {
        innerText: 194,
        duration: 2,
        ease: 'power2.out',
        snap: { innerText: 1 }
      });
    }
    if (statBlocked.value) {
      gsap.fromTo(statBlocked.value, { innerText: 0 }, {
        innerText: 84291,
        duration: 3,
        ease: 'power2.out',
        snap: { innerText: 1 },
        onUpdate() { statBlocked.value.textContent = Math.round(parseFloat(statBlocked.value.innerText)).toLocaleString(); }
      });
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('.overlay-header', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
    tl.fromTo('.stat-card', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.12 }, '-=0.5');
    tl.fromTo('.live-feed', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, '-=0.4');
    tl.fromTo('.msg-pill', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.15, ease: 'back.out(2)' }, '-=0.3');
  } else {
    stopFeed();
  }
}, { immediate: true });

onUnmounted(() => {
  stopFeed();
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.slide-content {
  height: 100%;
  width: 100%;
  position: relative;
  background: #020617;
  overflow: hidden;
  padding: 0 !important;
}

.globe-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.92;
}

.scanline-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 5;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.02) 2px,
    rgba(0, 0, 0, 0.02) 4px
  );
}

/* ─── Header ─── */
.overlay-header {
  position: absolute;
  top: 12%;
  left: 6vw;
  z-index: 10;
  pointer-events: none;
}

.live-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.35rem 1rem;
  border-radius: 100px;
  border: 1px solid rgba(239, 68, 68, 0.3);
  background: rgba(239, 68, 68, 0.08);
  margin-bottom: 1rem;
}

.live-dot {
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
  animation: live-pulse 1.5s infinite;
}

@keyframes live-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.6); }
  50% { box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
}

.live-label {
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  color: #ef4444;
}

.globe-title {
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: white;
  line-height: 1.1;
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.7);
}

.title-accent {
  background: linear-gradient(135deg, #ef4444 0%, #f97316 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.globe-subtitle {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.45);
  margin-top: 0.6rem;
  letter-spacing: 0.04em;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

/* ─── Stats ─── */
.stats-row {
  position: absolute;
  bottom: 12%;
  left: 6vw;
  display: flex;
  gap: 1.5rem;
  z-index: 10;
}

.stat-card {
  padding: 1rem 1.6rem;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(2, 6, 23, 0.85) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  min-width: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stat-value {
  font-family: var(--font-mono, monospace);
  font-size: 2rem;
  font-weight: 900;
  color: white;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.stat-label {
  font-size: 0.55rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  color: #ef4444;
  margin-top: 0.4rem;
  text-transform: uppercase;
}

/* ─── Live Feed ─── */
.live-feed {
  position: absolute;
  bottom: 12%;
  right: 6vw;
  width: 440px;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(2, 6, 23, 0.9) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.2rem 1.5rem;
  z-index: 10;
}

.feed-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.55rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: #ef4444;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid rgba(239, 68, 68, 0.1);
  margin-bottom: 0.6rem;
}

.feed-header i { font-size: 0.65rem; }

.feed-entries {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  max-height: 210px;
  overflow: hidden;
}

.feed-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.4rem;
  border-radius: 4px;
  font-family: var(--font-mono, monospace);
}

.feed-row:hover { background: rgba(255, 255, 255, 0.03); }

.feed-time {
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.2);
  flex-shrink: 0;
  width: 55px;
}

.feed-type {
  font-size: 0.5rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  padding: 0.12rem 0.4rem;
  border-radius: 3px;
  flex-shrink: 0;
  min-width: 38px;
  text-align: center;
}

.type-red { color: #ef4444; background: rgba(239, 68, 68, 0.12); }
.type-orange { color: #f97316; background: rgba(249, 115, 22, 0.12); }
.type-blue { color: #60a5fa; background: rgba(96, 165, 250, 0.12); }
.type-purple { color: #a78bfa; background: rgba(167, 139, 250, 0.12); }

.feed-ip {
  font-size: 0.62rem;
  color: rgba(255, 255, 255, 0.45);
  flex-shrink: 0;
}

.feed-arrow {
  font-size: 0.55rem;
  color: #ef4444;
  opacity: 0.5;
}

.feed-target {
  font-size: 0.62rem;
  color: #ef4444;
  opacity: 0.8;
}

/* Feed transition */
.feed-item-enter-active { transition: all 0.4s ease; }
.feed-item-leave-active { transition: all 0.3s ease; position: absolute; }
.feed-item-enter-from { opacity: 0; transform: translateY(-10px); }
.feed-item-leave-to { opacity: 0; transform: translateX(15px); }
.feed-item-move { transition: transform 0.4s ease; }

/* ─── Pills ─── */
.center-pills {
  position: absolute;
  top: 14%;
  right: 6vw;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 10;
}

.msg-pill {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.45rem 1rem;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(239, 68, 68, 0.1);
  animation: pill-glow 3s ease-in-out infinite alternate;
}

.msg-pill i {
  font-size: 0.7rem;
  color: #ef4444;
}

.msg-pill span {
  font-size: 0.55rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.55);
}

@keyframes pill-glow {
  0% { border-color: rgba(239, 68, 68, 0.06); }
  100% { border-color: rgba(239, 68, 68, 0.22); }
}

/* ─── Responsive ─── */
@media (max-width: 1100px) {
  .live-feed { display: none; }
  .center-pills { display: none; }
  .stats-row { flex-wrap: wrap; }
}
</style>
