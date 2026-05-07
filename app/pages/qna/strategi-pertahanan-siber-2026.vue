<template>
  <div class="qna-dashboard">
    <!-- Header -->
    <header class="dashboard-header">
      <div class="container">
        <div class="header-content">
          <div class="brand">
            <span class="badge">TACTICAL GUIDE</span>
            <h1>Q&A Dashboard</h1>
            <p class="subtitle">Strategi Pertahanan Siber Polri 2026</p>
          </div>
          <div class="actions">
            <NuxtLink to="/raw" class="btn-back">
              Raw
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
            v-for="slide in interactiveSlides" 
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
              v-for="slide in interactiveSlides" 
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
          v-for="slide in interactiveSlides" 
          :key="slide.id" 
          :id="slide.id" 
          class="qna-card"
        >
          <div class="card-header">
            <div class="slide-meta">
              <span class="indicator">{{ slide.indicator }}</span>
              <h2 v-html="slide.title"></h2>
              
              <!-- Keypoints -->
              <div v-if="slide.keypoints" class="keypoints-box">
                <div class="keypoints-label"><i class="fa-solid fa-bolt"></i> QUICK RECAP:</div>
                <ul class="keypoints-list">
                  <li v-for="(point, pIdx) in slide.keypoints" :key="pIdx">{{ point }}</li>
                </ul>
              </div>
            </div>
            <div class="type-tag" :class="slide.interactive.type">
              {{ slide.interactive.type.toUpperCase() }}
            </div>
          </div>

          <div class="card-body">
            <!-- Question Section -->
            <div class="question-section">
              <div class="section-icon">
                <i class="fa-solid fa-comments"></i>
              </div>
              <div class="section-content">
                <h3 class="label">PERTANYAAN / SCENARIO</h3>
                
                <!-- If Quiz -->
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

                <!-- If Standard Questions -->
                <div v-else class="questions-list">
                  <div v-for="(q, qIdx) in slide.interactive.questions" :key="qIdx" class="question-item">
                    <p v-html="q"></p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Guidance Section -->
            <div v-if="slide.interactive.guidance" class="guidance-section">
              <div class="section-icon">
                <i class="fa-solid fa-shield-halved"></i>
              </div>
              <div class="section-content">
                <h3 class="label">{{ slide.interactive.guidance.label }}</h3>
                <div class="guidance-text">
                  <p v-for="(txt, tIdx) in slide.interactive.guidance.text" :key="tIdx" v-html="txt"></p>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer/Note -->
          <div v-if="slide.analogy" class="card-footer">
            <div class="analogy-mini">
              <i class="fa-solid fa-lightbulb"></i>
              <span><strong>Analogi:</strong> {{ slide.analogy.text }}</span>
            </div>
          </div>
        </section>

        <!-- Empty State if none -->
        <div v-if="interactiveSlides.length === 0" class="empty-state">
          No interactive content found.
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { presentationContent } from '~/data/presentation-content';

const interactiveSlides = computed(() => {
  return presentationContent.filter(s => s.interactive);
});

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
    rootMargin: '-25% 0px -65% 0px',
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
  title: 'Q&A Dashboard - Strategi Pertahanan Siber 2026',
  link: [
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' }
  ]
});
</script>

<style scoped>
.qna-dashboard {
  background-color: #0a0c10;
  color: #e2e8f0;
  min-height: 100vh;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  padding-bottom: 5rem;
}

.container {
  max-width: 1200px;
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



.btn-back {
  background: #1e293b;
  color: #f8fafc;
}

.btn-back:hover {
  background: #334155;
}

/* Layout */
.main-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2.5rem;
  margin-top: 3rem;
}

/* Sidebar */
.dashboard-sidebar {
  position: relative;
}

.sticky-nav {
  position: sticky;
  top: 160px;
}

.nav-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: #475569;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
}

.nav-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 8px;
  color: #94a3b8;
  text-decoration: none;
  transition: all 0.2s;
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
  font-size: 0.8rem;
  font-weight: 700;
  color: #f59e0b;
  min-width: 20px;
}

