<template>
  <div class="slide-content slide-dilemma">
    <!-- Ambient effects -->
    <div class="ambient-orb orb-danger"></div>
    <div class="ambient-orb orb-cold"></div>
    <div class="scan-line"></div>

    <div class="slide-inner">
      <!-- Header -->
      <div class="header-section">
        <div class="header-badge">
          <span class="badge-pulse"></span>
          <span class="badge-label">CRITICAL DECISION MAKING</span>
        </div>
        <h1 class="slide-title">
          Dilema <span class="title-danger">Ransomware</span>
        </h1>
        <div class="case-ref-bar">
          <div class="ref-icon">
            <i class="fa-solid fa-triangle-exclamation"></i>
          </div>
          <p class="ref-text">Refleksi: Insiden <strong>PDNS</strong> (Pusat Data Nasional Sementara) — Juni 2024</p>
        </div>
      </div>

      <!-- Dilemma confrontation -->
      <div class="confrontation">
        <!-- Option A: Pay -->
        <div class="dilemma-panel panel-pay">
          <div class="panel-border-glow pay-glow"></div>
          <div class="panel-inner">
            <div class="panel-icon-wrap pay-icon-bg">
              <i class="fa-solid fa-hand-holding-dollar"></i>
            </div>
            <h2 class="panel-title">Jika Membayar</h2>
            <div class="panel-divider pay-divider"></div>
            <ul class="panel-list">
              <li v-for="(item, i) in payItems" :key="i" class="list-item">
                <div class="item-marker pay-marker">
                  <i class="fa-solid fa-xmark"></i>
                </div>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- VS Center -->
        <div class="vs-center">
          <div class="vs-outer-ring"></div>
          <div class="vs-inner-ring"></div>
          <span class="vs-text">VS</span>
          <div class="vs-lightning vs-lightning-left">⚡</div>
          <div class="vs-lightning vs-lightning-right">⚡</div>
        </div>

        <!-- Option B: No Pay -->
        <div class="dilemma-panel panel-nopay">
          <div class="panel-border-glow nopay-glow"></div>
          <div class="panel-inner">
            <div class="panel-icon-wrap nopay-icon-bg">
              <i class="fa-solid fa-ban"></i>
            </div>
            <h2 class="panel-title">Jika Tidak Membayar</h2>
            <div class="panel-divider nopay-divider"></div>
            <ul class="panel-list">
              <li v-for="(item, i) in noPayItems" :key="i" class="list-item">
                <div class="item-marker nopay-marker">
                  <i class="fa-solid fa-xmark"></i>
                </div>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Core Issues -->
      <div class="core-section">
        <div class="core-connector">
          <div class="connector-line"></div>
          <div class="connector-arrow">
            <i class="fa-solid fa-caret-down"></i>
          </div>
        </div>
        <div class="core-bar">
          <div class="core-label-wrap">
            <i class="fa-solid fa-bullseye"></i>
            <span class="core-label">INTI MASALAH</span>
          </div>
          <div class="core-chips">
            <div v-for="(item, i) in coreIssues" :key="i" class="core-chip">
              <div class="chip-dot" :class="`chip-color-${i}`"></div>
              <span>{{ item }}</span>
            </div>
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

const payItems = [
  'Berisiko mendanai kriminalitas',
  'Tidak ada jaminan data kembali',
  'Pelaku bisa menyerang lagi'
];

const noPayItems = [
  'Layanan terganggu lebih lama',
  'Data berisiko dibocorkan',
  'Tekanan publik pada institusi'
];

const coreIssues = ['Pelayanan', 'Data', 'Bukti Digital', 'Reputasi', 'Kepercayaan'];

