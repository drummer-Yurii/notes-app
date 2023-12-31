import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createApolloClient } from '@nhost/apollo';
import { NhostClient } from '@nhost/vue';
import { DefaultApolloClient } from '@vue/apollo-composable';

import { createRouter, createWebHistory } from 'vue-router';

const nhost = new NhostClient({
  subdomain: 'ckqqiuvswokkehjgfdxm',
  region: 'eu-west-2',
});

const apolloClient = createApolloClient({ nhost });

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('./views/HomeView.vue'),
        meta: {
            protected: true,
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./views/LoginView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.protected)) {
        const isAuthenticated = await nhost.auth.isAuthenticatedAsync()

        if (!isAuthenticated) {
            return next('/login')
        }
    }
    next()
})

createApp(App).provide(DefaultApolloClient, apolloClient).use(nhost).use(router).mount('#app')