.slide-name {
  font-size: 0.85rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Q&A Cards */
.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.qna-card {
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
  scroll-margin-top: 180px;
}

.card-header {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.indicator {
  font-size: 0.7rem;
  font-weight: 700;
  color: #f59e0b;
  margin-bottom: 0.5rem;
  display: block;
}

.card-header h2 {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.4;
  margin: 0;
}

/* Keypoints Styles */
.keypoints-box {
  margin-top: 1.25rem;
  padding: 0.85rem;
  background: rgba(59, 130, 246, 0.05);
  border-radius: 10px;
  border-left: 3px solid #3b82f6;
}

.keypoints-label {
  font-size: 0.6rem;
  font-weight: 800;
  color: #3b82f6;
  letter-spacing: 0.1em;
  margin-bottom: 0.4rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.keypoints-list {
  margin: 0;
  padding-left: 1.15rem;
  list-style-type: disc;
}

.keypoints-list li {
  font-size: 0.85rem;
  color: #cbd5e1;
  line-height: 1.4;
  margin-bottom: 0.2rem;
}

.keypoints-list li:last-child {
  margin-bottom: 0;
}

:deep(.highlight) {
  color: #3b82f6;
}

.type-tag {
  font-size: 0.65rem;
  font-weight: 800;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  letter-spacing: 0.05em;
}

.type-tag.standard { background: rgba(59, 130, 246, 0.1); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.2); }
.type-tag.alternate { background: rgba(16, 185, 129, 0.1); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.2); }
.type-tag.quiz { background: rgba(139, 92, 246, 0.1); color: #a78bfa; border: 1px solid rgba(139, 92, 246, 0.2); }

.card-body {
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

/* Sections */
.question-section, .guidance-section {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 1.5rem;
}

.section-icon {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.question-section .section-icon { color: #3b82f6; }
.guidance-section .section-icon { color: #10b981; }

.guidance-section {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 1.5rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}
.label {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: #64748b;
  margin-bottom: 1rem;
}

.question-item p, .quiz-question {
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.5;
  color: #f1f5f9;
  margin-bottom: 1rem;
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

.guidance-text p {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #cbd5e1;
  margin-bottom: 1.5rem;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  border-left: 3px solid rgba(16, 185, 129, 0.3);
}

.guidance-text p:last-child { margin-bottom: 0; }

.guidance-text :deep(strong) {
  color: #10b981;
}

/* Quiz Styles */
.options-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1.5rem;
}

.option-item {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
}

.option-item.is-correct {
  background: rgba(16, 185, 129, 0.05);
  border-color: rgba(16, 185, 129, 0.3);
}

.opt-label {
  font-weight: 800;
  color: #64748b;
}

.is-correct .opt-label { color: #10b981; }

.opt-text {
  font-size: 0.9rem;
  color: #94a3b8;
}

.is-correct .opt-text { color: #f8fafc; }

.correct-icon {
  position: absolute;
  right: 1rem;
  color: #10b981;
}

/* Card Footer */
.card-footer {
  padding: 1.5rem 2rem;
  background: rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.analogy-mini {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85rem;
  color: #94a3b8;
}

.analogy-mini i {
  color: #f59e0b;
}

/* Print Styles */
@media print {
  .qna-dashboard { background: white !important; color: black !important; padding: 0 !important; }
  .dashboard-header, .dashboard-sidebar, .btn-print, .btn-back { display: none !important; }
  .main-layout { display: block !important; margin: 0 !important; }
  .qna-card { 
    break-inside: avoid; 
    border: 1px solid #ddd !important; 
    background: white !important; 
    margin-bottom: 2rem !important; 
    box-shadow: none !important;
  }
  .card-header { background: #f8f9fa !important; border-bottom: 1px solid #ddd !important; }
  .card-header h2 { color: black !important; }
  .brand h1 { -webkit-text-fill-color: black !important; }
  .question-item p, .quiz-question, .opt-text, .guidance-text p { color: black !important; }
  .option-item { border: 1px solid #eee !important; background: white !important; }
  .is-correct { background: #f0fff4 !important; border-color: #38a169 !important; }
  .indicator { color: #856404 !important; }
  .type-tag { border: 1px solid #ddd !important; color: black !important; background: #eee !important; }
}

/* Responsive */
/* Mobile Quick Nav */
.mobile-quick-nav {
  display: none;
  background: #0f172a !important; 
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 110px; 
  z-index: 999;
  padding: 0.75rem 0;
  width: 100%;
}

.quick-nav-items {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding: 0 1.5rem 0.25rem 1.5rem;
  scrollbar-width: none; /* Hide scrollbar Firefox */
}

.quick-nav-items::-webkit-scrollbar { display: none; } /* Hide scrollbar Chrome/Safari */

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

@media (max-width: 992px) {
  .dashboard-header {
    background: #0f172a !important;
    padding: 1rem 0;
  }
  .main-layout {
    grid-template-columns: 1fr;
    padding-top: 1rem;
  }
  .dashboard-sidebar {
    display: none;
  }
  .mobile-quick-nav {
    display: block;
    top: 100px;
  }
  .qna-card {
    scroll-margin-top: 180px;
  }
}

@media (max-width: 640px) {
  .mobile-quick-nav {
    top: 110px;
  }
  .qna-card {
    scroll-margin-top: 170px;
  }
  .main-layout {
    padding-top: 1rem;
  }
  .options-grid {
    grid-template-columns: 1fr;
  }
}
</style>
