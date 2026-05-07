<template>
  <div class="qna-dashboard">
    <!-- Header -->
    <header class="dashboard-header">
      <div class="container">
        <div class="header-content">
          <div class="brand">
            <span class="badge">TACTICAL SCRIPT</span>
            <h1>Raw Script Dashboard</h1>
            <p class="subtitle">Strategi Pertahanan Siber Polri 2026</p>
          </div>
          <div class="actions">
            <!-- Voice Selector -->
            <div class="voice-selector" v-if="availableVoices.length > 0">
              <i class="fa-solid fa-volume-high"></i>
              <select v-model="selectedVoiceName" class="select-voice">
                <option v-for="voice in availableVoices" :key="voice.name" :value="voice.name">
                  {{ voice.name }}
                </option>
              </select>
            </div>

            <button 
              class="btn-play-all" 
              :class="{ 'is-active': ttsPlayingAll }"
              @click="ttsPlayingAll ? stopTTS() : playAll()"
            >
              <i :class="ttsPlayingAll ? 'fa-solid fa-stop' : 'fa-solid fa-headphones'"></i>
              {{ ttsPlayingAll ? `STOP (${ttsCurrentIdx + 1}/${presentationContent.length})` : 'PLAY ALL' }}
            </button>
            <!-- <NuxtLink to="/qna/strategi-pertahanan-siber-2026" class="btn-back">
              Q&A
            </NuxtLink> -->
          </div>
        </div>
      </div>
    </header>

    <div class="container main-layout">

      <!-- Content -->
      <main class="dashboard-content">
        <section 
          v-for="slide in presentationContent" 
          :key="slide.id" 
          :id="slide.id" 
          class="qna-card"
          :class="{ 'is-closing': slide.id === 'closing-note' }"
        >
          <!-- Card Header -->
          <div class="card-header">
            <div class="slide-meta">
              <span class="indicator">{{ slide.indicator }}</span>
              <h2 v-html="slide.title"></h2>
              <p v-if="slide.subtitle" class="card-subtitle">{{ slide.subtitle }}</p>
              
              <!-- Keypoints -->
              <div v-if="slide.keypoints" class="keypoints-box">
                <div class="keypoints-label"><i class="fa-solid fa-bolt"></i> QUICK RECAP:</div>
                <ul class="keypoints-list">
                  <li v-for="(point, pIdx) in slide.keypoints" :key="pIdx">{{ point }}</li>
                </ul>
              </div>
            </div>
            <div v-if="slide.interactive" class="type-tag" :class="slide.interactive.type">
              {{ slide.interactive.type.toUpperCase() }}
            </div>
          </div>

          <div class="card-body">
            <!-- Narrative Section -->
            <div class="content-section narrative">
              <div class="section-icon">
                <i class="fa-solid fa-microphone-lines"></i>
              </div>
              <div class="section-content">
                <div class="label-row">
                  <h3 class="label">NARASI PEMBICARA</h3>
                  <div class="tts-controls">
                    <button 
                      class="btn-tts" 
                      :class="{ 'is-playing': ttsPlaying === slide.id, 'is-paused': ttsPaused === slide.id }"
                      @click="toggleTTS(slide)"
                      :aria-label="ttsPlaying === slide.id ? 'Pause' : 'Play'"
                    >
                      <i :class="ttsPlaying === slide.id && ttsPaused !== slide.id ? 'fa-solid fa-pause' : 'fa-solid fa-play'"></i>
                      <span>{{ ttsPlaying === slide.id && ttsPaused !== slide.id ? 'PAUSE' : (ttsPaused === slide.id ? 'RESUME' : 'DENGARKAN') }}</span>
                    </button>
                    <button 
                      v-if="ttsPlaying === slide.id" 
                      class="btn-tts btn-tts-stop" 
                      @click="stopTTS()"
                      aria-label="Stop"
                    >
                      <i class="fa-solid fa-stop"></i>
                    </button>
                  </div>
                </div>
                <div class="narrative-text">
                  <p v-for="(p, pIdx) in slide.narrative" :key="pIdx" v-html="p"></p>
                  
                  <!-- Transition appended as paragraph -->
                  <p v-if="slide.supplements?.transition" v-html="slide.supplements.transition" class="transition-p"></p>
                </div>
              </div>
            </div>

            <!-- Analogy Section -->
            <div v-if="slide.analogy" class="content-section analogy">
              <div class="section-icon">
                <i :class="slide.analogy.icon"></i>
              </div>
              <div class="section-content">
                <h3 class="label">{{ slide.analogy.label }}</h3>
                <div class="analogy-text">
                  <p v-html="slide.analogy.text"></p>
                </div>
              </div>
            </div>

            <!-- Interactive Section -->
            <div v-if="slide.interactive" class="content-section interactive" :class="slide.interactive.type">
              <div class="section-icon">
                <i class="fa-solid fa-comments"></i>
              </div>
              <div class="section-content">
                <h3 class="label">{{ slide.interactive.label }}</h3>
                
                <!-- Questions -->
                <div v-if="slide.interactive.questions" class="questions-list">
                  <div v-for="(q, qIdx) in slide.interactive.questions" :key="qIdx" class="question-item">
                    <p v-html="q"></p>
                  </div>
                </div>

                <!-- Quiz -->
                <div v-if="slide.interactive.quiz" class="quiz-block">
                  <p class="quiz-question" v-html="slide.interactive.quiz.question"></p>
                  <div class="options-grid">
                    <div 
                      v-for="(opt, idx) in slide.interactive.quiz.options" 
                      :key="idx"
                      class="option-item"
                      :class="{ 'is-correct': opt.active }"
                    >
                      <span class="opt-label">{{ getOptLabel(opt.text) }}</span>
                      <span class="opt-text" v-html="opt.text"></span>
                      <i v-if="opt.active" class="fa-solid fa-check-circle correct-icon"></i>
                    </div>
                  </div>
                </div>

                <!-- Guidance Box -->
                <div v-if="slide.interactive.guidance" class="guidance-box">
                  <h3 class="label-mini">{{ slide.interactive.guidance.label }}</h3>
                  <div class="guidance-content">
                    <p v-for="(gt, gtIdx) in slide.interactive.guidance.text" :key="gtIdx" v-html="gt"></p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Supplements Grid -->
            <div v-if="slide.supplements && slide.supplements.jokes && slide.supplements.jokes.length" class="supplements-grid">
              <!-- Jokes -->
              <div class="supp-card jokes">
                <h3 class="label">JOKES IMBUHAN RINGAN</h3>
                <div class="supp-text">
                  <p v-for="(joke, jIdx) in slide.supplements.jokes" :key="jIdx" v-html="joke"></p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { presentationContent } from '~/data/presentation-content';

