<template>
  <div class="slide-content slide-lessons">
    <div class="slide-inner">
      <div class="header-section text-center mb-5">
        <h2 class="sub-label">Defense Posture</h2>
        <h1 class="slide-title">Tiga <span class="text-accent">Pelajaran Utama</span></h1>
        <div class="header-divider"></div>
      </div>

      <div class="lessons-container">
        <div v-for="(lesson, index) in lessons" :key="index" class="lesson-box glass">
          <div class="lesson-header">
            <div class="lesson-icon">
              <i :class="lesson.icon"></i>
            </div>
            <div class="lesson-number">0{{ index + 1 }}</div>
          </div>
          
          <div class="lesson-visual">
            <img :src="lesson.image" :alt="lesson.title" />
          </div>

          <div class="lesson-body">
            <h2 class="lesson-title">{{ lesson.title }}</h2>
            <div class="lesson-divider"></div>
            <p class="lesson-desc">{{ lesson.desc }}</p>
          </div>
          <div class="lesson-footer">
            <div class="status-badge">REKOMENDASI</div>
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

const lessons = [
  { 
    title: '3-2-1 Backup', 
    desc: 'Tiga salinan, dua media berbeda, satu lokasi terpisah/offline.',
    icon: 'fa-solid fa-copy',
    image: '/backup_vis.png'
  },
  { 
    title: 'Air-Gapping', 
    desc: 'Data sangat rahasia tidak selalu terhubung ke jaringan umum.',
    icon: 'fa-solid fa-link-slash',
    image: '/airgap_vis.png'
  },
  { 
    title: 'Human Firewall', 
    desc: 'Pelatihan berkala & simulasi phishing untuk seluruh personel. Satu klik bisa membuka pintu serangan.',
    icon: 'fa-solid fa-shield-halved',
    image: '/humanfw_vis.png'
  }
];

watch(() => props.active, (val) => {
  if (val) {
    gsap.fromTo('.slide-lessons .header-section', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
    gsap.fromTo('.lesson-box', 
      { y: 50, opacity: 0, scale: 0.95 }, 
      { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.2, ease: 'power4.out', delay: 0.3 }
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
  max-width: 1300px;
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

.lessons-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem; /* Reduced to fit images */
}

.lesson-box {
  flex: 1;
  padding: 2.5rem;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  transition: all 0.4s ease;
  background: rgba(255, 255, 255, 0.01) !important;
}

.lesson-box:hover {
  transform: translateY(-10px);
  border-color: var(--accent);
  background: rgba(251, 191, 36, 0.02) !important;
}

.lesson-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.lesson-visual {
  width: 100%;
  height: 200px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.lesson-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.lesson-box:hover .lesson-visual img {
  transform: scale(1.08);
}

.lesson-icon {
  width: 60px;
  height: 60px;
  background: rgba(251, 191, 36, 0.1);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: var(--accent);
}

.lesson-number {
  font-family: var(--font-mono);
  font-size: 2rem;
  font-weight: 800;
  opacity: 0.1;
  color: white;
}

.lesson-body {
  flex-grow: 1;
}

.lesson-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.lesson-divider {
  width: 40px;
  height: 2px;
  background: var(--accent);
  margin-bottom: 1.5rem;
}

.lesson-desc {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  font-weight: 400;
}

.lesson-footer {
  margin-top: 3rem;
}

.status-badge {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--accent);
  padding: 0.4rem 1rem;
  border: 1px solid rgba(251, 191, 36, 0.3);
  border-radius: 100px;
  opacity: 0.6;
}

.sub-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  color: var(--accent);
  opacity: 0.6;
}
</style>
