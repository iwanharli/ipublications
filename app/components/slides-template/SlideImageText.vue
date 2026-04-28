<template>
  <div class="slide-content slide-visual">
    <div class="visual-bg">
      <img src="/background-tech.png" alt="Tech Background" />
      <div class="overlay"></div>
    </div>
    <div class="slide-inner">
      <div class="glass-card">
        <span class="slide-number">06 / VISION</span>
        <h2 class="sub-title">Next-Gen <br/><span class="italic-serif">Infrastructure</span></h2>
        <p>Arsitektur masa depan yang dirancang untuk skalabilitas dan ketahanan tinggi di era digital.</p>
        <button class="btn-explore">
          <i class="fa-solid fa-microscope me-2"></i> EXPLORE SPECS
        </button>
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
    gsap.fromTo('.slide-visual .glass-card', { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 });
    gsap.fromTo('.slide-visual .glass-card > *', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, delay: 0.6 });
  }
}, { immediate: true });
</script>

<style scoped>
.slide-content {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 10vw;
}

.visual-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.visual-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.4;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 70% 50%, transparent, #0F172A 80%);
}

.slide-inner {
  position: relative;
  z-index: 1;
  width: 100%;
}

.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  padding: 4rem;
  max-width: 600px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-left: 4px solid var(--accent);
}

.slide-number {
  font-size: 0.8rem;
  letter-spacing: 0.4em;
  color: var(--accent);
  margin-bottom: 2rem;
  display: block;
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

p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 3rem;
}

.btn-explore {
  background: transparent;
  border: 1px solid var(--accent);
  color: var(--accent);
  padding: 1rem 2.5rem;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-explore:hover {
  background: var(--accent);
  color: #0F172A;
}

@media (max-width: 768px) {
  .glass-card { padding: 2rem; }
  .sub-title { font-size: 2.5rem; }
}
</style>
