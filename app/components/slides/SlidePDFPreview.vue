<template>
  <div class="slide-content slide-pdf">
    <div class="slide-inner">
      <div class="header-section">
        <span class="slide-number">11 / DOCUMENTATION</span>
        <h2 class="sub-title">Resource <span class="italic-serif">Repository</span> Preview</h2>
      </div>

      <div class="pdf-layout">
        <!-- PDF Document Mockup -->
        <div class="document-viewer reveal-doc">
          <div class="doc-stack doc-stack-3"></div>
          <div class="doc-stack doc-stack-2"></div>
          <div class="doc-main glass">
            <div class="doc-header">
              <div class="doc-title-bar">
                <i class="fa-solid fa-file-pdf text-red-500 me-2"></i>
                STRATEGI_SIBER_2026.pdf
              </div>
              <div class="doc-actions">
                <div class="dot red"></div>
                <div class="dot yellow"></div>
                <div class="dot green"></div>
              </div>
            </div>
            <div class="doc-content">
              <div class="skeleton-title"></div>
              <div class="skeleton-line"></div>
              <div class="skeleton-line"></div>
              <div class="skeleton-line w-2/3"></div>
              <div class="skeleton-img">
                <i class="fa-solid fa-shield-halved opacity-10 text-6xl"></i>
              </div>
              <div class="skeleton-line"></div>
              <div class="skeleton-line w-1/2"></div>
            </div>
            <div class="doc-footer">
              PAGE 1 OF 48
            </div>
            <div class="doc-overlay">
              <button class="btn-preview glass">
                <i class="fa-solid fa-eye me-2"></i> OPEN FULL PREVIEW
              </button>
            </div>
          </div>
        </div>

        <!-- Document Metadata -->
        <div class="document-info reveal-info">
          <div class="info-group glass">
            <div class="info-header">
              <i class="fa-solid fa-circle-info me-2"></i> DOCUMENT METADATA
            </div>
            <div class="info-rows">
              <div class="info-row">
                <span class="label">Classification</span>
                <span class="value text-red-500">Top Secret</span>
              </div>
              <div class="info-row">
                <span class="label">File Size</span>
                <span class="value">12.4 MB</span>
              </div>
              <div class="info-row">
                <span class="label">Last Modified</span>
                <span class="value">27 April 2026</span>
              </div>
              <div class="info-row">
                <span class="label">Authorized By</span>
                <span class="value">IT Division</span>
              </div>
            </div>
          </div>

          <div class="download-section">
            <button class="btn-download btn-gold">
              <i class="fa-solid fa-download me-2"></i> DOWNLOAD RESOURCE
            </button>
            <p class="download-hint">Secure link expires in 24 hours</p>
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

watch(() => props.active, (val) => {
  if (val) {
    gsap.fromTo('.slide-pdf .sub-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.2 });
    gsap.fromTo('.reveal-doc', { x: -50, opacity: 0, rotateY: 15 }, { x: 0, opacity: 1, rotateY: 0, duration: 1.5, delay: 0.4 });
    gsap.fromTo('.reveal-info', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, delay: 0.8 });
    gsap.fromTo('.doc-stack', { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.2, delay: 1 });
  }
}, { immediate: true });
</script>

<style scoped>
.slide-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10vw;
}

.slide-inner {
  max-width: 1200px;
  width: 100%;
}

.sub-title {
  font-size: 3.5rem;
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 5rem;
  color: white;
}

.italic-serif {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--accent);
}

.pdf-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 6rem;
  perspective: 1000px;
}

.document-viewer {
  position: relative;
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
}

.doc-main {
  width: 450px;
  height: 600px;
  background: white !important;
  color: #1e293b;
  border-radius: 4px;
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  box-shadow: 0 30px 60px -12px rgba(0,0,0,0.5);
  transform-style: preserve-3d;
}

.doc-stack {
  position: absolute;
  width: 450px;
  height: 600px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.doc-stack-2 { transform: translate(10px, 10px); z-index: 4; opacity: 0.6; }
.doc-stack-3 { transform: translate(20px, 20px); z-index: 3; opacity: 0.3; }

.doc-header {
  padding: 1rem 1.5rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.doc-title-bar { font-size: 0.8rem; font-weight: 600; color: #64748b; }
.doc-actions { display: flex; gap: 6px; }
.doc-actions .dot { width: 8px; height: 8px; border-radius: 50%; }
.doc-actions .red { background: #ff5f56; }
.doc-actions .yellow { background: #ffbd2e; }
.doc-actions .green { background: #27c93f; }

.doc-content {
  padding: 3rem;
  flex-grow: 1;
}

.skeleton-title { height: 24px; background: #f1f5f9; width: 60%; margin-bottom: 2rem; border-radius: 4px; }
.skeleton-line { height: 12px; background: #f1f5f9; width: 100%; margin-bottom: 1rem; border-radius: 2px; }
.skeleton-img { 
  height: 180px; 
  background: #f8fafc; 
  margin: 2.5rem 0; 
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.doc-footer {
  padding: 1rem;
  text-align: center;
  font-size: 0.7rem;
  font-weight: 700;
  color: #94a3b8;
  border-top: 1px solid #f1f5f9;
}

.doc-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;
}

.doc-main:hover .doc-overlay { opacity: 1; }

.btn-preview {
  padding: 1rem 1.5rem;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-weight: 600;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
}

/* Metadata Info */
.document-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
}

.info-group {
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.info-header {
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: var(--accent);
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.info-rows { display: flex; flex-direction: column; gap: 1.5rem; }
.info-row { display: flex; justify-content: space-between; align-items: center; }
.info-row .label { font-size: 0.75rem; color: rgba(255, 255, 255, 0.4); }
.info-row .value { font-size: 0.9rem; font-weight: 600; color: white; }

.download-section { text-align: center; }
.btn-download {
  width: 100%;
  padding: 1.25rem;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  border-radius: 8px;
  background: var(--accent);
  color: #000;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-download:hover {
  background: #fde68a;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(251, 191, 36, 0.2);
}

.download-hint {
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.3);
  margin-top: 1rem;
  font-style: italic;
}

@media (max-width: 1024px) {
  .pdf-layout { grid-template-columns: 1fr; gap: 4rem; }
  .document-info { max-width: 450px; margin: 0 auto; }
}
</style>