const getSlideNumber = (indicator) => {
  return indicator.split(' ')[1] || '';
};

const getSlideName = (indicator) => {
  return indicator.split('—')[1]?.trim() || 'Slide';
};

const getOptLabel = (text) => {
  return text.split('.')[0] || '';
};

// ─── Text-to-Speech ───
const ttsPlaying = ref(null);
const ttsPaused = ref(null);
const ttsPlayingAll = ref(false);
const ttsCurrentIdx = ref(0);
const availableVoices = ref([]);
const selectedVoiceName = ref('');
const currentUtterance = ref(null); // Track the active utterance

const loadVoices = () => {
  const synth = window.speechSynthesis;
  let voices = synth.getVoices();
  
  // Filter for Indonesian or Malay (fallback)
  availableVoices.value = voices.filter(v => v.lang.startsWith('id') || v.lang.startsWith('ms'));
  
  if (availableVoices.value.length > 0) {
    // Priority: 1. Microsoft Ardi, 2. Indra/Thomas (Apple Male), 3. Any Male voice
    const maleNames = ['Ardi', 'Indra', 'Thomas', 'Andika', 'Male', 'Laki'];
    const foundMale = availableVoices.value.find(v => 
      maleNames.some(name => v.name.toLowerCase().includes(name.toLowerCase()))
    );
    
    if (foundMale) {
      selectedVoiceName.value = foundMale.name;
    } else {
      selectedVoiceName.value = availableVoices.value[0].name;
    }
  }
};

onMounted(() => {
  loadVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
});

