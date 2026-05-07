<template>
  <div class="slide-content slide-strategic-solutions">
    <div class="slide-inner">
      <div class="header-section text-center mb-5">
        <h2 class="sub-label">Future Readiness</h2>
        <h1 class="slide-title">Tiga <span class="text-accent">Solusi Strategis</span></h1>
        <div class="header-divider"></div>
      </div>

      <div class="solutions-grid">
        <div v-for="(sol, index) in solutions" :key="index" class="solution-card glass">
          <div class="solution-header">
            <div class="icon-circle">
              <i :class="sol.icon"></i>
            </div>
            <div class="solution-num">0{{ index + 1 }}</div>
          </div>
          <div class="solution-body">
            <h2 class="solution-title">{{ sol.title }}</h2>
            <p class="solution-desc">{{ sol.desc }}</p>
          </div>
          <div class="solution-footer">
            <div class="strat-line"></div>
            <span class="strat-label">STRATEGIC PILLAR</span>
          </div>
        </div>
      </div>

      <div class="motto-section mt-5 text-center">
        <p class="motto-text">Membangun Ketahanan Siber yang Berkelanjutan</p>
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

const solutions = [
  { 
    title: 'Zero Trust', 
    desc: 'Never trust, always verify. Menerapkan verifikasi ketat pada setiap akses tanpa pengecualian.',
    icon: 'fa-solid fa-user-shield'
  },
  { 
    title: 'CSIRT', 
    desc: 'Computer Security Incident Response Team — tim respons insiden dengan mandat komando, SOP, SDM mumpuni, dan jalur eskalasi yang jelas.',
    icon: 'fa-solid fa-tower-broadcast' 
  },
  { 
    title: 'Cyber Drill', 
    desc: 'Latihan pengamanan Mako Digital dan simulasi krisis (public communication drill).',
    icon: 'fa-solid fa-arrows-to-dot'
  }
];

watch(() => props.active, (val) => {
  if (val) {
    gsap.fromTo('.slide-strategic-solutions .header-section', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
    gsap.fromTo('.solution-card', 
      { y: 60, opacity: 0, scale: 0.9 }, 
      { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.2, ease: 'back.out(1.2)', delay: 0.3 }
    );
    gsap.fromTo('.motto-text', { opacity: 0, letterSpacing: '1em' }, { opacity: 0.6, letterSpacing: '0.4em', duration: 2, delay: 1 });
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
  max-width: 1300px;
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

.solutions-grid {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 5rem;
}

.solution-card {
  flex: 1;
  max-width: 380px;
  min-height: 420px;
  padding: 3rem 2.5rem;
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.01) !important;
}

.solution-card:hover {
  transform: translateY(-15px) scale(1.02);
  border-color: var(--accent);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.solution-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2.5rem;
}

.icon-circle {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(251, 191, 36, 0) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: var(--accent);
  border: 1px solid rgba(251, 191, 36, 0.2);
}

.solution-num {
  font-family: var(--font-mono);
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--accent);
  opacity: 0.4;
}

.solution-body {
  flex-grow: 1;
}

.solution-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1.2rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.solution-desc {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.7;
  font-weight: 300;
}

.solution-footer {
  margin-top: 3rem;
}

.strat-line {
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, var(--accent) 0%, transparent 100%);
  margin-bottom: 1rem;
  opacity: 0.3;
}

.strat-label {
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.3em;
  color: var(--accent);
  opacity: 0.5;
}

.motto-section {
  margin-top: 5rem;
}

.motto-text {
  font-size: 0.8rem;
  text-transform: uppercase;
  color: white;
  opacity: 0.4;
}

.sub-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  color: var(--accent);
  opacity: 0.6;
}
</style>
