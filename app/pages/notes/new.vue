<template>
  <div class="editor-page bright-theme">

    <!-- Floating Action Header -->
    <header class="editor-header">
      <div class="header-inner">
        <div class="header-left">
          <NuxtLink to="/notes" class="back-btn">
            <i class="fas fa-arrow-left"></i>
          </NuxtLink>
          <div class="header-divider"></div>
          <div class="doc-status">
            <div class="status-dot" :class="{ active: isReadyToSave }"></div>
            <span>{{ isReadyToSave ? 'Ready to save' : 'Draft' }}</span>
          </div>
        </div>
        <div class="header-center">
          <span class="header-label">NEW NOTE</span>
        </div>
        <div class="header-right">
          <button class="btn-cancel" @click="discardNote">
            Cancel
          </button>
          <div class="action-group">
            <button class="btn-draft" @click="saveAsDraft" :disabled="!title">
              <i class="far fa-save"></i>
              <span>Save as Draft</span>
            </button>
            <button class="btn-save" @click="saveNote" :disabled="!isReadyToSave">
              <i class="fas fa-check"></i>
              <span>Save Note</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Editor Body -->
    <main class="editor-body">
      <div class="editor-canvas glass">
        <!-- Document Meta Bar -->
        <div class="doc-meta">
          <div class="meta-chip">
            <i class="far fa-calendar"></i>
            <span>{{ currentDate }}</span>
          </div>
          <div class="meta-chip">
            <i class="far fa-user"></i>
            <span>Administrator</span>
          </div>
          
          <!-- Custom Searchable Dropdown -->
          <div class="custom-dropdown" v-click-outside="closeDropdown">
            <div 
              class="dropdown-trigger" 
              @click="isDropdownOpen = !isDropdownOpen"
              :class="{ 'is-active': isDropdownOpen }"
            >
              <i class="fas fa-file-invoice trigger-icon"></i>
              <span class="trigger-text">
                {{ selectedDocName || 'Refers to Document...' }}
              </span>
              <i class="fas fa-chevron-down caret-icon"></i>
            </div>

            <Transition name="dropdown-fade">
              <div v-if="isDropdownOpen" class="dropdown-menu">
                <div class="dropdown-search">
                  <i class="fas fa-search"></i>
                  <input 
                    v-model="docSearchQuery" 
                    type="text" 
                    placeholder="Search documents..." 
                    @click.stop
                    ref="dropdownSearchInput"
                  />
                </div>
                <div class="dropdown-list custom-scrollbar">
                  <!-- Null/None Option -->
                  <div 
                    class="dropdown-item null-option"
                    :class="{ 'selected': selectedDocument === '' }"
                    @click="selectDocument(null)"
                  >
                    <i class="fas fa-times-circle"></i>
                    <span>None / Clear Selection</span>
                  </div>
                  
                  <div class="dropdown-divider"></div>

                  <div 
                    v-for="doc in filteredDocs" 
                    :key="doc.uuid" 
                    class="dropdown-item"
                    :class="{ 'selected': selectedDocument === doc.uuid }"
                    @click="selectDocument(doc)"
                  >
                    <i class="fas fa-file-alt"></i>
                    <span>{{ doc.name }}</span>
                  </div>
                  <div v-if="filteredDocs.length === 0" class="dropdown-empty">
                    No documents found
                  </div>
                </div>
              </div>
            </Transition>
          </div>

          <div class="meta-chip ms-auto" v-if="title.length > 0">
            <i class="fas fa-font"></i>
            <span>{{ title.length }} chars</span>
          </div>
        </div>

        <!-- Title -->
        <div class="title-area">
          <input 
            ref="titleInput"
            v-model="title" 
            type="text" 
            placeholder="Untitled Note" 
            class="title-input"
          />
          <div class="title-accent-line" :style="{ width: title.length > 0 ? '100%' : '60px' }"></div>
        </div>

        <!-- Divider -->
        <div class="content-divider">
          <div class="divider-line"></div>
          <span class="divider-label">CONTENT</span>
          <div class="divider-line"></div>
        </div>

        <!-- Rich Text Editor -->
        <div class="rich-editor">
          <NotesTiptapEditor v-model="content" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const titleInput = ref(null)
const dropdownSearchInput = ref(null)
const title = ref('')
const content = ref('')
const selectedDocument = ref('')
const selectedDocName = ref('')
const isDropdownOpen = ref(false)
const docSearchQuery = ref('')

// Fetch real data from the database
const { data: dbProjects } = await useFetch('/api/projects')

