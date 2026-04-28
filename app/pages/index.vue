<template>
  <div class="dashboard-page">
    <div class="container">


      <!-- Main Content with Transition (Simplified Overlap) -->
      <Transition name="content-fade">
        <div class="presentation-container">
          <div class="presentation-grid">
            <!-- Real Cards -->
            <PublicationsCard 
              v-for="(item, index) in displayedProjects" 
              :key="index" 
              :item="item" 
              @open-modal="openAccessModal" 
              class="reveal-item" 
            />
          </div>
          
          <!-- Load More Sentinel -->
          <div v-if="hasMore" ref="loadMoreRef" class="load-more-container">
            <div class="load-more-spinner"></div>
            <span class="load-more-text">FETCHING MORE DATA...</span>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Access Modal -->
    <PublicationsAccessModal 
      :is-open="isModalOpen" 
      :project="selectedProject" 
      @close="closeModal" 
    />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick, ref, computed, watch } from 'vue';
import gsap from 'gsap';

const searchQuery = useState('searchQuery');
const selectedType = useState('selectedType');

const isModalOpen = ref(false);
const selectedProject = ref(null);
const displayedCount = ref(9);
const loadMoreRef = ref(null);
const isFetchingMore = ref(false);

const hasMore = computed(() => displayedCount.value < filteredProjects.value.length);

const displayedProjects = computed(() => {
  return filteredProjects.value.slice(0, displayedCount.value);
});

onMounted(() => {
  // Trigger animations after content is rendered
  setTimeout(() => {
    runAnimations();
    setupInfiniteScroll();
  }, 100);
});

const setupInfiniteScroll = () => {
  if (!import.meta.client) return;
  
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMore.value && !isFetchingMore.value) {
      loadMore();
    }
  }, { threshold: 0.5 });

  if (loadMoreRef.value) {
    observer.observe(loadMoreRef.value);
  }
};

const loadMore = () => {
  isFetchingMore.value = true;
  // Simulate network latency for feel
  setTimeout(() => {
    displayedCount.value += 9;
    isFetchingMore.value = false;
  }, 800);
};

const openAccessModal = (project) => {
  selectedProject.value = project;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};


const { data: dbProjects, pending: isLoading } = await useFetch('/api/projects');
const projects = computed(() => dbProjects.value || []);

const filteredProjects = computed(() => {
  let result = projects.value;
  if (selectedType.value !== 'all') {
    result = result.filter(p => p.type === selectedType.value);
  }
  if (searchQuery.value) {
    result = result.filter(p => p.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
  }
  return result;
});
const runAnimations = async (isAppend = false) => {
  if (filteredProjects.value.length > 0 && import.meta.client) {
    await nextTick();
    
    if (!isAppend) {
      document.querySelectorAll('.reveal-item').forEach(el => el.classList.remove('revealed'));
    }
    
    const unrevealed = gsap.utils.toArray('.reveal-item:not(.revealed)');
    if (unrevealed.length === 0) return;

    gsap.set(unrevealed, { 
      opacity: 0, 
      y: 20 
    });

    gsap.to(unrevealed, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: {
        amount: Math.min(0.8, unrevealed.length * 0.1),
        ease: 'power2.inOut'
      },
      ease: 'expo.out',
      delay: isAppend ? 0 : 0.2,
      onComplete: () => {
        unrevealed.forEach(el => el.classList.add('revealed'));
      }
    });
  }
};

watch(displayedProjects, (newList, oldList) => {
  if (!isLoading.value) {
    runAnimations(true);
  }
});

watch(filteredProjects, () => {
  displayedCount.value = 9; // Reset scroll when filters change
  if (!isLoading.value) runAnimations(false);
});

onUnmounted(() => {
  gsap.killTweensOf('.reveal-item');
});
</script>

<style scoped>
.dashboard-page {
  padding: 140px 0 80px;
  min-height: 100vh;
  position: relative;
}

