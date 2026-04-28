// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-01',
  devtools: { enabled: true },
  css: ['~/assets/css/index.css'],
  routeRules: {
    '/dashboard': { redirect: '/' }
  },
  app: {
    head: {
      title: 'Enterprise Presentation Management System',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Modernizing law enforcement through digital excellence.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' }
      ]
    }
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('three') || id.includes('globe.gl')) {
                return 'vendor-3d';
              }
              if (id.includes('gsap')) {
                return 'vendor-gsap';
              }
              if (id.includes('swiper')) {
                return 'vendor-swiper';
              }
              return 'vendor';
            }
          }
        }
      }
    }
  }
})
