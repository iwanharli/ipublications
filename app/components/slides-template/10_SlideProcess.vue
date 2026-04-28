<template>
  <div class="slide-content slide-process">
    <div class="slide-inner">
      <div class="header-section">
        <span class="slide-number">10 / WORKFLOW</span>
        <h2 class="sub-title">System <span class="italic-serif">Lifecycle</span> Architecture</h2>
      </div>
      
      <div class="process-container">
        <!-- Connecting Line Background -->
        <div class="process-line">
          <div class="line-progress"></div>
        </div>

        <div class="process-steps">
          <div v-for="(step, index) in steps" :key="index" class="step-wrapper">
            <div class="step-node glass">
              <div class="node-glow" :style="{ background: step.color }"></div>
              <div class="node-icon">
                <i :class="step.icon"></i>
              </div>
              <div class="step-index">{{ index + 1 }}</div>
            </div>
            
            <div class="step-content">
              <h4>{{ step.title }}</h4>
              <p>{{ step.desc }}</p>
              <div class="step-meta">
                <span class="meta-tag">{{ step.status }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Details Footer -->
      <div class="process-footer reveal-footer">
        <div class="footer-stat">
          <span class="label">Average Cycle</span>
          <span class="value">14.2s</span>
        </div>
        <div class="footer-stat">
          <span class="label">Efficiency Rate</span>
          <span class="value">98.4%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue';
import gsap from 'gsap';

const props = defineProps({
  active: Boolean
});

const steps = [
  { 
    title: 'Data Ingestion', 
    icon: 'fa-solid fa-cloud-arrow-down', 
    desc: 'Automated raw data collection from cross-platform nodes.',
    color: 'rgba(251, 191, 36, 0.4)',
    status: 'REAL-TIME'
  },
  { 
    title: 'Neural Analysis', 
    icon: 'fa-solid fa-microchip', 
    desc: 'Deep learning pattern recognition for anomaly detection.',
    color: 'rgba(56, 189, 248, 0.4)',
    status: 'AI-DRIVEN'
  },
  { 
    title: 'Expert Verification', 
    icon: 'fa-solid fa-user-shield', 
    desc: 'Human-in-the-loop validation of strategic alerts.',
    color: 'rgba(168, 85, 247, 0.4)',
    status: 'SECURE'
  },
  { 
    title: 'Tactical Deployment', 
    icon: 'fa-solid fa-paper-plane', 
    desc: 'Precision response delivery across the operation chain.',
    color: 'rgba(16, 185, 129, 0.4)',
    status: 'ACTIONABLE'
  }
];

watch(() => props.active, (val) => {
  if (val) {
    gsap.fromTo('.slide-process .sub-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.2 });
    
    // Animate the line
    gsap.fromTo('.line-progress', { width: '0%' }, { width: '100%', duration: 2, delay: 0.5, ease: 'power2.inOut' });
    
    // Animate steps
    gsap.fromTo('.step-wrapper', { 
      y: 40, 
      opacity: 0 
    }, { 
      y: 0, 
      opacity: 1, 
      duration: 0.8, 
      stagger: 0.3, 
      delay: 0.8, 
      ease: 'back.out(1.4)' 
    });

    gsap.fromTo('.reveal-footer', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 1.8 });
  }
}, { immediate: true });
</script>

<style scoped>
.slide-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10vw;
  background: radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.03) 0%, transparent 70%);
}

.slide-inner {
  max-width: 1200px;
  width: 100%;
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
  margin-bottom: 5rem;
  color: white;
}

.italic-serif {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--accent);
}

.process-container {
  position: relative;
  padding: 4rem 0;
}

.process-line {
  position: absolute;
  top: 4rem; /* Match node center */
  left: 0;
  right: 0;
  height: 2px;
  background: rgba(255, 255, 255, 0.05);
  z-index: 1;
}

.line-progress {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), #fde68a);
  box-shadow: 0 0 15px var(--accent);
  width: 0;
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  position: relative;
  z-index: 2;
}

.step-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.step-node {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(15, 23, 42, 0.8) !important;
  transition: all 0.4s ease;
}

.step-wrapper:hover .step-node {
  transform: scale(1.1) translateY(-5px);
  border-color: var(--accent);
}

.node-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  border-radius: 50%;
  filter: blur(20px);
  opacity: 0.15;
  transition: opacity 0.4s ease;
}

.step-wrapper:hover .node-glow {
  opacity: 0.4;
}

.node-icon {
  font-size: 1.5rem;
  color: white;
  z-index: 2;
  transition: color 0.4s ease;
}

.step-wrapper:hover .node-icon {
  color: var(--accent);
}

.step-index {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 24px;
  height: 24px;
  background: var(--accent);
  color: #000;
  border-radius: 50%;
  font-size: 0.7rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #020617;
}

.step-content h4 {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
}

.step-content p {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  padding: 0 1rem;
}

.meta-tag {
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  font-weight: 800;
  color: var(--accent);
  padding: 0.3rem 0.8rem;
  background: rgba(251, 191, 36, 0.05);
  border: 1px solid rgba(251, 191, 36, 0.1);
  border-radius: 4px;
}

.process-footer {
  margin-top: 5rem;
  padding-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  gap: 4rem;
  justify-content: center;
}

.footer-stat {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-stat .label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.4);
}

.footer-stat .value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent);
}

@media (max-width: 1024px) {
  .process-steps { grid-template-columns: repeat(2, 1fr); gap: 4rem; }
  .process-line { display: none; }
  .sub-title { font-size: 2.5rem; }
}
</style>
