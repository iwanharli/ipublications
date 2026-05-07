<template>
  <div class="slide-content slide-paradigma-question">
    <!-- Ambient effects -->
    <div class="ambient-orb orb-1"></div>
    <div class="ambient-orb orb-2"></div>
    <div class="grid-overlay"></div>

    <div class="slide-inner">
      <div class="header-section">
        <div class="header-badge">
          <span class="badge-pulse"></span>
          <span class="badge-label">PERTANYAAN</span>
        </div>
        <h1 class="slide-title">
          Mana yang paling sulit diterapkan <br/>di institusi?
        </h1>
      </div>

      <div class="options-container swiper-no-swiping">
        <!-- Option 1 -->
        <div class="option-wrapper" :class="{ 'revealed-wrapper': revealedState[1] }">
          <div class="option-card option-1" @click="reveal(1)" :class="{ 'revealed': revealedState[1] }">
            <div class="option-icon" @click.stop="reveal(1)"><i class="fa-solid fa-laptop-code"></i></div>
            <h3 class="option-title">Digital-First</h3>
            <span class="click-hint" v-if="!revealedState[1]">Klik untuk detail</span>
            <div class="option-reveal">
              <p>Mengubah kebiasaan lama (paper-based). Transformasi sering hanya sebatas mengubah formulir kertas menjadi PDF.</p>
              <div class="reveal-bar"><div class="bar-fill" style="width: 70%; background: #3b82f6; box-shadow: 0 0 15px #3b82f6;"></div></div>
            </div>
          </div>
        </div>

        <!-- Option 2 -->
        <div class="option-wrapper" :class="{ 'revealed-wrapper': revealedState[2] }">
          <div class="option-card option-2" @click="reveal(2)" :class="{ 'revealed': revealedState[2] }">
            <div class="option-icon" @click.stop="reveal(2)"><i class="fa-solid fa-chart-line"></i></div>
            <h3 class="option-title">Data-Driven</h3>
            <span class="click-hint" v-if="!revealedState[2]">Klik untuk detail</span>
            <div class="option-reveal">
              <p>Sulit mendapatkan data yang saling terintegrasi dan valid. Budaya kerja masih terlalu bergantung pada intuisi/asumsi.</p>
              <div class="reveal-bar"><div class="bar-fill" style="width: 85%; background: #10b981; box-shadow: 0 0 15px #10b981;"></div></div>
            </div>
          </div>
        </div>

        <!-- Option 3 -->
        <div class="option-wrapper" :class="{ 'revealed-wrapper': revealedState[3] }">
          <div class="option-card option-3" @click="reveal(3)" :class="{ 'revealed': revealedState[3] }">
            <div class="option-icon" @click.stop="reveal(3)"><i class="fa-solid fa-shield-halved"></i></div>
            <h3 class="option-title">Cyber-Aware</h3>
            <span class="click-hint" v-if="!revealedState[3]">Klik untuk detail</span>
            <div class="option-reveal">
              <p>Sistem canggih bisa dikalahkan oleh satu keteledoran (klik phising, file APK, atau password lemah) dari seorang staf.</p>
              <div class="reveal-bar"><div class="bar-fill" style="width: 100%; background: #f59e0b; box-shadow: 0 0 20px #f59e0b;"></div></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="conclusion-box" :class="{ 'visible': isAllRevealed }">
        <div class="conclusion-icon"><i class="fa-solid fa-lightbulb"></i></div>
        <div class="conclusion-content">
          <p>Biasanya yang paling sulit <strong>bukan membeli teknologinya</strong>, tetapi mengubah kebiasaan manusianya. <span class="highlight-info">Karena sistem bisa di-upgrade, tetapi budaya kerja membutuhkan kepemimpinan.</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import gsap from 'gsap';

const props = defineProps({
  active: Boolean
});

const revealedState = ref({
  1: false,
  2: false,
  3: false
});

const reveal = (option) => {
  if (!revealedState.value[option]) {
    revealedState.value[option] = true;
    
    // Animate the bar fill
    gsap.fromTo(`.option-${option} .bar-fill`, 
      { width: '0%' }, 
      { width: option === 1 ? '70%' : option === 2 ? '85%' : '100%', duration: 1, ease: 'power2.out', delay: 0.2 }
    );
  }
};

const isAllRevealed = computed(() => {
  return revealedState.value[1] && revealedState.value[2] && revealedState.value[3];
});

