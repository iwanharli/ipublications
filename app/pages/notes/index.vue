<template>
  <div class="notes-page">
    <div class="container">

      <!-- Hero Header -->
      <section class="notes-hero">
        <div class="hero-label">
          <div class="label-line"></div>
          <span>DOCUMENTATION</span>
          <div class="label-line"></div>
        </div>
        <h1 class="hero-title">Notes <span class="gradient-accent">Repository</span></h1>
      </section>

      <!-- Action Bar -->
      <div class="action-bar reveal-item">
        <div class="search-wrapper">
          <div class="search-icon-box">
            <i class="fas fa-search"></i>
          </div>
          <input v-model="searchQuery" type="text" placeholder="Search notes by title or content..." class="search-input" />
          <kbd class="search-kbd">⌘K</kbd>
        </div>
        <NuxtLink to="/notes/new" class="btn-create">
          <i class="fas fa-plus"></i>
          <span>Create Note</span>
        </NuxtLink>
      </div>

      <!-- Stats Strip -->
      <div class="stats-strip reveal-item">
        <div class="stat-pill">
          <div class="stat-icon"><i class="fas fa-file-alt"></i></div>
          <div class="stat-info">
            <span class="stat-number">{{ notes.length }}</span>
            <span class="stat-text">Total Notes</span>
          </div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-pill">
          <div class="stat-icon"><i class="fas fa-clock"></i></div>
          <div class="stat-info">
            <span class="stat-number">{{ thisWeekNotes }}</span>
            <span class="stat-text">This Week</span>
          </div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-pill">
          <div class="stat-icon"><i class="fas fa-pen-ruler"></i></div>
          <div class="stat-info">
            <span class="stat-number">{{ totalDrafts }}</span>
            <span class="stat-text">Drafts</span>
          </div>
        </div>
      </div>

      <div class="notes-grid">
        <NoteCard 
          v-for="note in filteredNotes" 
          :key="note.id" 
          :note="note"
        />
        <!-- Debug fallback if components fail but data exists -->
        <div v-if="filteredNotes.length > 0 && false" style="color: white; padding: 20px; background: rgba(255,255,255,0.1)">
          Debug: Found {{ filteredNotes.length }} notes.
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredNotes.length === 0" class="empty-state">
        <div class="empty-icon-ring">
          <i class="fas fa-search"></i>
        </div>
        <h3>No notes found</h3>
        <p>Try adjusting your search query or create a new note.</p>
        <NuxtLink to="/notes/new" class="btn-create small">
          <i class="fas fa-plus"></i>
          <span>Create Note</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap'

const searchQuery = ref('')

const { data: dbNotes, refresh, pending } = await useFetch('/api/notes')
const notes = computed(() => dbNotes.value || [])

const filteredNotes = computed(() => {
  const allNotes = notes.value || []
  if (!searchQuery.value) return allNotes
  const query = searchQuery.value.toLowerCase()
  return allNotes.filter(n => 
    (n.title && n.title.toLowerCase().includes(query)) || 
    (n.content && n.content.toLowerCase().includes(query))
  )
})

const thisWeekNotes = computed(() => {
  if (!notes.value) return 0
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  return notes.value.filter(n => new Date(n.created_at) >= oneWeekAgo).length
})

const totalDrafts = computed(() => {
  if (!notes.value) return 0
  return notes.value.filter(n => n.status === 'draft').length
})

onMounted(() => {
  /*
  gsap.from('.reveal-item', {
    y: 25,
    opacity: 0,
    duration: 1.2,
    stagger: 0.15,
    ease: 'expo.out',
    delay: 0.3
  })
  */
})

useHead({
  title: 'Notes Repository | Polri Enterprise',
})
</script>

<style scoped>
.notes-page {
  padding: 140px 0 100px;
  min-height: 100vh;
  background: 
    radial-gradient(ellipse at 20% 0%, rgba(120, 53, 15, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 0%, rgba(146, 64, 14, 0.08) 0%, transparent 40%),
    radial-gradient(ellipse at 50% 100%, rgba(15, 23, 42, 0.5) 0%, transparent 50%);
}

/* Hero Header */
.notes-hero {
  text-align: center;
  margin-bottom: 4rem;
}

.hero-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.hero-label span {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  color: rgba(251, 191, 36, 0.4);
}

.label-line {
  width: 40px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.25));
}