const stripHtml = (html) => {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

const phoneticFix = (text) => {
  if (!text) return '';
  
  // Map of English terms to Indonesian-phonetic spelling
  const map = {
    'Cyber security': 'Saiber sekuriti',
    'Cybersecurity': 'Saiber sekuriti',
    'cyber security': 'saiber sekuriti',
    'cybersecurity': 'saiber sekuriti',
    'Zero Trust': 'Ziro Trast',
    'zero trust': 'ziro trast',
    'Chain of Custody': 'Cén of Kastodi',
    'chain of custody': 'cén of kastodi',
    'Ransomware': 'Ransom-wér',
    'ransomware': 'ransom-wér',
    'Phishing': 'Pising',
    'phishing': 'pising',
    'Deepfake': 'Dip-fék',
    'deepfake': 'dip-fék',
    'Supply Chain': 'Saplai Cén',
    'supply chain': 'saplai cén',
    'Dark Web': 'Dark Wéb',
    'dark web': 'dark wéb',
    'Framework': 'Frém-work',
    'framework': 'frém-work',
    'Cloud': 'Klaud',
    'cloud': 'klaud',
    'Hashing': 'Hésing',
    'hashing': 'hésing',
    'NIST': 'En-Ai-Es-Ti',
    'CSIRT': 'Cé-Sirt',
    'Digital-First': 'Dijital Ferst',
    'Data-Driven': 'Data Driven',
    'Cyber-Aware': 'Saiber Awér',
    'Cyber fraud': 'Saiber frod',
    'cyber fraud': 'saiber frod',
    'Cognitive Warfare': 'Kognitif Wor-fér',
    'cognitive warfare': 'kognitif wor-fér',
    'Cyber espionage': 'Saiber espionas',
    'cyber espionage': 'saiber espionas',
    'Incident Response': 'Insiden Respons',
    'incident response': 'insiden respons',
    'Air-Gapping': 'Er-Gépping',
    'air-gapping': 'er-gépping',
    'Backup': 'Bék-ap',
    'backup': 'bék-ap',
    'Firewall': 'Fair-wol',
    'firewall': 'fair-wol',
    'Real-time': 'Ril-taim',
    'real-time': 'ril-taim',
    'Real-Time': 'Ril-taim',
    'Doxing': 'Dok-sing',
    'doxing': 'dok-sing',
    'Profiling': 'Profil-ing',
    'profiling': 'profil-ing',
    'Brute force': 'Brut-fors',
    'brute force': 'brut-fors',
    'Voice cloning': 'Vois kloning',
    'voice cloning': 'vois kloning',
    'Scanning': 'Skéning',
    'scanning': 'skéning',
    'Feed': 'Fid',
    'feed': 'fid',
    'DDoS': 'Di-Dos',
    'SQL injection': 'Es-Kyu-El Injeksyen',
    'Metadata': 'Metadata',
    'Sample': 'Sempel',
    'sample': 'sempel',
    'Note': 'Not',
    'Endpoint': 'End-point',
    'endpoint': 'end-point',
    'Disaster recovery': 'Dizaster rikoveri',
    'AI Detection': 'E-Ai Deteksiyen'
  };

  let fixedText = text;
  for (const [english, phonetic] of Object.entries(map)) {
    const regex = new RegExp(`\\b${english}\\b`, 'g');
    fixedText = fixedText.replace(regex, phonetic);
  }
  
  return fixedText;
};

const getSlideText = (slide) => {
  let parts = [];
  
  // 1. Indikator Slide
  if (slide.indicator) {
    parts.push(slide.indicator.replace('—', 'yaitu'));
  }

  // 2. Analogi (jika ada)
  if (slide.analogy?.text) {
    parts.push("Analogi pembicara: " + stripHtml(slide.analogy.text));
  }

  // 3. Narasi Utama (Jokes sudah terintegrasi di sini)
  if (slide.narrative) {
    parts = parts.concat(slide.narrative.map(p => stripHtml(p)));
  }

  // 4. Bagian Interaktif (Pertanyaan)
  if (slide.interactive?.questions) {
    parts.push("Pertanyaan interaktif kepada audiens: ");
    parts = parts.concat(slide.interactive.questions.map(q => stripHtml(q)));
  }

  // 5. Bagian Kuis (jika ada)
  if (slide.interactive?.quiz) {
    parts.push("Pertanyaan kuis: " + stripHtml(slide.interactive.quiz.question));
    slide.interactive.quiz.options.forEach(opt => {
      parts.push("Pilihan " + stripHtml(opt.text));
    });
  }

  // 6. Panduan Respons / Lanjutkan (Guidance)
  if (slide.interactive?.guidance?.text) {
    parts.push("Panduan respon setelah audiens menjawab: ");
    parts = parts.concat(slide.interactive.guidance.text.map(t => stripHtml(t)));
  }

  // 7. Transisi ke slide berikutnya
  if (slide.supplements?.transition) {
    parts.push("Transisi: " + stripHtml(slide.supplements.transition));
  }

  // Apply Phonetic Fix for Indonesian Voice
  return phoneticFix(parts.join('\n\n'));
};

const toggleTTS = (slide) => {
  if (!window.speechSynthesis) {
    alert('Browser Anda tidak mendukung Text-to-Speech.');
    return;
  }

  const synth = window.speechSynthesis;

  // 1. If currently playing THIS slide -> Pause
  if (ttsPlaying.value === slide.id && !ttsPaused.value) {
    synth.pause();
    ttsPaused.value = slide.id;
    return;
  }

  // 2. If currently paused on THIS slide -> Resume
  if (ttsPaused.value === slide.id) {
    synth.resume();
    ttsPaused.value = null;
    return;
  }

  // 3. New slide or Play All transition -> Cancel previous and start new
  if (currentUtterance.value) {
    currentUtterance.value.onend = null;
    currentUtterance.value.onerror = null;
  }

  synth.cancel();

  const text = getSlideText(slide);
  const utterance = new SpeechSynthesisUtterance(text);
  currentUtterance.value = utterance;
  
  // Set selected voice
  const voice = availableVoices.value.find(v => v.name === selectedVoiceName.value);
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  } else {
    utterance.lang = 'id-ID';
  }

  // If we are in "Play All" mode, we want to update the current index
  if (ttsPlayingAll.value) {
    const idx = presentationContent.findIndex(s => s.id === slide.id);
    if (idx !== -1) ttsCurrentIdx.value = idx;
  }

  // Tuning for authoritative male tone
  const isMale = selectedVoiceName.value.toLowerCase().includes('ardi') || 
                 selectedVoiceName.value.toLowerCase().includes('indra') || 
                 selectedVoiceName.value.toLowerCase().includes('thomas');

  utterance.rate = isMale ? 0.9 : 0.85; 
  utterance.pitch = isMale ? 0.8 : 0.7; // Even deeper pitch if forced to use female voice

  utterance.onend = () => {
    currentUtterance.value = null;
    if (ttsPlayingAll.value) {
      playSlideAt(ttsCurrentIdx.value + 1);
    } else {
      ttsPlaying.value = null;
      ttsPaused.value = null;
    }
  };

  utterance.onerror = () => {
    currentUtterance.value = null;
    if (ttsPlayingAll.value) {
      playSlideAt(ttsCurrentIdx.value + 1);
    } else {
      ttsPlaying.value = null;
      ttsPaused.value = null;
    }
  };

  ttsPlaying.value = slide.id;
  ttsPaused.value = null;
  synth.speak(utterance);
};

