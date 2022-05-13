import {createRouter, createWebHistory} from 'vue-router'
import vCatalog from '@/views/v-Catalog.vue'
import vCart from '@/views/v-Cart.vue'
import vAbout from '@/views/v-About.vue'
import vAboutItem from '@/views/item/_id'
import vPageNotFound from '@/views/v-PageNotFound.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: vCatalog,
            name: 'catalog',
            alias: '/catalog'
        },
        {
            path: '/cart',
            component: vCart,
            name: 'cart'
        },
        {
            path: '/about',
            component: vAbout,
            name: 'about'
        },
        {
            path: '/catalog/item-:id',
            component: vAboutItem,
            name: 'item'
        },
        {
            path: '/:notFound(.*)',
            component: vPageNotFound
        }
    ]
})