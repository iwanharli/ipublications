<template>
  <NuxtLink :to="`/notes/${note.id}`" class="note-card reveal-item">
    <!-- Glow accent -->
    <div class="card-glow"></div>
    
    <!-- Card content -->
    <div class="card-inner">
      <div class="card-top">
        <div class="note-badge">
          <div class="badge-dot"></div>
          <span>NOTE</span>
        </div>
        <time class="note-date">{{ displayDate }}</time>
      </div>

      <div class="card-body">
        <h3 class="note-title">{{ note.title }}</h3>
        <p class="note-excerpt">{{ excerpt }}</p>
      </div>

      <div class="card-bottom">
        <div class="note-author">
          <div class="author-avatar">
            <span>{{ initials }}</span>
          </div>
          <div class="author-info">
            <span class="author-name">{{ ipAddress }}</span>
            <span class="author-role">Origin IP</span>
          </div>
        </div>
        <div class="card-action">
          <i class="fas fa-arrow-right"></i>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

const excerpt = computed(() => {
  const text = props.note.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return text.length > 140 ? text.substring(0, 140) + '...' : text
})

const displayDate = computed(() => {
  if (props.note.date) return props.note.date
  if (!props.note.created_at) return ''
  const date = new Date(props.note.created_at)
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date)
})

const ipAddress = computed(() => {
  return props.note.ip_address || 'Anonymous'
})

const initials = computed(() => {
  return 'IP'
})
</script>

<style scoped>
.note-card {
  position: relative;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(251, 191, 36, 0.03);
  border: 1px solid rgba(251, 191, 36, 0.08);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}

.note-card:hover {
  transform: translateY(-6px);
  border-color: rgba(251, 191, 36, 0.25);
  background: rgba(251, 191, 36, 0.05);
  box-shadow:
    0 20px 40px -15px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(251, 191, 36, 0.08);
}

.card-glow {
  position: absolute;
  top: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #FBBF24, transparent);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.note-card:hover .card-glow {
  opacity: 1;
}

.card-inner {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 280px;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.note-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #FBBF24;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #FBBF24;
  box-shadow: 0 0 8px rgba(251, 191, 36, 0.6);
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.note-date {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.25);
  font-family: var(--font-sans);
}

.card-body {
  flex-grow: 1;
}

.note-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #f1f5f9;
  font-family: var(--font-heading);
  line-height: 1.4;
  margin-bottom: 0.75rem;
  transition: color 0.3s ease;
}

.note-card:hover .note-title {
  color: #FEF3C7;
}

.note-excerpt {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.35);
  line-height: 1.7;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(251, 191, 36, 0.06);
}

.note-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.author-avatar {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: linear-gradient(135deg, #78350F, #92400E);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  font-weight: 800;
  color: #FBBF24;
  letter-spacing: 0.05em;
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
}

.author-role {
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.card-action {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: rgba(251, 191, 36, 0.05);
  border: 1px solid rgba(251, 191, 36, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(251, 191, 36, 0.3);
  font-size: 0.7rem;
  transition: all 0.4s ease;
}

.note-card:hover .card-action {
  background: #FBBF24;
  border-color: #FBBF24;
  color: #1C1917;
  transform: translateX(3px);
}
</style>
