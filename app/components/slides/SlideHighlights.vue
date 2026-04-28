<template>
  <div class="slide-content slide-highlights">
    <div class="slide-inner">
      <span class="slide-number">11 / CORE OBJECTIVES</span>
      <h2 class="sub-title">Key Strategic <span class="italic-serif">Highlights</span></h2>
      
      <div class="highlights-grid">
        <div v-for="(point, i) in points" :key="i" class="highlight-item glass">
          <div class="highlight-icon-box">
            <div class="icon-glow"></div>
            <i :class="point.icon"></i>
          </div>
          <div class="highlight-text">
            <h3>{{ point.title }}</h3>
            <p>{{ point.description }}</p>
          </div>
          <div class="item-connector"></div>
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

const points = [
  { 
    title: 'Strategic Policy Alignment', 
    description: 'Ensuring all regional operations synchronize with the 2026 National Command Directive.', 
    icon: 'fa-solid fa-compass-drafting' 
  },
  { 
    title: 'Cross-Domain Intelligence', 
    description: 'Integration of SIGINT and OSINT data streams into a unified operational picture.', 
    icon: 'fa-solid fa-microchip' 
  },
  { 
    title: 'Rapid Response Scalability', 
    description: 'Increasing deployment speed by 40% through automated resource allocation protocols.', 
    icon: 'fa-solid fa-bolt-lightning' 
  },
  { 
    title: 'Institutional Integrity', 
    description: 'Advanced encryption and blockchain auditing for all classified document access.', 
    icon: 'fa-solid fa-key' 
  }
];

watch(() => props.active, (val) => {
  if (val) {
    gsap.fromTo('.slide-highlights .sub-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.2 });
    gsap.fromTo('.slide-highlights .highlight-item', 
      { x: -30, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.2, delay: 0.4, ease: 'power2.out' }
    );
  }
}, { immediate: true });
</script>

<style scoped>
.slide-content {
  height: 100%;
  width: 100%;
}

.slide-inner {
  height: 100%;
  padding: 6rem 10vw;
  display: flex;
  flex-direction: column;
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

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;
  max-width: 1000px;
}

.highlight-item {
  display: flex;
  gap: 2rem;
  padding: 2.5rem;
  position: relative;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.highlight-item:hover {
  transform: translateY(-10px) scale(1.02);
  border-color: var(--accent);
  background: rgba(251, 191, 36, 0.03);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.highlight-icon-box {
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
}

.highlight-icon-box i {
  font-size: 1.5rem;
  color: var(--accent);
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.highlight-item:hover .highlight-icon-box i {
  transform: scale(1.2);
  text-shadow: 0 0 15px var(--accent-glow);
}

.icon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: var(--accent);
  filter: blur(20px);
  opacity: 0.1;
  border-radius: 50%;
}

.highlight-text h3 {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.75rem;
  letter-spacing: 0.05em;
}

.highlight-text p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.5);
}

.item-connector {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 0;
  background: var(--accent);
  transition: height 0.4s ease;
}

.highlight-item:hover .item-connector {
  height: 100%;
}

@media (max-width: 1024px) {
  .highlights-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
