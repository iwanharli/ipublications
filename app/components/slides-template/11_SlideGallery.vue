<template>
  <div class="slide-content slide-gallery">
    <div class="slide-inner">
      <span class="slide-number">10 / INTERFACE</span>
      <h2 class="sub-title">Multi-Platform <span class="italic-serif">Ecosystem</span></h2>
      
      <div class="gallery-grid">
        <div class="gallery-item large">
          <img src="/mockup-desktop.png" alt="Desktop Interface" />
          <div class="item-overlay">
            <span><i class="fa-solid fa-display me-2"></i> COMMAND CENTER V3.8</span>
          </div>
        </div>
        <div class="gallery-item small">
          <img src="/mockup-mobile.png" alt="Mobile Interface" />
          <div class="item-overlay">
            <span><i class="fa-solid fa-mobile-screen-button me-2"></i> MOBILE CORE</span>
          </div>
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

watch(() => props.active, (val) => {
  if (val) {
    gsap.fromTo('.slide-gallery .gallery-item.large', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 1, delay: 0.2 });
    gsap.fromTo('.slide-gallery .gallery-item.small', { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 1, delay: 0.4 });
    gsap.fromTo('.slide-gallery .item-overlay', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, delay: 0.8 });
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
}

.slide-inner {
  max-width: 1200px;
  width: 100%;
}

.slide-number {
  font-size: 0.8rem;
  letter-spacing: 0.4em;
  color: var(--accent-light);
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
  color: var(--accent-light);
}

.gallery-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  height: 450px;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #000;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  opacity: 0.8;
}

.gallery-item:hover img {
  transform: scale(1.05);
  opacity: 1;
}

.item-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2rem;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  color: white;
  transform: translateY(10px);
  opacity: 0;
  transition: all 0.4s ease;
}

.gallery-item:hover .item-overlay {
  transform: translateY(0);
  opacity: 1;
}

@media (max-width: 768px) {
  .gallery-grid { grid-template-columns: 1fr; height: auto; }
  .gallery-item { height: 300px; }
}
</style>
