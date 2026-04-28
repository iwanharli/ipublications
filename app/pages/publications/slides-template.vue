<template>
  <div class="presentation-viewer">
    
    <!-- Top Toolbar -->
    <header class="viewer-toolbar">
      <div class="viewer-left">
        <NuxtLink to="/" class="btn-exit">
          <i class="fa-solid fa-xmark"></i>
        </NuxtLink>
        <div class="viewer-title">
          <span class="label">TEMPLATE VIEWER</span>
          <h2 class="title">Generic Slides Library</h2>
        </div>
      </div>
      <div class="viewer-right">
        <div class="timer">
          <i class="fa-regular fa-clock me-2"></i> {{ formattedTime }}
        </div>
      </div>
    </header>

    <!-- Main Presentation Area (Swiper) -->
    <div class="swiper-container presentation-slides">
      <Swiper
        :modules="[SwiperNavigation, SwiperPagination, SwiperEffectFade, SwiperKeyboard]"
        :slides-per-view="1"
        :effect="'fade'"
        :fade-effect="{ crossFade: true }"
        :speed="800"
        :watch-slides-progress="true"
        :navigation="{ nextEl: '.btn-next', prevEl: '.btn-prev' }"
        :pagination="{ type: 'progressbar', el: '.progress-bar' }"
        :keyboard="{ enabled: true, onlyInViewport: true }"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        class="main-swiper"
      >
        <SwiperSlide class="slide-item" v-slot="{ isActive }"><SlideCover :active="isActive" /></SwiperSlide>
        <SwiperSlide class="slide-item" v-slot="{ isActive }"><SlideSplit :active="isActive" /></SwiperSlide>
        <SwiperSlide class="slide-item" v-slot="{ isActive }"><SlideQuote :active="isActive" /></SwiperSlide>
        <SwiperSlide class="slide-item" v-slot="{ isActive }"><SlideMetrics :active="isActive" /></SwiperSlide>
        <SwiperSlide class="slide-item" v-slot="{ isActive }"><SlideTimeline :active="isActive" /></SwiperSlide>
        <SwiperSlide class="slide-item" v-slot="{ isActive }"><SlideCyberGlobe :active="isActive" /></SwiperSlide>
        <SwiperSlide class="slide-item" v-slot="{ isActive }"><SlideImageText :active="isActive" /></SwiperSlide>
        <SwiperSlide class="slide-item" v-slot="{ isActive }"><SlideComparison :active="isActive" /></SwiperSlide>
        <SwiperSlide class="slide-item" v-slot="{ isActive }"><SlideScrollable :active="isActive" /></SwiperSlide>
        <SwiperSlide class="slide-item" v-slot="{ isActive }"><SlideProcess :active="isActive" /></SwiperSlide>
        <SwiperSlide class="slide-item" v-slot="{ isActive }"><SlideGallery :active="isActive" /></SwiperSlide>
        <SwiperSlide class="slide-item" v-slot="{ isActive }"><SlideOrgChart :active="isActive" /></SwiperSlide>
        <SwiperSlide class="slide-item" v-slot="{ isActive }"><SlideDataTable :active="isActive" /></SwiperSlide>
        <SwiperSlide class="slide-item" v-slot="{ isActive }"><SlideQA :active="isActive" /></SwiperSlide>
        <SwiperSlide class="slide-item" v-slot="{ isActive }"><SlideHighlights :active="isActive" /></SwiperSlide>
        <SwiperSlide class="slide-item" v-slot="{ isActive }"><SlideInfographic :active="isActive" /></SwiperSlide>
        <SwiperSlide class="slide-item" v-slot="{ isActive }"><SlideMap :active="isActive" /></SwiperSlide>
        <SwiperSlide class="slide-item" v-slot="{ isActive }"><SlidePDFPreview :active="isActive" /></SwiperSlide>
        <SwiperSlide class="slide-item" v-slot="{ isActive }"><SlideClosing :active="isActive" /></SwiperSlide>
      </Swiper>
    </div>
 
    <!-- Bottom Controls -->
    <footer class="viewer-controls">
      <div class="progress-container">
        <div class="progress-bar"></div>
      </div>
      <div class="controls-inner">
        <div class="slide-index" @click="showJumpInput = true">
          <template v-if="!showJumpInput">
            <span class="current">{{ currentSlide + 1 }}</span>
            <span class="divider">/</span>
            <span class="total">19</span>
            <span class="jump-hint"><i class="fa-solid fa-arrow-right-to-bracket ms-2"></i></span>
          </template>
          <div v-else class="jump-input-wrapper">
            <input 
              v-model.number="jumpSlideInput" 
              type="number" 
              min="1" 
              max="19"
              class="jump-input"
              @blur="handleJumpBlur"
              @keyup.enter="jumpToSlide"
              ref="jumpInputRef"
              placeholder="GO TO..."
            />
          </div>
        </div>
        <div class="footer-center"></div>

        <div class="nav-btns">
          <button class="btn-nav btn-prev" aria-label="Previous Slide">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <button class="btn-nav btn-next" aria-label="Next Slide">
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation as SwiperNavigation, Pagination as SwiperPagination, EffectFade as SwiperEffectFade, Keyboard as SwiperKeyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import SlideCover from '~/components/slides-template/1_SlideCover.vue';
import SlideSplit from '~/components/slides-template/2_SlideSplit.vue';
import SlideQuote from '~/components/slides-template/3_SlideQuote.vue';
import SlideMetrics from '~/components/slides-template/4_SlideMetrics.vue';
import SlideTimeline from '~/components/slides-template/5_SlideTimeline.vue';
import SlideCyberGlobe from '~/components/slides-template/6_SlideCyberGlobe.vue';
import SlideImageText from '~/components/slides-template/7_SlideImageText.vue';
import SlideComparison from '~/components/slides-template/8_SlideComparison.vue';
import SlideScrollable from '~/components/slides-template/9_SlideScrollable.vue';
import SlideProcess from '~/components/slides-template/10_SlideProcess.vue';
import SlideGallery from '~/components/slides-template/11_SlideGallery.vue';
import SlideOrgChart from '~/components/slides-template/12_SlideOrgChart.vue';
import SlideDataTable from '~/components/slides-template/13_SlideDataTable.vue';
import SlideQA from '~/components/slides-template/14_SlideQA.vue';
import SlideHighlights from '~/components/slides-template/15_SlideHighlights.vue';
import SlideInfographic from '~/components/slides-template/16_SlideInfographic.vue';
import SlideMap from '~/components/slides-template/17_SlideMap.vue';
import SlidePDFPreview from '~/components/slides-template/18_SlidePDFPreview.vue';
import SlideClosing from '~/components/slides-template/19_SlideClosing.vue';

