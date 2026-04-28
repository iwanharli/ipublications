<template>
  <div class="presentation-viewer">
    
    <!-- Top Toolbar -->
    <header class="viewer-toolbar" :class="{ 'viewer-hidden': currentSlide === 6 }">
      <div class="viewer-left">
        <NuxtLink to="/" class="btn-exit">
          <i class="fa-solid fa-xmark"></i>
        </NuxtLink>
        <div class="viewer-title">
          <span class="label">PRESENTING</span>
          <h2 class="title">{{ presentationTitle }}</h2>
        </div>
      </div>
      <div class="viewer-right">
        <button class="btn-quick-note" @click="showNoteModal = true" aria-label="Create Quick Note">
          <i class="fa-regular fa-pen-to-square"></i>
        </button>
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
        <!-- Slide 1: Opening Design -->
        <SwiperSlide class="slide-item" v-slot="{ isActive }">
          <OpeningSlide :active="isActive" />
        </SwiperSlide>

        <!-- Slide 2: The Hook (Numerical Reveal) -->
        <SwiperSlide class="slide-item" v-slot="{ isActive }">
          <HookSlide :active="isActive" />
        </SwiperSlide>

        <!-- Slide 3: Ruang Siber (Digital Domain) -->
        <SwiperSlide class="slide-item" v-slot="{ isActive }">
          <CyberSpaceSlide :active="isActive" />
        </SwiperSlide>

        <!-- Slide 4: Paradigma (Mental Transformation) -->
        <SwiperSlide class="slide-item" v-slot="{ isActive }">
          <ParadigmaSlide :active="isActive" />
        </SwiperSlide>

        <!-- Slide 5: Data Strategis (Utility vs Risk) -->
        <SwiperSlide class="slide-item" v-slot="{ isActive }">
          <DataSlide :active="isActive" />
        </SwiperSlide>

        <!-- Slide 6: Spektrum Ancaman (Modern Threats) -->
        <SwiperSlide class="slide-item" v-slot="{ isActive }">
          <ThreatSpectrumSlide :active="isActive" />
        </SwiperSlide>

        <!-- Slide 7: Timeline Simulasi (Attack Scenario) -->
        <SwiperSlide class="slide-item" v-slot="{ isActive }">
          <GlobalThreatMapSlide :active="isActive" />
        </SwiperSlide>

        <!-- Slide 8: Timeline Simulasi (Attack Scenario) -->
        <SwiperSlide class="slide-item" v-slot="{ isActive }">
          <TimelineSimSlide :active="isActive" />
        </SwiperSlide>

        <!-- Slide 8: Dilema Ransomware (Strategic Choice) -->
        <SwiperSlide class="slide-item" v-slot="{ isActive }">
          <DilemmaSlide :active="isActive" />
        </SwiperSlide>

        <!-- Slide 9: Pelajaran Utama (Core Lessons) -->
        <SwiperSlide class="slide-item" v-slot="{ isActive }">
          <LessonsSlide :active="isActive" />
        </SwiperSlide>

        <!-- Slide 10: Paradigma Bukti Digital (Authenticity Shift) -->
        <SwiperSlide class="slide-item" v-slot="{ isActive }">
          <EvidenceParadigmSlide :active="isActive" />
        </SwiperSlide>

        <!-- Slide 11: Metadata & Chain (Forensic Framework) -->
        <SwiperSlide class="slide-item" v-slot="{ isActive }">
          <ForensicsSlide :active="isActive" />
        </SwiperSlide>

        <!-- Slide 12: Tindakan Awal (First Response) -->
        <SwiperSlide class="slide-item" v-slot="{ isActive }">
          <InitialActionsSlide :active="isActive" />
        </SwiperSlide>

        <!-- Slide 13: Solusi Strategis (Future Readiness) -->
        <SwiperSlide class="slide-item" v-slot="{ isActive }">
          <StrategicSolutionsSlide :active="isActive" />
        </SwiperSlide>

        <!-- Slide 14: Komunikasi & AI (Governance Pillars) -->
        <SwiperSlide class="slide-item" v-slot="{ isActive }">
          <GovernanceSlide :active="isActive" />
        </SwiperSlide>

        <!-- Slide 15: Commander’s Call (Decision Exercise) -->
        <SwiperSlide class="slide-item" v-slot="{ isActive }">
          <CommandersCallSlide :active="isActive" />
        </SwiperSlide>

        <!-- Slide 16: Final Closing & Strategic Motto -->
        <SwiperSlide class="slide-item" v-slot="{ isActive }">
          <ClosingSlide :active="isActive" />
        </SwiperSlide>
      </Swiper>
    </div>
 
    <!-- Bottom Controls -->
    <footer class="viewer-controls" :class="{ 'viewer-hidden': currentSlide === 6 }">
      <div class="progress-container">
        <div class="progress-bar"></div>
      </div>
      <div class="controls-inner">
        <div class="slide-index" @click="showJumpInput = true">
          <template v-if="!showJumpInput">
            <span class="current">{{ currentSlide + 1 }}</span>
            <span class="divider">/</span>
            <span class="total">17</span>
            <span class="jump-hint"><i class="fa-solid fa-arrow-right-to-bracket ms-2"></i></span>
          </template>
          <div v-else class="jump-input-wrapper">
            <input 
              v-model.number="jumpSlideInput" 
              type="number" 
              min="1" 
              max="17"
              class="jump-input"
              @blur="handleJumpBlur"
              @keyup.enter="jumpToSlide"
              ref="jumpInputRef"
              placeholder="GO TO..."
            />
          </div>
        </div>
        <div class="footer-center">
          <Transition name="fade-footnote" mode="out-in">
            <div :key="currentSlide" class="footnote-content" v-if="currentFootnote">
              {{ currentFootnote }}
            </div>
          </Transition>
        </div>

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

    <!-- Quick Note Modal -->
    <Transition name="fade-modal">
      <div v-if="showNoteModal" class="modal-overlay" @click.self="showNoteModal = false">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Quick Note</h3>
            <button class="btn-close" @click="showNoteModal = false">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="modal-body">
            <input 
              v-model="quickNoteTitle" 
              type="text" 
              class="note-input note-title" 
              placeholder="Note Title..."
            />
            <textarea 
              v-model="quickNoteContent" 
              class="note-input note-textarea" 
              placeholder="Type your notes here..."
              rows="6"
            ></textarea>
          </div>
          <div class="modal-footer">
            <button class="btn-secondary" @click="showNoteModal = false">Cancel</button>
            <button 
              class="btn-primary" 
              @click="saveQuickNote" 
              :disabled="!quickNoteTitle || !quickNoteContent || isSaving"
            >
              <i class="fa-solid fa-check me-2" v-if="!isSaving"></i>
              <i class="fa-solid fa-spinner fa-spin me-2" v-else></i>
              {{ isSaving ? 'Saving...' : 'Save Note' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useRoute } from '#app';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation as SwiperNavigation, Pagination as SwiperPagination, EffectFade as SwiperEffectFade, Keyboard as SwiperKeyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Explicitly import slide components for better HMR stability
import OpeningSlide from '~/components/slides/1_opening.vue';
import HookSlide from '~/components/slides/2_theHook.vue';
import CyberSpaceSlide from '~/components/slides/3_ruangCyber.vue';
import ParadigmaSlide from '~/components/slides/4_paradigma.vue';
import DataSlide from '~/components/slides/5_data.vue';
import ThreatSpectrumSlide from '~/components/slides/6_spektrumAncaman.vue';
import GlobalThreatMapSlide from '~/components/slides/6_1_globalThreatMap.vue';
import TimelineSimSlide from '~/components/slides/7_timelineSimulasi.vue';
import DilemmaSlide from '~/components/slides/8_dilemaRansomware.vue';
import LessonsSlide from '~/components/slides/9_pelajaranUtama.vue';
import EvidenceParadigmSlide from '~/components/slides/10_buktiDigital.vue';
import ForensicsSlide from '~/components/slides/11_metadataChain.vue';
import InitialActionsSlide from '~/components/slides/12_tindakanAwal.vue';
import StrategicSolutionsSlide from '~/components/slides/13_solusiStrategis.vue';
import GovernanceSlide from '~/components/slides/14_komunikasiAI.vue';
import CommandersCallSlide from '~/components/slides/15_commandersCall.vue';
import SlideCover from '~/components/slides/SlideCover.vue';
import SlideSplit from '~/components/slides/SlideSplit.vue';
import SlideQuote from '~/components/slides/SlideQuote.vue';
import SlideMetrics from '~/components/slides/SlideMetrics.vue';
import SlideTimeline from '~/components/slides/SlideTimeline.vue';
import SlideCyberGlobe from '~/components/slides/SlideCyberGlobe.vue';
import SlideImageText from '~/components/slides/SlideImageText.vue';
import SlideComparison from '~/components/slides/SlideComparison.vue';
import SlideScrollable from '~/components/slides/SlideScrollable.vue';
import SlideProcess from '~/components/slides/SlideProcess.vue';
import SlideGallery from '~/components/slides/SlideGallery.vue';
import ClosingSlide from '~/components/slides/16_closing.vue';
import SlideOrgChart from '~/components/slides/SlideOrgChart.vue';
import SlideDataTable from '~/components/slides/SlideDataTable.vue';
import SlideQA from '~/components/slides/SlideQA.vue';
import SlideHighlights from '~/components/slides/SlideHighlights.vue';
import SlideInfographic from '~/components/slides/SlideInfographic.vue';
import SlideMap from '~/components/slides/SlideMap.vue';
import SlidePDFPreview from '~/components/slides/SlidePDFPreview.vue';

const route = useRoute();
const presentationId = route.params.uuid;
const presentationTitle = presentationId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

const currentSlide = ref(0);
const time = ref(0);
let timerInterval;
const swiperInstance = ref(null);

// Quick Note State
const showNoteModal = ref(false);
const quickNoteTitle = ref('');
const quickNoteContent = ref('');
const isSaving = ref(false);

// Jump to Slide State
const showJumpInput = ref(false);
const jumpSlideInput = ref(null);
const jumpInputRef = ref(null);

const jumpToSlide = () => {
  if (jumpSlideInput.value && jumpSlideInput.value >= 1 && jumpSlideInput.value <= 17) {
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

// Footnotes Mapping
const slideFootnotes = {
  0: "",
  1: "SUMBER: BSSN 2025",
  2: "Sumber: INTERPOL Cybercrime; INTERPOL Cybercrime Global Strategy 2022–2025.",
  3: "Sumber: INTERPOL Cybercrime Global Strategy 2022–2025; NIST CSF 2.0.",
  4: "Sumber: UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi; NIST CSF 2.0.",
  5: "Sumber: INTERPOL Cybercrime; INTERPOL Asia and South Pacific Cyber Threat Assessment 2025/2026; ENISA Threat Landscape.",
  6: "Sumber: AbuseIPDB; Kaspersky Cybermap; INTERPOL Threat Intelligence.",
  7: "Sumber: NIST SP 800-61r3; Reuters PDNS ransomware 2024.",
  8: "Sumber: NIST SP 800-61r3; Reuters PDNS 2024; NIST CSF 2.0.",
  9: "Sumber: NIST SP 800-61r3; CISA Incident Response Playbooks.",
  10: "Sumber: Council of Europe Electronic Evidence Guide; NIST SP 800-86; UNESCO AI Ethics.",
  11: "Sumber: Council of Europe Electronic Evidence Guide; ISO/IEC 27037; NIST SP 800-86.",
  12: "Sumber: Council of Europe Electronic Evidence Guide; NIST SP 800-86; ISO/IEC 27037.",
  13: "Sumber: NIST SP 800-207; NIST SP 800-61r3; FIRST CSIRT Services Framework; CISA Zero Trust Maturity Model.",
  14: "Sumber: NIST SP 800-61r3; CISA Incident Response Playbooks; UNESCO Recommendation on the Ethics of AI; OECD AI Principles; UU PDP 2022.",
  15: "Sumber: NIST CSF 2.0; INTERPOL Cybercrime Global Strategy; UU PDP 2022.",
  16: "",
};

const currentFootnote = computed(() => {
  return slideFootnotes[currentSlide.value] || "";
});

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
  const savedSlide = sessionStorage.getItem(`slide_${presentationId}`);
  if (savedSlide !== null) {
    const slideIndex = parseInt(savedSlide, 10);
    currentSlide.value = slideIndex;
    swiper.slideTo(slideIndex, 0); // Jump to saved slide instantly
  }
};

const onSlideChange = (swiper) => {
  currentSlide.value = swiper.activeIndex;
  sessionStorage.setItem(`slide_${presentationId}`, swiper.activeIndex);
};

const saveQuickNote = async () => {
  if (!quickNoteTitle.value || !quickNoteContent.value) return;
  
  isSaving.value = true;
  try {
    await $fetch('/api/notes', {
      method: 'POST',
      body: {
        title: quickNoteTitle.value,
        content: `<p>${quickNoteContent.value.replace(/\n/g, '<br>')}</p>`,
        docRef: presentationId,
        status: 'draft'
      }
    });
    
    // Reset and close
    quickNoteTitle.value = '';
    quickNoteContent.value = '';
    showNoteModal.value = false;
  } catch (error) {
    console.error('Failed to save note:', error);
    alert('Failed to save note. Please try again.');
  } finally {
    isSaving.value = false;
  }
};

onMounted(() => {
  // Restore timer from session storage
  const savedTime = sessionStorage.getItem(`time_${presentationId}`);
  if (savedTime !== null) {
    time.value = parseInt(savedTime, 10);
  }

  document.body.style.overflow = 'hidden';
  timerInterval = setInterval(() => {
    time.value++;
    sessionStorage.setItem(`time_${presentationId}`, time.value);
  }, 1000);
});

onUnmounted(() => {
  document.body.style.overflow = 'auto';
  clearInterval(timerInterval);
  const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
  if (isFullscreen) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});
</script>

<style scoped>
.presentation-viewer {
  --bg-main: #020617;
  --bg-toolbar: rgba(2, 6, 23, 0.95);
  --accent: #FBBF24;
  --accent-glow: rgba(251, 191, 36, 0.4);
  --accent-light: #FDE68A;
  --accent-dark: #D97706;
  --text-main: #FFFFFF;
  --text-secondary: #CBD5E1;
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
  transition: color 0.5s ease;
  text-shadow: 0 0 10px var(--accent-glow);
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
  text-shadow: 0 0 15px var(--accent-glow);
}

.btn-tool {
  background: transparent;
  border: none;
  color: var(--text-main);
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.btn-tool:hover { opacity: 1; }

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
  /* Let Swiper handle opacity, but ensure visibility for interaction */
}

:deep(.swiper-slide) {
  visibility: hidden;
}

:deep(.swiper-slide-active) {
  visibility: visible;
}

.viewer-toolbar, .viewer-controls {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.viewer-hidden {
  opacity: 0;
  pointer-events: none;
  transform: translateY(-20px);
  visibility: hidden;
}

.viewer-controls.viewer-hidden {
  transform: translateY(20px);
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
  box-shadow: 0 0 10px var(--accent), 0 0 20px var(--accent-glow);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.controls-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  max-width: 40%;
  text-align: center;
}

.footnote-content {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--text-muted);
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fade-footnote-enter-active,
.fade-footnote-leave-active {
  transition: all 0.4s ease;
}

.fade-footnote-enter-from,
.fade-footnote-leave-to {
  opacity: 0;
  transform: translateY(5px);
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
}

.jump-input:focus {
  outline: none;
}

/* Hide arrow for number input */
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
  box-shadow: 0 0 10px rgba(251, 191, 36, 0.1);
}

.btn-nav:hover {
  border-color: var(--accent-light);
  color: #000;
  background: var(--accent);
  box-shadow: 0 0 20px var(--accent-glow);
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

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(11, 17, 33, 0.8);
  backdrop-filter: blur(10px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: var(--bg-card);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  transform: translateY(0);
}

.fade-modal-enter-active,
.fade-modal-leave-active {
  transition: all 0.3s ease;
}

.fade-modal-enter-from,
.fade-modal-leave-to {
  opacity: 0;
}

.fade-modal-enter-from .modal-content,
.fade-modal-leave-to .modal-content {
  transform: translateY(20px);
}

.modal-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  color: white;
  margin: 0;
  font-family: var(--font-heading);
  letter-spacing: 0.1em;
  font-size: 1.1rem;
}

.btn-close {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.3s ease;
}

.btn-close:hover {
  color: white;
}

.modal-body {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.note-input {
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: white;
  font-family: var(--font-sans);
  transition: border-color 0.3s ease;
}

.note-input:focus {
  outline: none;
  border-color: var(--accent);
}

.note-title {
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 500;
}

.note-textarea {
  padding: 1rem;
  font-size: 1rem;
  line-height: 1.5;
  resize: vertical;
}

.modal-footer {
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn-secondary {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.05);
}

.btn-primary {
  background: var(--accent);
  border: 1px solid var(--accent);
  color: #000;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover:not(:disabled) {
  background: #fde68a;
  border-color: #fde68a;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Quick Note Button Toolbar */
.viewer-right {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.btn-quick-note {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-quick-note:hover {
  color: var(--accent);
  background: rgba(255, 255, 255, 0.05);
}
</style>
