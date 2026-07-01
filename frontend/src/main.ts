import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { VueQueryPlugin } from '@tanstack/vue-query';
import App from './App.vue';
import { router } from './app/router';
import { queryClient } from './app/query/queryClient';
import 'primeicons/primeicons.css';
import './style.css';

const app = createApp(App);

app.use(createPinia());

app.use(VueQueryPlugin, {
  queryClient,
});

app.use(router);

app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false,
    },
  },
});

app.mount('#app');