<template>
  <div class="qna-dashboard">
    <!-- Header -->
    <header class="dashboard-header">
      <div class="container">
        <div class="header-content">
          <div class="brand">
            <span class="badge">TACTICAL SCRIPT</span>
            <h1>Raw Script Dashboard</h1>
            <p class="subtitle">Strategi Pertahanan Siber Polri 2026</p>
          </div>
          <div class="actions">
            <NuxtLink to="/qna/strategi-pertahanan-siber-2026" class="btn-back">
              Q&A
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile Quick Nav (Moved Outside) -->
    <div class="mobile-quick-nav">
      <div class="container">
        <div class="quick-nav-items">
          <a 
            v-for="slide in presentationContent" 
            :key="'mob-' + slide.id" 
            :href="'#' + slide.id"
            class="mob-nav-item"
            :class="{ active: activeSlide === slide.id }"
          >
            {{ getSlideNumber(slide.indicator) }}
          </a>
        </div>
      </div>
    </div>

    <div class="container main-layout">
      <!-- Sidebar Nav -->
      <aside class="dashboard-sidebar">
        <nav class="sticky-nav">
          <div class="nav-label">JUMP TO SLIDE</div>
          <div class="nav-items">
              <a 
                v-for="slide in presentationContent" 
                :key="slide.id" 
                :href="'#' + slide.id"
                class="nav-item"
                :class="{ active: activeSlide === slide.id }"
              >
                <span class="slide-num">{{ getSlideNumber(slide.indicator) }}</span>
                <span class="slide-name">{{ getSlideName(slide.indicator) }}</span>
              </a>
          </div>
        </nav>
      </aside>

      <!-- Content -->
      <main class="dashboard-content">
        <section 
          v-for="slide in presentationContent" 
          :key="slide.id" 
          :id="slide.id" 
          class="qna-card"
          :class="{ 'is-closing': slide.id === 'closing-note' }"
        >
          <!-- Card Header -->
          <div class="card-header">
            <div class="slide-meta">
              <span class="indicator">{{ slide.indicator }}</span>
              <h2 v-html="slide.title"></h2>
              <p v-if="slide.subtitle" class="card-subtitle">{{ slide.subtitle }}</p>
              
              <!-- Keypoints -->
              <div v-if="slide.keypoints" class="keypoints-box">
                <div class="keypoints-label"><i class="fa-solid fa-bolt"></i> QUICK RECAP:</div>
                <ul class="keypoints-list">
                  <li v-for="(point, pIdx) in slide.keypoints" :key="pIdx">{{ point }}</li>
                </ul>
              </div>
            </div>
            <div v-if="slide.interactive" class="type-tag" :class="slide.interactive.type">
              {{ slide.interactive.type.toUpperCase() }}
            </div>
          </div>

          <div class="card-body">
            <!-- Narrative Section -->
            <div class="content-section narrative">
              <div class="section-icon">
                <i class="fa-solid fa-microphone-lines"></i>
              </div>
              <div class="section-content">
                <h3 class="label">NARASI PEMBICARA</h3>
                <div class="narrative-text">
                  <p v-for="(p, pIdx) in slide.narrative" :key="pIdx" v-html="p"></p>
                </div>
              </div>
            </div>

            <!-- Analogy Section -->
            <div v-if="slide.analogy" class="content-section analogy">
              <div class="section-icon">
                <i :class="slide.analogy.icon"></i>
              </div>
              <div class="section-content">
                <h3 class="label">{{ slide.analogy.label }}</h3>
                <div class="analogy-text">
                  <p v-html="slide.analogy.text"></p>
                </div>
              </div>
            </div>

            <!-- Interactive Section -->
            <div v-if="slide.interactive" class="content-section interactive" :class="slide.interactive.type">
              <div class="section-icon">
                <i class="fa-solid fa-comments"></i>
              </div>
              <div class="section-content">
                <h3 class="label">{{ slide.interactive.label }}</h3>
                
                <!-- Questions -->
                <div v-if="slide.interactive.questions" class="questions-list">
                  <div v-for="(q, qIdx) in slide.interactive.questions" :key="qIdx" class="question-item">
                    <p v-html="q"></p>
                  </div>
                </div>

                <!-- Quiz -->
                <div v-if="slide.interactive.quiz" class="quiz-block">
                  <p class="quiz-question" v-html="slide.interactive.quiz.question"></p>
                  <div class="options-grid">
                    <div 
                      v-for="(opt, idx) in slide.interactive.quiz.options" 
                      :key="idx"
                      class="option-item"
                      :class="{ 'is-correct': opt.active }"
                    >
                      <span class="opt-label">{{ getOptLabel(opt.text) }}</span>
                      <span class="opt-text" v-html="opt.text"></span>
                      <i v-if="opt.active" class="fa-solid fa-check-circle correct-icon"></i>
                    </div>
                  </div>
                </div>

                <!-- Guidance Box -->
                <div v-if="slide.interactive.guidance" class="guidance-box">
                  <h3 class="label-mini">{{ slide.interactive.guidance.label }}</h3>
                  <div class="guidance-content">
                    <p v-for="(gt, gtIdx) in slide.interactive.guidance.text" :key="gtIdx" v-html="gt"></p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Supplements Grid -->
            <div v-if="slide.supplements" class="supplements-grid">
              <!-- Jokes -->
              <div v-if="slide.supplements.jokes && slide.supplements.jokes.length" class="supp-card jokes">
                <h3 class="label">JOKES IMBUHAN RINGAN</h3>
                <div class="supp-text">
                  <p v-for="(joke, jIdx) in slide.supplements.jokes" :key="jIdx" v-html="joke"></p>
                </div>
              </div>

              <!-- Transition -->
              <div v-if="slide.supplements.transition" class="supp-card transition">
                <h3 class="label">{{ slide.supplements.transitionLabel || 'TRANSISI' }}</h3>
                <div class="supp-text">
                  <p v-html="slide.supplements.transition"></p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { presentationContent } from '~/data/presentation-content';

