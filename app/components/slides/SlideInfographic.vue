<template>
  <div class="slide-content slide-infographic">
    <div class="slide-inner">
      <span class="slide-number">12 / OPERATIONAL READINESS</span>
      <h2 class="sub-title">Intelligence <span class="italic-serif">& Capabilities</span></h2>
      
      <div class="infographic-grid">
        <!-- Main Radar Chart -->
        <div class="chart-card glass reveal-left">
          <div class="card-header">
            <h3>CAPABILITIES ASSESSMENT</h3>
            <p>Institutional Strength Index</p>
          </div>
          <div class="chart-wrapper">
            <ClientOnly>
              <apexchart 
                type="radar" 
                height="350" 
                :options="radarOptions" 
                :series="radarSeries"
              ></apexchart>
            </ClientOnly>
          </div>
        </div>

        <!-- Right Side: Radial & Metrics -->
        <div class="metrics-column">
          <div class="chart-card glass reveal-right mb-4">
            <div class="card-header">
              <h3>SYSTEM READINESS</h3>
            </div>
            <div class="chart-wrapper radial-wrapper">
              <ClientOnly>
                <apexchart 
                  type="radialBar" 
                  height="250" 
                  :options="radialOptions" 
                  :series="radialSeries"
                ></apexchart>
              </ClientOnly>
            </div>
          </div>

          <div class="chart-card glass reveal-right">
            <div class="card-header">
              <h3>KEY INDICATORS</h3>
            </div>
            <div class="simple-metrics">
              <div class="m-item">
                <span class="m-label">NETWORK UPTIME</span>
                <span class="m-value">99.99%</span>
              </div>
              <div class="m-item">
                <span class="m-label">RESPONSE TIME</span>
                <span class="m-value">12.4ms</span>
              </div>
              <div class="m-item">
                <span class="m-label">THREAT LEVEL</span>
                <span class="m-value text-accent">LOW</span>
              </div>
            </div>
          </div>
        </div>
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

// Radar Chart Data
const radarSeries = ref([{
  name: 'Current Performance',
  data: [80, 50, 30, 40, 100, 20],
}]);

const radarOptions = ref({
  chart: {
    toolbar: { show: false },
    dropShadow: { enabled: true, blur: 8, left: 1, top: 1, opacity: 0.2 }
  },
  colors: ['#FBBF24'],
  stroke: { show: true, width: 2, colors: ['#FBBF24'], dashArray: 0 },
  fill: { opacity: 0.2, colors: ['#FBBF24'] },
  markers: { size: 4, colors: ['#FBBF24'], strokeColors: '#fff', strokeWidth: 2 },
  xaxis: {
    categories: ['Cyber', 'Tactical', 'Intel', 'Logistics', 'Response', 'Legal'],
    labels: { style: { colors: '#94A3B8', fontSize: '11px', fontWeight: 600 } }
  },
  yaxis: { show: false },
  grid: { strokeDashArray: 4, borderColor: 'rgba(255, 255, 255, 0.05)' },
  plotOptions: {
    radar: {
      polygons: {
        strokeColors: 'rgba(255, 255, 255, 0.1)',
        connectorColors: 'rgba(255, 255, 255, 0.1)',
        fill: { colors: ['transparent', 'rgba(255, 255, 255, 0.02)'] }
      }
    }
  }
});

// Radial Bar Data
const radialSeries = ref([84]);
const radialOptions = ref({
  chart: { sparkline: { enabled: true } },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      hollow: { size: '60%' },
      track: { background: 'rgba(255, 255, 255, 0.05)', strokeWidth: '100%' },
      dataLabels: {
        name: { show: false },
        value: {
          offsetY: -10,
          fontSize: '32px',
          fontWeight: 700,
          color: '#fff',
          formatter: (val) => val + '%'
        }
      }
    }
  },
  colors: ['#FBBF24'],
  fill: {
    type: 'gradient',
    gradient: { shade: 'dark', type: 'horizontal', gradientToColors: ['#D97706'], stops: [0, 100] }
  }
});

watch(() => props.active, (val) => {
  if (val) {
    gsap.fromTo('.slide-infographic .sub-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.2 });
    gsap.fromTo('.reveal-left', { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, delay: 0.4 });
    gsap.fromTo('.reveal-right', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, stagger: 0.2, delay: 0.6 });
  }
}, { immediate: true });
</script>

<style scoped>
.slide-content {
  height: 100%;
  width: 100%;
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

.infographic-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 2rem;
  flex-grow: 1;
}

.chart-card {
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.card-header {
  margin-bottom: 1.5rem;
}

.card-header h3 {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: white;
  margin-bottom: 0.25rem;
}

.card-header p {
  font-size: 0.7rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.chart-wrapper {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.radial-wrapper {
  min-height: 200px;
}

.metrics-column {
  display: flex;
  flex-direction: column;
}

.mb-4 { margin-bottom: 1.5rem; }

.simple-metrics {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.m-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.m-item:last-child { border-bottom: none; }

.m-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.1em;
}

.m-value {
  font-family: monospace;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
}

.text-accent { color: var(--accent); }

@media (max-width: 1024px) {
  .infographic-grid {
    grid-template-columns: 1fr;
  }
}
</style>
