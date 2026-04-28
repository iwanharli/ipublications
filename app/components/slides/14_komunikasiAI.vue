<template>
  <div class="slide-content slide-comms-ai">
    <div class="slide-inner">
      <div class="header-section text-center mb-5">
        <h2 class="sub-label">Communication & Governance</h2>
        <h1 class="slide-title">Komunikasi Krisis & <span class="text-accent">Etika AI</span></h1>
        <div class="header-divider"></div>
      </div>

      <div class="split-governance-grid">
        <!-- Crisis Comms Side -->
        <div class="gov-card comms glass">
          <div class="card-header">
            <div class="icon-wrap">
              <i class="fa-solid fa-tower-broadcast"></i>
            </div>
            <h2>Komunikasi Krisis</h2>
          </div>
          <div class="gov-body">
            <div v-for="(item, i) in commsItems" :key="i" class="gov-item">
              <i class="fa-solid fa-bolt-lightning text-accent"></i>
              <span>{{ item }}</span>
            </div>
          </div>
          <div class="gov-footer">Single Door Policy</div>
        </div>

        <!-- AI Ethics Side -->
        <div class="gov-card ai glass active">
          <div class="card-header">
            <div class="icon-wrap">
              <i class="fa-solid fa-microchip"></i>
            </div>
            <h2>Etika AI</h2>
          </div>
          <div class="gov-body">
            <div v-for="(item, i) in aiItems" :key="i" class="gov-item">
              <i class="fa-solid fa-scale-balanced text-accent"></i>
              <span>{{ item }}</span>
            </div>
          </div>
          <div class="gov-footer">Human-in-the-Loop</div>
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

const commsItems = [
  'Respon Cepat & Tanggap',
  'Akurasi Data Terverifikasi',
  'Komunikasi Satu Pintu',
  'Narasi Tidak Spekulatif',
  'Proteksi Data Sensitif'
];

const aiItems = [
  'AI Sebagai Alat Bantu Analisis',
  'Keputusan Berbasis Hukum & Bukti',
  'Mitigasi Bias Algoritma',
  'Privasi Sebagai Prioritas Utama',
  'Manusia Tetap Penanggung Jawab'
];

watch(() => props.active, (val) => {
  if (val) {
    gsap.fromTo('.slide-comms-ai .header-section', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
    gsap.fromTo('.gov-card.comms', { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, delay: 0.3 });
    gsap.fromTo('.gov-card.ai', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, delay: 0.5 });
    gsap.fromTo('.gov-item', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, delay: 1 });
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

.split-governance-grid {
  display: flex;
  gap: 3rem;
  margin-top: 4rem;
}

.gov-card {
  flex: 1;
  padding: 3rem;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.gov-card.active {
  border-color: var(--accent);
  box-shadow: 0 0 30px rgba(251, 191, 36, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.icon-wrap {
  width: 55px;
  height: 55px;
  background: rgba(251, 191, 36, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  color: var(--accent);
}

.card-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: white;
}

.gov-body {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  flex-grow: 1;
}

.gov-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.15rem;
  color: var(--text-secondary);
}

.gov-item i {
  font-size: 0.9rem;
  opacity: 0.6;
}

.gov-footer {
  margin-top: 3rem;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  opacity: 0.4;
}

.sub-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  color: var(--accent);
  opacity: 0.6;
}

@media (max-width: 1100px) {
  .split-governance-grid {
    flex-direction: column;
  }
}
</style>
