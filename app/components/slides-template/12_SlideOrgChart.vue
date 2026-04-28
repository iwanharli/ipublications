<template>
  <div class="slide-content slide-org-chart">
    <!-- Optional TOC Sidebar like Scrollable Slide -->
    <div class="toc-sidebar">
      <div 
        v-for="(section, index) in sections" 
        :key="index"
        class="toc-item"
        :class="{ active: currentSection === index }"
        @click="scrollTo(index)"
      >
        <span class="toc-roman">{{ section.roman }}</span>
      </div>
    </div>

    <div class="scroll-wrapper" ref="scrollWrapper" @scroll="handleScroll">
      <div class="slide-inner">
        <span class="slide-number">09 / STRUCTURE</span>
        <h2 class="sub-title">Command & <span class="italic-serif">Control</span> Hierarchy</h2>
        
        <!-- Section I: Strategic Level -->
        <section class="report-section">
          <h3><i class="fa-solid fa-crown me-3 opacity-30"></i> I. High Command</h3>
          <p>Struktur komando tertinggi Polri memastikan sinkronisasi antara kebijakan strategis nasional dan implementasi lapangan di seluruh wilayah Indonesia.</p>
          
          <div class="flow-container reveal-chart">
            <ClientOnly>
              <VueFlow
                v-model="elements"
                :fit-view-on-init="true"
                :default-edge-options="{ type: 'smoothstep', animated: true, style: { stroke: '#FBBF24', strokeWidth: 2 } }"
                class="org-flow"
              >
                <!-- Custom Node Template -->
                <template #node-custom="{ data }">
                  <div class="custom-node glass">
                    <div class="node-header">
                      <div class="node-icon">
                        <i :class="data.icon"></i>
                      </div>
                      <div class="node-badge">{{ data.rank }}</div>
                    </div>
                    <div class="node-body">
                      <div class="node-name">{{ data.label }}</div>
                      <div class="node-role">{{ data.role }}</div>
                    </div>
                    <div class="node-border-glow"></div>
                  </div>
                </template>

                <Background :pattern-color="'rgba(251, 191, 36, 0.05)'" :gap="24" />
              </VueFlow>
            </ClientOnly>
          </div>
        </section>

        <!-- Section II: Operational Details -->
        <section class="report-section">
          <h3><i class="fa-solid fa-gears me-3 opacity-30"></i> II. Operational Support</h3>
          <p>Unit pendukung operasional seperti Korlantas dan Densus 88 AT beroperasi di bawah koordinasi langsung Kapolri untuk memastikan respon cepat terhadap ancaman keamanan spesifik.</p>
          <div class="data-box glass">
            <div class="data-row"><span>Unit Terintegrasi</span><strong>12 Divisi Utama</strong></div>
            <div class="data-row"><span>Respon Time</span><strong>< 15 Menit</strong></div>
          </div>
        </section>

        <!-- Section III: Oversight & Integrity -->
        <section class="report-section">
          <h3><i class="fa-solid fa-shield-check me-3 opacity-30"></i> III. Oversight & Integrity</h3>
          <p>Divisi PROPAM memastikan bahwa seluruh personel mematuhi kode etik dan standar operasional prosedur yang berlaku di lingkungan Polri.</p>
        </section>

        <div class="scroll-hint">
          <i class="fa-solid fa-circle-check text-accent me-2"></i> End of Structural Analysis
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { VueFlow, useVueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import gsap from 'gsap';

// Import CSS for Vue Flow
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';

const props = defineProps({
  active: Boolean
});

const { fitView } = useVueFlow();
const scrollWrapper = ref(null);
const currentSection = ref(0);

const sections = [
  { roman: 'I' },
  { roman: 'II' },
  { roman: 'III' }
];

const elements = ref([
  // Strategic Level
  {
    id: '1',
    type: 'custom',
    label: 'JENDERAL POLISI',
    data: { role: 'KAPOLRI', rank: 'STRATEGIC COMMAND', icon: 'fa-solid fa-star' },
    position: { x: 375, y: 0 },
  },
  {
    id: '2',
    type: 'custom',
    label: 'KOMJEN POLISI',
    data: { role: 'WAKAPOLRI', rank: 'OPERATIONAL COMMAND', icon: 'fa-solid fa-star-half-stroke' },
    position: { x: 375, y: 180 },
  },

  // Tactical & Support Divisions
  {
    id: '3',
    type: 'custom',
    label: 'BARESKRIM',
    data: { role: 'INVESTIGATION', rank: 'DIVISION', icon: 'fa-solid fa-magnifying-glass-chart' },
    position: { x: -150, y: 360 },
  },
  {
    id: '4',
    type: 'custom',
    label: 'BAHARKAM',
    data: { role: 'SECURITY', rank: 'DIVISION', icon: 'fa-solid fa-shield-halved' },
    position: { x: 100, y: 360 },
  },
  {
    id: '5',
    type: 'custom',
    label: 'BAINTELKAM',
    data: { role: 'INTELLIGENCE', rank: 'DIVISION', icon: 'fa-solid fa-eye' },
    position: { x: 350, y: 360 },
  },
  {
    id: '6',
    type: 'custom',
    label: 'KORLANTAS',
    data: { role: 'TRAFFIC CONTROL', rank: 'DIVISION', icon: 'fa-solid fa-car-burst' },
    position: { x: 600, y: 360 },
  },
  {
    id: '7',
    type: 'custom',
    label: 'DENSUS 88 AT',
    data: { role: 'COUNTER TERROR', rank: 'SPECIAL UNIT', icon: 'fa-solid fa-user-ninja' },
    position: { x: 900, y: 360 },
  },
  {
    id: '8',
    type: 'custom',
    label: 'KORBRIMOB',
    data: { role: 'MOBILE BRIGADE', rank: 'ELITE UNIT', icon: 'fa-solid fa-person-military-pointing' },
    position: { x: 100, y: 540 },
  },
  {
    id: '9',
    type: 'custom',
    label: 'PROPAM',
    data: { role: 'INTERNAL AFFAIRS', rank: 'DIVISION', icon: 'fa-solid fa-gavel' },
    position: { x: 600, y: 540 },
  },

  // Edges
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e2-5', source: '2', target: '5' },
  { id: 'e2-6', source: '2', target: '6' },
  { id: 'e2-7', source: '2', target: '7' },
  { id: 'e4-8', source: '4', target: '8' },
  { id: 'e2-9', source: '2', target: '9' },
]);

const handleScroll = () => {
  if (!scrollWrapper.value) return;
  const sectionsEl = scrollWrapper.value.querySelectorAll('.report-section');
  const wrapperTop = scrollWrapper.value.scrollTop;
  const offset = 150;
  
  let activeIndex = 0;
  sectionsEl.forEach((el, i) => {
    if (el.offsetTop - offset <= wrapperTop) {
      activeIndex = i;
    }
  });

  const isAtBottom = Math.abs(scrollWrapper.value.scrollHeight - wrapperTop - scrollWrapper.value.clientHeight) < 5;
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
    scrollWrapper.value.scrollTo({ top: targetTop, behavior: 'smooth' });
  }
};

