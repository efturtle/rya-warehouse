require('./bootstrap');

import Alpine from 'alpinejs';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Vuex
import store from './store';


window.Alpine = Alpine;
Alpine.start();

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

createApp(App)
.use(router)
.use(store)
.use(VueSweetalert2)
.mount('#app')
