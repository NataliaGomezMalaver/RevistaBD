import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import EditView from '@/views/EditView.vue'
import InicioView from '@/views/InicioView.vue'
import EdicionesView from '@/views/EdicionesView.vue'
import EditarEdicion from '@/views/EditarEdicion.vue'

const routes = [
  {
    path: '/HomeView',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/edit/:id',
    name: 'EditView',
    component: EditView
  },
  {
    path: '/',
    name: 'InicioView',
    component: InicioView
  },
  {
    path: '/ediciones',
    name: 'Ediciones',
    component: EdicionesView
  },
  {
    path: '/editar-edicion',
    name: 'EditarEdicion',
    component: EditarEdicion
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router