const handleKeyDown = (e) => {
  if (!props.active || !scrollWrapper.value) return;
  const step = 150;
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
    gsap.fromTo('.slide-org-chart .sub-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.2 });
    gsap.fromTo('.reveal-chart', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, delay: 0.4 });
    gsap.fromTo('.report-section', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, delay: 0.5 });
    
    if (scrollWrapper.value) {
      scrollWrapper.value.scrollTop = 0;
    }

    setTimeout(() => {
      fitView();
    }, 800);
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
  overflow: hidden;
}

.scroll-wrapper {
  height: 100%;
  overflow-y: auto;
  padding: 8rem 10vw;
  scrollbar-width: thin;
  scrollbar-color: var(--accent) transparent;
}

.scroll-wrapper::-webkit-scrollbar { width: 4px; }
.scroll-wrapper::-webkit-scrollbar-track { background: transparent; }
.scroll-wrapper::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 10px; }

.slide-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.slide-number {
  font-size: 0.8rem;
  letter-spacing: 0.4em;
  color: var(--accent);
  margin-bottom: 2rem;
  display: block;
}

.sub-title {
  font-size: 3.5rem;
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 4rem;
  color: white;
}

.italic-serif {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--accent);
}

/* TOC Sidebar */
.toc-sidebar {
  position: absolute;
  top: 50%;
  left: 3rem;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 20;
}

.toc-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  opacity: 0.4;
  transition: all 0.3s ease;
}

.toc-item:hover, .toc-item.active { opacity: 1; border-color: var(--accent); }
.toc-item.active { background: rgba(255, 255, 255, 0.05); box-shadow: 0 0 15px rgba(245, 158, 11, 0.2); }
.toc-roman { font-family: var(--font-serif); font-size: 1rem; color: white; }
.toc-item.active .toc-roman { color: var(--accent); font-weight: 700; }

.report-section {
  margin-bottom: 5rem;
}

.report-section h3 {
  font-size: 1.5rem;
  color: white;
  margin-bottom: 1.5rem;
  font-family: var(--font-heading);
}

.report-section p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2rem;
  max-width: 800px;
}

.flow-container {
  width: 100%;
  height: 600px; /* Fixed height for the chart in scrollable view */
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  position: relative;
}

.org-flow {
  width: 100%;
  height: 100%;
}

/* Custom Node Styles */
.custom-node {
  min-width: 220px;
  padding: 1.25rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(15, 23, 42, 0.8) !important;
  backdrop-filter: blur(12px);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.node-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.node-icon {
  width: 32px;
  height: 32px;
  background: rgba(251, 191, 36, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  font-size: 0.9rem;
}

.node-badge {
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--accent);
  text-transform: uppercase;
}

.node-name {
  color: white;
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  letter-spacing: 0.05em;
}

.node-role {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.node-border-glow {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0.5;
}

.data-box {
  background: rgba(255, 255, 255, 0.03);
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin: 2rem 0;
  max-width: 600px;
}

.data-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.data-row span {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.4);
}

.data-row strong {
  color: var(--accent);
  font-weight: 500;
}

.scroll-hint {
  text-align: center;
  padding: 4rem 0;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.opacity-30 { opacity: 0.3; }
.text-accent { color: var(--accent); }

/* Vue Flow Overrides */
:deep(.vue-flow__edge-path) { stroke-dasharray: 5; animation: dash 20s linear infinite; }
@keyframes dash { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }
:deep(.vue-flow__handle) { background: var(--accent); width: 8px; height: 8px; border: 2px solid #000; }

@media (max-width: 1200px) {
  .toc-sidebar { display: none; }
}
</style>
