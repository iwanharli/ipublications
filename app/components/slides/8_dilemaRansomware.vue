<template>
  <div class="slide-content slide-dilemma">
    <!-- Ambient effects -->
    <div class="ambient-orb orb-danger"></div>
    <div class="ambient-orb orb-cold"></div>
    <div class="grid-overlay"></div>

    <div class="scroll-wrapper" ref="scrollWrapper">
      <div class="slide-inner">
        <div class="header-section">
          <div class="header-badge">
            <span class="badge-pulse"></span>
            <span class="badge-label">CRITICAL DECISION MAKING</span>
          </div>
          <h1 class="slide-title">
            Dilema <span class="title-danger">Ransomware</span>
          </h1>
          <p class="slide-subtitle">Alur analisis keputusan strategis pasca insiden</p>
        </div>
        
        <div class="dilemma-tree">
          <!-- TOP: Incident -->
          <div class="tree-row row-top">
            <div class="tree-node node-incident">
              <div class="node-icon"><i class="fa-solid fa-triangle-exclamation"></i></div>
              <div class="node-content">
                <h4>Serangan Terjadi</h4>
                <p>Sistem utama terkunci, layanan publik lumpuh, dan data disandera.</p>
                <span class="node-tag tag-red">INCIDENT</span>
              </div>
            </div>
          </div>

          <!-- Split Branch -->
          <div class="tree-branch split-down"></div>

          <!-- MIDDLE: Options -->
          <div class="tree-row row-middle">
            <div class="tree-node node-option-a">
              <div class="node-icon"><i class="fa-solid fa-hand-holding-dollar"></i></div>
              <div class="node-content">
                <h4>Opsi A: Membayar</h4>
                <p>Berisiko mendanai kriminal, tanpa ada jaminan data akan kembali utuh.</p>
                <span class="node-tag tag-orange">HIGH RISK</span>
              </div>
            </div>
            
            <div class="vs-badge">VS</div>

            <div class="tree-node node-option-b">
              <div class="node-icon"><i class="fa-solid fa-ban"></i></div>
              <div class="node-content">
                <h4>Opsi B: Tidak Membayar</h4>
                <p>Layanan terganggu lebih lama dan data berpotensi dibocorkan ke publik.</p>
                <span class="node-tag tag-blue">DISRUPTIVE</span>
              </div>
            </div>
          </div>

          <!-- Merge Branch -->
          <div class="tree-branch merge-down"></div>

          <!-- BOTTOM: Impact -->
          <div class="tree-row row-bottom">
            <div class="tree-node node-impact">
              <div class="node-icon"><i class="fa-solid fa-bullseye"></i></div>
              <div class="node-content">
                <h4>Dampak Strategis</h4>
                <p>Mengancam aspek operasional, bukti digital hukum, hingga reputasi institusi.</p>
                <span class="node-tag tag-purple">CORE ISSUE</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Real World Case Alert -->
        <div class="alert-section reveal-alert">
          <div class="alert-header">
            <i class="fa-solid fa-triangle-exclamation text-danger pulse"></i>
            <h3>Ancaman Siber Bermotif Politik</h3>
          </div>
          <p class="alert-subtitle">Klaim Kebocoran 41GB Data Institusi Pemerintah Indonesia</p>

          <div class="alert-card">
            <div class="forum-image-wrapper">
              <img src="/leak2.png" alt="Dark Web Post - 41GB Government Data" class="forum-image" />
            </div>
            
            <div class="alert-text">
              <p><strong>SOCRadar</strong> mengidentifikasi unggahan di forum <em>dark web</em> yang mengklaim penjualan <strong>41GB dokumen sensitif</strong> yang diduga dicuri dari berbagai entitas pemerintah Indonesia.</p>
              <p>Peretas menyatakan bahwa serangan ini bermotif politik, dipicu oleh kemarahan terhadap pemerintah terkait aktivitas media sosial tertentu. Aktor ancaman tersebut secara spesifik mengklaim:</p>
              <ul class="alert-list">
                <li><i class="fa-solid fa-calendar-xmark"></i> Akan meluncurkan gelombang serangan siber pada <strong>17 Agustus</strong> (Libur Hari Kemerdekaan RI).</li>
                <li><i class="fa-solid fa-file-shield"></i> Data yang dikompromikan mencakup <strong>"dokumen rahasia"</strong> dari beberapa kementerian pemerintah.</li>
                <li><i class="fa-solid fa-triangle-exclamation"></i> Menyediakan saluran Telegram sebagai titik kontak dan sarana kebocoran data lebih lanjut.</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Additional Details Footer -->
        <div class="process-footer reveal-footer">
          <div class="footer-stat">
            <span class="label">Case Ref</span>
            <span class="value" style="font-size: 1.2rem;">Insiden PDNS (Juni 2024)</span>
          </div>
          <div class="footer-stat">
            <span class="label">Core Focus</span>
            <span class="value" style="font-size: 1.2rem;">Reputasi & Kepercayaan</span>
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

