<template>
  <div class="slide-content slide-timeline">
    <div class="slide-inner">
      <span class="slide-number">05 / EVOLUTION</span>
      <h2 class="sub-title">Implementation <span class="italic-serif">Roadmap</span></h2>
      
      <div class="timeline-container">
        <div class="timeline-line"></div>
        <div class="timeline-items">
          <div v-for="(item, index) in timeline" :key="index" class="timeline-item">
            <div class="t-dot"></div>
            <div class="t-content">
              <span class="t-year">
                <i :class="item.icon" class="me-2"></i> {{ item.year }}
              </span>
              <h4 class="t-title">{{ item.title }}</h4>
              <p class="t-desc">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const timeline = [
  { year: 'Q4 2025', icon: 'fa-solid fa-clipboard-check', title: 'System Audit', desc: 'Comprehensive infrastructure and security assessment.' },
  { year: 'Q1 2026', icon: 'fa-solid fa-server', title: 'Core Deployment', desc: 'Rolling out the centralized command architecture.' },
  { year: 'Q2 2026', icon: 'fa-solid fa-network-wired', title: 'Agencies Sync', desc: 'Integrating inter-agency data protocols.' },
  { year: 'Q3 2026', icon: 'fa-solid fa-globe', title: 'Global Live', desc: 'Final activation of the nationwide digital network.' }
];

import { watch } from 'vue';
import gsap from 'gsap';

const props = defineProps({
  active: Boolean
});

watch(() => props.active, (val) => {
  if (val) {
    gsap.fromTo('.slide-timeline .timeline-line', { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 1.5, ease: 'power2.inOut', delay: 0.2 });
    gsap.fromTo('.slide-timeline .timeline-item', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, delay: 0.5 });
    gsap.fromTo('.slide-timeline .t-dot', { scale: 0 }, { scale: 1, duration: 0.5, stagger: 0.2, delay: 0.7, ease: 'back.out(3)' });
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
  max-width: 1100px;
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
  margin-bottom: 4rem;
  color: white;
}

.italic-serif {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--accent-light);
}

.timeline-container {
  position: relative;
  padding-top: 2rem;
}

.timeline-line {
  position: absolute;
  top: 3.25rem;
  left: 0;
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.timeline-items {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.timeline-item {
  position: relative;
  z-index: 1;
}

.t-dot {
  width: 10px;
  height: 10px;
  background: var(--accent-light);
  border-radius: 50%;
  margin-bottom: 2rem;
  box-shadow: 0 0 15px var(--accent-light);
}

.t-year {
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  color: var(--accent-light);
  font-weight: 600;
  display: block;
  margin-bottom: 1rem;
}

.t-title {
  font-size: 1.25rem;
  font-weight: 500;
  color: white;
  margin-bottom: 0.75rem;
}

.t-desc {
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 1024px) {
  .timeline-items { grid-template-columns: 1fr; gap: 3rem; }
  .timeline-line { display: none; }
  .t-dot { margin-bottom: 1rem; }
}
</style>