watch(() => props.active, (val) => {
  if (val) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Header
    tl.fromTo('.slide-dilemma .header-badge',
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    );
    tl.fromTo('.slide-dilemma .slide-title',
      { y: 30, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
      { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 0.8 },
      '-=0.2'
    );
    tl.fromTo('.case-ref-bar',
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      '-=0.4'
    );

    // Panels slide in from sides
    tl.fromTo('.panel-pay',
      { x: -80, opacity: 0, rotateY: 8 },
      { x: 0, opacity: 1, rotateY: 0, duration: 0.9 },
      '-=0.2'
    );
    tl.fromTo('.panel-nopay',
      { x: 80, opacity: 0, rotateY: -8 },
      { x: 0, opacity: 1, rotateY: 0, duration: 0.9 },
      '-=0.7'
    );

    // VS badge
    tl.fromTo('.vs-center',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)' },
      '-=0.5'
    );

    // List items stagger
    tl.fromTo('.list-item',
      { x: -15, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, stagger: 0.1 },
      '-=0.3'
    );

    // Core section
    tl.fromTo('.core-section',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      '-=0.2'
    );

    // Ambient
    gsap.to('.orb-danger', { x: 20, y: -15, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.orb-cold', { x: -18, y: 12, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.scan-line', { top: '100%', duration: 4, repeat: -1, ease: 'none' });
  }
}, { immediate: true });
</script>

<style scoped>
.slide-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6vw;
  position: relative;
  overflow: hidden;
}

/* ─── Ambient ─── */
.ambient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(130px);
  pointer-events: none;
  z-index: 0;
}

.orb-danger {
  width: 400px;
  height: 400px;
  background: rgba(239, 68, 68, 0.07);
  top: -5%;
  left: -3%;
}

.orb-cold {
  width: 350px;
  height: 350px;
  background: rgba(59, 130, 246, 0.06);
  bottom: -5%;
  right: -2%;
}

.scan-line {
  position: absolute;
  left: 0;
  top: -5%;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(239, 68, 68, 0.15) 30%, rgba(59, 130, 246, 0.15) 70%, transparent 100%);
  pointer-events: none;
  z-index: 0;
}

/* ─── Layout ─── */
.slide-inner {
  width: 100%;
  max-width: 1300px;
  position: relative;
  z-index: 1;
}

/* ─── Header ─── */
.header-section {
  text-align: center;
  margin-bottom: 2.5rem;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.35rem 1.2rem;
  border-radius: 100px;
  border: 1px solid rgba(239, 68, 68, 0.2);
  background: rgba(239, 68, 68, 0.05);
  margin-bottom: 1rem;
}

.badge-pulse {
  width: 6px;
  height: 6px;
  background: #ef4444;
  border-radius: 50%;
  animation: pulse-red 2s infinite;
}

@keyframes pulse-red {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.5); }
  50% { opacity: 0.7; box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
}

.badge-label {
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.3em;
  color: #ef4444;
  opacity: 0.8;
}

.slide-title {
  font-size: clamp(2.2rem, 4.5vw, 3.4rem);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text);
  line-height: 1.1;
}