const handleKeyDown = (e) => {
  if (!props.active || !scrollWrapper.value) return;
  const step = 200;
  if (e.key === 'ArrowDown') {
    e.stopPropagation();
    e.preventDefault();
    scrollWrapper.value.scrollBy({ top: step, behavior: 'smooth' });
  } else if (e.key === 'ArrowUp') {
    e.stopPropagation();
    e.preventDefault();
    scrollWrapper.value.scrollBy({ top: -step, behavior: 'smooth' });
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

    tl.fromTo('.slide-dilemma .header-badge', { y: -15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
    tl.fromTo('.slide-dilemma .slide-title', { y: 30, opacity: 0, clipPath: 'inset(100% 0 0 0)' }, { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 0.8 }, '-=0.2');
    tl.fromTo('.slide-dilemma .slide-subtitle', { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.4');
    
    // Animate Tree Nodes
    tl.fromTo('.row-top .tree-node', { y: 30, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.6 }, '-=0.2');
    
    // Animate Branches
    tl.fromTo('.split-down', { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, transformOrigin: 'top center', duration: 0.5 }, '-=0.2');
    
    // Middle row
    tl.fromTo('.row-middle .tree-node', { y: 30, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.2 }, '-=0.1');
    tl.fromTo('.vs-badge', { scale: 0, opacity: 0, rotation: -45 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: 'back.out(2)' }, '-=0.4');

    // Bottom branch
    tl.fromTo('.merge-down', { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, transformOrigin: 'bottom center', duration: 0.5 }, '-=0.2');

    // Bottom row
    tl.fromTo('.row-bottom .tree-node', { y: 30, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.6 }, '-=0.1');

    // Alert Section
    tl.fromTo('.reveal-alert', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.2');

    tl.fromTo('.reveal-footer', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4');

    // Ambient
    gsap.to('.orb-danger', { x: 25, y: -15, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.orb-cold', { x: -20, y: 12, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }
}, { immediate: true });
</script>

<style scoped>
.slide-content {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.scroll-wrapper {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  padding: 8rem 6vw 8rem 6vw;
  scrollbar-width: thin;
  scrollbar-color: var(--accent-light) transparent;
}

.scroll-wrapper::-webkit-scrollbar { width: 4px; }
.scroll-wrapper::-webkit-scrollbar-track { background: transparent; }
.scroll-wrapper::-webkit-scrollbar-thumb { background: #ef4444; border-radius: 10px; }

/* ─── Ambient ─── */
.ambient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(130px);
  pointer-events: none;
  z-index: 0;
}

.orb-danger {
  width: 450px;
  height: 450px;
  background: rgba(239, 68, 68, 0.06);
  top: -5%;
  left: -3%;
}

.orb-cold {
  width: 380px;
  height: 380px;
  background: rgba(59, 130, 246, 0.05);
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
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 1;
}

/* ─── Header ─── */
.header-section {
  text-align: center;
  margin-bottom: 2.5rem;
  margin-top: 3rem;
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
  font-size: clamp(2rem, 3.5vw, 2.8rem);
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

.slide-subtitle {
  font-size: 0.95rem;
  color: var(--text-muted);
  letter-spacing: 0.04em;
  margin-top: 0.8rem;
}

/* ─── Dilemma Tree Grid ─── */
.dilemma-tree {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
}

.tree-row {
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
  z-index: 2;
}

.row-middle {
  gap: 6rem;
}

/* ─── Branches ─── */
.tree-branch {
  width: calc(380px + 6rem); /* Node width (380) + Gap (6rem ~96px) */
  position: relative;
  z-index: 1;
}

.split-down {
  height: 2.5rem;
  border-top: 2px dashed rgba(255, 255, 255, 0.2);
  border-left: 2px dashed rgba(255, 255, 255, 0.2);
  border-right: 2px dashed rgba(255, 255, 255, 0.2);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  margin-top: 2.5rem;
}

.split-down::before {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 50%;
  width: 2px;
  height: 2.5rem;
  border-left: 2px dashed rgba(255, 255, 255, 0.2);
  transform: translateX(-50%);
}

.merge-down {
  height: 2.5rem;
  border-bottom: 2px dashed rgba(255, 255, 255, 0.2);
  border-left: 2px dashed rgba(255, 255, 255, 0.2);
  border-right: 2px dashed rgba(255, 255, 255, 0.2);
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  margin-bottom: 2.5rem;
}

.merge-down::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  width: 2px;
  height: 2.5rem;
  border-left: 2px dashed rgba(255, 255, 255, 0.2);
  transform: translateX(-50%);
}

/* ─── VS Badge ─── */
.vs-badge {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background: #0f172a;
  border: 2px solid #334155;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  color: #94a3b8;
  font-size: 1.1rem;
  z-index: 5;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
}

/* ─── Tree Node ─── */
.tree-node {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.5rem 1.8rem;
  width: 380px;
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.tree-node:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.5);
}

.node-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
  box-shadow: inset 0 2px 10px rgba(255,255,255,0.1);
}

.node-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.node-content h4 {
  font-size: 1.1rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.node-content p {
  font-size: 0.85rem;
  color: #94a3b8;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.node-tag {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  border: 1px solid;
}

/* ─── Thematic Colors ─── */
.node-incident { border-color: rgba(239, 68, 68, 0.3); background: rgba(239, 68, 68, 0.05); }
.node-incident .node-icon { background: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); }
.tag-red { color: #ef4444; border-color: rgba(239, 68, 68, 0.4); background: rgba(239, 68, 68, 0.1); }

.node-option-a { border-color: rgba(245, 158, 11, 0.3); background: rgba(245, 158, 11, 0.05); }
.node-option-a .node-icon { background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); }
.tag-orange { color: #f59e0b; border-color: rgba(245, 158, 11, 0.4); background: rgba(245, 158, 11, 0.1); }

.node-option-b { border-color: rgba(59, 130, 246, 0.3); background: rgba(59, 130, 246, 0.05); }
.node-option-b .node-icon { background: rgba(59, 130, 246, 0.15); color: #3b82f6; border: 1px solid rgba(59, 130, 246, 0.3); }
.tag-blue { color: #3b82f6; border-color: rgba(59, 130, 246, 0.4); background: rgba(59, 130, 246, 0.1); }

.node-impact { border-color: rgba(168, 85, 247, 0.3); background: rgba(168, 85, 247, 0.05); }
.node-impact .node-icon { background: rgba(168, 85, 247, 0.15); color: #a855f7; border: 1px solid rgba(168, 85, 247, 0.3); }
.tag-purple { color: #a855f7; border-color: rgba(168, 85, 247, 0.4); background: rgba(168, 85, 247, 0.1); }

/* ─── Footer ─── */
.process-footer {
  margin-top: 4rem;
  padding-top: 2.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  gap: 4rem;
  justify-content: center;
}

.footer-stat {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.footer-stat .label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #64748b;
  font-weight: 700;
}

.footer-stat .value {
  color: white;
  font-weight: 700;
}

/* ─── Alert Section ─── */
.alert-section {
  margin-top: 6rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.alert-header {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 0.5rem;
  justify-content: center;
}

.alert-header i {
  font-size: 1.8rem;
}

.text-danger { color: #ef4444; }
.pulse { animation: pulse-danger 2s infinite; }

@keyframes pulse-danger {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}

.alert-header h3 {
  font-size: 1.6rem;
  font-weight: 700;
  color: white;
  margin: 0;
  letter-spacing: 0.02em;
}

.alert-subtitle {
  font-size: 1rem;
  color: #94a3b8;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  text-align: center;
}

.alert-card {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 20px;
  padding: 2.5rem;
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 40px rgba(0,0,0,0.4);
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.forum-image-wrapper {
  background: #1e293b;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #334155;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  width: 100%;
}

.forum-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
}

.alert-text {
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.85);
}

.alert-text strong {
  color: white;
}

.alert-list {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.alert-list li {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.03);
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.95rem;
}

.alert-list li i {
  color: #3b82f6;
  width: 20px;
  text-align: center;
}

@media (max-width: 1024px) {
  .row-middle { flex-direction: column; gap: 2rem; }
  .tree-branch { display: none; }
  .vs-badge { position: relative; margin: 1rem auto; transform: none; top: auto; left: auto; }
}
</style>
