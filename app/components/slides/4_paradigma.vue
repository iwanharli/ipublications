<template>
  <div class="slide-content slide-paradigma">
    <div class="slide-inner">
      <div class="header-section text-center mb-5">
        <h2 class="sub-title">Transformasi Mentalitas</h2>
        <h1 class="slide-title">Tiga Paradigma <span class="text-accent">Kepolisian Digital</span></h1>
        <div class="header-divider"></div>
      </div>

      <div class="pillars-container">
        <div v-for="(pillar, index) in pillars" :key="index" class="pillar-card glass">
          <div class="pillar-glow"></div>
          <div class="pillar-content">
            <div class="pillar-icon">
              <i :class="pillar.icon"></i>
            </div>
            <div class="pillar-number">0{{ index + 1 }}</div>
            <h2 class="pillar-title">{{ pillar.title }}</h2>
            <div class="pillar-divider"></div>
            <p class="pillar-desc">{{ pillar.desc }}</p>
          </div>
          <div class="pillar-footer">
            <div class="footer-line"></div>
          </div>
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

const pillars = [
  { 
    title: 'Digital-First', 
    desc: 'Dimensi digital hadir dalam hampir semua fungsi kepolisian.',
    icon: 'fa-solid fa-laptop-code'
  },
  { 
    title: 'Data-Driven', 
    desc: 'Keputusan didukung data yang valid, aman, dan terintegrasi.',
    icon: 'fa-solid fa-diagram-project' 
  },
  { 
    title: 'Cyber-Aware', 
    desc: 'Setiap personel memahami risiko digital dari tindakannya.',
    icon: 'fa-solid fa-eye'
  }
];

watch(() => props.active, (val) => {
  if (val) {
    gsap.fromTo('.slide-paradigma .header-section', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
    gsap.fromTo('.slide-paradigma .pillar-card', 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power4.out', delay: 0.3 }
    );
    gsap.fromTo('.pillar-glow', 
      { opacity: 0, scale: 0.5 }, 
      { opacity: 1, scale: 1, duration: 2, stagger: 0.3, delay: 1 }
    );
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
}

.slide-inner {
  width: 100%;
  max-width: 1300px;
}

.sub-title {
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5em;
  color: var(--accent);
  margin-bottom: 1rem;
  opacity: 0.7;
}

.slide-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.text-accent { color: var(--accent); }

.header-divider {
  width: 150px;
  height: 4px;
  background: var(--accent);
  margin: 1.5rem auto 0;
  border-radius: 2px;
}

.pillars-container {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  margin-top: 5rem;
}

.pillar-card {
  flex: 1;
  max-width: 380px;
  min-height: 450px;
  padding: 3rem 2rem;
  border-radius: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.pillar-card:hover {
  transform: translateY(-15px);
  border-color: rgba(251, 191, 36, 0.3);
  background: rgba(251, 191, 36, 0.02);
}

.pillar-glow {
  position: absolute;
  top: -20%;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%);
  filter: blur(30px);
  pointer-events: none;
}

.pillar-icon {
  width: 80px;
  height: 80px;
  background: rgba(251, 191, 36, 0.1);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  color: var(--accent);
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 2;
}

.pillar-number {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 4rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.03);
  position: absolute;
  top: 1rem;
  right: 2rem;
  line-height: 1;
  pointer-events: none;
}

.pillar-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1.5rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.pillar-divider {
  width: 40px;
  height: 2px;
  background: var(--accent);
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.pillar-desc {
  font-size: 1.15rem;
  color: var(--text-secondary);
  line-height: 1.6;
  font-weight: 300;
}

.pillar-footer {
  margin-top: auto;
  width: 100%;
  padding-top: 2rem;
}

.footer-line {
  width: 0;
  height: 2px;
  background: var(--accent);
  margin: 0 auto;
  transition: width 0.5s ease;
  opacity: 0.5;
}

.pillar-card:hover .footer-line {
  width: 60%;
}

@media (max-width: 1200px) {
  .pillars-container {
    gap: 1.5rem;
  }
}
</style>
