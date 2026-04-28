<template>
  <div class="slide-content slide-forensics">
    <!-- Ambient effects -->
    <div class="ambient-orb orb-1"></div>
    <div class="ambient-orb orb-2"></div>
    <div class="grid-overlay"></div>

    <div class="slide-inner">
      <!-- Header -->
      <div class="header-section">
        <div class="header-badge">
          <span class="badge-pulse"></span>
          <span class="badge-label">DIGITAL FORENSICS FRAMEWORK</span>
        </div>
        <h1 class="slide-title">
          Metadata & <span class="title-highlight">Chain of Custody</span>
        </h1>
        <p class="slide-subtitle">Dua pilar utama dalam menjamin keabsahan bukti digital di persidangan</p>
      </div>

      <!-- Forensics Split -->
      <div class="forensics-split">
        <!-- Metadata Panel -->
        <div class="forensic-panel panel-metadata">
          <div class="panel-border border-metadata"></div>
          <div class="panel-inner">
            <div class="panel-header">
              <div class="panel-icon-wrap icon-metadata">
                <i class="fa-solid fa-file-code"></i>
              </div>
              <div>
                <h2 class="panel-title">Metadata Menunjukkan</h2>
                <span class="panel-sub">TECHNICAL DATA</span>
              </div>
            </div>

            <div class="metadata-rows">
              <div v-for="(item, i) in metadataItems" :key="i" class="meta-row">
                <div class="meta-key">
                  <span class="key-label">{{ item.label }}</span>
                </div>
                <div class="meta-connector">
                  <div class="connector-dash"></div>
                  <div class="connector-dot"></div>
                </div>
                <div class="meta-value">
                  <span>{{ item.desc }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Center Link -->
        <div class="center-link">
          <div class="link-line"></div>
          <div class="link-badge">
            <i class="fa-solid fa-link"></i>
          </div>
          <div class="link-line"></div>
        </div>

        <!-- Chain of Custody Panel -->
        <div class="forensic-panel panel-custody">
          <div class="panel-border border-custody"></div>
          <div class="panel-inner">
            <div class="panel-header">
              <div class="panel-icon-wrap icon-custody">
                <i class="fa-solid fa-scale-balanced"></i>
              </div>
              <div>
                <h2 class="panel-title">Chain of Custody</h2>
                <span class="panel-sub custody-sub">PROCEDURAL VALIDITY</span>
              </div>
            </div>

            <div class="custody-list">
              <div v-for="(item, i) in custodyItems" :key="i" class="custody-row">
                <div class="custody-check">
                  <i class="fa-solid fa-check"></i>
                </div>
                <div class="custody-content">
                  <h3 class="custody-title">{{ item.title }}</h3>
                  <p class="custody-desc">{{ item.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom insight -->
      <div class="insight-bar">
        <div class="insight-icon">
          <i class="fa-solid fa-gavel"></i>
        </div>
        <p class="insight-text">Tanpa metadata & chain of custody yang valid, bukti digital <strong>tidak dapat diterima</strong> di pengadilan.</p>
        <div class="insight-tag">UU ITE · KUHAP</div>
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

const metadataItems = [
  { label: 'Timestamp', desc: 'Kapan file dibuat / diedit' },
  { label: 'Device', desc: 'Perangkat yang digunakan' },
  { label: 'Geotag', desc: 'Lokasi / Koordinat GPS' },
  { label: 'Spec', desc: 'Ukuran dan format file' },
  { label: 'History', desc: 'Perubahan terakhir' }
];

const custodyItems = [
  { title: 'Who?', desc: 'Siapa yang mengambil bukti digital' },
  { title: 'How?', desc: 'Kapan dan bagaimana diamankan' },
  { title: 'Access?', desc: 'Siapa saja yang mengakses bukti' },
  { title: 'Integrity?', desc: 'Apakah bukti berubah selama proses' }
];

watch(() => props.active, (val) => {
  if (val) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.slide-forensics .header-badge',
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    );
    tl.fromTo('.slide-forensics .slide-title',
      { y: 30, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
      { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 0.8 },
      '-=0.2'
    );
    tl.fromTo('.slide-forensics .slide-subtitle',
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      '-=0.4'
    );

    // Panels
    tl.fromTo('.panel-metadata',
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8 },
      '-=0.2'
    );
    tl.fromTo('.panel-custody',
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8 },
      '-=0.6'
    );
    tl.fromTo('.center-link',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' },
      '-=0.5'
    );

    // Meta rows
    tl.fromTo('.meta-row',
      { x: -15, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, stagger: 0.08 },
      '-=0.3'
    );

    // Custody rows
    tl.fromTo('.custody-row',
      { x: 15, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, stagger: 0.1 },
      '-=0.5'
    );

    // Insight bar
    tl.fromTo('.insight-bar',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.2'
    );

    // Ambient
    gsap.to('.orb-1', { x: 22, y: -14, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.orb-2', { x: -18, y: 10, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
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

.orb-1 {
  width: 420px;
  height: 420px;
  background: rgba(139, 92, 246, 0.06);
  top: -6%;
  left: -3%;
}

.orb-2 {
  width: 360px;
  height: 360px;
  background: rgba(59, 130, 246, 0.07);
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
  border: 1px solid rgba(139, 92, 246, 0.2);
  background: rgba(139, 92, 246, 0.06);
  margin-bottom: 1rem;
}

.badge-pulse {
  width: 6px;
  height: 6px;
  background: #8b5cf6;
  border-radius: 50%;
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); }
  50% { opacity: 0.8; box-shadow: 0 0 0 6px rgba(139, 92, 246, 0); }
}

.badge-label {
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.3em;
  color: #a78bfa;
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
  background: linear-gradient(135deg, #a78bfa 0%, #818cf8 50%, var(--accent-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.slide-subtitle {
  font-size: 0.95rem;
  color: var(--text-muted);
  letter-spacing: 0.04em;
  margin-top: 0.6rem;
}

/* ─── Forensics Split ─── */
.forensics-split {
  display: flex;
  align-items: stretch;
  gap: 0;
  position: relative;
}

.forensic-panel {
  flex: 1;
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.forensic-panel:hover {
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

.border-metadata {
  background: linear-gradient(180deg, rgba(139, 92, 246, 0.3) 0%, rgba(255, 255, 255, 0.03) 50%, rgba(139, 92, 246, 0.08) 100%);
}

.border-custody {
  background: linear-gradient(180deg, rgba(59, 130, 246, 0.35) 0%, rgba(255, 255, 255, 0.04) 50%, rgba(59, 130, 246, 0.12) 100%);
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

.icon-metadata {
  background: rgba(139, 92, 246, 0.12);
  border: 1px solid rgba(139, 92, 246, 0.2);
}

.icon-metadata i {
  font-size: 1.3rem;
  color: #a78bfa;
  filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.3));
}

.icon-custody {
  background: rgba(59, 130, 246, 0.12);
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.icon-custody i {
  font-size: 1.3rem;
  color: var(--accent-light);
  filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.3));
}

.panel-title {
  font-size: 1.2rem;
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
  color: #a78bfa;
  opacity: 0.6;
  text-transform: uppercase;
}

.custody-sub {
  color: var(--accent-light);
}

/* ─── Metadata Rows ─── */
.metadata-rows {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.6rem 0.8rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.03);
  transition: all 0.3s ease;
}

.meta-row:hover {
  background: rgba(139, 92, 246, 0.04);
  border-color: rgba(139, 92, 246, 0.12);
}

.meta-key {
  width: 90px;
  flex-shrink: 0;
}

.key-label {
  font-family: var(--font-mono, monospace);
  font-size: 0.7rem;
  font-weight: 800;
  color: #a78bfa;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.meta-connector {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  flex-shrink: 0;
}

.connector-dash {
  width: 20px;
  height: 1px;
  background: linear-gradient(90deg, rgba(139, 92, 246, 0.3), rgba(139, 92, 246, 0.1));
}

.connector-dot {
  width: 4px;
  height: 4px;
  background: rgba(139, 92, 246, 0.4);
  border-radius: 50%;
}

.meta-value {
  flex-grow: 1;
}

.meta-value span {
  font-size: 0.9rem;
  color: #94a3b8;
}

/* ─── Custody Rows ─── */
.custody-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.custody-row {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 0.7rem 0.8rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.03);
  transition: all 0.3s ease;
}

.custody-row:hover {
  background: rgba(59, 130, 246, 0.04);
  border-color: rgba(59, 130, 246, 0.12);
}

.custody-check {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: rgba(59, 130, 246, 0.12);
  border: 1px solid rgba(59, 130, 246, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.custody-check i {
  font-size: 0.6rem;
  color: var(--accent-light);
}

.custody-title {
  font-size: 1rem;
  font-weight: 800;
  color: white;
  margin: 0 0 0.15rem 0;
  letter-spacing: 0.03em;
}

.custody-desc {
  font-size: 0.8rem;
  color: #94a3b8;
  margin: 0;
  line-height: 1.4;
}

/* ─── Center Link ─── */
.center-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60px;
  flex-shrink: 0;
  z-index: 5;
}

.link-line {
  width: 1px;
  flex: 1;
  background: linear-gradient(180deg, transparent, rgba(139, 92, 246, 0.15), transparent);
}

.link-badge {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0;
}

.link-badge i {
  font-size: 0.85rem;
  color: #a78bfa;
  opacity: 0.8;
}

/* ─── Insight Bar ─── */
.insight-bar {
  margin-top: 2rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1rem 1.8rem;
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(139, 92, 246, 0.1);
}

.insight-icon {
  width: 38px;
  height: 38px;
  background: linear-gradient(135deg, #7c3aed 0%, var(--accent) 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.insight-icon i {
  font-size: 0.95rem;
  color: white;
}

.insight-text {
  margin: 0;
  font-size: 0.9rem;
  color: #94a3b8;
  line-height: 1.5;
  flex-grow: 1;
}

.insight-text strong {
  color: white;
  font-weight: 700;
}

.insight-tag {
  font-size: 0.5rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: #a78bfa;
  opacity: 0.5;
  white-space: nowrap;
  padding: 0.25rem 0.7rem;
  border: 1px solid rgba(139, 92, 246, 0.15);
  border-radius: 6px;
}

/* ─── Responsive ─── */
@media (max-width: 1000px) {
  .forensics-split {
    flex-direction: column;
    gap: 1.5rem;
  }

  .center-link {
    flex-direction: row;
    width: auto;
    height: 40px;
  }

  .link-line {
    width: auto;
    height: 1px;
    flex: 1;
    background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.15), transparent);
  }
}
</style>