const stopTTS = () => {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  ttsPlaying.value = null;
  ttsPaused.value = null;
  ttsPlayingAll.value = false;
  ttsCurrentIdx.value = 0;
};

// ─── Play All Slides ───
const ttsPlayingAll = ref(false);
const ttsCurrentIdx = ref(0);

const playSlideAt = (idx) => {
  if (idx >= presentationContent.length) {
    ttsPlayingAll.value = false;
    ttsPlaying.value = null;
    ttsCurrentIdx.value = 0;
    return;
  }

  const synth = window.speechSynthesis;
  synth.cancel();

  const slide = presentationContent[idx];
  ttsCurrentIdx.value = idx;
  ttsPlaying.value = slide.id;
  ttsPaused.value = null;

  const text = getSlideText(slide);
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set voice settings
  const voice = availableVoices.value.find(v => v.name === selectedVoiceName.value);
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  } else {
    utterance.lang = 'id-ID';
  }

  const isMale = selectedVoiceName.value.toLowerCase().includes('ardi') || 
                 selectedVoiceName.value.toLowerCase().includes('indra') || 
                 selectedVoiceName.value.toLowerCase().includes('thomas');

  utterance.rate = isMale ? 0.9 : 0.85;
  utterance.pitch = isMale ? 0.8 : 0.7; 

  // Auto-scroll to current slide
  const el = document.getElementById(slide.id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });

  utterance.onend = () => {
    if (ttsPlayingAll.value) {
      playSlideAt(idx + 1);
    } else {
      ttsPlaying.value = null;
    }
  };

  utterance.onerror = () => {
    if (ttsPlayingAll.value) {
      playSlideAt(idx + 1);
    } else {
      ttsPlaying.value = null;
    }
  };

  synth.speak(utterance);
};

const playAll = () => {
  if (!window.speechSynthesis) {
    alert('Browser Anda tidak mendukung Text-to-Speech.');
    return;
  }
  ttsPlayingAll.value = true;
  playSlideAt(0);
};

onUnmounted(() => {
  stopTTS();
});