.title-danger {
  background: linear-gradient(135deg, #ef4444 0%, #f97316 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.case-ref-bar {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 1rem;
  padding: 0.5rem 1.4rem;
  border-radius: 10px;
  background: rgba(239, 68, 68, 0.04);
  border: 1px solid rgba(239, 68, 68, 0.1);
}

.ref-icon {
  color: #ef4444;
  font-size: 0.85rem;
  opacity: 0.8;
}

.ref-text {
  margin: 0;
  font-size: 0.8rem;
  color: var(--text-muted);
  letter-spacing: 0.03em;
}

.ref-text strong {
  color: white;
  font-weight: 700;
}

/* ─── Confrontation Grid ─── */
.confrontation {
  display: flex;
  align-items: stretch;
  gap: 0;
  position: relative;
}

/* ─── Dilemma Panel ─── */
.dilemma-panel {
  flex: 1;
  position: relative;
  border-radius: 24px;
  overflow: hidden;
}

.panel-border-glow {
  position: absolute;
  inset: 0;
  border-radius: 24px;
  padding: 1px;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  z-index: 2;
}

.pay-glow {
  background: linear-gradient(180deg, rgba(239, 68, 68, 0.3) 0%, rgba(255, 255, 255, 0.04) 50%, rgba(239, 68, 68, 0.1) 100%);
}

.nopay-glow {
  background: linear-gradient(180deg, rgba(59, 130, 246, 0.3) 0%, rgba(255, 255, 255, 0.04) 50%, rgba(59, 130, 246, 0.1) 100%);
}

.panel-inner {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 2.5rem 2.2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}

.dilemma-panel:hover {
  transform: translateY(-6px);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.panel-icon-wrap {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.pay-icon-bg {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.pay-icon-bg i {
  font-size: 1.4rem;
  color: #ef4444;
  filter: drop-shadow(0 0 8px rgba(239, 68, 68, 0.3));
}

.nopay-icon-bg {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%);
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.nopay-icon-bg i {
  font-size: 1.4rem;
  color: var(--accent-light);
  filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.3));
}

.panel-title {
  font-size: 1.35rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: white;
  margin-bottom: 1rem;
}

.panel-divider {
  width: 40px;
  height: 3px;
  border-radius: 2px;
  margin-bottom: 1.5rem;
}

.pay-divider { background: linear-gradient(90deg, #ef4444, transparent); }
.nopay-divider { background: linear-gradient(90deg, var(--accent-light), transparent); }

.panel-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.05rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.item-marker {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.item-marker i {
  font-size: 0.6rem;
}

.pay-marker {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.nopay-marker {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: var(--accent-light);
}

/* ─── VS Center ─── */
.vs-center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vs-outer-ring {
  position: absolute;
  width: 80px;
  height: 80px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 50%;
  animation: rotate-ring 12s linear infinite;
}

@keyframes rotate-ring {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.vs-inner-ring {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.vs-text {
  position: relative;
  z-index: 2;
  font-size: 1.1rem;
  font-weight: 900;
  color: white;
  letter-spacing: 0.1em;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}

.vs-lightning {
  position: absolute;
  font-size: 0.9rem;
  opacity: 0.4;
  animation: flicker 3s infinite;
}

.vs-lightning-left { left: -22px; top: -8px; }
.vs-lightning-right { right: -22px; bottom: -8px; }

@keyframes flicker {
  0%, 100% { opacity: 0.4; }
  30% { opacity: 0.1; }
  50% { opacity: 0.6; }
  70% { opacity: 0.2; }
}

/* ─── Core Issues ─── */
.core-section {
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.core-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0;
}

.connector-line {
  width: 1px;
  height: 24px;
  background: linear-gradient(180deg, transparent, var(--accent-light));
}

.connector-arrow {
  color: var(--accent-light);
  font-size: 0.8rem;
  opacity: 0.6;
  margin-top: -4px;
}

.core-bar {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1.2rem 2rem;
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(59, 130, 246, 0.1);
}

.core-label-wrap {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  white-space: nowrap;
  flex-shrink: 0;
}

.core-label-wrap i {
  color: var(--accent-light);
  font-size: 0.9rem;
}

.core-label {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  color: var(--accent-light);
  opacity: 0.8;
}

.core-chips {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  flex-grow: 1;
  justify-content: flex-end;
}

.core-chip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.3s ease;
}

.core-chip:hover {
  background: rgba(59, 130, 246, 0.08);
  border-color: rgba(59, 130, 246, 0.2);
  transform: translateY(-2px);
}

.core-chip span {
  font-size: 0.85rem;
  font-weight: 700;
  color: white;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.chip-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}

.chip-color-0 { background: #ef4444; }
.chip-color-1 { background: #f59e0b; }
.chip-color-2 { background: var(--accent-light); }
.chip-color-3 { background: #8b5cf6; }
.chip-color-4 { background: #10b981; }

/* ─── Responsive ─── */
@media (max-width: 1000px) {
  .confrontation {
    flex-direction: column;
    gap: 2rem;
  }

  .vs-center {
    position: relative;
    left: auto;
    top: auto;
    transform: none;
    margin: -1rem auto;
  }

  .core-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .core-chips {
    justify-content: flex-start;
  }
}
</style>
