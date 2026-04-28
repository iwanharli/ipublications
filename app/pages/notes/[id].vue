<template>
  <div class="note-page-wrapper">
    <Transition name="modal-fade">
      <div v-if="!isUnlocked" class="modal-overlay">
        <div class="access-modal reveal-modal">
          <div class="modal-header">
            <div class="access-badge">SECURE ACCESS</div>
            <NuxtLink to="/notes" class="btn-close"><i class="fa-solid fa-xmark"></i></NuxtLink>
          </div>
          <div class="modal-body">
            <h2 class="modal-title">Secure Document Verification</h2>
            <p class="modal-subtitle">Please enter your security credentials</p>
            
            <div class="pin-entry-container">
              <div class="pin-display">
                <div v-for="i in 4" :key="i" class="pin-dot" :class="{ active: pin.length >= i }"></div>
              </div>
              <div class="numpad">
                <div class="numpad-row">
                  <button v-for="n in [1, 2, 3]" :key="n" @click="pressKey(n)" class="btn-num">{{ n }}</button>
                </div>
                <div class="numpad-row">
                  <button v-for="n in [4, 5, 6]" :key="n" @click="pressKey(n)" class="btn-num">{{ n }}</button>
                </div>
                <div class="numpad-row">
                  <button v-for="n in [7, 8, 9]" :key="n" @click="pressKey(n)" class="btn-num">{{ n }}</button>
                </div>
                <div class="numpad-row">
                  <button @click="clearPin" class="btn-num btn-util"><i class="fa-solid fa-xmark"></i></button>
                  <button @click="pressKey(0)" class="btn-num">0</button>
                  <button @click="backspace" class="btn-num btn-util"><i class="fa-solid fa-delete-left"></i></button>
                </div>
              </div>
            </div>

            <div class="access-info">
              <div class="info-item" :class="{ 'access-granted': pin === '9898', 'access-denied': pin.length === 4 && pin !== '9898' }">
                <i v-if="pin === '9898'" class="fa-solid fa-circle-check"></i>
                <i v-else-if="pin.length === 4" class="fa-solid fa-circle-xmark"></i>
                <i v-else class="fa-solid fa-shield-halved"></i>
                <span>
                  {{ pin === '9898' ? 'Verification Successful' : (pin.length === 4 ? 'Access Denied - Invalid PIN' : 'Awaiting Credentials') }}
                </span>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button 
              v-if="pin === '9898'"
              @click="isUnlocked = true" 
              class="btn-confirm-launch"
            >
              AUTHENTICATE & ENTER <i class="fa-solid fa-chevron-right"></i>
            </button>
            <div v-else class="btn-confirm-disabled">
              SYSTEM LOCKED
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <div class="note-detail-page">
    
    <header class="note-header">
      <div class="header-glow"></div>
      <div class="container header-content">
        <div class="header-left">
          <NuxtLink to="/notes" class="btn-icon-back">
            <i class="fas fa-arrow-left"></i>
          </NuxtLink>
          <div class="header-breadcrumbs">
            <span class="crumb">Notes Repository</span>
            <i class="fas fa-chevron-right crumb-separator"></i>
            <span class="crumb active">Document Viewer</span>
          </div>
        </div>
        <div class="header-right">
          <button class="btn-action outline" @click="shareNote">
            <i class="fas fa-share-nodes"></i>
            <span>Share</span>
          </button>
        </div>
      </div>
    </header>

    <main class="container">
      <div v-if="note" class="note-content-container glass">
        <div class="note-meta-top">
          <span class="category-badge">{{ note.doc_ref ? 'REFERENCED' : 'GENERAL' }}</span>
          <span class="date-stamp">{{ new Date(note.created_at).toLocaleDateString() }}</span>
        </div>

        <h1 class="note-title">{{ note.title }}</h1>
        
        <div class="note-body tiptap" v-html="note.content"></div>
        
        <div class="note-metadata-box">
          <h3 class="meta-box-title">Document Metadata</h3>
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Status</span>
              <span class="meta-value status-indicator" :class="note.status">{{ note.status }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Reference</span>
              <span class="meta-value">{{ note.doc_ref || 'None' }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Origin IP</span>
              <span class="meta-value">{{ note.ip_address || 'Unknown' }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Created At</span>
              <span class="meta-value">{{ new Date(note.created_at).toLocaleString() }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Last Updated</span>
              <span class="meta-value">{{ new Date(note.updated_at).toLocaleString() }}</span>
            </div>
          </div>
        </div>

        <div class="note-footer-actions">
          <div class="tags">
            <span class="tag">#Internal</span>
            <span class="tag">#HighPriority</span>
            <span class="tag">#2026</span>
          </div>
        </div>
      </div>
      
      <div v-if="!note" class="loading-state">
        <div class="spinner"></div>
        <p>Loading note...</p>
      </div>
    </main>
  </div>
</div>
</template>

<script setup>
const route = useRoute()
const id = route.params.id

// Password Protection State
const isUnlocked = ref(false)
const pin = ref('')

const pressKey = (n) => {
  if (pin.value.length < 4) {
    pin.value += n;
    
    if (pin.value.length === 4 && pin.value !== '9898') {
      setTimeout(() => {
        if (pin.value !== '9898') pin.value = '';
      }, 1000);
    }
  }
};

const backspace = () => {
  pin.value = pin.value.slice(0, -1);
};

const clearPin = () => {
  pin.value = '';
};

// Fetch data
const { data: note } = await useFetch(`/api/notes/${id}`)

const shareNote = () => {
  alert('Sharing feature is being prepared.')
}

useHead({
  title: note.value ? `${note.value.title} | Polri Enterprise` : 'Loading Note...',
})
</script>

<style scoped>
.note-detail-page {
  padding: 120px 0 80px;
  min-height: 100vh;
  background: 
    radial-gradient(ellipse at 20% 0%, rgba(120, 53, 15, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 0%, rgba(146, 64, 14, 0.08) 0%, transparent 40%),
    radial-gradient(ellipse at 50% 100%, rgba(15, 23, 42, 0.5) 0%, transparent 50%);
}

.note-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  z-index: 100;
  border-bottom: 1px solid rgba(251, 191, 36, 0.08);
}

.header-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.5), transparent);
}

.header-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.btn-icon-back {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-icon-back:hover {
  background: rgba(251, 191, 36, 0.1);
  border-color: rgba(251, 191, 36, 0.2);
  color: #FBBF24;
  transform: translateX(-3px);
}

.header-breadcrumbs {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-sans);
  font-size: 0.85rem;
}

.crumb {
  color: #64748b;
  font-weight: 500;
}

.crumb.active {
  color: #FBBF24;
}

.crumb-separator {
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.1);
}

