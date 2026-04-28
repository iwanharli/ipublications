<template>
  <div class="slide-content slide-initial-actions">
    <!-- Ambient background effects -->
    <div class="ambient-orb orb-1"></div>
    <div class="ambient-orb orb-2"></div>
    <div class="grid-overlay"></div>

    <div class="slide-inner">
      <!-- Header -->
      <div class="header-section">
        <div class="header-badge">
          <span class="badge-dot"></span>
          <span class="badge-text">LEADERSHIP COMMAND GUIDE</span>
        </div>
        <h1 class="slide-title">
          Tiga <span class="title-highlight">Tindakan Awal</span>
        </h1>
        <p class="slide-subtitle">Langkah kritis pertama dalam pengamanan bukti digital</p>
      </div>

      <!-- Timeline connector -->
      <div class="timeline-track">
        <div class="track-line"></div>
        <div class="track-progress"></div>
      </div>

      <!-- Action Cards -->
      <div class="actions-row">
        <div
          v-for="(action, index) in actions"
          :key="index"
          class="action-card-wrapper"
        >
          <!-- Timeline node -->
          <div class="timeline-node">
            <div class="node-ring">
              <div class="node-core"></div>
            </div>
            <div class="node-label">STEP {{ index + 1 }}</div>
          </div>

          <!-- Card -->
          <div class="action-card">
            <div class="card-glow"></div>
            <div class="card-border-gradient"></div>
            <div class="card-inner">
              <!-- Icon orb -->
              <div class="icon-orb">
                <div class="orb-ring"></div>
                <i :class="action.icon"></i>
              </div>

              <!-- Content -->
              <h2 class="action-title">{{ action.title }}</h2>
              <div class="action-divider">
                <div class="divider-line"></div>
                <div class="divider-dot"></div>
              </div>
              <p class="action-desc">{{ action.desc }}</p>

              <!-- Status indicator -->
              <div class="status-bar">
                <div class="status-dot" :class="`priority-${index}`"></div>
                <span class="status-text">PRIORITAS TINGGI</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Warning banner -->
      <div class="warning-banner">
        <div class="banner-glow"></div>
        <div class="banner-content">
          <div class="banner-icon-wrap">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
          <p class="banner-text">
            Kesalahan pada tahap ini dapat <strong>membatalkan validitas bukti</strong> di persidangan.
          </p>
          <div class="banner-tag">CHAIN OF CUSTODY</div>
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

const actions = [
  {
    title: 'Isolasi',
    desc: 'Cegah remote wipe atau perubahan data jarak jauh melalui pemutusan jaringan.',
    icon: 'fa-solid fa-link-slash'
  },
  {
    title: 'Hashing',
    desc: 'Melakukan perhitungan nilai hash sebagai segel integritas bukti digital.',
    icon: 'fa-solid fa-fingerprint'
  },
  {
    title: 'Dokumentasi',
    desc: 'Foto/video proses untuk menghindari tuduhan manipulasi atau planted evidence.',
    icon: 'fa-solid fa-camera-retro'
  }
];

watch(() => props.active, (val) => {
  if (val) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Header entrance
    tl.fromTo('.slide-initial-actions .header-badge',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }
    );
    tl.fromTo('.slide-initial-actions .slide-title',
      { y: 30, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
      { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 0.8 },
      '-=0.3'
    );
    tl.fromTo('.slide-initial-actions .slide-subtitle',
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      '-=0.4'
    );

    // Timeline track animation
    tl.fromTo('.track-progress',
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: 'power2.inOut' },
      '-=0.2'
    );

    // Timeline nodes pop in
    tl.fromTo('.timeline-node',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.15 },
      '-=0.8'
    );

    // Cards slide up with stagger
    tl.fromTo('.action-card',
      { y: 60, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.2 },
      '-=0.6'
    );

    // Warning banner
    tl.fromTo('.warning-banner',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      '-=0.3'
    );

    // Ambient orbs
    gsap.to('.orb-1', { x: 30, y: -20, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.orb-2', { x: -25, y: 15, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
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

/* ─── Ambient background ─── */
.ambient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
  z-index: 0;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: rgba(30, 64, 175, 0.12);
  top: -10%;
  right: -5%;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: rgba(59, 130, 246, 0.08);
  bottom: -8%;
  left: -3%;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
  z-index: 0;
}

/* ─── Layout ─── */
.slide-inner {
  width: 100%;
  max-width: 1400px;
  position: relative;
  z-index: 1;
}

/* ─── Header ─── */
.header-section {
  text-align: center;
  margin-bottom: 2rem;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  background: rgba(30, 64, 175, 0.08);
  margin-bottom: 1.2rem;
}

.badge-dot {
  width: 6px;
  height: 6px;
  background: var(--accent-light);
  border-radius: 50%;
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
  50% { opacity: 0.8; box-shadow: 0 0 0 6px rgba(59, 130, 246, 0); }
}

.badge-text {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  color: var(--accent-light);
}

.slide-title {
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text);
  line-height: 1.1;
}