.label-line:last-child {
  background: linear-gradient(90deg, rgba(251, 191, 36, 0.25), transparent);
}

.hero-title {
  font-size: 3.5rem;
  font-family: var(--font-heading);
  font-weight: 300;
  color: #fff;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.gradient-accent {
  background: linear-gradient(135deg, #F59E0B, #FBBF24, #FDE68A);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
}

.hero-desc {
  color: rgba(255, 255, 255, 0.4);
  font-size: 1.05rem;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.7;
}

/* Action Bar */
.action-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 2.5rem;
  align-items: center;
}

.search-wrapper {
  flex-grow: 1;
  display: flex;
  align-items: center;
  background: rgba(251, 191, 36, 0.03);
  border: 1px solid rgba(251, 191, 36, 0.08);
  border-radius: 14px;
  padding: 0 1.25rem;
  height: 52px;
  transition: all 0.3s ease;
}

.search-wrapper:focus-within {
  border-color: rgba(251, 191, 36, 0.25);
  background: rgba(251, 191, 36, 0.04);
  box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.04);
}

.search-icon-box {
  color: rgba(251, 191, 36, 0.3);
  font-size: 0.85rem;
  margin-right: 1rem;
}

.search-input {
  flex-grow: 1;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 0.9rem;
  outline: none;
  font-family: var(--font-sans);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.2);
}

.search-kbd {
  font-size: 0.6rem;
  color: rgba(251, 191, 36, 0.2);
  background: rgba(251, 191, 36, 0.04);
  border: 1px solid rgba(251, 191, 36, 0.08);
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  font-family: var(--font-sans);
}

.btn-create {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 2rem;
  height: 52px;
  background: linear-gradient(135deg, #92400E, #B45309);
  color: #FEF3C7;
  border: none;
  border-radius: 14px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
  box-shadow: 0 4px 15px rgba(180, 83, 9, 0.25);
}

.btn-create:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(180, 83, 9, 0.4);
  background: linear-gradient(135deg, #B45309, #D97706);
}

.btn-create.small {
  height: 44px;
  font-size: 0.75rem;
  padding: 0 1.5rem;
}

/* Stats Strip */
.stats-strip {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4rem;
  padding: 1.25rem 2rem;
  background: rgba(251, 191, 36, 0.02);
  border: 1px solid rgba(251, 191, 36, 0.06);
  border-radius: 16px;
}

.stat-pill {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 2rem;
}

.stat-divider {
  width: 1px;
  height: 32px;
  background: rgba(251, 191, 36, 0.08);
}

.stat-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(251, 191, 36, 0.04);
  border: 1px solid rgba(251, 191, 36, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(251, 191, 36, 0.35);
  font-size: 0.8rem;
}

.stat-icon.active {
  color: #4ade80;
  border-color: rgba(74, 222, 128, 0.15);
  background: rgba(74, 222, 128, 0.05);
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  font-family: var(--font-heading);
  line-height: 1.2;
}

.stat-text {
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.25);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* Notes Grid */
.notes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 5rem 2rem;
}

.empty-icon-ring {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid rgba(251, 191, 36, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  color: rgba(251, 191, 36, 0.15);
  font-size: 1.5rem;
}

.empty-state h3 {
  color: #fff;
  font-family: var(--font-heading);
  font-weight: 400;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: rgba(255, 255, 255, 0.3);
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

@media (max-width: 992px) {
  .action-bar {
    flex-direction: column;
  }
  .search-wrapper {
    width: 100%;
  }
  .btn-create {
    width: 100%;
    justify-content: center;
  }
  .stats-strip {
    flex-wrap: wrap;
    gap: 1rem;
  }
  .stat-divider {
    display: none;
  }
}

@media (max-width: 768px) {
  .notes-page {
    padding-top: 100px;
  }
  
  .hero-title {
    font-size: 3rem;
  }
  
  .stats-strip {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
  }
  
  .stat-divider {
    width: 100%;
    height: 1px;
  }
  
  .notes-grid {
    grid-template-columns: 1fr;
  }
}
</style>