.dashboard-page.is-loading {
  height: 100vh;
  overflow: hidden;
}

.container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 2rem;
}


/* Presentation Grid */
.presentation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 2rem;
}

.pres-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 32px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.pres-card:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.pres-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 100px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: rgba(34, 197, 94, 0.1);
  color: #4ade80;
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.status-badge.restricted {
  background: rgba(244, 63, 94, 0.1);
  color: #f43f5e;
  border-color: rgba(244, 63, 94, 0.2);
}

.pres-options {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pres-id {
  font-family: monospace;
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.2);
  letter-spacing: 0.1em;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.03);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
}

.btn-icon-small {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

.btn-icon-small:hover {
  color: white;
}

.pres-card-body {
  flex-grow: 1;
  margin-bottom: 2rem;
}

.pres-name-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.file-type-icon {
  font-size: 1.5rem;
  margin-top: 0.25rem;
}

.pres-name {
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.3;
  font-family: var(--font-heading);
  background: linear-gradient(
    110deg,
    rgba(255, 255, 255, 0.85) 0%,
    rgba(255, 255, 255, 0.85) 40%,
    #ffffff 50%,
    rgba(255, 255, 255, 0.85) 60%,
    rgba(255, 255, 255, 0.85) 100%
  );
  background-size: 200% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: text-shine 5s linear infinite;
}

@keyframes text-shine {
  0% { background-position: 200% center; }
  20% { background-position: -200% center; }
  100% { background-position: -200% center; }
}

.pres-description {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.pres-card-footer {
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pres-meta {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.meta-item {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 500;
}

.btn-launch {
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 800;
  color: white;
  background: rgba(96, 165, 250, 0.1);
  border: 1px solid rgba(96, 165, 250, 0.3);
  padding: 0.6rem 1.2rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
}

.btn-launch:hover {
  background: #60A5FA;
  color: #0F172A;
  border-color: #60A5FA;
  box-shadow: 0 0 20px rgba(96, 165, 250, 0.4);
  transform: translateY(-2px);
}

.btn-launch i {
  font-size: 0.7rem;
  transition: transform 0.3s ease;
}

.btn-launch:hover i {
  transform: translate(2px, -2px);
}

.btn-secure {
  background: rgba(244, 63, 94, 0.1);
  border-color: rgba(244, 63, 94, 0.3);
}

.btn-secure:hover {
  background: #f43f5e;
  border-color: #f43f5e;
  box-shadow: 0 0 20px rgba(244, 63, 94, 0.4);
}

.btn-secure:hover i {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .action-bar {
    flex-direction: column;
    align-items: stretch;
    padding: 1.5rem;
  }
  .search-box {
    max-width: none;
  }
  .filter-actions {
    overflow-x: auto;
    padding-bottom: 0.5rem;
    -webkit-overflow-scrolling: touch;
  }
  .presentation-grid {
    grid-template-columns: 1fr;
  }
  .pres-card {
    border-radius: 24px;
    padding: 1.5rem;
  }
}

.loader-fade-leave-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.loader-fade-enter-from,
.loader-fade-leave-to {
  opacity: 0;
  filter: blur(15px);
  transform: scale(1.05);
}

/* Content Fade */
.content-fade-enter-active,
.content-fade-leave-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.content-fade-leave-active {
  position: absolute;
  width: 100%;
  z-index: 0;
}

.content-fade-enter-from {
  opacity: 0;
  filter: blur(15px);
  transform: translateY(20px);
}

.content-fade-leave-to {
  opacity: 0;
  filter: blur(15px);
  transform: translateY(-20px);
}

/* Load More Indicator */
.load-more-container {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  gap: 1rem;
}

.load-more-spinner {
  width: 30px;
  height: 30px;
  border: 2px solid rgba(255, 255, 255, 0.05);
  border-top-color: #60A5FA;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.load-more-text {
  font-size: 0.6rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.2em;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