.title-highlight {
  background: linear-gradient(135deg, var(--accent-light) 0%, #93C5FD 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.slide-subtitle {
  font-size: 1rem;
  color: var(--text-muted);
  letter-spacing: 0.08em;
  margin-top: 0.8rem;
  font-weight: 400;
}

/* ─── Timeline Track ─── */
.timeline-track {
  position: relative;
  height: 3px;
  margin: 2rem 8% 0;
}

.track-line {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 2px;
}

.track-progress {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, var(--accent) 0%, var(--accent-light) 50%, #93C5FD 100%);
  border-radius: 2px;
  transform-origin: left center;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}

/* ─── Actions Row ─── */
.actions-row {
  display: flex;
  gap: 2.5rem;
  margin-top: 0;
  padding: 0 2%;
}

.action-card-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ─── Timeline Node ─── */
.timeline-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
  margin-top: -10px;
}

.node-ring {
  width: 22px;
  height: 22px;
  border: 2px solid var(--accent-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-color);
  position: relative;
  z-index: 2;
}

.node-core {
  width: 8px;
  height: 8px;
  background: var(--accent-light);
  border-radius: 50%;
  animation: pulse-core 2.5s infinite;
}

@keyframes pulse-core {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.6; }
}

.node-label {
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  color: var(--accent-light);
  margin-top: 0.5rem;
  opacity: 0.7;
}

/* ─── Action Card ─── */
.action-card {
  width: 100%;
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.action-card:hover {
  transform: translateY(-12px);
}

.action-card:hover .card-glow {
  opacity: 1;
}

.action-card:hover .orb-ring {
  transform: scale(1.15);
  border-color: var(--accent-light);
}

.card-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center top, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
  z-index: 0;
}

.card-border-gradient {
  position: absolute;
  inset: 0;
  border-radius: 24px;
  padding: 1px;
  background: linear-gradient(180deg, rgba(59, 130, 246, 0.25) 0%, rgba(255, 255, 255, 0.04) 50%, rgba(59, 130, 246, 0.1) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  z-index: 2;
}

.card-inner {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 340px;
  position: relative;
  z-index: 1;
}

/* ─── Icon Orb ─── */
.icon-orb {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 2rem;
}

.orb-ring {
  position: absolute;
  inset: 0;
  border: 2px solid rgba(59, 130, 246, 0.2);
  border-radius: 50%;
  transition: all 0.4s ease;
}

.orb-ring::before {
  content: '';
  position: absolute;
  inset: -6px;
  border: 1px solid rgba(59, 130, 246, 0.08);
  border-radius: 50%;
}

.icon-orb i {
  font-size: 2rem;
  color: var(--accent-light);
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 0 12px rgba(59, 130, 246, 0.3));
}

/* ─── Card Content ─── */
.action-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 1rem;
}

.action-divider {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.2rem;
}

.divider-line {
  width: 30px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent-light));
  border-radius: 1px;
}

.divider-dot {
  width: 4px;
  height: 4px;
  background: var(--accent-light);
  border-radius: 50%;
}

.action-desc {
  font-size: 1rem;
  color: var(--text-muted);
  line-height: 1.7;
  flex-grow: 1;
}

/* ─── Status Bar ─── */
.status-bar {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1.5rem;
  padding: 0.4rem 1rem;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  animation: blink-status 2s infinite;
}

.status-dot.priority-0 { background: #ef4444; }
.status-dot.priority-1 { background: #f59e0b; }
.status-dot.priority-2 { background: #3b82f6; }

@keyframes blink-status {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.status-text {
  font-size: 0.55rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  color: rgba(255, 255, 255, 0.35);
}

/* ─── Warning Banner ─── */
.warning-banner {
  margin-top: 3rem;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
}

.banner-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(30, 64, 175, 0.06) 0%, rgba(59, 130, 246, 0.04) 50%, rgba(30, 64, 175, 0.06) 100%);
  pointer-events: none;
}

.banner-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.2rem 2rem;
  border: 1px solid rgba(59, 130, 246, 0.12);
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1;
}

.banner-icon-wrap {
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.banner-icon-wrap i {
  font-size: 1.1rem;
  color: white;
}

.banner-text {
  margin: 0;
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.5;
  flex-grow: 1;
}

.banner-text strong {
  color: white;
  font-weight: 700;
}

.banner-tag {
  font-size: 0.55rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: var(--accent-light);
  opacity: 0.5;
  white-space: nowrap;
  padding: 0.3rem 0.8rem;
  border: 1px solid rgba(59, 130, 246, 0.15);
  border-radius: 6px;
}

/* ─── Responsive ─── */
@media (max-width: 1100px) {
  .actions-row {
    flex-direction: column;
    gap: 2rem;
    max-width: 500px;
    margin: 0 auto;
  }

  .timeline-track {
    display: none;
  }

  .timeline-node {
    margin-top: 0;
  }

  .card-inner {
    min-height: auto;
  }
}
</style>