.header-right {
  display: flex;
  gap: 1rem;
}

.btn-action {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1.25rem;
  height: 40px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-sans);
}

.btn-action.outline {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #cbd5e1;
}

.btn-action.outline:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.btn-action.primary {
  background: linear-gradient(135deg, #92400E, #B45309);
  border: none;
  color: #FEF3C7;
  box-shadow: 0 4px 12px rgba(180, 83, 9, 0.2);
}

.btn-action.primary:hover {
  background: linear-gradient(135deg, #B45309, #D97706);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(180, 83, 9, 0.3);
}

.note-content-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem;
  background: rgba(30, 41, 59, 0.4) !important;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.note-meta-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.category-badge {
  background: rgba(59, 130, 246, 0.1);
  color: #60a5fa;
  padding: 0.4rem 1rem;
  border-radius: 100px;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.date-stamp {
  font-size: 0.8rem;
  color: #64748b;
}

.note-title {
  font-size: 3rem;
  font-family: var(--font-heading);
  font-weight: 300;
  color: #fff;
  margin-bottom: 4rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  line-height: 1.1;
}

.note-body {
  font-size: 1.15rem;
  line-height: 1.8;
  color: #cbd5e1;
}

:deep(.tiptap h2) {
  font-size: 1.75rem;
  font-family: var(--font-heading);
  color: #fff;
  margin: 2.5rem 0 1rem;
}

:deep(.tiptap p) {
  margin-bottom: 1.5rem;
}

:deep(.tiptap ul), :deep(.tiptap ol) {
  margin-bottom: 2rem;
  padding-left: 1.5rem;
}

:deep(.tiptap li) {
  margin-bottom: 0.75rem;
}

:deep(.tiptap blockquote) {
  border-left: 4px solid var(--accent-light);
  padding-left: 2rem;
  margin: 3rem 0;
  font-style: italic;
  font-size: 1.4rem;
  color: #94a3b8;
}

.note-footer-actions {
  margin-top: 5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.tags {
  display: flex;
  gap: 0.75rem;
}

.tag {
  font-size: 0.75rem;
  color: #64748b;
  background: rgba(255, 255, 255, 0.03);
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
}

.loading-state {
  text-align: center;
  padding: 10rem 0;
  color: #64748b;
}

/* Metadata Box Styles */
.note-metadata-box {
  margin-top: 4rem;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.meta-box-title {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  color: white;
  margin-bottom: 1.5rem;
  letter-spacing: 0.1em;
}

.meta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.meta-label {
  font-size: 0.75rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.meta-value {
  font-size: 0.95rem;
  color: #e2e8f0;
  font-family: monospace;
}

.status-indicator {
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.status-indicator.published { color: #10b981; }
.status-indicator.draft { color: #f59e0b; }
.status-indicator.archived { color: #64748b; }

@media (max-width: 768px) {
  .note-content-container {
    padding: 2rem;
  }
  .note-title {
    font-size: 2rem;
  }
}

/* Access Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.access-modal {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(32px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 40px;
  width: 100%;
  max-width: 450px;
  padding: 2.5rem;
  box-shadow: 0 50px 100px -20px rgba(0, 0, 0, 0.5);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.access-badge {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: #60A5FA;
  background: rgba(96, 165, 250, 0.1);
  padding: 0.4rem 0.8rem;
  border-radius: 50px;
}

.btn-close {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.3s ease;
  text-decoration: none;
}

.btn-close:hover {
  color: white;
}

.modal-body {
  text-align: center;
}

.modal-title {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-family: var(--font-heading);
}

.modal-subtitle {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.85rem;
  margin-bottom: 2rem;
}

.pin-entry-container {
  margin-bottom: 2rem;
}

.pin-display {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.pin-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.pin-dot.active {
  background: #60A5FA;
  border-color: #60A5FA;
  box-shadow: 0 0 15px rgba(96, 165, 250, 0.8);
  transform: scale(1.2);
}

.numpad {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 280px;
  margin: 0 auto;
}

.numpad-row {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn-num {
  width: 60px;
  height: 60px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #fff;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-num:hover {
  background: rgba(251, 191, 36, 0.15);
  border-color: rgba(251, 191, 36, 0.4);
  color: #FBBF24;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.btn-num:active {
  transform: scale(0.9);
  background: rgba(255, 255, 255, 0.2);
}

.btn-util {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.4);
}

.access-info {
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.4s ease;
}

.info-item.access-granted {
  color: #4ade80;
  text-shadow: 0 0 10px rgba(74, 222, 128, 0.4);
}

.info-item.access-denied {
  color: #f43f5e;
  text-shadow: 0 0 10px rgba(244, 63, 94, 0.4);
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}

.modal-footer {
  display: flex;
  justify-content: center;
}

.btn-confirm-launch {
  width: 100%;
  padding: 1.25rem;
  background: linear-gradient(135deg, #FBBF24, #D97706);
  color: #000;
  border: none;
  border-radius: 20px;
  font-weight: 800;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 30px rgba(217, 119, 6, 0.3);
  cursor: pointer;
}

.btn-confirm-disabled {
  width: 100%;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  font-weight: 800;
  font-size: 0.8rem;
  text-align: center;
  letter-spacing: 0.2em;
}

.btn-confirm-launch:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}
</style>
