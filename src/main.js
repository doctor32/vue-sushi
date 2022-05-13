import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/css/tailwind.css'
import router from '@/router/router.js'
import store from '@/vuex/store.js'

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
