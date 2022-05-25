import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/tareas',
        name: 'tarea',
        component: () => import(/* webpackChunkName: "about" */ '../views/Tareas.vue')
    },
    {
        path: '/tareas/create',
        name: 'tarea.create',
        component: () => import(/* webpackChunkName: "about" */ '../components/tareas/create.vue')
    },
    {
        path: '/herramientas',
        name: 'herramientas.index',
        component: () => import(/* webpackChunkName: "about" */ '../views/Herramientas.vue')
    },    
    {
        path: '/herramientas/create',
        name: 'herramienta.create',
        component: () => import(/* webpackChunkName: "about" */ '../views/Herramientas/create.vue')
    },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active-link',
})

export default router