useHead({
  title: 'Raw Script - Strategi Pertahanan Siber 2026',
  link: [
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' }
  ]
});
</script>

<style scoped>
.qna-dashboard {
  background-color: #020617;
  color: #e2e8f0;
  min-height: 100vh;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  padding-bottom: 5rem;
}

.container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Header Styles */
.dashboard-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #0f172a !important; /* Solid dark color */
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand h1 {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0.25rem 0;
  background: linear-gradient(135deg, #fff 0%, #94a3b8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.badge {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #3b82f6;
  text-transform: uppercase;
}

.subtitle {
  font-size: 0.85rem;
  color: #64748b;
}

.actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.voice-selector {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: #94a3b8;
}

.voice-selector i {
  font-size: 0.8rem;
  color: #3b82f6;
}

.select-voice {
  background: transparent;
  border: none;
  color: #e2e8f0;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  max-width: 150px;
}

.select-voice option {
  background: #0f172a;
  color: #fff;
}

.btn-back {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-print {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border-color: rgba(59, 130, 246, 0.2);
}

.btn-back {
  background: #1e293b;
  color: #f8fafc;
}

.btn-play-all {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.btn-play-all:hover {
  background: rgba(16, 185, 129, 0.2);
  border-color: rgba(16, 185, 129, 0.4);
  transform: translateY(-2px);
}

.btn-play-all.is-active {
  background: #ef4444;
  color: white;
  border-color: #ef4444;
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.4);
  animation: pulse-red 2s infinite;
}

@keyframes pulse-red {
  0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
}

/* Layout */
.main-layout {
  max-width: 900px;
  margin: 3rem auto 0;
  display: block;
}

/* Content Area */
.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.qna-card {
  background: transparent;
  border-bottom: 2px dashed rgba(255, 255, 255, 0.1);
  border-radius: 0;
  padding-bottom: 4rem;
  margin-bottom: 4rem;
}

.qna-card:last-child {
  border-bottom: none;
}

.qna-card.is-closing {
  border-color: rgba(16, 185, 129, 0.2);
}

.card-header {
  padding: 0 0 2.5rem 0;
  background: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.indicator {
  font-size: 0.7rem;
  font-weight: 800;
  color: #f59e0b;
  margin-bottom: 0.75rem;
  display: block;
  letter-spacing: 0.1em;
}

.is-closing .indicator { color: #10b981; }

.card-header h2 {
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1.3;
  margin: 0;
  color: #fff;
}

.card-subtitle {
  margin-top: 0.75rem;
  font-size: 1rem;
  color: #94a3b8;
}

/* Keypoints Styles */
.keypoints-box {
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(59, 130, 246, 0.05);
  border-radius: 12px;
  border-left: 3px solid #3b82f6;
}

.keypoints-label {
  font-size: 0.65rem;
  font-weight: 800;
  color: #3b82f6;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.keypoints-list {
  margin: 0;
  padding-left: 1.25rem;
  list-style-type: disc;
}

.keypoints-list li {
  font-size: 0.9rem;
  color: #e2e8f0;
  line-height: 1.5;
  margin-bottom: 0.25rem;
}

.keypoints-list li:last-child {
  margin-bottom: 0;
}

/* Sections */
.card-body {
  padding: 3rem 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}

.content-section {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 1.5rem;
}

.section-icon {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.label {
  font-size: 0.65rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  color: #475569;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
}

/* Label Row with TTS */
.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.label-row .label {
  margin-bottom: 0;
}

.tts-controls {
  display: flex;
  gap: 0.5rem;
}

.btn-tts {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  background: rgba(59, 130, 246, 0.06);
  color: #60a5fa;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-tts i {
  font-size: 0.65rem;
}

.btn-tts:hover {
  background: rgba(59, 130, 246, 0.15);
  border-color: rgba(59, 130, 246, 0.4);
  transform: translateY(-1px);
}

.btn-tts.is-playing {
  background: rgba(59, 130, 246, 0.15);
  border-color: #3b82f6;
  color: #93c5fd;
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.2);
  animation: tts-pulse 2s infinite;
}

.btn-tts.is-paused {
  background: rgba(245, 158, 11, 0.1);
  border-color: rgba(245, 158, 11, 0.3);
  color: #fbbf24;
  animation: none;
}

.btn-tts-stop {
  background: rgba(239, 68, 68, 0.06) !important;
  border-color: rgba(239, 68, 68, 0.2) !important;
  color: #f87171 !important;
  padding: 0.4rem 0.6rem;
}

.btn-tts-stop:hover {
  background: rgba(239, 68, 68, 0.15) !important;
  border-color: rgba(239, 68, 68, 0.4) !important;
}

@keyframes tts-pulse {
  0%, 100% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.1); }
  50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
}

/* Narrative */
.narrative .section-icon { color: #3b82f6; }
.narrative-text p {
  font-size: 1.25rem;
  line-height: 1.6;
  color: #cbd5e1;
  margin-bottom: 1.5rem;
}
.narrative-text p:last-child { margin-bottom: 0; }
:deep(strong) { color: #fff; font-weight: 700; }

/* Analogy */
.analogy .section-icon { color: #f59e0b; }
.analogy-text p {
  font-size: 1.1rem;
  font-style: italic;
  line-height: 1.7;
  color: #94a3b8;
}

/* Interactive */
.interactive .section-icon { color: #8b5cf6; }
.question-item p {
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  font-style: italic;
  margin-bottom: 1rem;
}

.guidance-box {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.label-mini {
  font-size: 0.6rem;
  font-weight: 800;
  color: #10b981;
  margin-bottom: 0.75rem;
  letter-spacing: 0.1em;
}

.guidance-content p {
  font-size: 1rem;
  line-height: 1.8;
  color: #cbd5e1;
  margin-bottom: 1.5rem;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  border-left: 3px solid rgba(16, 185, 129, 0.3);
}

.guidance-content :deep(strong) {
  color: #10b981;
}

/* Quiz block in main */
.quiz-question { font-size: 1.2rem; font-weight: 800; color: #60a5fa; margin-bottom: 1.5rem; }
.options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.option-item { 
  padding: 1rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 10px; 
  display: flex; align-items: center; gap: 1rem;
}
.option-item.is-correct { background: rgba(16, 185, 129, 0.05); border-color: rgba(16, 185, 129, 0.2); }
.opt-label { font-weight: 800; color: #475569; }
.opt-text { font-size: 0.9rem; color: #94a3b8; }
.is-correct .opt-text { color: #fff; }
.correct-icon { color: #10b981; margin-left: auto; }

/* Supplements */
.supplements-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.supp-card {
  background: rgba(255, 255, 255, 0.02);
  padding: 1.5rem;
  border-radius: 16px;
  border-left: 3px solid transparent;
}

.supp-card.jokes { border-color: #f59e0b; background: rgba(245, 158, 11, 0.03); }

.supp-text p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #94a3b8;
  font-style: italic;
}

/* Appended Transition Paragraph */
.transition-p {
  margin-top: 2rem !important;
  color: #10b981 !important; /* Greenish to stand out as a transition */
  font-style: italic;
  font-weight: 600;
  border-left: 3px solid rgba(16, 185, 129, 0.5);
  padding-left: 1rem;
}

/* Tag Styles */
.type-tag {
  font-size: 0.6rem;
  font-weight: 800;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  letter-spacing: 0.05em;
}
.type-tag.standard { background: rgba(59, 130, 246, 0.1); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.2); }
.type-tag.alternate { background: rgba(16, 185, 129, 0.1); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.2); }
.type-tag.quiz { background: rgba(139, 92, 246, 0.1); color: #a78bfa; border: 1px solid rgba(139, 92, 246, 0.2); }


/* Print & Responsive */
@media print {
  .qna-dashboard { background: white !important; color: black !important; padding: 0 !important; }
  .dashboard-header, .btn-print, .btn-back { display: none !important; }
  .main-layout { display: block !important; margin: 0 !important; max-width: 100% !important; }
  .qna-card { 
    break-inside: avoid; border-bottom: 2px dashed #ccc !important; 
    background: white !important; margin-bottom: 2rem !important; padding-bottom: 2rem !important;
  }
  .card-header { background: transparent !important; color: black !important; }
  .card-header h2 { color: black !important; }
  .narrative-text p, .question-item p, .opt-text { color: black !important; }
  .supp-card { background: #fcfcfc !important; border: 1px solid #eee !important; }
}

@media (max-width: 1024px) {
  .dashboard-header {
    background: #0f172a !important;
    padding: 1rem 0;
  }
  .main-layout { 
    padding-top: 1rem;
  }
}

@media (max-width: 768px) {
  .card-header h2 { font-size: 1.5rem; }
  .narrative-text p { font-size: 1.1rem; }
  .content-section { grid-template-columns: 1fr; }
  .section-icon { display: none; }
}
</style>
