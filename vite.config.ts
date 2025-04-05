import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'icons/icon-192x192.png', 'icons/icon-512x512.png'],
      manifest: {
        name: 'Daily Focus & Workout App',
        short_name: 'FocusApp',
        description: 'Un timer personalizzato con workout per ogni tipo di giornata',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1e3a8a',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
        shortcuts: [
          {
            name: 'Vai al Timer',
            short_name: 'Timer',
            description: 'Avvia il timer della giornata',
            url: '/timer.html?autostart=true',
            icons: [{ src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' }],
          },
          {
            name: 'Allenamento',
            short_name: 'Workout',
            description: 'Inizia la sessione di HIIT',
            url: '/workout.html',
            icons: [{ src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' }],
          },
          {
            name: 'Seleziona Giornata',
            short_name: 'Giornata',
            description: 'Scegli il tipo di giornata',
            url: '/',
            icons: [{ src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' }],
          },
        ]
      },
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        workout: 'workout.html',
        'corpo-libero': 'corpo-libero.html',
        preparazione: 'preparazione.html',
        defaticamento: 'defaticamento.html',
        riscaldamento: 'riscaldamento.html',
        'fine-sport': 'fine-sport.html',
        mattina: 'mattina.html',
        sera: 'sera.html',
        'stretching-finale': 'stretching-finale.html',
        timer: 'timer.html',
      },
    },
  },
});
