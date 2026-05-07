<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from '#app';

const route = useRoute();
const router = useRouter();

const currentPath = ref(route.path);

router.afterEach((to) => {
  currentPath.value = to.path;
});

const showNavbar = computed(() => {
  const path = currentPath.value;
  return !path.includes('/publications') && 
         !path.startsWith('/notes') && 
         !path.startsWith('/qna') && 
         !path.startsWith('/raw');
});
const isHomePage = computed(() => currentPath.value === '/');

const searchQuery = useState('searchQuery', () => '');
const selectedType = useState('selectedType', () => 'all');

const filterTypes = [
  { id: 'all', label: 'All', icon: 'fa-solid fa-layer-group' },
  { id: 'pdf', label: 'PDF', icon: 'fa-solid fa-file-pdf' },
  { id: 'ppt', label: 'PPT', icon: 'fa-solid fa-file-powerpoint' },
  { id: 'word', label: 'Word', icon: 'fa-solid fa-file-word' },
];

const showScrollTop = ref(false);
const globalLoading = ref(false);
const nuxtApp = useNuxtApp();

// Handle global page transitions
nuxtApp.hook('page:start', () => {
  globalLoading.value = true;
});

nuxtApp.hook('page:finish', () => {
  // Small delay to ensure the premium loader is seen and felt
  setTimeout(() => {
    globalLoading.value = false;
  }, 600);
});

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 400;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  // Initial load
  globalLoading.value = true;
  setTimeout(() => {
    globalLoading.value = false;
  }, 1200);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="app-wrapper">
    <NuxtRouteAnnouncer />
    
    <!-- Global Loader -->
    <Transition name="loader-fade">
      <PublicationsLoader v-if="globalLoading" />
    </Transition>

    <header v-if="showNavbar" class="navbar">
      <div class="container nav-container">
        <div class="logo">
          <span class="logo-text">IP <span class="dot">x</span> COBRA</span>
        </div>

        <div v-if="isHomePage" class="nav-search-filter">
          <div class="nav-search-box">
            <i class="fa-solid fa-magnifying-glass search-icon"></i>
            <input type="text" placeholder="Search Publications" v-model="searchQuery" />
          </div>
          <div class="nav-filter-actions">
            <button 
              v-for="filter in filterTypes" 
              :key="filter.id"
              class="btn-nav-filter"
              :class="{ active: selectedType === filter.id }"
              @click="selectedType = filter.id"
            >
              <i :class="filter.icon"></i> {{ filter.label }}
            </button>
          </div>
        </div>

        <div class="nav-links">
          <NuxtLink to="/" class="nav-link-minimal" :class="{ active: isHomePage }">Publications</NuxtLink>
          <NuxtLink to="/notes" class="nav-link-minimal" :class="{ active: currentPath.startsWith('/notes') }">Notes</NuxtLink>
        </div>

      </div>
    </header>

    <main>
      <NuxtPage />
    </main>

    <Transition name="fade">
      <button v-if="showScrollTop" @click="scrollToTop" class="btn-scroll-top">
        <i class="fa-solid fa-arrow-up"></i>
      </button>
    </Transition>
  </div>
</template>

<style scoped>
.app-wrapper {
  min-height: 100vh;
}

@media (min-width: 1025px) {
  /* Removed fixed height and overflow hidden to allow scrolling */
}

.navbar {
  position: fixed;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 95%;
  max-width: 1400px;
  z-index: 1000;
  padding: 0.5rem 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

/* Nav Search & Filter */
.nav-search-filter {
  display: flex;
  align-items: center;
  flex-grow: 1;
  gap: 1.5rem;
  padding: 0 1rem;
}

.nav-search-box {
  position: relative;
  flex-grow: 1;
  max-width: 400px;
}

.nav-search-box .search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.8rem;
}

.nav-search-box input {
  width: 100%;
  padding: 0.6rem 1rem 0.6rem 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.03);
  font-size: 0.8rem;
  color: white;
  outline: none;
  transition: all 0.3s ease;
}

.nav-search-box input:focus {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.nav-filter-actions {
  display: flex;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.02);
  padding: 0.25rem;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.btn-nav-filter {
  background: transparent;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.7rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-nav-filter:hover {
  color: white;
  background: rgba(255, 255, 255, 0.05);
}

.btn-nav-filter.active {
  background: white;
  color: var(--primary);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.logo-text {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  color: white;
  text-transform: uppercase;
  white-space: nowrap;
}

.logo-text .dot {
  color: var(--accent-light);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.nav-link-minimal {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 600;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 0;
}

.nav-link-minimal.active {
  color: white;
}

.nav-link-minimal.active::after {
  width: 100%;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link-minimal::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent-light);
  transition: width 0.3s ease;
}

.nav-link-minimal:hover {
  color: white;
}

.nav-link-minimal:hover::after {
  width: 100%;
}

@media (max-width: 768px) {
  .navbar {
    top: 1rem;
    padding: 0.6rem 1.5rem;
    width: 95%;
  }
  .nav-link-minimal {
    font-size: 0.6rem;
  }
  .logo-text {
    font-size: 0.8rem;
  }
}

.text-center {
  text-align: center;
}

.btn-scroll-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-scroll-top:hover {
  background: white;
  color: var(--primary);
  transform: translateY(-5px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Loader Fade */
.loader-fade-enter-active,
.loader-fade-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.loader-fade-enter-from,
.loader-fade-leave-to {
  opacity: 0;
  filter: blur(10px);
}
</style>
