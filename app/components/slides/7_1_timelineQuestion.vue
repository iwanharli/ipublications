<template>
  <div class="slide-content slide-timeline-question">
    <!-- Ambient effects -->
    <div class="ambient-orb orb-1"></div>
    <div class="ambient-orb orb-2"></div>
    <div class="grid-overlay"></div>

    <div class="slide-inner">
      <div class="header-section">
        <div class="header-badge">
          <span class="badge-pulse"></span>
          <span class="badge-label">KUIS INTERAKTIF</span>
        </div>
        <h1 class="slide-title">
          Jika ini terjadi, apa perintah <br/>pertama Anda?
        </h1>
        <div class="attempts-indicator" :class="{ 'low': attemptsLeft === 1, 'zero': attemptsLeft === 0 }">
          <span class="attempts-label">KESEMPATAN:</span>
          <div class="attempts-dots">
            <span v-for="i in 2" :key="i" class="dot" :class="{ 'active': i <= attemptsLeft }"></span>
          </div>
        </div>
      </div>

      <div class="quiz-container">
        <!-- Option A -->
        <div class="quiz-option" 
             @click="selectOption('A')" 
             :class="{ 
               'selected-wrong': wrongAttempts.includes('A'),
               'dimmed': (isFinished && selectedOption !== 'A') || (!isFinished && wrongAttempts.includes('A'))
             }">
          <div class="option-letter">A</div>
          <div class="option-text">Matikan semua komputer.</div>
          <div class="option-icon" v-if="wrongAttempts.includes('A')"><i class="fa-solid fa-xmark"></i></div>
        </div>

        <!-- Option B -->
        <div class="quiz-option" 
             @click="selectOption('B')" 
             :class="{ 
               'selected-wrong': wrongAttempts.includes('B'),
               'dimmed': (isFinished && selectedOption !== 'B') || (!isFinished && wrongAttempts.includes('B'))
             }">
          <div class="option-letter">B</div>
          <div class="option-text">Hubungi tim IT saja.</div>
          <div class="option-icon" v-if="wrongAttempts.includes('B')"><i class="fa-solid fa-xmark"></i></div>
        </div>

        <!-- Option C (Correct) -->
        <div class="quiz-option" 
             @click="selectOption('C')" 
             :class="{ 
               'selected-correct': selectedOption === 'C',
               'dimmed': isFinished && selectedOption !== 'C',
               'force-correct': isFinished && selectedOption !== 'C'
             }">
          <div class="option-letter">C</div>
          <div class="option-text">Aktifkan tim respons insiden dan amankan bukti.</div>
          <div class="option-icon" v-if="selectedOption === 'C'"><i class="fa-solid fa-check"></i></div>
          <div class="option-icon" v-if="isFinished && selectedOption !== 'C'"><i class="fa-solid fa-check"></i></div>
        </div>

        <!-- Option D -->
        <div class="quiz-option" 
             @click="selectOption('D')" 
             :class="{ 
               'selected-wrong': wrongAttempts.includes('D'),
               'dimmed': (isFinished && selectedOption !== 'D') || (!isFinished && wrongAttempts.includes('D'))
             }">
          <div class="option-letter">D</div>
          <div class="option-text">Umumkan kepada publik bahwa semua aman.</div>
          <div class="option-icon" v-if="wrongAttempts.includes('D')"><i class="fa-solid fa-xmark"></i></div>
        </div>
      </div>
      
      <!-- Explanation Box -->
      <div class="conclusion-box" :class="{ 'visible': isFinished }">
        <div class="conclusion-icon">
          <i class="fa-solid fa-circle-info"></i>
        </div>
        <div class="conclusion-content">
          <p class="highlight-correct">Pilihan paling tepat adalah <strong>C</strong>.</p>
          <ul class="explanation-list">
            <li><strong>A Salah:</strong> Mematikan komputer dengan gegabah bisa menghilangkan bukti log penting di RAM.</li>
            <li><strong>B Salah:</strong> Dampaknya tidak hanya teknis. Ada aspek hukum, layanan, dan reputasi.</li>
            <li><strong>D Salah:</strong> Tanpa verifikasi, pernyataan aman bisa menjadi bumerang bagi institusi.</li>
          </ul>
          <p class="takeaway">Dalam insiden siber, pimpinan harus memastikan: <strong>dampak dibatasi, bukti diamankan, layanan dipulihkan, dan komunikasi dikendalikan.</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import gsap from 'gsap';

