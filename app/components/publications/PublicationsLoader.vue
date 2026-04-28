<template>
  <div class="premium-loader-overlay">
    <div class="premium-loader-core">
      <div class="loader-rings">
        <div class="ring ring-outer"></div>
        <div class="ring ring-inner"></div>
      </div>
      <div class="loader-branding">
        <span class="brand-ip">IP</span>
        <span class="brand-x">x</span>
        <span class="brand-cobra">COBRA</span>
      </div>
    </div>
    <div class="loader-text-typing">AUTHENTICATING SECURE CONNECTION...</div>
  </div>
</template>

<style scoped>
/* Premium Cyber Loader */
.premium-loader-overlay {
  position: fixed;
  inset: 0;
  background: #020617;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.premium-loader-core {
  position: relative;
  width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.5rem;
}

.loader-rings {
  position: absolute;
  inset: 0;
}

.ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid transparent;
  box-sizing: border-box;
}

.ring-outer {
  inset: 0;
  border-top-color: #60A5FA;
  border-left-color: rgba(96, 165, 250, 0.2);
  border-right-color: rgba(96, 165, 250, 0.05);
  animation: spin 1.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
  box-shadow: 0 -2px 10px rgba(96, 165, 250, 0.3);
}

.ring-inner {
  inset: 15px;
  border-bottom-color: #F43F5E;
  border-right-color: rgba(244, 63, 94, 0.2);
  animation: spin-reverse 2.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
  box-shadow: 0 2px 10px rgba(244, 63, 94, 0.3);
}

.loader-branding {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: white;
}

.brand-x {
  color: #60A5FA;
  font-size: 0.9em;
}

.loader-text-typing {
  font-family: monospace;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  position: relative;
  text-transform: uppercase;
  animation: text-pulse 2s infinite alternate ease-in-out;
}

.loader-text-typing::after {
  content: '';
  position: absolute;
  right: -10px;
  top: 15%;
  height: 70%;
  width: 2px;
  background: #60A5FA;
  animation: blink 1s step-end infinite;
  box-shadow: 0 0 8px #60A5FA;
}

@keyframes spin { 100% { transform: rotate(360deg); } }
@keyframes spin-reverse { 100% { transform: rotate(-360deg); } }
@keyframes blink { 50% { opacity: 0; } }
@keyframes text-pulse { 0% { opacity: 0.6; } 100% { opacity: 1; text-shadow: 0 0 10px rgba(255, 255, 255, 0.3); } }
</style>
