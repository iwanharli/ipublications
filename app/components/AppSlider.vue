<template>
  <section class="slider-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Pilar Strategis</h2>
        <p class="section-desc">Empat area fokus utama transformasi digital sistem presentasi.</p>
      </div>
      
      <div class="swiper-container" ref="swiperRef">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in slides" :key="index">
            <div class="card glass">
              <div class="card-icon" v-html="item.icon"></div>
              <h3 class="card-title">{{ item.title }}</h3>
              <p class="card-text">{{ item.text }}</p>
              <div class="card-footer">
                <span class="status">Aktif</span>
                <div class="progress-bar">
                  <div class="progress" :style="{ width: item.progress + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Swiper from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const swiperRef = ref(null);

const slides = [
  {
    title: 'Centralized Control',
    text: 'Kelola seluruh materi presentasi dan data visual dalam satu dashboard terpusat yang aman.',
    progress: 100,
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>'
  },
  {
    title: 'Real-time Sync',
    text: 'Sinkronisasi data otomatis dari berbagai sumber operasional secara instan saat presentasi.',
    progress: 90,
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>'
  },
  {
    title: 'Interactive Analytics',
    text: 'Visualisasi data interaktif yang memungkinkan pimpinan melakukan drill-down informasi secara langsung.',
    progress: 85,
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83M22 12A10 10 0 0 0 12 2v10z"/></svg>'
  },
  {
    title: 'Multi-Device Ready',
    text: 'Akses dan kontrol presentasi dari tablet, smartphone, maupun video wall Command Center.',
    progress: 95,
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M15 20v2M2 15h2M20 15h2"/></svg>'
  }
];

onMounted(() => {
  new Swiper(swiperRef.value, {
    modules: [Pagination, Autoplay],
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });
});
</script>

<style scoped>
.slider-section {
  padding: 80px 0;
  background: var(--bg-secondary);
}

.section-header {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.section-desc {
  color: var(--text-muted);
}

.swiper-container {
  overflow: hidden;
  padding-bottom: 3rem;
}

.card {
  padding: 2.5rem;
  height: 100%;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
  border-color: var(--primary-light);
}

.card-icon {
  width: 48px;
  height: 48px;
  color: var(--cyan);
  margin-bottom: 1.5rem;
}

.card-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.card-text {
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.card-footer {
  margin-top: auto;
}

.status {
  display: block;
  font-size: 0.75rem;
  color: var(--cyan);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.progress-bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.progress {
  height: 100%;
  background: var(--primary-light);
  border-radius: 2px;
}

:deep(.swiper-pagination-bullet) {
  background: white;
  opacity: 0.2;
}

:deep(.swiper-pagination-bullet-active) {
  background: var(--cyan);
  opacity: 1;
}
</style>