const filteredDocs = computed(() => {
  if (!dbProjects.value) return []
  if (!docSearchQuery.value) return dbProjects.value
  const query = docSearchQuery.value.toLowerCase()
  return dbProjects.value.filter(doc => doc.name.toLowerCase().includes(query))
})

const selectDocument = (doc) => {
  if (doc === null) {
    selectedDocument.value = ''
    selectedDocName.value = ''
  } else {
    selectedDocument.value = doc.uuid
    selectedDocName.value = doc.name
  }
  isDropdownOpen.value = false
  docSearchQuery.value = ''
}

const closeDropdown = () => {
  isDropdownOpen.value = false
  docSearchQuery.value = ''
}

// Watch for dropdown open to focus search
watch(isDropdownOpen, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      dropdownSearchInput.value?.focus()
    })
  }
})

// Directive for clicking outside
const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}

onMounted(() => {
  nextTick(() => {
    titleInput.value?.focus()
  })
})

const currentDate = computed(() => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Intl.DateTimeFormat('en-US', options).format(new Date())
})

const isReadyToSave = computed(() => {
  return title.value.trim().length > 0 && content.value.trim().length > 7
})

const saveNote = async () => {
  if (!isReadyToSave.value) return
  
  try {
    await $fetch('/api/notes', {
      method: 'POST',
      body: {
        title: title.value,
        content: content.value,
        docRef: selectedDocument.value,
        status: 'published'
      }
    })
    navigateTo('/notes')
  } catch (err) {
    console.error('Failed to save note:', err)
  }
}

const saveAsDraft = async () => {
  if (!title.value) return
  
  try {
    await $fetch('/api/notes', {
      method: 'POST',
      body: {
        title: title.value,
        content: content.value,
        docRef: selectedDocument.value,
        status: 'draft'
      }
    })
    navigateTo('/notes')
  } catch (err) {
    console.error('Failed to save draft:', err)
  }
}

const discardNote = () => {
  navigateTo('/notes')
}

useHead({
  title: 'Create New Note | Polri Enterprise',
  meta: [
    { name: 'description', content: 'Create a new official note with a modern WYSIWYG editor.' }
  ]
})
</script>

<style scoped>
.editor-page {
  min-height: 100vh;
  padding-top: 80px;
  padding-bottom: 80px;
  background: 
    radial-gradient(ellipse at 20% 0%, rgba(120, 53, 15, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 0%, rgba(146, 64, 14, 0.08) 0%, transparent 40%),
    radial-gradient(ellipse at 50% 100%, rgba(15, 23, 42, 0.5) 0%, transparent 50%);
}

.editor-page.bright-theme .editor-canvas {
  background: #FFFEF0 !important;
  color: #1C1917;
  box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.3), 0 10px 20px -5px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(120, 53, 15, 0.1);
}

.editor-page.bright-theme .title-input {
  color: #1C1917;
}

.editor-page.bright-theme .title-input::placeholder {
  color: rgba(0, 0, 0, 0.1);
}

.editor-page.bright-theme .meta-chip {
  background: rgba(120, 53, 15, 0.05);
  border-color: rgba(120, 53, 15, 0.1);
  color: #78350F;
}

.editor-page.bright-theme .divider-label {
  color: rgba(120, 53, 15, 0.2);
}

.editor-page.bright-theme .divider-line {
  background: rgba(120, 53, 15, 0.1);
}

.editor-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  z-index: 100;
  background: rgba(2, 6, 23, 0.85);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(251, 191, 36, 0.06);
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
}

.header-left, .header-right {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.action-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.back-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(251, 191, 36, 0.05);
  border: 1px solid rgba(251, 191, 36, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(251, 191, 36, 0.4);
  text-decoration: none;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: rgba(251, 191, 36, 0.1);
  color: #FBBF24;
}

.header-divider {
  width: 1px;
  height: 20px;
  background: rgba(251, 191, 36, 0.08);
}

.doc-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.3);
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
}

.status-dot.active {
  background: #FBBF24;
  box-shadow: 0 0 8px rgba(251, 191, 36, 0.5);
}

.header-label {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: rgba(251, 191, 36, 0.25);
}

.btn-cancel {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-sans);
}

.btn-cancel:hover {
  color: #FEF3C7;
}

.btn-draft {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(251, 191, 36, 0.05);
  border: 1px solid rgba(251, 191, 36, 0.15);
  color: #FBBF24;
  padding: 0.5rem 1.25rem;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-sans);
}

.btn-draft:hover:not(:disabled) {
  background: rgba(251, 191, 36, 0.1);
  border-color: #FBBF24;
}

.btn-draft:disabled {
  opacity: 0.2;
  cursor: not-allowed;
}

