<template>
  <div class="pres-card">
    <div class="pres-card-header">
      <div class="pres-status">
        <span class="status-badge" :class="item.id === 1 ? 'published' : 'restricted'">
          <i v-if="item.id !== 1" class="fa-solid fa-lock status-lock-icon"></i>
          <i v-else class="fa-solid fa-lock-open status-dot-inner"></i>
          {{ item.id === 1 ? item.status : 'RESTRICTED' }}
        </span>
      </div>
      <div class="pres-options">
        <span class="pres-id" v-if="item.id">#{{ String(item.id).padStart(3, '0') }}</span>
        <button class="btn-icon-small"><i class="fa-solid fa-ellipsis-vertical"></i></button>
      </div>
    </div>
    
    <div class="pres-card-body">
      <div class="pres-name-wrapper">
        <i :class="getFileTypeIcon(item.type).icon" :style="{ color: getFileTypeIcon(item.type).color }" class="file-type-icon"></i>
        <h3 class="pres-name">{{ item.name }}</h3>
      </div>
      <p class="pres-description">{{ item.description }}</p>
    </div>

    <div class="pres-card-footer">
      <div class="pres-meta">
        <span class="meta-item"><i class="fa-regular fa-calendar"></i> {{ item.updated }}</span>
        <span class="meta-item"><i class="fa-regular fa-user"></i> {{ item.author }}</span>
      </div>
      <NuxtLink v-if="item.id === 1" :to="`/publications/${item.name.toLowerCase().replace(/ /g, '-')}`" class="btn-launch">
        LAUNCH <i class="fa-solid fa-arrow-up-right-from-square"></i>
      </NuxtLink>
      <button v-else @click="$emit('open-modal', item)" class="btn-launch btn-secure">
        LAUNCH <i class="fa-solid fa-lock"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
});

defineEmits(['open-modal']);

const getFileTypeIcon = (type) => {
  switch (type) {
    case 'word': return { icon: 'fa-solid fa-file-word', color: '#2b579a' };
    case 'ppt': return { icon: 'fa-solid fa-file-powerpoint', color: '#d04423' };
    case 'pdf': return { icon: 'fa-solid fa-file-pdf', color: '#f40f02' };
    default: return { icon: 'fa-solid fa-file', color: '#64748b' };
  }
};
</script>

<style scoped>
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
</style>
