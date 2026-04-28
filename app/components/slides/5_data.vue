<template>
  <div class="slide-content slide-data-strategic">
    <!-- Ambient effects -->
    <div class="ambient-orb orb-green"></div>
    <div class="ambient-orb orb-red"></div>
    <div class="grid-overlay"></div>

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
        <p class="slide-subtitle">Aset data institusi sebagai tulang punggung operasi — dan target utama ancaman siber</p>
      </div>

      <!-- Split Container -->
      <div class="split-container">
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
                <div class="item-arrow">
                  <i class="fa-solid fa-chevron-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Center Divider -->
        <div class="center-divider">
          <div class="divider-line"></div>
          <div class="divider-badge">
            <i class="fa-solid fa-bolt"></i>
          </div>
          <div class="divider-line"></div>
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
                <div class="item-severity">
                  <span class="severity-dot"></span>
                </div>
              </div>
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

watch(() => props.active, (val) => {
  if (val) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.slide-data-strategic .header-badge',
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    );
    tl.fromTo('.slide-data-strategic .slide-title',
      { y: 30, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
      { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 0.8 },
      '-=0.2'
    );
    tl.fromTo('.slide-data-strategic .slide-subtitle',
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      '-=0.4'
    );

    // Panels
    tl.fromTo('.panel-benefits',
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8 },
      '-=0.2'
    );
    tl.fromTo('.panel-risks',
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8 },
      '-=0.6'
    );
    tl.fromTo('.center-divider',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' },
      '-=0.5'
    );

    // List items
    tl.fromTo('.benefit-item',
      { x: -15, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, stagger: 0.08 },
      '-=0.3'
    );
    tl.fromTo('.risk-item',
      { x: 15, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, stagger: 0.08 },
      '-=0.6'
    );

    // Ambient
    gsap.to('.orb-green', { x: 20, y: -12, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.orb-red', { x: -18, y: 10, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }
}, { immediate: true });
</script>

<style scoped>
.slide-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5vw;
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

.orb-green {
  width: 400px;
  height: 400px;
  background: rgba(34, 197, 94, 0.06);
  top: -6%;
  left: -3%;
}

.orb-red {
  width: 380px;
  height: 380px;
  background: rgba(239, 68, 68, 0.05);
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

/* ─── Layout ─── */
.slide-inner {
  width: 100%;
  max-width: 1350px;
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
  border: 1px solid rgba(59, 130, 246, 0.2);
  background: rgba(30, 64, 175, 0.08);
  margin-bottom: 1rem;
}

.badge-pulse {
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

.badge-label {
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.3em;
  color: var(--accent-light);
}

.slide-title {
  font-size: clamp(2rem, 4vw, 3rem);
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
  font-size: 0.95rem;
  color: var(--text-muted);
  letter-spacing: 0.04em;
  margin-top: 0.6rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

/* ─── Split Container ─── */
.split-container {
  display: flex;
  align-items: stretch;
  gap: 0;
  position: relative;
}

.data-panel {
  flex: 1;
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.data-panel:hover {
  transform: translateY(-4px);
}

/* ─── Panel Borders ─── */
.panel-border {
  position: absolute;
  inset: 0;
  border-radius: 22px;
  padding: 1px;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  z-index: 2;
}

.border-benefits {
  background: linear-gradient(180deg, rgba(34, 197, 94, 0.3) 0%, rgba(255, 255, 255, 0.03) 50%, rgba(34, 197, 94, 0.08) 100%);
}

.border-risks {
  background: linear-gradient(180deg, rgba(239, 68, 68, 0.3) 0%, rgba(255, 255, 255, 0.03) 50%, rgba(239, 68, 68, 0.1) 100%);
}

.panel-inner {
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 22px;
  padding: 2rem 2rem;
  height: 100%;
  position: relative;
  z-index: 1;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.8rem;
}

.panel-icon-wrap {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-benefits {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.icon-benefits i {
  font-size: 1.3rem;
  color: #22c55e;
  filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.3));
}

.icon-risks {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.icon-risks i {
  font-size: 1.3rem;
  color: #ef4444;
  filter: drop-shadow(0 0 8px rgba(239, 68, 68, 0.3));
}

.panel-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0;
  line-height: 1.2;
}

.panel-sub {
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #22c55e;
  opacity: 0.6;
  text-transform: uppercase;
}

.risk-sub {
  color: #ef4444;
}

/* ─── List Items ─── */
.items-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.data-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.03);
  transition: all 0.3s ease;
}

.benefit-item:hover {
  background: rgba(34, 197, 94, 0.04);
  border-color: rgba(34, 197, 94, 0.12);
  transform: translateX(6px);
}

.risk-item:hover {
  background: rgba(239, 68, 68, 0.04);
  border-color: rgba(239, 68, 68, 0.12);
  transform: translateX(6px);
}

.item-num {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.item-num span {
  font-family: var(--font-mono, monospace);
  font-size: 0.7rem;
  font-weight: 800;
}

.num-benefit {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.15);
}

.num-benefit span { color: #22c55e; }

.num-risk {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.15);
}

.num-risk span { color: #ef4444; }

.item-content {
  flex-grow: 1;
  min-width: 0;
}

.item-text {
  display: block;
  font-size: 1rem;
  font-weight: 700;
  color: white;
  letter-spacing: 0.03em;
}

.item-desc {
  display: block;
  font-size: 0.7rem;
  color: var(--text-muted);
  letter-spacing: 0.02em;
  margin-top: 0.15rem;
}

.item-arrow {
  color: rgba(34, 197, 94, 0.3);
  font-size: 0.6rem;
}

.item-severity {
  display: flex;
  align-items: center;
}

.severity-dot {
  width: 6px;
  height: 6px;
  background: #ef4444;
  border-radius: 50%;
  animation: blink-sev 1.8s infinite;
}

@keyframes blink-sev {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
}

/* ─── Center Divider ─── */
.center-divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60px;
  flex-shrink: 0;
  z-index: 5;
}

.divider-line {
  width: 1px;
  flex: 1;
  background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.06), transparent);
}

.divider-badge {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0;
}

.divider-badge i {
  font-size: 0.85rem;
  color: #f59e0b;
  opacity: 0.8;
}

/* ─── Responsive ─── */
@media (max-width: 1000px) {
  .split-container {
    flex-direction: column;
    gap: 1.5rem;
  }

  .center-divider {
    flex-direction: row;
    width: auto;
    height: 40px;
  }

  .divider-line {
    width: auto;
    height: 1px;
    flex: 1;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.06), transparent);
  }
}
</style>
