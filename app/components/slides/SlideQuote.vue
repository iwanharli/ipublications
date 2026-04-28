<template>
  <div class="slide-content slide-quote">
    <div class="quote-watermark">
      <i class="fa-solid fa-quote-left"></i>
    </div>
    <div class="slide-inner text-center">
      <blockquote class="quote-text">
        "Digital transformation is not just about technology, it's about <span class="italic-serif">strategic agility</span> and the courage to lead in a complex world."
      </blockquote>
      <cite class="quote-author">— Strategic Command Council</cite>
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
    gsap.fromTo('.slide-quote .quote-watermark', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 0.03, duration: 2, ease: 'power2.out' });
    gsap.fromTo('.slide-quote .quote-text', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, delay: 0.3 });
    gsap.fromTo('.slide-quote .quote-author', { opacity: 0 }, { opacity: 0.5, duration: 1, delay: 0.8 });
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
  max-width: 900px;
  width: 100%;
  position: relative;
  z-index: 1;
}

.quote-watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 25rem;
  color: rgba(255, 255, 255, 0.03);
  z-index: 0;
  pointer-events: none;
}

.quote-text {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-family: var(--font-serif);
  font-style: italic;
  line-height: 1.3;
  margin-bottom: 3rem;
  border: none;
  padding: 0;
  text-align: center;
  color: white;
}

.italic-serif {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--accent-light);
}

.quote-author {
  font-size: 1rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  text-align: center;
  color: white;
}
</style>
