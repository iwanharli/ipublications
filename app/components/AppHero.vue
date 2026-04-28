<template>
  <section class="hero" ref="heroSection">
    <div class="container grid-asymmetric">
      <div class="hero-main">
        <div class="reveal-container">
          <h4 class="hero-label">EDITION / 2026</h4>
        </div>
        <div class="reveal-container">
          <h1 class="hero-title">
            The New <br />
            <span class="italic-serif">Standard</span>
          </h1>
        </div>
        <div class="reveal-container">
          <p class="hero-description">
            A refined ecosystem for elite presentations. Every word, 
            every transition, every detail meticulously crafted to 
            command authority and inspire vision.
          </p>
        </div>
        <div class="hero-actions reveal-container">
          <button class="btn btn-primary">Open Journal</button>
          <button class="btn btn-outline">Archive</button>
        </div>
      </div>
      
      <div class="hero-visual">
        <div class="book" ref="bookRef">
          <div class="book-spine"></div>
          <div class="book-content">
            <div class="writing-area">
              <span class="writing-text" ref="typingRef"></span><span class="cursor" ref="cursorRef">|</span>
            </div>
            <div class="book-footer">
              <span class="page-num">XII / MMXXVI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';

const heroSection = ref(null);
const bookRef = ref(null);
const typingRef = ref(null);
const cursorRef = ref(null);

const textToType = "In the pursuit of absolute precision and strategic excellence, we redefine the art of command and control. Our mission is to bridge the gap between complex data and intuitive human insight, creating a seamless ecosystem where every presentation becomes a catalyst for transformation and every strategic decision is backed by the power of digital intelligence. This is the era of refined communication, where elegance meets authority.";

onMounted(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline();
    
    tl.from('.hero-label', { y: 20, opacity: 0, duration: 1, ease: 'power4.out' })
      .from('.hero-title', { y: 100, opacity: 0, duration: 1.5, ease: 'power4.out' }, '-=0.8')
      .from('.hero-description', { y: 20, opacity: 0, duration: 1, ease: 'power4.out' }, '-=1')
      .from('.hero-actions', { y: 20, opacity: 0, duration: 1, ease: 'power4.out' }, '-=0.8')
      .from(bookRef.value, { 
        x: 100, 
        rotateY: -45, 
        opacity: 0, 
        duration: 2, 
        ease: 'power4.out' 
      }, '-=1.2');

    // Typewriter Animation with proxy for smoothness
    const proxy = { charCount: 0 };
    const typeTl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
    
    typingRef.value.textContent = "";
    
    typeTl.to(proxy, {
      charCount: textToType.length,
      duration: 10, // Optimized speed
      ease: "none",
      onUpdate: () => {
        const count = Math.floor(proxy.charCount);
        if (typingRef.value) {
          typingRef.value.textContent = textToType.substring(0, count);
        }
      }
    });

    // Stable blinking cursor
    gsap.to(cursorRef.value, {
      opacity: 0,
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      ease: "steps(1)" // Use steps for a more crisp "typewriter" blink
    });

    // Subtle book float
    gsap.to(bookRef.value, {
      y: -15,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, heroSection.value);
});
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding-top: 0;
  perspective: 1000px;
}

.grid-asymmetric {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 4rem;
}

.hero-label {
  font-size: 0.7rem;
  letter-spacing: 0.4em;
  color: var(--accent);
  margin-bottom: 2rem;
  font-weight: 600;
}

.hero-title {
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 1;
  font-weight: 300;
  margin-bottom: 2rem;
  color: var(--primary);
}

.italic-serif {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 300;
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-muted);
  max-width: 450px;
  margin-bottom: 3rem;
}

.hero-actions {
  display: flex;
  gap: 1.5rem;
}

/* Book Styles */
.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Glow Effects */
.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  z-index: 1;
  pointer-events: none;
}

.glow-1 {
  width: 60vw;
  height: 60vw;
  background: #E0F2FE;
  top: -20vh;
  right: -10vw;
  opacity: 0.5;
}

.glow-2 {
  width: 50vw;
  height: 50vw;
  background: #DBEAFE;
  bottom: -20vh;
  left: -10vw;
  opacity: 0.3;
}

.book {
  width: 380px;
  height: 520px;
  background: #FFFFFF;
  border: 1px solid var(--border);
  position: relative;
  box-shadow: 30px 30px 60px rgba(15, 23, 42, 0.1);
  display: flex;
  transform-style: preserve-3d;
}

.book-spine {
  width: 30px;
  height: 100%;
  background: linear-gradient(to right, var(--primary), #1e3a8a);
  border-right: 1px solid rgba(255,255,255,0.1);
}

.book-content {
  flex-grow: 1;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #FFFFFF;
}

.writing-area {
  position: relative;
}

.writing-text {
  font-family: var(--font-serif);
  font-size: 1.15rem;
  line-height: 1.6;
  color: var(--text);
  font-weight: 300;
  min-height: 200px;
  white-space: pre-wrap;
  font-kerning: none;
}

.cursor {
  color: var(--accent);
  font-weight: 100;
  margin-left: 2px;
}

.book-footer {
  border-top: 1px solid var(--border);
  padding-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
}

.page-num {
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  color: var(--text-muted);
}

@media (max-width: 1024px) {
  .hero {
    padding-top: 100px;
    height: auto;
    min-height: 100vh;
  }
  .grid-asymmetric {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 3rem;
  }
  .hero-title { font-size: 3.5rem; }
  .hero-description { margin: 0 auto 3rem; }
  .hero-actions { justify-content: center; }
  .book { 
    width: 280px; 
    height: 400px; 
    margin: 0 auto;
  }
}

@media (max-width: 480px) {
  .hero-title { font-size: 2.5rem; }
  .book { width: 240px; height: 350px; }
}
</style>
