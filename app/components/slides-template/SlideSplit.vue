<template>
  <div class="slide-content slide-split">
    <div class="slide-inner split-grid">
      <div class="split-left">
        <span class="slide-number">02 / CORE</span>
        <h2 class="sub-title">Integrated <br/><span class="italic-serif">Intelligence</span></h2>
        <p class="desc">Membangun ekosistem data yang terpadu untuk pengambilan keputusan yang lebih cepat dan akurat.</p>
      </div>
      <div class="split-right">
        <div class="feature-card">
          <span class="icon"><i class="fa-solid fa-shield-halved"></i></span>
          <h4>Security First</h4>
          <p>Protokol keamanan tingkat tinggi untuk integritas data nasional.</p>
        </div>
        <div class="feature-card">
          <span class="icon"><i class="fa-solid fa-bolt-lightning"></i></span>
          <h4>Real-time Processing</h4>
          <p>Visualisasi data tanpa delay untuk koordinasi pusat.</p>
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
    gsap.fromTo('.slide-split .split-left', { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, delay: 0.2 });
    gsap.fromTo('.slide-split .feature-card', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, delay: 0.4 });
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

.split-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
  text-align: left;
}

.sub-title {
  font-size: 4rem;
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 2rem;
  color: white;
}

.italic-serif {
  font-family: var(--font-serif);
  font-style: italic;
}

.desc {
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.6);
}

.feature-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 2.5rem;
  border-left: 2px solid var(--accent-light);
  margin-bottom: 2rem;
  text-align: left;
}

.feature-card .icon { 
  font-size: 2rem; 
  margin-bottom: 1.5rem; 
  display: block; 
  color: var(--accent-light);
}
.feature-card h4 { font-size: 1.2rem; margin-bottom: 0.75rem; color: white; }
.feature-card p { font-size: 0.9rem; color: rgba(255,255,255,0.6); line-height: 1.6; }

@media (max-width: 1024px) {
  .split-grid { grid-template-columns: 1fr; gap: 3rem; }
  .sub-title { font-size: 2.5rem; }
}
</style>
