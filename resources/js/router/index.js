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
        component: () => import(/* webpackChunkName: "TareasIndex" */ '../views/Tareas.vue')
    },
    {
        path: '/tareas/create',
        name: 'tarea.create',
        component: () => import(/* webpackChunkName: "TareasCreate" */ '../components/tareas/create.vue')
    },


    {
        path: '/herramientas',
        name: 'herramientas.index',
        component: () => import(/* webpackChunkName: "HerramientasIndex" */ '../views/Herramientas.vue')
    },
    {
        path: '/herramientas/create',
        name: 'herramienta.create',
        component: () => import(/* webpackChunkName: "HerramientasCreate" */ '../views/Herramientas/create.vue')
    },
    {
        path: '/herramientas/carrito',
        name: 'herramientas.carrito',
        component: () => import(/* webpackChunkName: "HerramientasCarrito" */ '../components/Herramientas/CanastaDeHerramientas.vue')
    },
    {
        path: '/herramientas/solicitar',
        name: 'herramienta.solicitar',
        component: () => import(/* webpackChunkName: "HerramientasCreate" */ '../views/Herramientas/create.vue')
    },


    // PETICIONES
    {
        path: '/peticiones',
        name: 'peticiones.index',
        component: () => import(/* webpackChunkName: "peticionesIndex" */ '../views/Peticiones/index.vue')
    },
    {
        path: '/peticion/show',
        name: 'peticion.show',
        component: () => import(/* webpackChunkName: "PeticionesCreate" */ '../views/Peticiones/show.vue')
    },


    {
        path: '/usuarios',
        name: 'usuarios.index',
        component: () => import (/* webpackChunkName: "UsuariosIndex" */ '../views/Usuarios/index.vue')
    },
    {
        path: '/usuarios/create',
        name: 'usuarios.create',
        component: () => import (/* webpackChunkName: "UsuariosCreate" */ '../views/Usuarios/create.vue')
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active-link',
})

export default router