const activeSlide = ref('slide-1');

const getSlideNumber = (indicator) => {
  return indicator.split(' ')[1] || '';
};

const getSlideName = (indicator) => {
  return indicator.split('—')[1]?.trim() || 'Slide';
};

const getOptLabel = (text) => {
  return text.split('.')[0] || '';
};

onMounted(() => {
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSlide.value = entry.target.id;
      }
    });
  }, observerOptions);

  const targets = document.querySelectorAll('.qna-card');
  targets.forEach(target => observer.observe(target));

  onUnmounted(() => {
    observer.disconnect();
  });
});

useHead({
  title: 'Raw Script - Strategi Pertahanan Siber 2026',
  link: [
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' }
  ]
});
</script>

<style scoped>
.qna-dashboard {
  background-color: #020617;
  color: #e2e8f0;
  min-height: 100vh;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  padding-bottom: 5rem;
}

.container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Header Styles */
.dashboard-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #0f172a !important; /* Solid dark color */
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand h1 {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0.25rem 0;
  background: linear-gradient(135deg, #fff 0%, #94a3b8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.badge {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #3b82f6;
  text-transform: uppercase;
}

.subtitle {
  font-size: 0.85rem;
  color: #64748b;
}

.actions {
  display: flex;
  gap: 1rem;
}

.btn-back {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-print {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border-color: rgba(59, 130, 246, 0.2);
}

.btn-back {
  background: #1e293b;
  color: #f8fafc;
}

/* Layout */
.main-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 3rem;
  margin-top: 3rem;
}

/* Sidebar */
.dashboard-sidebar {
  position: relative;
}

.sticky-nav {
  position: sticky;
  top: 160px;
  height: calc(100vh - 200px);
  overflow-y: auto;
  padding-right: 1rem;
}

/* Custom Scrollbar for Sidebar */
.sticky-nav::-webkit-scrollbar { width: 4px; }
.sticky-nav::-webkit-scrollbar-track { background: transparent; }
.sticky-nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

.nav-label {
  font-size: 0.65rem;
  font-weight: 800;
  color: #475569;
  margin-bottom: 1rem;
  letter-spacing: 0.1em;
}

.nav-items {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.75rem;
  border-radius: 10px;
  color: #64748b;
  text-decoration: none;
  transition: all 0.3s;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid transparent;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #f8fafc;
}

.nav-item.active {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
  border-color: rgba(59, 130, 246, 0.3);
}

.slide-num {
  font-size: 0.75rem;
  font-weight: 800;
  min-width: 24px;
}

.active .slide-num { color: #60a5fa; }

.slide-name {
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Content Area */
.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.qna-card {
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  overflow: hidden;
  scroll-margin-top: 180px;
  transition: border-color 0.4s;
}

.qna-card:hover {
  border-color: rgba(59, 130, 246, 0.2);
}

.qna-card.is-closing {
  border-color: rgba(16, 185, 129, 0.2);
}

.card-header {
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.01);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.indicator {
  font-size: 0.7rem;
  font-weight: 800;
  color: #f59e0b;
  margin-bottom: 0.75rem;
  display: block;
  letter-spacing: 0.1em;
}

.is-closing .indicator { color: #10b981; }

.card-header h2 {
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1.3;
  margin: 0;
  color: #fff;
}

.card-subtitle {
  margin-top: 0.75rem;
  font-size: 1rem;
  color: #94a3b8;
}

/* Keypoints Styles */
.keypoints-box {
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(59, 130, 246, 0.05);
  border-radius: 12px;
  border-left: 3px solid #3b82f6;
}

.keypoints-label {
  font-size: 0.65rem;
  font-weight: 800;
  color: #3b82f6;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.keypoints-list {
  margin: 0;
  padding-left: 1.25rem;
  list-style-type: disc;
}

.keypoints-list li {
  font-size: 0.9rem;
  color: #e2e8f0;
  line-height: 1.5;
  margin-bottom: 0.25rem;
}

.keypoints-list li:last-child {
  margin-bottom: 0;
}

/* Sections */
.card-body {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}

.content-section {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 1.5rem;
}

.section-icon {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.label {
  font-size: 0.65rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  color: #475569;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
}

/* Narrative */
.narrative .section-icon { color: #3b82f6; }
.narrative-text p {
  font-size: 1.25rem;
  line-height: 1.6;
  color: #cbd5e1;
  margin-bottom: 1.5rem;
}
.narrative-text p:last-child { margin-bottom: 0; }
:deep(strong) { color: #fff; font-weight: 700; }

/* Analogy */
.analogy .section-icon { color: #f59e0b; }
.analogy-text p {
  font-size: 1.1rem;
  font-style: italic;
  line-height: 1.7;
  color: #94a3b8;
}

/* Interactive */
.interactive .section-icon { color: #8b5cf6; }
.question-item p {
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  font-style: italic;
  margin-bottom: 1rem;
}

.guidance-box {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.label-mini {
  font-size: 0.6rem;
  font-weight: 800;
  color: #10b981;
  margin-bottom: 0.75rem;
  letter-spacing: 0.1em;
}

.guidance-content p {
  font-size: 1rem;
  line-height: 1.8;
  color: #cbd5e1;
  margin-bottom: 1.5rem;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  border-left: 3px solid rgba(16, 185, 129, 0.3);
}

.guidance-content :deep(strong) {
  color: #10b981;
}

/* Quiz block in main */
.quiz-question { font-size: 1.2rem; font-weight: 800; color: #60a5fa; margin-bottom: 1.5rem; }
.options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.option-item { 
  padding: 1rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 10px; 
  display: flex; align-items: center; gap: 1rem;
}
.option-item.is-correct { background: rgba(16, 185, 129, 0.05); border-color: rgba(16, 185, 129, 0.2); }
.opt-label { font-weight: 800; color: #475569; }
.opt-text { font-size: 0.9rem; color: #94a3b8; }
.is-correct .opt-text { color: #fff; }
.correct-icon { color: #10b981; margin-left: auto; }

/* Supplements */
.supplements-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.supp-card {
  background: rgba(255, 255, 255, 0.02);
  padding: 1.5rem;
  border-radius: 16px;
  border-left: 3px solid transparent;
}

.supp-card.jokes { border-color: #f59e0b; background: rgba(245, 158, 11, 0.03); }
.supp-card.transition { border-color: #10b981; background: rgba(16, 185, 129, 0.03); }

.supp-text p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #94a3b8;
  font-style: italic;
}

/* Tag Styles */
.type-tag {
  font-size: 0.6rem;
  font-weight: 800;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  letter-spacing: 0.05em;
}
.type-tag.standard { background: rgba(59, 130, 246, 0.1); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.2); }
.type-tag.alternate { background: rgba(16, 185, 129, 0.1); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.2); }
.type-tag.quiz { background: rgba(139, 92, 246, 0.1); color: #a78bfa; border: 1px solid rgba(139, 92, 246, 0.2); }

/* Mobile Quick Nav */
.mobile-quick-nav {
  display: none;
  background: #0f172a !important; 
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 110px; /* Synchronized with header height + buffer */
  z-index: 999;
  padding: 0.75rem 0;
  width: 100%;
}

.quick-nav-items {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding: 0 1.5rem 0.25rem 1.5rem; /* Add horizontal padding here instead of parent */
  scrollbar-width: none;
}

.quick-nav-items::-webkit-scrollbar { display: none; }

.mob-nav-item {
  flex: 0 0 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 700;
  transition: all 0.2s;
}

.mob-nav-item.active {
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
  border-color: rgba(59, 130, 246, 0.4);
}

/* Print & Responsive */
@media print {
  .qna-dashboard { background: white !important; color: black !important; padding: 0 !important; }
  .dashboard-header, .dashboard-sidebar, .btn-print, .btn-back { display: none !important; }
  .main-layout { display: block !important; margin: 0 !important; }
  .qna-card { 
    break-inside: avoid; border: 1px solid #ddd !important; 
    background: white !important; margin-bottom: 2rem !important; 
  }
  .card-header { background: #f8f9fa !important; color: black !important; }
  .card-header h2 { color: black !important; }
  .narrative-text p, .question-item p, .opt-text { color: black !important; }
  .supp-card { background: #fcfcfc !important; border: 1px solid #eee !important; }
}

@media (max-width: 1024px) {
  .dashboard-header {
    background: #0f172a !important;
    padding: 1rem 0;
  }
  .main-layout { 
    grid-template-columns: 1fr; 
    padding-top: 1rem;
  }
  .dashboard-sidebar { display: none; }
  .mobile-quick-nav {
    display: block;
    top: 100px; /* Adjusted for mobile header */
  }
  .qna-card {
    scroll-margin-top: 180px; 
  }
}

@media (max-width: 768px) {
  .mobile-quick-nav {
    top: 110px; 
  }
  .qna-card {
    scroll-margin-top: 170px;
  }
  .card-body { padding: 1.5rem; }
  .supplements-grid, .options-grid { grid-template-columns: 1fr; }
  .card-header h2 { font-size: 1.5rem; }
  .narrative-text p { font-size: 1.1rem; }
}
</style>
