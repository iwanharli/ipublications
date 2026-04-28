<template>
  <div class="slide-content slide-hook">
    <div class="slide-inner text-center">
      <div class="hook-context reveal-item">
        <p class="hook-context-text">Serangan Siber Global</p>
      </div>
      <div class="hook-number-container">
        <span class="hook-val">{{ formattedValue }}</span>
      </div>
      <div class="hook-unit-container">
        <!-- <p class="hook-unit">Per Menit</p> -->
      </div>
      <div class="hook-text reveal-item">
        <p class="hook-tagline">Dalam hitungan menit, risiko bisa berubah menjadi krisis.<br/>Pertanyaannya: <span class="text-accent">apakah kita siap?</span></p>
        <div class="hook-divider"></div>
        <p class="hook-source">— BSSN 2025</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import gsap from 'gsap';

const props = defineProps({
  active: Boolean
});

const displayValue = ref(0);
const targetValue = 10464;

const formattedValue = computed(() => {
  return Math.floor(displayValue.value).toLocaleString('id-ID');
});

watch(() => props.active, (val) => {
  if (val) {
    // Reset values
    displayValue.value = 0;
    
    // Reveal context label first
    gsap.fromTo('.hook-context', { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' });

    // Animate the number slowly
    gsap.to(displayValue, {
      duration: 5, // Slow counting
      value: targetValue,
      ease: 'power2.out'
    });

    // Reveal text elements
    gsap.fromTo('.hook-val', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' });
    gsap.fromTo('.hook-unit', { y: 20, opacity: 0 }, { y: 0, opacity: 0.8, duration: 1, delay: 5.2 });
    gsap.fromTo('.hook-text', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 6.2 });
  }
}, { immediate: true });
</script>

<style scoped>
.slide-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000 !important; /* Pure black background as requested */
  padding: 0 10vw;
}

.slide-inner {
  max-width: 1000px;
  width: 100%;
}

.hook-number-container {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-bottom: 2rem;
}

.hook-val {
  font-size: clamp(6rem, 20vw, 22rem);
  font-weight: 200;
  color: var(--accent);
  line-height: 1;
  letter-spacing: -0.05em;
  font-family: var(--font-sans);
}

.hook-suffix {
  font-size: clamp(2rem, 8vw, 6rem);
  font-weight: 300;
  color: var(--accent);
  opacity: 0.5;
  margin-left: 0.5rem;
}

.hook-context {
  margin-bottom: 1rem;
}

.hook-context-text {
  font-size: 0.85rem;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: var(--accent);
  opacity: 0.5;
  font-weight: 600;
}

.hook-text {
  margin-top: 2rem;
}

.hook-tagline {
  font-size: 1.4rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: white;
  opacity: 0.8;
  margin-bottom: 1.5rem;
  line-height: 1.8;
}

.text-accent { color: var(--accent); }

.hook-divider {
  width: 80px;
  height: 2px;
  background: var(--accent);
  margin: 0 auto 1.5rem;
}

.hook-source {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.25);
  font-style: italic;
}

.hook-sub {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.1em;
}
.hook-unit-container {
  margin-top: -1rem;
  margin-bottom: 3rem;
}

.hook-unit {
  font-size: 2rem;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: var(--accent-light);
  opacity: 0.8;
  font-weight: 300;
}
</style>
