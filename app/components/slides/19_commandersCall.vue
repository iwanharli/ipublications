<template>
  <div class="slide-content slide-command-call">
    <div class="slide-inner">
      <div class="header-section text-center mb-5">
        <h2 class="sub-label">Strategic Decision Exercise</h2>
        <h1 class="slide-title">Commander’s <span class="text-accent">Decision Call</span></h1>
        <div class="header-divider"></div>
      </div>

      <div class="command-grid">
        <!-- Scenario Selection -->
        <div class="scenario-section">
          <h3 class="section-label">Pilih Satu Skenario:</h3>
          <div class="scenario-list">
            <div v-for="(scen, i) in scenarios" :key="i" class="scenario-card glass">
              <div class="scen-num">{{ i + 1 }}</div>
              <p>{{ scen }}</p>
            </div>
          </div>
        </div>

        <!-- Command Questions -->
        <div class="questions-section glass active">
          <h3 class="section-label">Pertanyaan Komando:</h3>
          <div class="questions-list">
            <div v-for="(q, i) in questions" :key="i" class="question-item">
              <div class="q-bullet">
                <i class="fa-solid fa-chevron-right"></i>
              </div>
              <p>{{ q }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Call -->
      <div class="command-summary mt-5">
        <div class="summary-line"></div>
        <div class="summary-content">
          <div class="call-badge">COMMANDER'S CALL</div>
          <div class="call-grid">
            <div v-for="(call, i) in calls" :key="i" class="call-item">
              <i class="fa-solid fa-circle-check text-accent"></i>
              <span>{{ call }}</span>
            </div>
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

const scenarios = [
  'Akun Pejabat Diretas',
  'Data Laporan Masyarakat Bocor',
  'Video Deepfake Pejabat Viral',
  'Ransomware Melumpuhkan Layanan'
];

const questions = [
  'Apa perintah pertama Anda?',
  'Siapa pihak pertama yang dihubungi?',
  'Bukti digital apa yang harus diamankan?',
  'Narasi apa yang disampaikan ke publik?'
];

const calls = [
  'Data Aman',
  'Bukti Utuh',
  'Komando Cepat',
  'Publik Percaya'
];

watch(() => props.active, (val) => {
  if (val) {
    gsap.fromTo('.slide-command-call .header-section', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
    gsap.fromTo('.scenario-card', 
      { x: -30, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.2, delay: 0.4 }
    );
    gsap.fromTo('.questions-section', { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 1, delay: 0.6 });
    gsap.fromTo('.question-item', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 1.2 });
    gsap.fromTo('.command-summary', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 1.8 });
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

.command-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 4rem;
}

.section-label {
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--accent);
  margin-bottom: 2rem;
  font-weight: 700;
  opacity: 0.8;
}

.scenario-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.scenario-card {
  padding: 1.2rem 2rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.scenario-card:hover {
  background: rgba(251, 191, 36, 0.05) !important;
  border-color: rgba(251, 191, 36, 0.2);
}

.scen-num {
  width: 35px;
  height: 35px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-weight: 800;
  font-size: 1rem;
  color: var(--accent);
}

.scenario-card p {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
  color: white;
}

.questions-section {
  padding: 3rem;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.questions-section.active {
  border-color: var(--accent);
  box-shadow: 0 0 30px rgba(251, 191, 36, 0.05);
}

.questions-list {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.question-item {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.q-bullet {
  color: var(--accent);
  font-size: 1rem;
}

.question-item p {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
}

.command-summary {
  position: relative;
  margin-top: 5rem;
}

.summary-line {
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, transparent 0%, var(--accent) 50%, transparent 100%);
  opacity: 0.3;
}

.summary-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2.5rem 0;
}

.call-badge {
  font-family: var(--font-mono);
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: 0.1em;
}

.call-grid {
  display: flex;
  gap: 3rem;
}

.call-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.2rem;
  font-weight: 800;
  text-transform: uppercase;
  color: white;
  letter-spacing: 0.05em;
}

.sub-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  color: var(--accent);
  opacity: 0.6;
}

@media (max-width: 1100px) {
  .command-grid {
    grid-template-columns: 1fr;
  }
}
</style>
