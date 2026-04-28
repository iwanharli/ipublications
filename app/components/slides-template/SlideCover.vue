<template>
  <div class="slide-content slide-cover">
    <div class="slide-inner text-center">
      <div class="intro-icon">
        <i class="fa-solid fa-shield-halved"></i>
      </div>
      <span class="slide-number">INTRO</span>
      <h1 class="slide-title">Strategic <br/><span class="italic-serif text-accent">Transformation</span></h1>
      <p class="slide-tagline">Navigating the Future of Digital Command & Control</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import gsap from 'gsap';

const props = defineProps({
  active: Boolean
});

watch(() => props.active, (val) => {
  if (val) {
    gsap.fromTo('.slide-cover .intro-icon', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.2 });
    gsap.fromTo('.slide-cover .slide-number', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.3 });
    gsap.fromTo('.slide-cover .slide-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, delay: 0.4 });
    gsap.fromTo('.slide-cover .slide-tagline', { y: 20, opacity: 0 }, { y: 0, opacity: 0.6, duration: 1, delay: 0.6 });
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
  text-align: center;
}

.slide-inner {
  max-width: 900px;
  width: 100%;
}

.intro-icon {
  font-size: 2.5rem;
  color: var(--accent-light);
  margin-bottom: 2rem;
  opacity: 0.8;
}

.slide-number {
  font-size: 0.8rem;
  letter-spacing: 0.4em;
  color: var(--accent-light);
  margin-bottom: 2rem;
  display: block;
}

.slide-title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: -0.01em;
}

.italic-serif {
  font-family: var(--font-serif);
  font-style: italic;
}

.text-accent { color: var(--accent-light); }

.slide-tagline {
  font-size: 1rem;
  letter-spacing: 0.3em;
  opacity: 0.6;
  text-transform: uppercase;
}
</style>
