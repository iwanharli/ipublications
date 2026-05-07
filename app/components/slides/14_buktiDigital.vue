<template>
  <div class="slide-content slide-digital-evidence">
    <div class="slide-inner">
      <div class="header-section text-center mb-5">
        <h2 class="sub-label">Integritas Bukti Digital</h2>
        <h1 class="slide-title">Pergeseran <span class="text-accent">Paradigma Bukti</span></h1>
        <div class="header-divider"></div>
      </div>

      <div class="paradigm-shift-container">
        <!-- Old Paradigm -->
        <div class="paradigm-box old glass">
          <div class="badge-label">PARADIGMA LAMA</div>
          <div class="content">
            <i class="fa-solid fa-video"></i>
            <p>Video = <strong>Bukti Kuat</strong></p>
          </div>
          <div class="footer-note">Persepsi konvensional</div>
        </div>

        <div class="shift-arrow">
          <i class="fa-solid fa-right-long"></i>
        </div>

        <!-- New Paradigm -->
        <div class="paradigm-box new glass active">
          <div class="badge-label accent">PARADIGMA DIGITAL</div>
          <div class="content">
            <i class="fa-solid fa-file-video"></i>
            <p>Video = <strong>Data</strong> yang bisa disalin, dikompresi, diedit, dipotong, atau dimanipulasi.</p>
          </div>
          <div class="footer-note">Realitas teknis siber</div>
        </div>
      </div>

      <div class="key-question-section mt-5 text-center">
        <div class="question-box glass">
          <i class="fa-solid fa-circle-question"></i>
          <h2>Bisakah kita membuktikan bahwa bukti digital itu <span class="text-accent">asli, utuh, dan sah?</span></h2>
        </div>
      </div>
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
    gsap.fromTo('.slide-digital-evidence .header-section', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
    gsap.fromTo('.paradigm-box.old', { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, delay: 0.3 });
    gsap.fromTo('.shift-arrow', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, delay: 0.8 });
    gsap.fromTo('.paradigm-box.new', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, delay: 0.6 });
    gsap.fromTo('.question-box', 
      { y: 50, opacity: 0, scale: 0.9 }, 
      { y: 0, opacity: 1, scale: 1, duration: 1.2, delay: 1.5, ease: 'back.out(1.7)' }
    );
  }
}, { immediate: true });
</script>

<style scoped>
.slide-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8vw;
}

.slide-inner {
  width: 100%;
  max-width: 1200px;
}

.slide-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.text-accent { color: var(--accent); }

.header-divider {
  width: 160px;
  height: 4px;
  background: var(--accent);
  margin: 1.5rem auto 0;
  border-radius: 2px;
}

.paradigm-shift-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 4rem;
}

.paradigm-box {
  flex: 1;
  max-width: 480px;
  padding: 2.5rem;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 220px;
}

.paradigm-box.active {
  border-color: var(--accent);
  box-shadow: 0 0 30px rgba(251, 191, 36, 0.1);
}

.badge-label {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  padding: 0.4rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 100px;
  width: fit-content;
  margin-bottom: 2rem;
  color: var(--text-secondary);
}

.badge-label.accent {
  background: var(--accent);
  color: black;
}

.content {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  flex-grow: 1;
}

.content i {
  font-size: 2.5rem;
  color: var(--accent);
  opacity: 0.8;
}

.content p {
  font-size: 1.3rem;
  color: white;
  line-height: 1.5;
  margin: 0;
}

.content p strong {
  color: var(--accent);
}

.footer-note {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.3;
  margin-top: 1.5rem;
  font-weight: 700;
}

.shift-arrow {
  font-size: 2rem;
  color: var(--accent);
  opacity: 0.5;
}

.key-question-section {
  margin-top: 4rem;
}

.question-box {
  padding: 2.5rem 4rem;
  border-radius: 24px;
  border: 1px solid rgba(251, 191, 36, 0.2);
  background: rgba(251, 191, 36, 0.02) !important;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.question-box i {
  font-size: 3rem;
  color: var(--accent);
}

.question-box h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  margin: 0;
  line-height: 1.4;
  text-align: left;
}

.sub-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  color: var(--accent);
  opacity: 0.6;
}
</style>
