<template>
  <div class="slide-content slide-closing">
    <!-- Ambient Background Elements -->
    <div class="ambient-glow top-right"></div>
    <div class="ambient-glow bottom-left"></div>
    
    <div class="slide-inner">
      <div class="closing-container">
        <!-- Strategic Badge -->
        <div class="closing-badge reveal-item">
          <div class="badge-line"></div>
          <span class="badge-text">STRATEGIC COMMAND 2026</span>
          <div class="badge-line"></div>
        </div>

        <!-- Center Logo / Icon -->
        <div class="closing-logo reveal-item">
          <div class="logo-orbit"></div>
          <div class="logo-inner glass">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
        </div>

        <!-- Main Title -->
        <div class="title-group">
          <h2 class="main-title reveal-item">Terima <span class="italic-serif">Kasih</span></h2>
          <p class="sub-title reveal-item">Building a Safer Digital Future through Intelligence & Excellence</p>
        </div>

        <!-- Contact & Signature -->
        <div class="closing-footer reveal-item">
          <div class="signature">
            <span class="sig-label">Salam Presisi</span>
            <div class="sig-line"></div>
            <span class="sig-name">POLISI REPUBLIK INDONESIA</span>
          </div>
          
          <div class="closing-actions">
            <div class="action-item">
              <i class="fa-solid fa-envelope"></i>
              <span>it.div@polri.go.id</span>
            </div>
            <div class="action-item">
              <i class="fa-solid fa-globe"></i>
              <span>www.polri.go.id</span>
            </div>
          </div>
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
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo('.closing-badge', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
      .fromTo('.closing-logo', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' }, '-=0.5')
      .fromTo('.main-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, '-=0.8')
      .fromTo('.title-group .sub-title', { opacity: 0 }, { opacity: 0.6, duration: 1 }, '-=0.4')
      .fromTo('.closing-footer', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.5');

    // Continuous orbit rotation
    gsap.to('.logo-orbit', {
      rotate: 360,
      duration: 20,
      repeat: -1,
      ease: 'none'
    });
  }
}, { immediate: true });
</script>

<style scoped>
.slide-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #020617;
  overflow: hidden;
  position: relative;
}

.ambient-glow {
  position: absolute;
  width: 60vw;
  height: 60vw;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.05;
  pointer-events: none;
}

.top-right { top: -20%; right: -10%; background: var(--accent); }
.bottom-left { bottom: -20%; left: -10%; background: #3b82f6; }

.slide-inner {
  position: relative;
  z-index: 10;
  text-align: center;
}

.closing-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.5rem;
}

.closing-badge {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.badge-line {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent));
}

.badge-line:last-child {
  background: linear-gradient(90deg, var(--accent), transparent);
}

.badge-text {
  font-size: 0.75rem;
  letter-spacing: 0.5em;
  color: var(--accent);
  font-weight: 800;
}

.closing-logo {
  position: relative;
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-inner {
  width: 100px;
  height: 100px;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: var(--accent);
  border: 1px solid rgba(251, 191, 36, 0.3);
  box-shadow: 0 0 40px rgba(251, 191, 36, 0.1);
  animation: morph 8s ease-in-out infinite;
}

@keyframes morph {
  0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
  50% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
}

.logo-orbit {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px dashed rgba(251, 191, 36, 0.2);
  border-radius: 50%;
}

.logo-orbit::after {
  content: '';
  position: absolute;
  top: -4px;
  left: 50%;
  width: 8px;
  height: 8px;
  background: var(--accent);
  border-radius: 50%;
  box-shadow: 0 0 15px var(--accent);
}

.main-title {
  font-size: 6rem;
  font-weight: 300;
  color: white;
  margin-bottom: 1rem;
}

.italic-serif {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--accent);
}

.sub-title {
  font-size: 1.1rem;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.5);
  max-width: 500px;
  margin: 0 auto;
}

.closing-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  margin-top: 2rem;
}

.signature {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.sig-label {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.2rem;
  color: var(--accent);
  opacity: 0.8;
}

.sig-line {
  width: 120px;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.sig-name {
  font-size: 0.8rem;
  letter-spacing: 0.3em;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.4);
}

.closing-actions {
  display: flex;
  gap: 3rem;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.3s ease;
  cursor: pointer;
}

.action-item:hover {
  color: var(--accent);
}

.action-item i {
  font-size: 1rem;
  opacity: 0.5;
}

@media (max-width: 768px) {
  .main-title { font-size: 4rem; }
  .closing-actions { flex-direction: column; gap: 1rem; }
}
</style>
