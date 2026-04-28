<template>
  <div class="slide-content slide-qa">
    <div class="background-decor">
      <div class="glow-circle"></div>
      <div class="floating-icons">
        <i class="fa-solid fa-comments q-icon-1"></i>
        <i class="fa-solid fa-headset q-icon-2"></i>
        <i class="fa-solid fa-microphone-lines q-icon-3"></i>
      </div>
    </div>

    <div class="slide-inner">
      <div class="qa-container">
        <div class="qa-badge">INTERACTIVE SESSION</div>
        <h1 class="qa-title">Question <br/><span class="italic-serif text-accent">& Answer</span></h1>
        
        <div class="qa-status">
          <div class="status-pulse"></div>
          <span>SESSION OPEN</span>
        </div>

        <p class="qa-instruction">Please direct your inquiries to the presiding officer</p>
        
        <div class="qa-decorative-line">
          <div class="line"></div>
          <div class="diamond"></div>
          <div class="line"></div>
        </div>
      </div>
    </div>

    <div class="qa-footer">
      <div class="brand">POLRI ENTERPRISE COMMAND</div>
      <div class="copyright">© 2026 INTERNAL STRATEGIC PRESENTATION</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import gsap from 'gsap';

const props = defineProps({
  active: Boolean
});

watch(() => props.active, (val) => {
  if (val) {
    gsap.fromTo('.slide-qa .qa-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.2 });
    gsap.fromTo('.slide-qa .qa-title', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: 'expo.out', delay: 0.4 });
    gsap.fromTo('.slide-qa .qa-status', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.8 });
    gsap.fromTo('.slide-qa .qa-instruction', { opacity: 0 }, { opacity: 0.5, duration: 1, delay: 1.2 });
    
    // Background icons floating
    gsap.to('.q-icon-1', { y: -20, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.q-icon-2', { y: 30, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5 });
    gsap.to('.q-icon-3', { y: -15, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });
  }
}, { immediate: true });
</script>

<style scoped>
.slide-content {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: radial-gradient(circle at center, #0F172A 0%, #020617 100%);
  overflow: hidden;
}

.background-decor {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.glow-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.05) 0%, transparent 70%);
  filter: blur(50px);
}

.floating-icons i {
  position: absolute;
  color: var(--accent);
  opacity: 0.05;
  font-size: 8rem;
}

.q-icon-1 { top: 15%; left: 15%; transform: rotate(-15deg); }
.q-icon-2 { bottom: 20%; right: 15%; transform: rotate(15deg); }
.q-icon-3 { top: 20%; right: 25%; transform: rotate(5deg); font-size: 5rem !important; }

.slide-inner {
  position: relative;
  z-index: 2;
  text-align: center;
}

.qa-container {
  max-width: 800px;
}

.qa-badge {
  font-size: 0.8rem;
  letter-spacing: 0.4em;
  color: var(--accent);
  margin-bottom: 2rem;
  display: block;
}

.qa-title {
  font-size: clamp(4rem, 10vw, 8rem);
  font-weight: 300;
  line-height: 1;
  margin-bottom: 3rem;
  text-transform: uppercase;
  color: white;
}

.italic-serif {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--accent);
}

.qa-status {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.75rem 1.5rem;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2.5rem;
}

.status-pulse {
  width: 8px;
  height: 8px;
  background: #4ade80;
  border-radius: 50%;
  box-shadow: 0 0 10px #4ade80;
  animation: pulse-green 1.5s infinite;
}

.qa-status span {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: #4ade80;
}

@keyframes pulse-green {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
}

.qa-instruction {
  font-size: 1.1rem;
  color: white;
  opacity: 0.5;
  letter-spacing: 0.1em;
  margin-bottom: 3rem;
}

.qa-decorative-line {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.qa-decorative-line .line {
  width: 100px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
}

.qa-decorative-line .diamond {
  width: 8px;
  height: 8px;
  background: var(--accent);
  transform: rotate(45deg);
  box-shadow: 0 0 10px var(--accent-glow);
}

.qa-footer {
  position: absolute;
  bottom: 4rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.3;
}

.brand {
  font-weight: 700;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
}

.copyright {
  font-size: 0.6rem;
}

.text-accent { color: var(--accent); }
</style>