watch(() => props.active, (val) => {
  if (val) {
    revealedState.value = { 1: false, 2: false, 3: false };
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.slide-paradigma-question .header-badge', { y: -15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
    tl.fromTo('.slide-paradigma-question .slide-title', { y: 30, opacity: 0, clipPath: 'inset(100% 0 0 0)' }, { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 0.8 }, '-=0.2');
    
    tl.fromTo('.option-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 }, '-=0.3');

    // Ambient
    gsap.to('.orb-1', { x: 25, y: -15, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.orb-2', { x: -20, y: 12, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }
}, { immediate: true });
</script>

<style scoped>
.slide-content {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ─── Ambient ─── */
.ambient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(130px);
  pointer-events: none;
  z-index: 0;
}

.orb-1 {
  width: 450px;
  height: 450px;
  background: rgba(245, 158, 11, 0.05); /* Amber glow */
  top: -5%;
  left: -3%;
}

.orb-2 {
  width: 380px;
  height: 380px;
  background: rgba(239, 68, 68, 0.05); /* Red glow */
  bottom: -5%;
  right: -2%;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.012) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.012) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  z-index: 0;
}

.slide-inner {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 1;
  text-align: center;
}

/* ─── Header ─── */
.header-section {
  text-align: center;
  margin-bottom: 5rem;
  pointer-events: none; /* Prevent header from blocking cards */
  position: relative;
  z-index: 1;
}

.header-badge {
  pointer-events: auto; /* Only badge needs it if interactive */
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.35rem 1.2rem;
  border-radius: 100px;
  border: 1px solid rgba(245, 158, 11, 0.2);
  background: rgba(245, 158, 11, 0.05);
  margin-bottom: 1rem;
}

.badge-pulse {
  width: 6px;
  height: 6px;
  background: #f59e0b;
  border-radius: 50%;
  animation: pulse-orange 2s infinite;
}

@keyframes pulse-orange {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.5); }
  50% { opacity: 0.7; box-shadow: 0 0 0 6px rgba(245, 158, 11, 0); }
}

.badge-label {
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.3em;
  color: #f59e0b;
  opacity: 0.8;
}

.slide-title {
  font-size: clamp(2rem, 3.5vw, 2.8rem);
  font-weight: 800;
  letter-spacing: 0.02em;
  color: var(--text);
  line-height: 1.3;
}

/* ─── Options Container ─── */
.options-container {
  display: flex;
  gap: 3rem;
  justify-content: center;
  margin-bottom: 5rem;
  margin-top: 3rem;
  position: relative;
  z-index: 50; /* Ensure cards are above any potential header overlap */
}

.option-wrapper {
  flex: 1;
  position: relative;
  padding-top: 40px;
  z-index: 10;
  cursor: pointer !important;
}

.option-wrapper.revealed-wrapper {
  cursor: default !important;
}

.option-card {
  cursor: pointer !important;
  z-index: 500; /* Extremely high z-index to force click priority */
  pointer-events: auto !important;
  height: 100%;
  background: linear-gradient(145deg, rgba(15, 23, 42, 0.9), rgba(2, 6, 23, 0.95));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 3rem 2.5rem 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: visible;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
}

.option-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 24px;
  background: radial-gradient(800px circle at top center, rgba(255,255,255,0.03), transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.option-card:hover {
  transform: translateY(-12px);
  background: linear-gradient(145deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95));
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.2);
}

.option-icon {
  position: absolute;
  top: -40px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 20px rgba(0,0,0,0.5), inset 0 2px 20px rgba(255,255,255,0.05);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 100; /* Force icon to be on very top */
  pointer-events: auto;
}

.option-card:hover .option-icon {
  transform: scale(1.15) translateY(-5px);
}

/* Base hints of color */
.option-1 .option-icon { border-color: rgba(59, 130, 246, 0.2); color: rgba(59, 130, 246, 0.8); } /* Blue */
.option-2 .option-icon { border-color: rgba(16, 185, 129, 0.2); color: rgba(16, 185, 129, 0.8); } /* Emerald */
.option-3 .option-icon { border-color: rgba(245, 158, 11, 0.2); color: rgba(245, 158, 11, 0.8); } /* Amber */

.option-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: white;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  text-align: center;
  z-index: 1;
}

.option-subtitle {
  font-size: 0.8rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
  z-index: 1;
  opacity: 0.8;
  animation: pulse-opacity 2s infinite;
}

