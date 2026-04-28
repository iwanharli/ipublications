<template>
  <div class="slide-content slide-grid">
    <div class="slide-inner">
      <span class="slide-number">04 / METRICS</span>
      <h2 class="sub-title">Operational <span class="italic-serif">Excellence</span></h2>
      <div class="metrics-grid">
        <div class="metric-item">
          <i class="fa-solid fa-server m-icon"></i>
          <span class="m-val">99.9%</span>
          <span class="m-label">Uptime Reliability</span>
        </div>
        <div class="metric-item">
          <i class="fa-solid fa-bolt m-icon"></i>
          <span class="m-val">< 50ms</span>
          <span class="m-label">Network Latency</span>
        </div>
        <div class="metric-item">
          <i class="fa-solid fa-database m-icon"></i>
          <span class="m-val">2.4TB</span>
          <span class="m-label">Daily Thruput</span>
        </div>
        <div class="metric-item">
          <i class="fa-solid fa-shield-halved m-icon"></i>
          <span class="m-val">Live</span>
          <span class="m-label">Security Sync</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue';
import gsap from 'gsap';

const props = defineProps({
  active: Boolean
});

watch(() => props.active, (val) => {
  if (val) {
    gsap.fromTo('.slide-grid .metric-item', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, delay: 0.2 });
    gsap.fromTo('.slide-grid .m-val', { scale: 0.9 }, { scale: 1, duration: 1, delay: 0.4, ease: 'back.out(2)' });
  }
}, { immediate: true });
</script>

<style scoped>
.slide-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10vw;
}

.slide-inner {
  max-width: 1000px;
  width: 100%;
}

.slide-number {
  font-size: 0.8rem;
  letter-spacing: 0.4em;
  color: var(--accent-light);
  margin-bottom: 2rem;
  display: block;
}

.sub-title {
  font-size: 3.5rem;
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 2rem;
  color: white;
}

.italic-serif {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--accent-light);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 4rem;
}

.metric-item {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 2rem;
  text-align: left;
}

.m-icon {
  font-size: 1.2rem;
  color: var(--accent-light);
  margin-bottom: 1.5rem;
  opacity: 0.4;
  display: block;
}

.m-val {
  font-size: 3rem;
  font-weight: 300;
  display: block;
  margin-bottom: 0.5rem;
  color: var(--accent-light);
}

.m-label {
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.5;
  color: white;
}

@media (max-width: 1024px) {
  .metrics-grid { grid-template-columns: repeat(2, 1fr); }
  .sub-title { font-size: 2.5rem; }
}
</style>
