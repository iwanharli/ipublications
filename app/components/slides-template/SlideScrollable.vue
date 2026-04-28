<template>
  <div class="slide-content slide-scrollable">
    
    <!-- Premium TOC Sidebar -->
    <div class="toc-sidebar">
      <div 
        v-for="(section, index) in sections" 
        :key="index"
        class="toc-item"
        :class="{ active: currentSection === index }"
        @click="scrollTo(index)"
      >
        <div class="toc-dot"></div>
        <div class="toc-label">
          <span class="roman">{{ section.roman }}</span>
          <span class="full-title">{{ section.title }}</span>
        </div>
      </div>
    </div>

    <div class="scroll-wrapper" ref="scrollWrapper" @scroll="handleScroll">
      <div class="slide-inner">
        <header class="report-header">
          <span class="slide-number">08 / STRATEGIC REPORT</span>
          <h2 class="sub-title">Intelligence <span class="italic-serif">Analysis</span> 2026</h2>
          <div class="report-meta">
            <span class="meta-badge">CONFIDENTIAL</span>
            <span class="meta-date">REV. 04.27</span>
          </div>
        </header>
        
        <div class="report-content">
          <!-- Section I -->
          <section class="report-section" id="section-0">
            <div class="section-tag">PREFACE</div>
            <h3>Executive Summary</h3>
            <div class="highlight-quote glass">
              "Transformasi digital bukan sekadar adopsi teknologi, melainkan evolusi total dalam kecepatan respon dan akurasi intelijen nasional."
            </div>
            <p>Laporan ini merinci fase transisi digital menuju ekosistem CORE. Kami mengidentifikasi tiga pilar utama yang akan menjadi fondasi transformasi: Integritas Data, Kecepatan Respon, dan Skalabilitas Infrastruktur.</p>
          </section>

          <!-- Section II -->
          <section class="report-section" id="section-1">
            <div class="section-tag">TECHNICAL</div>
            <h3>Data Integrity Protocols</h3>
            <p>Setiap aliran data akan divalidasi melalui protokol <strong>Sentinel 2.0</strong>. Ini memastikan bahwa informasi yang diterima oleh pusat komando adalah akurat dan tidak termanipulasi.</p>
            
            <div class="stats-card-grid">
              <div class="stat-card glass">
                <div class="sc-label">Validation Score</div>
                <div class="sc-value">99.98%</div>
                <div class="sc-bar"><div class="sc-progress" style="width: 99%"></div></div>
              </div>
              <div class="stat-card glass">
                <div class="sc-label">Encryption</div>
                <div class="sc-value">AES-256</div>
                <div class="sc-bar"><div class="sc-progress" style="width: 100%"></div></div>
              </div>
            </div>
          </section>

          <!-- Section III -->
          <section class="report-section" id="section-2">
            <div class="section-tag">INFRASTRUCTURE</div>
            <h3>Scalability Architecture</h3>
            <p>Sistem dirancang untuk menangani lonjakan trafik data hingga 10x lipat dari kapasitas saat ini. Cloud-native architecture memungkinkan alokasi sumber daya secara dinamis sesuai kebutuhan lapangan.</p>
            <div class="insight-box">
              <i class="fa-solid fa-lightbulb text-accent me-3"></i>
              <span>Prioritas utama pada Q4 2026 adalah sinkronisasi basis data antar departemen yang saat ini masih terfragmentasi.</span>
            </div>
          </section>

          <!-- Section IV -->
          <section class="report-section" id="section-3">
            <div class="section-tag">STRATEGY</div>
            <h3>Conclusion & Roadmap</h3>
            <p>Langkah selanjutnya adalah pelatihan intensif bagi operator di tingkat regional dan penguatan koordinasi lintas sektoral.</p>
            <ul class="roadmap-list">
              <li><i class="fa-solid fa-check-circle text-accent me-2"></i> Fase I: Integrasi Pusat Data</li>
              <li><i class="fa-solid fa-circle-dot text-muted me-2"></i> Fase II: Deployment Regional</li>
              <li><i class="fa-solid fa-circle-dot text-muted me-2"></i> Fase III: Optimasi AI Nasional</li>
            </ul>
          </section>
          
          <div class="scroll-hint">
            <div class="hint-line"></div>
            <span>END OF DOCUMENT</span>
            <div class="hint-line"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue';
import gsap from 'gsap';

const props = defineProps({
  active: Boolean
});

const scrollWrapper = ref(null);
const currentSection = ref(0);

const sections = [
  { roman: 'I', title: 'Summary' },
  { roman: 'II', title: 'Data Integrity' },
  { roman: 'III', title: 'Scalability' },
  { roman: 'IV', title: 'Conclusion' }
];

const handleScroll = () => {
  if (!scrollWrapper.value) return;
  const sectionsEl = scrollWrapper.value.querySelectorAll('.report-section');
  const wrapperTop = scrollWrapper.value.scrollTop;
  const offset = 200;
  
  let activeIndex = 0;
  sectionsEl.forEach((el, i) => {
    if (el.offsetTop - offset <= wrapperTop) {
      activeIndex = i;
    }
  });

  const isAtBottom = Math.abs(scrollWrapper.value.scrollHeight - wrapperTop - scrollWrapper.value.clientHeight) < 10;
  if (isAtBottom && sectionsEl.length > 0) {
    activeIndex = sectionsEl.length - 1;
  }

  currentSection.value = activeIndex;
};

