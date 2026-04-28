<template>
  <div class="slide-content slide-data-table">
    <div class="slide-inner">
      <span class="slide-number">10 / ANALYTICS</span>
      <h2 class="sub-title">Statistical <span class="italic-serif">Intelligence</span> Data</h2>
      
      <div class="table-container glass reveal-table">
        <table class="premium-table">
          <thead>
            <tr>
              <th><i class="fa-solid fa-map-location-dot me-2"></i> Regional Division</th>
              <th><i class="fa-solid fa-folder-open me-2"></i> Total Cases</th>
              <th><i class="fa-solid fa-circle-check me-2"></i> Solved</th>
              <th><i class="fa-solid fa-chart-line me-2"></i> Efficiency</th>
              <th><i class="fa-solid fa-shield me-2"></i> Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in tableData" :key="i" class="table-row">
              <td class="region-cell">
                <span class="rank-num">{{ i + 1 }}</span>
                {{ row.region }}
              </td>
              <td class="num-cell">{{ row.total.toLocaleString() }}</td>
              <td class="num-cell">{{ row.solved.toLocaleString() }}</td>
              <td>
                <div class="progress-cell">
                  <div class="progress-bg">
                    <div class="progress-fill" :style="{ width: row.rate + '%' }"></div>
                  </div>
                  <span class="rate-val">{{ row.rate }}%</span>
                </div>
              </td>
              <td>
                <span class="status-badge" :class="row.status.toLowerCase()">
                  {{ row.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="table-footer">
        <div class="last-update">
          <i class="fa-solid fa-clock-rotate-left me-2"></i> DATA SYNCHRONIZED: 28 APRIL 2026 07:40
        </div>
        <div class="source">SOURCE: COMMAND CENTER INTERNAL REPOSITORY</div>
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

const tableData = ref([
  { region: 'METRO JAYA', total: 12450, solved: 11820, rate: 94.9, status: 'SECURE' },
  { region: 'JAWA BARAT', total: 8240, solved: 7650, rate: 92.8, status: 'STABLE' },
  { region: 'JAWA TENGAH', total: 6120, solved: 5980, rate: 97.7, status: 'SECURE' },
  { region: 'JAWA TIMUR', total: 9850, solved: 8920, rate: 90.5, status: 'MONITOR' },
  { region: 'BALI', total: 3420, solved: 3310, rate: 96.8, status: 'SECURE' },
  { region: 'SUMATERA UTARA', total: 5630, solved: 4890, rate: 86.8, status: 'WARNING' },
  { region: 'SULAWESI SELATAN', total: 4210, solved: 3950, rate: 93.8, status: 'STABLE' }
]);

watch(() => props.active, (val) => {
  if (val) {
    gsap.fromTo('.slide-data-table .sub-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.2 });
    gsap.fromTo('.slide-data-table .table-container', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.4 });
    gsap.fromTo('.slide-data-table .table-row', { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.6 });
  }
}, { immediate: true });
</script>

<style scoped>
.slide-content {
  height: 100%;
  width: 100%;
  position: relative;
}

.slide-inner {
  height: 100%;
  padding: 6rem 10vw;
  display: flex;
  flex-direction: column;
}

.slide-number {
  font-size: 0.8rem;
  letter-spacing: 0.4em;
  color: var(--accent);
  margin-bottom: 2rem;
  display: block;
}

.sub-title {
  font-size: 3.5rem;
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 3rem;
  color: white;
}

.italic-serif {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--accent);
}

.table-container {
  width: 100%;
  overflow: hidden;
  margin-bottom: 2rem;
}

.premium-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.premium-table th {
  padding: 1.5rem 1rem;
  background: rgba(251, 191, 36, 0.05);
  border-bottom: 2px solid var(--accent);
  color: var(--accent);
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.premium-table td {
  padding: 1.25rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
}

.table-row {
  transition: all 0.3s ease;
}

.table-row:hover {
  background: rgba(251, 191, 36, 0.02);
  color: white;
}

.region-cell {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-weight: 600;
  color: white;
}

.rank-num {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.8rem;
  color: var(--accent);
  opacity: 0.5;
  width: 20px;
}

.num-cell {
  font-family: monospace;
  font-size: 1.1rem;
  letter-spacing: 0.05em;
}

/* Progress Cell */
.progress-cell {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-bg {
  flex-grow: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  max-width: 120px;
}

.progress-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 10px;
  box-shadow: 0 0 10px var(--accent-glow);
}

.rate-val {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--accent);
  min-width: 45px;
}

/* Badges */
.status-badge {
  font-size: 0.65rem;
  font-weight: 800;
  padding: 0.4rem 0.8rem;
  border-radius: 50px;
  letter-spacing: 0.05em;
}

.status-badge.secure {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.status-badge.stable {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.status-badge.monitor {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.2);
}

.status-badge.warning {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
  animation: pulse-glow 2s infinite;
}

@keyframes pulse-glow {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

.table-footer {
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
}

.last-update, .source {
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.3);
}

.source {
  font-weight: 700;
  color: rgba(255, 255, 255, 0.2);
}
</style>