@keyframes pulse-opacity {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

.click-hint {
  font-size: 0.75rem;
  color: var(--accent-light);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 0.5rem;
  opacity: 0.6;
  animation: pulse-hint 2s infinite;
  font-weight: 600;
  z-index: 1;
}

@keyframes pulse-hint {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
}

.option-reveal {
  margin-top: 1.5rem;
  opacity: 0;
  max-height: 0;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  text-align: center;
  width: 100%;
  z-index: 1;
}

.option-reveal p {
  font-size: 1rem;
  color: #cbd5e1;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.reveal-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.5);
}

.bar-fill {
  height: 100%;
  width: 0;
  border-radius: 10px;
}

/* ─── Revealed State ─── */
.option-card.revealed {
  background: linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(2, 6, 23, 0.98));
}

.option-card.revealed .option-reveal {
  opacity: 1;
  max-height: 250px;
}

/* Option 1: Blue Glow */
.option-1.revealed { 
  border-color: rgba(59, 130, 246, 0.4); 
  box-shadow: 0 20px 50px rgba(59, 130, 246, 0.15), inset 0 0 80px rgba(59, 130, 246, 0.05); 
}
.option-1.revealed .option-icon { 
  background: rgba(59, 130, 246, 0.15); 
  border-color: #3b82f6; 
  color: #3b82f6; 
  box-shadow: 0 0 30px rgba(59, 130, 246, 0.4), inset 0 0 20px rgba(59, 130, 246, 0.2); 
  transform: translateY(-15px) scale(1.1); 
  text-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
}

/* Option 2: Emerald Glow */
.option-2.revealed { 
  border-color: rgba(16, 185, 129, 0.4); 
  box-shadow: 0 20px 50px rgba(16, 185, 129, 0.15), inset 0 0 80px rgba(16, 185, 129, 0.05); 
}
.option-2.revealed .option-icon { 
  background: rgba(16, 185, 129, 0.15); 
  border-color: #10b981; 
  color: #10b981; 
  box-shadow: 0 0 30px rgba(16, 185, 129, 0.4), inset 0 0 20px rgba(16, 185, 129, 0.2); 
  transform: translateY(-15px) scale(1.1); 
  text-shadow: 0 0 10px rgba(16, 185, 129, 0.8);
}

/* Option 3: Amber Glow */
.option-3.revealed { 
  border-color: rgba(245, 158, 11, 0.5); 
  box-shadow: 0 20px 50px rgba(245, 158, 11, 0.2), inset 0 0 100px rgba(245, 158, 11, 0.08); 
  transform: scale(1.05); 
  z-index: 10; 
}
.option-3.revealed .option-icon { 
  background: rgba(245, 158, 11, 0.15); 
  border-color: #f59e0b; 
  color: #f59e0b; 
  box-shadow: 0 0 40px rgba(245, 158, 11, 0.5), inset 0 0 20px rgba(245, 158, 11, 0.2); 
  transform: translateY(-20px) scale(1.2); 
  font-size: 2.2rem;
  text-shadow: 0 0 15px rgba(245, 158, 11, 0.8);
}

/* ─── Conclusion Box ─── */
.conclusion-box {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  max-width: 900px;
  margin: 0 auto;
  background: linear-gradient(90deg, rgba(239, 68, 68, 0.08), rgba(15, 23, 42, 0.8), rgba(239, 68, 68, 0.08));
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 20px;
  padding: 2rem 3rem;
  box-shadow: 0 15px 50px rgba(0,0,0,0.5), 0 0 40px rgba(239, 68, 68, 0.1);
  backdrop-filter: blur(15px);
  display: flex;
  align-items: center;
  gap: 2rem;
  pointer-events: none; /* Block clicks when hidden */
}

.conclusion-box.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto; /* Enable when visible */
}

.conclusion-icon {
  font-size: 3rem;
  color: #60a5fa;
  text-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
  animation: pulse-info 2s infinite;
}

@keyframes pulse-info {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.conclusion-content p {
  font-size: 1.25rem;
  line-height: 1.6;
  color: #e2e8f0;
  margin: 0;
  text-align: left;
}

.conclusion-content strong {
  color: white;
  font-size: 1.3rem;
}

.highlight-info {
  color: #93c5fd;
  font-weight: 800;
  letter-spacing: 0.02em;
  background: linear-gradient(90deg, #3b82f6, #93c5fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media (max-width: 1024px) {
  .options-container { flex-direction: column; }
  .option-card { padding: 4rem 2rem 2rem 2rem; }
  .slide-inner { padding: 4rem 2rem; }
}
</style>