const currentSlide = ref(0);
const time = ref(0);
let timerInterval;
const swiperInstance = ref(null);

const showJumpInput = ref(false);
const jumpSlideInput = ref(null);
const jumpInputRef = ref(null);

const jumpToSlide = () => {
  if (jumpSlideInput.value && jumpSlideInput.value >= 1 && jumpSlideInput.value <= 19) {
    const targetIndex = jumpSlideInput.value - 1;
    swiperInstance.value?.slideTo(targetIndex);
  }
  showJumpInput.value = false;
  jumpSlideInput.value = null;
};

const handleJumpBlur = () => {
  setTimeout(() => {
    showJumpInput.value = false;
    jumpSlideInput.value = null;
  }, 200);
};

watch(showJumpInput, (val) => {
  if (val) {
    nextTick(() => {
      jumpInputRef.value?.focus();
    });
  }
});

const formattedTime = computed(() => {
  const mins = Math.floor(time.value / 60);
  const secs = time.value % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
});

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
};

const onSlideChange = (swiper) => {
  currentSlide.value = swiper.activeIndex;
};

onMounted(() => {
  document.body.style.overflow = 'hidden';
  timerInterval = setInterval(() => {
    time.value++;
  }, 1000);
});

onUnmounted(() => {
  document.body.style.overflow = 'auto';
  clearInterval(timerInterval);
});
</script>

<style scoped>
.presentation-viewer {
  --bg-main: #020617;
  --bg-toolbar: rgba(2, 6, 23, 0.95);
  --accent: #FBBF24;
  --accent-glow: rgba(251, 191, 36, 0.4);
  --accent-light: #FDE68A;
  --text-main: #FFFFFF;
  --text-muted: #64748B;

  height: 100vh;
  background: var(--bg-main);
  color: var(--text-main);
  font-family: var(--font-sans);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.viewer-toolbar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem;
  z-index: 100;
  background: var(--bg-toolbar);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

.viewer-left, .viewer-right {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.btn-exit {
  text-decoration: none;
  color: var(--text-main);
  font-size: 1.2rem;
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.btn-exit:hover { opacity: 1; }

.viewer-title .label {
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  color: var(--accent);
  display: block;
  margin-bottom: 0.25rem;
}

.viewer-title .title {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.timer {
  font-family: monospace;
  font-size: 1rem;
  letter-spacing: 0.1em;
  color: var(--accent);
}

.presentation-slides {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.main-swiper {
  height: 100%;
  width: 100%;
}

.slide-item {
  background: #0F172A;
  width: 100%;
  height: 100%;
}

:deep(.swiper-slide) {
  visibility: hidden;
}

:deep(.swiper-slide-active) {
  visibility: visible;
}

.viewer-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem 4rem;
  background: var(--bg-toolbar);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  z-index: 100;
}

.progress-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: rgba(255, 255, 255, 0.05);
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: var(--accent) !important;
  box-shadow: 0 0 10px var(--accent);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.controls-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.slide-index {
  font-size: 1rem;
  letter-spacing: 0.2em;
  font-weight: 300;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.slide-index:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--accent);
}

.jump-hint {
  font-size: 0.8rem;
  opacity: 0;
  transition: all 0.3s ease;
  transform: translateX(-5px);
}

.slide-index:hover .jump-hint {
  opacity: 1;
  transform: translateX(0);
}

.jump-input-wrapper {
  display: flex;
  align-items: center;
}

.jump-input {
  background: transparent;
  border: none;
  border-bottom: 2px solid var(--accent);
  color: var(--accent);
  font-family: var(--font-sans);
  font-size: 1rem;
  width: 80px;
  text-align: center;
  font-weight: 700;
  padding: 0;
  outline: none;
}

.jump-input::-webkit-outer-spin-button,
.jump-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.divider {
  margin: 0 1rem;
  opacity: 0.3;
}

.total { opacity: 0.5; }

.nav-btns {
  display: flex;
  gap: 1rem;
}

.btn-nav {
  background: transparent;
  border: 1px solid var(--accent);
  color: var(--accent);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-nav:hover {
  border-color: var(--accent-light);
  color: #000;
  background: var(--accent);
  transform: scale(1.1);
}

.btn-nav:disabled {
  opacity: 0.2;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .viewer-toolbar, .viewer-controls { padding: 1.5rem 2rem; }
  .viewer-title, .timer { display: none; }
  .nav-btns { gap: 1rem; }
  .btn-nav { width: 36px; height: 36px; font-size: 0.9rem; }
}
</style>