.btn-save {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #92400E, #B45309);
  color: #FEF3C7;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  font-family: var(--font-sans);
  box-shadow: 0 2px 10px rgba(180, 83, 9, 0.2);
}

.btn-save:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(180, 83, 9, 0.35);
  background: linear-gradient(135deg, #B45309, #D97706);
}

.btn-save:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.editor-body {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 2rem;
}

.editor-canvas {
  padding: 3rem;
  border-radius: 20px;
  min-height: 75vh;
}

.doc-meta {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  align-items: center;
}

.meta-chip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
}

/* Custom Searchable Dropdown */
.custom-dropdown {
  position: relative;
  z-index: 50;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(120, 53, 15, 0.05);
  border: 1px solid rgba(120, 53, 15, 0.1);
  padding: 0 1rem;
  height: 34px;
  border-radius: 10px;
  color: #78350F;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 220px;
}

.dropdown-trigger:hover, .dropdown-trigger.is-active {
  background: rgba(120, 53, 15, 0.08);
  border-color: rgba(120, 53, 15, 0.2);
}

.trigger-icon {
  font-size: 0.8rem;
  opacity: 0.7;
}

.trigger-text {
  font-size: 0.75rem;
  font-weight: 500;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.caret-icon {
  font-size: 0.7rem;
  opacity: 0.4;
  transition: transform 0.3s ease;
}

.dropdown-trigger.is-active .caret-icon {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 320px;
  background: #FFF;
  border: 1px solid rgba(120, 53, 15, 0.15);
  border-radius: 14px;
  box-shadow: 0 15px 40px -10px rgba(120, 53, 15, 0.2);
  overflow: hidden;
  transform-origin: top left;
}

.dropdown-search {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(120, 53, 15, 0.08);
  background: #FFFEF9;
}

.dropdown-search i {
  font-size: 0.8rem;
  color: rgba(120, 53, 15, 0.3);
}

.dropdown-search input {
  background: transparent;
  border: none;
  width: 100%;
  font-size: 0.8rem;
  color: #78350F;
  outline: none;
}

.dropdown-list {
  max-height: 250px;
  overflow-y: auto;
  padding: 0.5rem;
}

.dropdown-divider {
  height: 1px;
  background: rgba(120, 53, 15, 0.08);
  margin: 4px 8px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0.85rem;
  border-radius: 8px;
  color: #451a03;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dropdown-item i {
  font-size: 0.8rem;
  opacity: 0.4;
}

.dropdown-item:hover {
  background: rgba(251, 191, 36, 0.1);
  color: #92400E;
}

.dropdown-item.selected {
  background: #FBBF24;
  color: #1C1917;
  font-weight: 600;
}

.dropdown-item.selected i {
  opacity: 1;
}

.null-option {
  color: rgba(120, 53, 15, 0.5);
}

.dropdown-empty {
  padding: 2rem 1rem;
  text-align: center;
  font-size: 0.75rem;
  color: rgba(120, 53, 15, 0.4);
}

/* Animations */
.dropdown-fade-enter-active, .dropdown-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.dropdown-fade-enter-from, .dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

/* Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(120, 53, 15, 0.1);
  border-radius: 10px;
}

.title-area {
  position: relative;
  margin-bottom: 2.5rem;
}

.title-input {
  width: 100%;
  background: transparent;
  border: none;
  font-size: 2.75rem;
  font-family: var(--font-heading);
  font-weight: 300;
  outline: none;
  padding: 0.5rem 0;
  letter-spacing: -0.02em;
}

.title-accent-line {
  height: 2px;
  background: linear-gradient(90deg, #FBBF24, #92400E, transparent);
  border-radius: 2px;
  transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  margin-top: 0.5rem;
}

.content-divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.divider-line {
  flex-grow: 1;
  height: 1px;
}

.divider-label {
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.2em;
}

.rich-editor {
  min-height: 400px;
}

.editor-page.bright-theme :deep(.tiptap) {
  color: #1C1917 !important;
}

.editor-page.bright-theme :deep(.tiptap h1),
.editor-page.bright-theme :deep(.tiptap h2),
.editor-page.bright-theme :deep(.tiptap h3) {
  color: #000 !important;
}

.editor-page.bright-theme :deep(.tiptap p.is-editor-empty:first-child::before) {
  color: rgba(120, 53, 15, 0.3) !important;
}

@media (max-width: 768px) {
  .editor-canvas {
    padding: 1.5rem;
  }
  .title-input {
    font-size: 1.75rem;
  }
  .header-center {
    display: none;
  }
}
</style>
