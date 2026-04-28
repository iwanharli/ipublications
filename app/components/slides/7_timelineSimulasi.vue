<template>
  <div class="slide-content slide-simulation">
    <!-- Ambient effects -->
    <div class="ambient-orb orb-top"></div>
    <div class="ambient-orb orb-bottom"></div>
    <div class="grid-overlay"></div>

    <div class="slide-inner">
      <!-- Header -->
      <div class="header-section">
        <div class="header-badge">
          <span class="badge-pulse"></span>
          <span class="badge-label">INCIDENT RESPONSE SCENARIO</span>
        </div>
        <h1 class="slide-title">
          Timeline <span class="title-highlight">Simulasi Serangan</span>
        </h1>
        <p class="slide-subtitle">Visualisasi kronologi serangan ransomware dari initial access hingga ransom demand</p>
      </div>

      <!-- Vue Flow Attack Chain -->
      <div class="flow-container">
        <ClientOnly>
          <VueFlow
            v-model="flowElements"
            :fit-view-on-init="true"
            :default-edge-options="defaultEdgeOptions"
            :nodes-draggable="false"
            :nodes-connectable="false"
            :zoom-on-scroll="false"
            :zoom-on-pinch="false"
            :pan-on-drag="false"
            :prevent-scrolling="false"
            class="attack-flow"
          >
            <!-- Custom Attack Node -->
            <template #node-attack="{ data }">
              <div class="attack-node" :class="{ 'is-critical': data.critical }">
                <div class="attack-node-glow" :class="{ 'critical-glow': data.critical }"></div>
                <div class="attack-node-border" :class="{ 'critical-border': data.critical }"></div>
                <div class="attack-node-inner">
                  <div class="attack-node-header">
                    <div class="attack-time-badge" :class="{ 'time-critical': data.critical }">
                      <i class="fa-regular fa-clock"></i>
                      <span>{{ data.time }}</span>
                    </div>
                    <div v-if="data.critical" class="critical-badge">
                      <span class="critical-dot"></span>
                      CRITICAL
                    </div>
                  </div>
                  <div class="attack-icon-row">
                    <div class="attack-icon-wrap" :class="{ 'icon-critical': data.critical }">
                      <i :class="data.icon"></i>
                    </div>
                    <div class="attack-info">
                      <h3 class="attack-label">{{ data.label }}</h3>
                      <p class="attack-desc">{{ data.desc }}</p>
                    </div>
                  </div>
                  <div class="attack-phase-tag">
                    <span>{{ data.phase }}</span>
                  </div>
                </div>
              </div>
            </template>

            <Background :pattern-color="'rgba(59, 130, 246, 0.03)'" :gap="30" />
          </VueFlow>
        </ClientOnly>

        <!-- Legend overlay -->
        <div class="flow-legend">
          <div class="legend-item">
            <div class="legend-dot normal-dot"></div>
            <span>Normal Phase</span>
          </div>
          <div class="legend-item">
            <div class="legend-dot critical-dot-legend"></div>
            <span>Critical Phase</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import { VueFlow, useVueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import gsap from 'gsap';

import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';

const props = defineProps({
  active: Boolean
});

const { fitView } = useVueFlow();

const defaultEdgeOptions = {
  type: 'smoothstep',
  animated: true,
  style: { stroke: '#3B82F6', strokeWidth: 2 }
};

const flowElements = ref([
  // Row 1 (Left to Right)
  {
    id: 'n1',
    type: 'attack',
    position: { x: 0, y: 0 },
    sourcePosition: 'right',
    data: {
      time: '09:00',
      label: 'Initial Access',
      desc: 'Email phishing masuk ke kotak masuk departemen.',
      icon: 'fa-solid fa-envelope',
      phase: 'RECONNAISSANCE',
      critical: false
    }
  },
  {
    id: 'n2',
    type: 'attack',
    position: { x: 480, y: 0 },
    targetPosition: 'left',
    sourcePosition: 'right',
    data: {
      time: '09:05',
      label: 'Human Error',
      desc: 'Satu staf mengklik tautan berbahaya dan mengunduh payload.',
      icon: 'fa-solid fa-mouse',
      phase: 'EXPLOITATION',
      critical: false
    }
  },
  {
    id: 'n3',
    type: 'attack',
    position: { x: 960, y: 0 },
    targetPosition: 'left',
    sourcePosition: 'bottom',
    data: {
      time: '09:30',
      label: 'Lateral Movement',
      desc: 'Malware menyebar melalui jaringan internal.',
      icon: 'fa-solid fa-network-wired',
      phase: 'PROPAGATION',
      critical: false
    }
  },
  
  // Row 2 (Right to Left)
  {
    id: 'n4',
    type: 'attack',
    position: { x: 960, y: 280 },
    targetPosition: 'top',
    sourcePosition: 'left',
    data: {
      time: '10:00',
      label: 'Data Encryption',
      desc: 'Seluruh database operasional terenkripsi.',
      icon: 'fa-solid fa-lock',
      phase: 'PAYLOAD ACTIVE',
      critical: true
    }
  },
  {
    id: 'n5',
    type: 'attack',
    position: { x: 480, y: 280 },
    targetPosition: 'right',
    data: {
      time: '10:01',
      label: 'Ransom Demand',
      desc: 'Pesan tebusan muncul di seluruh terminal.',
      icon: 'fa-solid fa-skull',
      phase: 'ENDGAME',
      critical: true
    }
  },

  // Edges
  {
    id: 'e1-2',
    source: 'n1',
    target: 'n2',
    style: { stroke: '#3B82F6', strokeWidth: 2.5 }
  },
  {
    id: 'e2-3',
    source: 'n2',
    target: 'n3',
    style: { stroke: '#3B82F6', strokeWidth: 2.5 }
  },
  {
    id: 'e3-4',
    source: 'n3',
    target: 'n4',
    label: 'ESCALATION',
    labelStyle: { fill: '#ef4444', fontSize: 11, fontWeight: 800, letterSpacing: '0.15em' },
    labelBgStyle: { fill: 'rgba(239, 68, 68, 0.1)', rx: 6 },
    labelBgPadding: [8, 5],
    style: { stroke: '#ef4444', strokeWidth: 2.5 }
  },
  {
    id: 'e4-5',
    source: 'n4',
    target: 'n5',
    style: { stroke: '#ef4444', strokeWidth: 3 }
  }
]);

watch(() => props.active, async (val) => {
  if (val) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.slide-simulation .header-badge',
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    );
    tl.fromTo('.slide-simulation .slide-title',
      { y: 30, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
      { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 0.8 },
      '-=0.2'
    );
    tl.fromTo('.slide-simulation .slide-subtitle',
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      '-=0.4'
    );
    tl.fromTo('.flow-container',
      { scale: 0.92, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1 },
      '-=0.2'
    );
    tl.fromTo('.flow-legend',
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      '-=0.4'
    );

    // Ambient float
    gsap.to('.orb-top', { x: 25, y: -15, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.orb-bottom', { x: -20, y: 12, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    await nextTick();
    setTimeout(() => {
      fitView({ padding: 0.1 });
    }, 600);
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

.orb-top {
  width: 450px;
  height: 450px;
  background: rgba(30, 64, 175, 0.1);
  top: -8%;
  right: -3%;
}

.orb-bottom {
  width: 350px;
  height: 350px;
  background: rgba(239, 68, 68, 0.06);
  bottom: -6%;
  left: -2%;
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
  max-width: 1400px;
  position: relative;
  z-index: 1;
}

/* ─── Header ─── */
.header-section {
  text-align: center;
  margin-bottom: 1.5rem;
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
  font-size: clamp(2rem, 3.5vw, 2.8rem);
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
  font-size: 0.9rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  margin-top: 0.6rem;
}

/* ─── Flow Container ─── */
.flow-container {
  width: 100%;
  height: 620px;
  background: rgba(15, 23, 42, 0.3);
  border: 1px solid rgba(59, 130, 246, 0.08);
  border-radius: 24px;
  position: relative;
  overflow: hidden;
}

.attack-flow {
  width: 100%;
  height: 100%;
}

/* ─── Legend ─── */
.flow-legend {
  position: absolute;
  bottom: 1rem;
  right: 1.5rem;
  display: flex;
  gap: 1.5rem;
  z-index: 10;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.normal-dot { background: var(--accent-light); }
.critical-dot-legend { background: #ef4444; }

.legend-item span {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
}

/* ─── Attack Node ─── */
.attack-node {
  width: 380px;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.attack-node:hover {
  transform: translateY(-4px);
}

.attack-node-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center top, rgba(59, 130, 246, 0.06) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.attack-node:hover .attack-node-glow {
  opacity: 1;
}

.critical-glow {
  background: radial-gradient(ellipse at center top, rgba(239, 68, 68, 0.08) 0%, transparent 70%) !important;
}

.attack-node-border {
  position: absolute;
  inset: 0;
  border-radius: 20px;
  padding: 1.5px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.05) 40%, rgba(255, 255, 255, 0.15) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  z-index: 2;
}

.critical-border {
  background: linear-gradient(180deg, rgba(239, 68, 68, 0.6) 0%, rgba(239, 68, 68, 0.15) 40%, rgba(239, 68, 68, 0.3) 100%) !important;
}

.attack-node-inner {
  background: rgba(2, 6, 23, 0.95);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-radius: 20px;
  padding: 1.6rem 1.8rem;
  position: relative;
  z-index: 1;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.attack-node-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.attack-time-badge {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.attack-time-badge i {
  font-size: 0.7rem;
  color: var(--accent-light);
}

.attack-time-badge span {
  font-family: var(--font-mono, monospace);
  font-size: 0.9rem;
  font-weight: 800;
  color: #60a5fa;
  letter-spacing: 0.05em;
}

.time-critical {
  background: rgba(239, 68, 68, 0.08) !important;
  border-color: rgba(239, 68, 68, 0.2) !important;
}

.time-critical i,
.time-critical span {
  color: #ef4444 !important;
}

.critical-badge {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.5rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: #ef4444;
  padding: 0.15rem 0.5rem;
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: 4px;
}

.critical-dot {
  width: 5px;
  height: 5px;
  background: #ef4444;
  border-radius: 50%;
  animation: blink-critical 1.5s infinite;
}

@keyframes blink-critical {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
}

.attack-icon-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.8rem;
}

.attack-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.attack-icon-wrap i {
  font-size: 1.4rem;
  color: #60a5fa;
  filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5));
}

.icon-critical {
  background: rgba(239, 68, 68, 0.1) !important;
  border-color: rgba(239, 68, 68, 0.2) !important;
}

.icon-critical i {
  color: #ef4444 !important;
  filter: drop-shadow(0 0 6px rgba(239, 68, 68, 0.3)) !important;
}

.attack-info {
  flex-grow: 1;
  min-width: 0;
}

.attack-label {
  font-size: 1.2rem;
  font-weight: 800;
  color: #f1f5f9;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 0.3rem 0;
  line-height: 1.2;
}

.attack-desc {
  font-size: 0.9rem;
  color: #94a3b8;
  margin: 0;
  line-height: 1.5;
}

.attack-phase-tag {
  padding-top: 0.6rem;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}

.attack-phase-tag span {
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  color: rgba(96, 165, 250, 0.5);
  text-transform: uppercase;
}

.is-critical .attack-phase-tag span {
  color: rgba(239, 68, 68, 0.6);
}

/* ─── Vue Flow Overrides ─── */
:deep(.vue-flow__edge-path) {
  stroke-dasharray: none;
  stroke-linecap: round;
}

:deep(.vue-flow__edge-path[style*="stroke: #3B82F6"]) {
  filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.4));
}

:deep(.vue-flow__edge-path[style*="stroke: #ef4444"]) {
  filter: drop-shadow(0 0 4px rgba(239, 68, 68, 0.4));
}

:deep(.vue-flow__handle) {
  background: var(--accent-light);
  width: 6px;
  height: 6px;
  border: 2px solid rgba(15, 23, 42, 0.9);
}

:deep(.vue-flow__panel) {
  display: none;
}

:deep(.vue-flow__minimap) {
  display: none;
}

:deep(.vue-flow__attribution) {
  display: none;
}

/* ─── Responsive ─── */
@media (max-width: 1100px) {
  .flow-container {
    height: 450px;
  }
}
</style>
