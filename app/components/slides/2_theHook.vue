<template>
  <div class="slide-content slide-hook">
    <!-- Ambient background glow -->
    <div class="hook-glow"></div>
    <div class="scanline"></div>

    <div class="slide-inner text-center">
      <div class="hook-context reveal-item">
        <div class="pulse-dot"></div>
        <p class="hook-context-text">DATA TELEMETRI: SERANGAN SIBER - INDONESIA</p>
      </div>
      
      <div class="hook-number-container">
        <span class="hook-val">{{ formattedValue }}</span>
      </div>
      
      <div class="hook-text reveal-item">
        <p class="hook-tagline">Dalam hitungan menit, risiko bisa berubah menjadi krisis.<br/>Pertanyaannya: <span class="text-accent">apakah kita siap?</span></p>
        <div class="hook-divider"></div>
        <p class="hook-source">— Laporan BSSN 2025</p>
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
    displayValue.value = 0;
    
    // Reveal context
    gsap.fromTo('.hook-context', 
      { y: -20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    // Number counting
    gsap.to(displayValue, {
      duration: 4.5, 
      value: targetValue,
      ease: 'power2.out'
    });

    // Reveal number
    gsap.fromTo('.hook-val', 
      { scale: 0.8, opacity: 0, filter: 'blur(10px)' }, 
      { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 2, ease: 'power3.out' }
    );

    // Reveal text
    gsap.fromTo('.hook-text', 
      { y: 40, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.5, delay: 4.5, ease: 'power3.out' }
    );
  }
}, { immediate: true });
</script>

<style scoped>
.slide-content {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #020617 !important; /* Pitch black slate */
  padding: 0 10vw;
  position: relative;
  overflow: hidden;
}

.hook-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60vw;
  height: 60vh;
  background: radial-gradient(circle at center, rgba(239, 68, 68, 0.15) 0%, transparent 70%);
  filter: blur(60px);
  z-index: 0;
  pointer-events: none;
}

.scanline {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(255, 255, 255, 0.015) 2px,
    rgba(255, 255, 255, 0.015) 4px
  );
  z-index: 1;
  pointer-events: none;
}

.slide-inner {
  max-width: 1200px;
  width: 100%;
  position: relative;
  z-index: 2;
}

/* ─── Context Badge ─── */
.hook-context {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 2rem;
  padding: 0.5rem 1.5rem;
  border-radius: 100px;
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
  box-shadow: 0 0 10px #ef4444;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
}

.hook-context-text {
  font-family: var(--font-mono, monospace);
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: #ef4444;
  font-weight: 800;
  margin: 0;
}

/* ─── The Massive Number ─── */
.hook-number-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
}

.hook-val {
  font-size: clamp(8rem, 25vw, 24rem);
  font-weight: 900;
  font-family: var(--font-sans);
  font-variant-numeric: tabular-nums; /* Prevents layout shifting during counting */
  color: white;
  line-height: 1;
  letter-spacing: -0.04em;
  background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 60%, rgba(255,255,255,0.2) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 20px 60px rgba(239, 68, 68, 0.3);
}

/* ─── Tagline & Source ─── */
.hook-text {
  margin-top: 2rem;
}

.hook-tagline {
  font-size: 1.6rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.text-accent { 
  color: #ef4444; 
  font-weight: 600;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.1em;
}

.hook-divider {
  width: 60px;
  height: 2px;
  background: rgba(239, 68, 68, 0.5);
  margin: 0 auto 1.5rem;
}

.hook-source {
  font-family: var(--font-mono, monospace);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
}
</style>
