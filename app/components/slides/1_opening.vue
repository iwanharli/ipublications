<template>
  <div class="slide-content slide-opening">
    <div class="slide-inner text-center">
      <div class="logo-container">
        <div class="logo-aura"></div>
        <div class="logo-orbit"></div>
        <div class="intro-icon glass">
          <i class="fa-solid fa-shield-halved"></i>
          <div class="light-flare"></div>
        </div>
      </div>
      <h1 class="slide-title">Transformasi <br/><span class="italic-serif text-accent">Strategis</span></h1>
      <h3 class="slide-subtitle">Paradigma Digital dan Keamanan Siber Dalam Kepolisian</h3>
      <!-- <p class="slide-author">Iwan Budi</p> -->
      <p class="slide-tagline">Cyber Security sebagai isu komando, tata kelola risiko, <br/>pembuktian hukum, dan kepercayaan publik.</p>
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
    gsap.fromTo('.logo-container', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' });
    gsap.fromTo('.slide-opening .intro-icon', { rotateY: 90, opacity: 0 }, { rotateY: 0, opacity: 1, duration: 1.2, delay: 0.2 });
    gsap.fromTo('.slide-opening .slide-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, delay: 0.4 });
    gsap.fromTo('.slide-opening .slide-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 0.8, duration: 1, delay: 0.6 });
    gsap.fromTo('.slide-opening .slide-tagline', { y: 20, opacity: 0 }, { y: 0, opacity: 0.5, duration: 1, delay: 0.8 });
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
  padding: 4rem;
  text-align: center;
  position: relative;
}

.slide-inner {
  max-width: 900px;
  width: 100%;
}

.logo-container {
  position: relative;
  width: 140px;
  height: 140px;
  margin: 0 auto 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-aura {
  position: absolute;
  width: 120%;
  height: 120%;
  background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(15px);
  animation: pulse-aura 4s ease-in-out infinite;
  will-change: transform, opacity;
}

@keyframes pulse-aura {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.1); }
}

.logo-orbit {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px dashed rgba(251, 191, 36, 0.2);
  border-radius: 50%;
  animation: rotate-orbit 20s linear infinite;
}

@keyframes rotate-orbit {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.intro-icon {
  width: 80px;
  height: 80px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  color: var(--accent-light);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  animation: float-logo 6s ease-in-out infinite;
  z-index: 2;
}

@keyframes float-logo {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
}

.light-flare {
  position: absolute;
  top: -150%;
  left: -150%;
  width: 300%;
  height: 300%;
  background: linear-gradient(45deg, transparent 45%, rgba(255, 255, 255, 0.1) 50%, transparent 55%);
  animation: flare-sweep 8s linear infinite;
}

@keyframes flare-sweep {
  0% { transform: translate(0, 0); }
  20%, 100% { transform: translate(50%, 50%); }
}

.slide-number {
  font-size: 0.8rem;
  letter-spacing: 0.4em;
  color: var(--accent-light);
  margin-bottom: 2rem;
  display: block;
}

.slide-title {
  font-size: clamp(3.5rem, 10vw, 8rem);
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 2.5rem;
  text-transform: uppercase;
  letter-spacing: -0.01em;
}

.slide-subtitle {
  font-size: 1.5rem;
  font-weight: 300;
  color: white;
  margin-bottom: 1rem;
  letter-spacing: 0.1em;
  opacity: 0.8;
}

.slide-author {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.2rem;
  color: var(--accent-light);
  margin-bottom: 3.5rem;
  opacity: 0.9;
}

.italic-serif {
  font-family: var(--font-serif);
  font-style: italic;
}

.text-accent { color: var(--accent-light); }

.slide-tagline {
  font-size: 0.9rem;
  letter-spacing: 0.15em;
  opacity: 0.6;
  text-transform: uppercase;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
}
</style>
