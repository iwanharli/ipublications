<template>
  <Transition name="modal-fade">
    <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
      <div class="access-modal reveal-modal">
        <div class="modal-header">
          <div class="access-badge">SECURE ACCESS</div>
          <button class="btn-close" @click="closeModal"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="modal-body">
          <h2 class="modal-title">Secure Access Verification</h2>
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
          <NuxtLink 
            v-if="pin === '9898'"
            :to="`/publications/${project?.name.toLowerCase().replace(/ /g, '-')}`" 
            class="btn-confirm-launch"
          >
            AUTHENTICATE & ENTER <i class="fa-solid fa-chevron-right"></i>
          </NuxtLink>
          <div v-else class="btn-confirm-disabled">
            SYSTEM LOCKED
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  project: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['close']);

const pin = ref('');

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    pin.value = '';
  }
});

const closeModal = () => {
  emit('close');
};

const pressKey = (n) => {
  if (pin.value.length < 4) {
    pin.value += n;
    
    // Auto-clear after 1 second if PIN is wrong
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
</script>

<style scoped>
/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(12px);
  z-index: 2000;
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

/* PIN & Numpad Styles */
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
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-num:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
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
  background: white;
  color: var(--primary);
  text-decoration: none;
  border-radius: 20px;
  font-weight: 800;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
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

/* Modal Animation */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .access-modal {
  animation: modal-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modal-in {
  from { transform: scale(0.8) translateY(20px); opacity: 0; }
  to { transform: scale(1) translateY(0); opacity: 1; }
}
</style>
