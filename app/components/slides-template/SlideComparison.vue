<template>
  <div class="slide-content slide-comparison">
    <div class="slide-inner">
      <span class="slide-number">07 / STRATEGY</span>
      <h2 class="sub-title">System <span class="italic-serif">Transition</span></h2>
      
      <div class="comparison-grid">
        <div class="comp-box legacy">
          <div class="box-header"><i class="fa-solid fa-clock-rotate-left me-2"></i> LEGACY SYSTEM</div>
          <ul class="comp-list">
            <li><i class="fa-solid fa-caret-right me-2"></i> Fragmented Databases</li>
            <li><i class="fa-solid fa-caret-right me-2"></i> Manual Reporting Flow</li>
            <li><i class="fa-solid fa-caret-right me-2"></i> High Latency Networks</li>
            <li><i class="fa-solid fa-caret-right me-2"></i> Reactive Security</li>
          </ul>
        </div>
        
        <div class="comp-divider">
          <div class="arrow"><i class="fa-solid fa-arrow-right"></i></div>
        </div>
        
        <div class="comp-box future">
          <div class="box-header"><i class="fa-solid fa-microchip me-2"></i> CORE ECOSYSTEM</div>
          <ul class="comp-list">
            <li><i class="fa-solid fa-caret-right me-2"></i> Unified Data Core</li>
            <li><i class="fa-solid fa-caret-right me-2"></i> Automated Insights</li>
            <li><i class="fa-solid fa-caret-right me-2"></i> Real-time Connectivity</li>
            <li><i class="fa-solid fa-caret-right me-2"></i> Proactive AI Defense</li>
          </ul>
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
    gsap.fromTo('.slide-comparison .legacy', { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, delay: 0.2 });
    gsap.fromTo('.slide-comparison .future', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, delay: 0.2 });
    gsap.fromTo('.slide-comparison .comp-divider', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, delay: 0.8, ease: 'back.out(2)' });
    gsap.fromTo('.slide-comparison .comp-list li', { x: -10, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 1 });
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

.comparison-grid {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.comp-box {
  flex: 1;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3rem;
  position: relative;
}

.box-header {
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: var(--text-muted);
  margin-bottom: 2.5rem;
  text-align: center;
}

.future {
  border-color: var(--accent-light);
  background: rgba(37, 99, 235, 0.05);
}

.future .box-header {
  color: var(--accent-light);
}

.comp-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.comp-list li {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  position: relative;
  color: rgba(255, 255, 255, 0.7);
}

.comp-list li i {
  color: var(--accent-light);
  font-size: 0.8rem;
}

.comp-divider {
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow {
  font-size: 2rem;
  color: var(--accent-light);
  opacity: 0.5;
}

@media (max-width: 768px) {
  .comparison-grid { flex-direction: column; }
  .comp-divider { transform: rotate(90deg); padding: 1rem 0; }
  .comp-box { width: 100%; padding: 2rem; }
}
</style>
