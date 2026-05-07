<template>
  <div class="slide-content slide-data-strategic">
    <!-- Ambient effects -->
    <div class="ambient-orb orb-green"></div>
    <div class="ambient-orb orb-red"></div>
    <div class="grid-overlay"></div>

    <!-- Scroll Wrapper matching Slide 3 -->
    <div class="scroll-wrapper" ref="scrollWrapper">
      <div class="slide-inner">
        <!-- Header -->
        <div class="header-section">
          <div class="header-badge">
            <span class="badge-pulse"></span>
            <span class="badge-label">STRATEGIC DATA ASSESSMENT</span>
          </div>
          <h1 class="slide-title">
            Data Polri Bernilai <span class="title-highlight">Strategis</span>
          </h1>
          <p class="slide-desc">Aset data institusi sebagai tulang punggung operasi — dan target utama ancaman siber</p>
        </div>

        <!-- Split Container (Benefits & Risks) -->
        <div class="split-container mb-5">
          <!-- Benefits Panel -->
          <div class="data-panel panel-benefits">
            <div class="panel-border border-benefits"></div>
            <div class="panel-inner">
              <div class="panel-header">
                <div class="panel-icon-wrap icon-benefits">
                  <i class="fa-solid fa-shield-heart"></i>
                </div>
                <div>
                  <h2 class="panel-title">Data Mendukung</h2>
                  <span class="panel-sub">POSITIVE IMPACT</span>
                </div>
              </div>
              <div class="items-list">
                <div v-for="(item, i) in benefits" :key="i" class="data-item benefit-item">
                  <div class="item-num num-benefit">
                    <span>{{ String(i + 1).padStart(2, '0') }}</span>
                  </div>
                  <div class="item-content">
                    <span class="item-text">{{ item.title }}</span>
                    <span class="item-desc">{{ item.desc }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Risks Panel -->
          <div class="data-panel panel-risks">
            <div class="panel-border border-risks"></div>
            <div class="panel-inner">
              <div class="panel-header">
                <div class="panel-icon-wrap icon-risks">
                  <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                <div>
                  <h2 class="panel-title">Jika Bocor Memicu</h2>
                  <span class="panel-sub risk-sub">THREAT SCENARIO</span>
                </div>
              </div>
              <div class="items-list">
                <div v-for="(item, i) in risks" :key="i" class="data-item risk-item">
                  <div class="item-num num-risk">
                    <span>{{ String(i + 1).padStart(2, '0') }}</span>
                  </div>
                  <div class="item-content">
                    <span class="item-text">{{ item.title }}</span>
                    <span class="item-desc">{{ item.desc }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Professional Leak Section (Clean & Minimalist) -->
        <div class="leak-section mt-5 pb-5">
          <div class="section-divider">
            <span class="divider-text">DATA LEAK INTELLIGENCE REPORT</span>
          </div>

          <div class="evidence-container">
            <div class="evidence-image-wrap">
              <img :src="'/leak3.png'" alt="Data Leak Evidence" class="evidence-img" />
              <div class="evidence-tag">CONFIDENTIAL REPORT</div>
            </div>
            
            <div class="evidence-meta">
              <div class="meta-row">
                <span class="meta-label">SOURCE:</span>
                <span class="meta-value">BreachForums (Underground Network)</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">DETECTION:</span>
                <span class="meta-value">Tactical Cyber Intelligence Unit</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">SEVERITY:</span>
                <span class="meta-value text-danger">CRITICAL LEVEL</span>
              </div>
              <div class="meta-note mt-3">
                "Satu kebocoran data di Dark Web dapat meruntuhkan kepercayaan publik yang dibangun selama puluhan tahun."
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';

const props = defineProps({
  active: Boolean
});

const scrollWrapper = ref(null);

const benefits = [
  { title: 'Pelayanan Publik', desc: 'SIM, SKCK, Pengaduan' },
  { title: 'Analisis Kejahatan', desc: 'Pola kriminalitas & tren' },
  { title: 'Penyidikan', desc: 'Bukti digital & forensik' },
  { title: 'Operasi Kepolisian', desc: 'Koordinasi taktis lapangan' },
  { title: 'Keputusan Pimpinan', desc: 'Data-driven leadership' }
];

const risks = [
  { title: 'Pemerasan', desc: 'Leverage terhadap institusi' },
  { title: 'Doxing', desc: 'Ekspos data personel' },
  { title: 'Manipulasi', desc: 'Pemalsuan bukti & rekam' },
  { title: 'Gangguan Penyidikan', desc: 'Sabotase proses hukum' },
  { title: 'Hilangnya Kepercayaan', desc: 'Erosi trust publik' }
];

// Keyboard navigation matching Slide 3
const handleKeyDown = (e) => {
  if (!props.active || !scrollWrapper.value) return;
  
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.stopPropagation();
    e.preventDefault();
    
    const direction = e.key === 'ArrowDown' ? 1 : -1;
    const distance = 400;
    
    gsap.to(scrollWrapper.value, {
      scrollTop: scrollWrapper.value.scrollTop + (distance * direction),
      duration: 0.6,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown, { capture: true });
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown, { capture: true });
});

watch(() => props.active, (val) => {
  if (val) {
    if (scrollWrapper.value) {
      scrollWrapper.value.scrollTop = 0;
    }
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.slide-data-strategic .header-badge', { y: -15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
    tl.fromTo('.slide-data-strategic .slide-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.2');
    tl.fromTo('.slide-data-strategic .slide-desc', { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.4');

    tl.fromTo('.panel-benefits', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, '-=0.3');
    tl.fromTo('.panel-risks', { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, '-=0.6');
    
    tl.fromTo('.evidence-container', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.4');

    // Ambient
    gsap.to('.orb-green', { x: 20, y: -12, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.orb-red', { x: -18, y: 10, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }
}, { immediate: true });
</script>

<style scoped>
.slide-content {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  background: #020617;
}

.scroll-wrapper {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  padding: 8rem 6vw 8rem 6vw;
  scrollbar-width: thin;
  scrollbar-color: rgba(59, 130, 246, 0.5) transparent;
}

.scroll-wrapper::-webkit-scrollbar { width: 4px; }
.scroll-wrapper::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.5); border-radius: 10px; }

.slide-inner {
  width: 100%;
  max-width: 1350px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* ─── Ambient ─── */
.ambient-orb {
  position: absolute; border-radius: 50%; filter: blur(130px); pointer-events: none; z-index: 0;
}
.orb-green { width: 400px; height: 400px; background: rgba(34, 197, 94, 0.08); top: -10%; left: -5%; }
.orb-red { width: 380px; height: 380px; background: rgba(239, 68, 68, 0.07); bottom: -5%; right: -2%; }
.grid-overlay { position: absolute; inset: 0; background-image: linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px); background-size: 60px 60px; pointer-events: none; }

/* ─── Header ─── */
.header-section { text-align: center; margin-bottom: 4rem; }
.header-badge { display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.4rem 1.4rem; border-radius: 100px; border: 1px solid rgba(59, 130, 246, 0.3); background: rgba(30, 64, 175, 0.15); margin-bottom: 1.2rem; }
.badge-pulse { width: 8px; height: 8px; background: #3b82f6; border-radius: 50%; animation: pulse-dot 2s infinite; }
@keyframes pulse-dot { 0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5); } 50% { opacity: 0.8; box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); } }
.badge-label { font-size: 0.7rem; font-weight: 800; letter-spacing: 0.3em; color: #60a5fa; }
.slide-title { font-size: 3rem; font-weight: 900; text-transform: uppercase; color: white; }
.title-highlight { color: #3b82f6; }
.slide-desc { font-size: 1.1rem; color: #94a3b8; max-width: 800px; margin: 0.8rem auto 0; }

/* ─── Panels ─── */
.split-container { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
.data-panel { position: relative; border-radius: 24px; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.05); }
.panel-inner { padding: 2.5rem; }
.panel-header { display: flex; align-items: center; gap: 1.2rem; margin-bottom: 2rem; }
.panel-icon-wrap { width: 54px; height: 54px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
.icon-benefits { background: rgba(34, 197, 94, 0.1); color: #22c55e; border: 1px solid rgba(34, 197, 94, 0.2); }
.icon-risks { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2); }
.panel-title { font-size: 1.4rem; font-weight: 800; color: white; text-transform: uppercase; }
.panel-sub { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.2em; color: rgba(255, 255, 255, 0.3); text-transform: uppercase; }
.items-list { display: grid; gap: 0.8rem; }
.data-item { display: flex; align-items: center; gap: 1.2rem; padding: 1rem 1.5rem; border-radius: 16px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.03); }
.item-num { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-family: monospace; font-size: 0.8rem; font-weight: 800; }
.num-benefit { background: rgba(34, 197, 94, 0.1); color: #22c55e; }
.num-risk { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
.item-text { display: block; font-size: 1.1rem; font-weight: 700; color: white; }
.item-desc { font-size: 0.85rem; color: #64748b; }

/* ─── Evidence Section (Clean) ─── */
.leak-section { margin-top: 5rem; }
.section-divider { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 3rem; }
.section-divider::before, .section-divider::after { content: ''; flex: 1; height: 1px; background: rgba(255, 255, 255, 0.1); }
.divider-text { font-size: 0.7rem; font-weight: 800; color: #ef4444; letter-spacing: 0.3em; }

.evidence-container { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }

.evidence-image-wrap { position: relative; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; overflow: hidden; background: #000; }
.evidence-img { width: 100%; height: auto; opacity: 0.9; filter: contrast(1.1); display: block; }
.evidence-tag { position: absolute; top: 12px; left: 12px; background: #ef4444; color: white; font-size: 0.6rem; font-weight: 900; padding: 4px 8px; border-radius: 2px; }

.evidence-meta { color: #94a3b8; }
.meta-row { display: flex; gap: 1rem; margin-bottom: 0.8rem; font-size: 0.95rem; }
.meta-label { font-weight: 800; color: #ef4444; width: 100px; }
.meta-value { color: white; font-weight: 300; }
.meta-note { border-left: 3px solid #ef4444; padding-left: 1.5rem; font-style: italic; color: #ef4444; font-size: 1.1rem; line-height: 1.5; }
</style>