const scrollTo = (index) => {
  if (!scrollWrapper.value) return;
  const sectionsEl = scrollWrapper.value.querySelectorAll('.report-section');
  const el = sectionsEl[index];
  if (el) {
    const targetTop = index === 0 ? 0 : el.offsetTop - 150;
    scrollWrapper.value.scrollTo({
      top: targetTop,
      behavior: 'smooth'
    });
  }
};

const handleKeyDown = (e) => {
  if (!props.active || !scrollWrapper.value) return;
  const step = 200;
  if (e.key === 'ArrowDown') {
    e.stopPropagation();
    e.preventDefault();
    scrollWrapper.value.scrollBy({ top: step, behavior: 'smooth' });
  } else if (e.key === 'ArrowUp') {
    e.stopPropagation();
    e.preventDefault();
    scrollWrapper.value.scrollBy({ top: -step, behavior: 'smooth' });
  }
};

watch(() => props.active, (val) => {
  if (val) {
    gsap.fromTo('.report-header', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.2 });
    gsap.fromTo('.report-section', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, delay: 0.4 });
    if (scrollWrapper.value) {
      scrollWrapper.value.scrollTop = 0;
    }
  }
}, { immediate: true });

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown, { capture: true });
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown, { capture: true });
});
</script>

<style scoped>
.slide-content {
  height: 100%;
  width: 100%;
  position: relative;
  background: #020617;
}

/* Premium TOC */
.toc-sidebar {
  position: absolute;
  top: 50%;
  left: 4rem;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  z-index: 20;
}

.toc-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  cursor: pointer;
  group: hover;
}

.toc-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
}

.toc-item.active .toc-dot {
  background: var(--accent);
  box-shadow: 0 0 15px var(--accent);
  transform: scale(1.5);
}

.toc-label {
  display: flex;
  flex-direction: column;
  opacity: 0.3;
  transition: all 0.4s ease;
}

.toc-item:hover .toc-label, .toc-item.active .toc-label {
  opacity: 1;
}

.toc-label .roman {
  font-family: var(--font-serif);
  font-size: 0.7rem;
  color: var(--accent);
  font-weight: 700;
  margin-bottom: 0.2rem;
}

.toc-label .full-title {
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: white;
  white-space: nowrap;
}

.scroll-wrapper {
  height: 100%;
  overflow-y: auto;
  padding: 8rem 15vw;
  scrollbar-width: thin;
  scrollbar-color: var(--accent) transparent;
}

.scroll-wrapper::-webkit-scrollbar { width: 4px; }
.scroll-wrapper::-webkit-scrollbar-track { background: transparent; }
.scroll-wrapper::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 10px; }

.slide-inner {
  max-width: 900px;
  margin: 0 auto;
}

.report-header {
  margin-bottom: 6rem;
}

.slide-number {
  font-size: 0.8rem;
  letter-spacing: 0.4em;
  color: var(--accent);
  margin-bottom: 2rem;
  display: block;
}

.sub-title {
  font-size: 4rem;
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 2rem;
  color: white;
}

.report-meta {
  display: flex;
  gap: 1.5rem;
}

.meta-badge {
  font-size: 0.6rem;
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  padding: 0.3rem 0.8rem;
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 4px;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.meta-date {
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.4);
  padding: 0.3rem 0;
  letter-spacing: 0.1em;
}

.report-section {
  margin-bottom: 6rem;
  position: relative;
}

.section-tag {
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  color: var(--accent);
  margin-bottom: 1rem;
  font-weight: 800;
}

.report-section h3 {
  font-size: 2.2rem;
  color: white;
  margin-bottom: 2rem;
  font-family: var(--font-heading);
  font-weight: 700;
}

.report-section p {
  font-size: 1.15rem;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2rem;
}

.highlight-quote {
  padding: 2.5rem;
  margin: 3rem 0;
  border-left: 4px solid var(--accent);
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.4rem;
  line-height: 1.6;
  color: white;
  background: rgba(255, 255, 255, 0.02) !important;
}

.stats-card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin: 3rem 0;
}

.stat-card {
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.sc-label { font-size: 0.7rem; text-transform: uppercase; color: rgba(255, 255, 255, 0.4); margin-bottom: 1rem; }
.sc-value { font-size: 2rem; font-weight: 700; color: var(--accent); margin-bottom: 1.5rem; }
.sc-bar { height: 4px; background: rgba(255, 255, 255, 0.05); border-radius: 2px; overflow: hidden; }
.sc-progress { height: 100%; background: var(--accent); box-shadow: 0 0 10px var(--accent); }

.insight-box {
  background: rgba(251, 191, 36, 0.05);
  border: 1px dashed rgba(251, 191, 36, 0.3);
  padding: 1.5rem 2rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
}

.roadmap-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.roadmap-list li {
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
}

.scroll-hint {
  text-align: center;
  padding: 6rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  opacity: 0.3;
}

.hint-line { flex-grow: 1; height: 1px; background: linear-gradient(90deg, transparent, white, transparent); }
.scroll-hint span { font-size: 0.7rem; letter-spacing: 0.4em; }

@media (max-width: 1200px) {
  .toc-sidebar { display: none; }
  .scroll-wrapper { padding: 8rem 10vw; }
}
</style>