const props = defineProps({
  active: Boolean
});

const selectedOption = ref(null);
const attemptsLeft = ref(2);
const wrongAttempts = ref([]);
const isFinished = ref(false);

const selectOption = (opt) => {
  if (isFinished.value || attemptsLeft.value === 0) return;
  if (wrongAttempts.value.includes(opt)) return;

  if (opt === 'C') {
    selectedOption.value = 'C';
    isFinished.value = true;
  } else {
    wrongAttempts.value.push(opt);
    attemptsLeft.value--;
    selectedOption.value = opt;
    
    if (attemptsLeft.value === 0) {
      isFinished.value = true;
    }
  }
};

watch(() => props.active, (val) => {
  if (val) {
    selectedOption.value = null;
    attemptsLeft.value = 2;
    wrongAttempts.value = [];
    isFinished.value = false;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.slide-timeline-question .header-badge', { y: -15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
    tl.fromTo('.slide-timeline-question .slide-title', { y: 30, opacity: 0, clipPath: 'inset(100% 0 0 0)' }, { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 0.8 }, '-=0.2');
    
    tl.fromTo('.quiz-option', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, '-=0.3');

    // Ambient
    gsap.to('.orb-1', { x: 25, y: -15, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.orb-2', { x: -20, y: 12, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }
}, { immediate: true });
</script>

<style scoped>
.slide-content {
  height: 100%;
  width: 100%;
  position: relative;
  overflow-y: auto; /* Enable vertical scrolling */
  overflow-x: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  scrollbar-width: none; /* Hide scrollbar for Chrome/Safari */
  -ms-overflow-style: none; /* Hide scrollbar for IE/Edge */
}

.slide-content::-webkit-scrollbar {
  display: none; /* Hide scrollbar for Chrome/Safari */
}

/* ─── Ambient ─── */
.ambient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(130px);
  pointer-events: none;
  z-index: 0;
}

.orb-1 {
  width: 450px;
  height: 450px;
  background: rgba(16, 185, 129, 0.05); /* Green glow */
  top: -5%;
  left: -3%;
}

.orb-2 {
  width: 380px;
  height: 380px;
  background: rgba(59, 130, 246, 0.05); /* Blue glow */
  bottom: -5%;
  right: -2%;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.012) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.012) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  z-index: 0;
}

.slide-inner {
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 1;
  text-align: center;
  padding-top: 8rem;
  padding-bottom: 12rem; /* Significant space from bottom footer */
}

/* ─── Header ─── */
.header-section {
  text-align: center;
  margin-bottom: 3rem;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.35rem 1.2rem;
  border-radius: 100px;
  border: 1px solid rgba(16, 185, 129, 0.3);
  background: rgba(16, 185, 129, 0.05);
  margin-bottom: 1rem;
}

.badge-pulse {
  width: 6px;
  height: 6px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse-green 2s infinite;
}

@keyframes pulse-green {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5); }
  50% { opacity: 0.7; box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
}

.badge-label {
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.3em;
  color: #10b981;
  opacity: 0.9;
}

.slide-title {
  font-size: clamp(2rem, 3.5vw, 2.8rem);
  font-weight: 800;
  letter-spacing: 0.02em;
  color: var(--text);
  line-height: 1.3;
  margin-bottom: 1.5rem;
}

