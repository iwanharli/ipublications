<template>
  <section class="workflow-section" ref="workflowRef">
    <div class="container">
      <div class="section-header text-center">
        <h2 class="section-title">Alur Kerja Sistem</h2>
        <p class="section-desc">Proses manajemen presentasi yang efisien dari hulu ke hilir.</p>
      </div>
      
      <div class="workflow-steps">
        <div class="step-item" v-for="(step, index) in steps" :key="index">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content glass">
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </div>
          <div class="step-line" v-if="index < steps.length - 1"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const workflowRef = ref(null);

const steps = [
  { title: 'Persiapan Materi', desc: 'Unggah dan susun materi presentasi (dokumen, data, video) ke dalam cloud secure.' },
  { title: 'Sinkronisasi Data', desc: 'Hubungkan slide dengan database operasional untuk pembaruan angka otomatis.' },
  { title: 'Review Pimpinan', desc: 'Berbagi akses preview secara aman kepada pimpinan untuk revisi dan persetujuan.' },
  { title: 'Presentasi Aktif', desc: 'Kendali penuh saat presentasi dengan fitur interaktif dan monitoring audiens.' }
];

onMounted(() => {
  const ctx = gsap.context(() => {
    gsap.from('.step-item', {
      scrollTrigger: {
        trigger: '.workflow-steps',
        start: 'top 80%',
      },
      opacity: 0,
      x: -30,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out'
    });
  }, workflowRef.value);
});
</script>

<style scoped>
.workflow-section {
  padding: 100px 0;
}

.text-center {
  text-align: center;
}

.section-header {
  margin-bottom: 4rem;
}

.workflow-steps {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 2rem;
  position: relative;
}

.step-number {
  width: 50px;
  height: 50px;
  background: var(--primary);
  border: 2px solid var(--cyan);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  color: var(--cyan);
  flex-shrink: 0;
  z-index: 2;
}

.step-content {
  padding: 1.5rem 2rem;
  flex-grow: 1;
}

.step-content h3 {
  color: var(--text);
  margin-bottom: 0.5rem;
}

.step-content p {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.step-line {
  position: absolute;
  left: 24px;
  top: 50px;
  width: 2px;
  height: calc(100% + 1rem);
  background: linear-gradient(to bottom, var(--cyan), transparent);
  z-index: 1;
}

@media (max-width: 768px) {
  .step-line {
    display: none;
  }
}
</style>