/* ─── Attempts Indicator ─── */
.attempts-indicator {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  background: rgba(15, 23, 42, 0.4);
  padding: 0.6rem 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.attempts-label {
  font-size: 0.7rem;
  font-weight: 800;
  color: #64748b;
  letter-spacing: 0.1em;
}

.attempts-dots {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.dot.active {
  background: #10b981;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
  transform: scale(1.2);
}

.attempts-indicator.low .dot.active {
  background: #f59e0b;
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
}

.attempts-indicator.zero .dot.active {
  background: #ef4444;
}

/* ─── Quiz Grid ─── */
.quiz-container {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 2 Kolom */
  gap: 1.2rem;
  margin-bottom: 3rem;
  max-width: 1100px; /* Diperlebar agar memanjang */
  margin-left: auto;
  margin-right: auto;
}

.quiz-option {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.2rem 1.8rem; /* Padding lebih kecil agar memanjang horizontal */
  display: flex;
  align-items: center;
  gap: 1.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.quiz-option:hover {
  background: rgba(30, 41, 59, 0.9);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-4px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
}

.option-letter {
  font-size: 1.5rem;
  font-weight: 800;
  color: #64748b;
  width: 40px;
  text-align: center;
  transition: color 0.3s ease;
}

.quiz-option:hover .option-letter {
  color: white;
}

.option-text {
  font-size: 1.15rem;
  color: #e2e8f0;
  line-height: 1.4;
  flex: 1;
  font-weight: 500;
}

.option-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: white;
}

/* Selected States */
.quiz-option.dimmed {
  opacity: 0.4;
  pointer-events: none;
  transform: none;
  box-shadow: none;
}

.quiz-option.selected-wrong {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.5);
  box-shadow: 0 0 30px rgba(239, 68, 68, 0.2);
  opacity: 1;
}

.quiz-option.selected-wrong .option-letter {
  color: #ef4444;
}

.quiz-option.selected-wrong .option-icon {
  background: #ef4444;
  box-shadow: 0 0 15px #ef4444;
}

.quiz-option.selected-correct, .quiz-option.force-correct {
  background: rgba(16, 185, 129, 0.15);
  border-color: rgba(16, 185, 129, 0.6);
  box-shadow: 0 0 40px rgba(16, 185, 129, 0.25);
  opacity: 1;
  transform: scale(1.02);
}

.quiz-option.selected-correct .option-letter, .quiz-option.force-correct .option-letter {
  color: #10b981;
}

.quiz-option.selected-correct .option-icon, .quiz-option.force-correct .option-icon {
  background: #10b981;
  box-shadow: 0 0 15px #10b981;
}

/* ─── Conclusion Box ─── */
.conclusion-box {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  max-width: 900px;
  margin: 0 auto;
  background: linear-gradient(145deg, rgba(15, 23, 42, 0.9), rgba(2, 6, 23, 0.95));
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem 2.5rem;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  pointer-events: none;
}

.conclusion-box.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.conclusion-icon {
  font-size: 2.5rem;
  color: #60a5fa;
  margin-top: 0.5rem;
}

.conclusion-content {
  text-align: left;
  flex: 1;
}

.highlight-correct {
  color: #10b981;
  font-size: 1.3rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  letter-spacing: 0.02em;
}

.explanation-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 Kolom: A B D */
  gap: 1rem;
}

.explanation-list li {
  font-size: 0.9rem;
  color: #cbd5e1;
  line-height: 1.4;
  background: rgba(15, 23, 42, 0.5);
  padding: 1.2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.explanation-list li:hover {
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(255, 255, 255, 0.1);
}

.explanation-list li strong {
  color: #f87171;
  margin-right: 1rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.takeaway {
  font-size: 1.1rem;
  color: white;
  margin: 0;
  line-height: 1.6;
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 1.5rem;
}

.takeaway strong {
  color: #60a5fa;
}

@media (max-width: 768px) {
  .quiz-container { grid-template-columns: 1fr; }
  .conclusion-box { flex-direction: column; align-items: center; text-align: center; }
  .conclusion-content { text-align: center; }
}
</style>
