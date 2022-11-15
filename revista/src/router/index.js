import { createRouter, createWebHistory } from 'vue-router'
import EditView from '@/views/EditView.vue'
import InicioView from '@/views/InicioView.vue'
import EdicionesView from '@/views/EdicionesView.vue'
import SeccionesView from '@/views/SeccionesView.vue'
import ArticulosView from '@/views/ArticulosView.vue'
import ArticulosCrear from '@/views/ArticulosCrear.vue'
import VerEdiciones from '@/views/VerEdiciones.vue'
import VerSecciones from '@/views/VerSecciones.vue'
import ArticulosSeccion from '@/views/ArticulosSeccion.vue'

const routes = [
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
    path: '/secciones/:id',
    name: 'Secciones',
    component: SeccionesView
  },
  {
    path: '/articulos/:id',
    name: 'Articulos',
    component: ArticulosView
  },
  {
    path: '/articulos-crear/:id',
    name: 'ArticulosCrear',
    component: ArticulosCrear
  },
  {
    path: '/Ver-ediciones/',
    name: 'VerEdiciones',
    component: VerEdiciones
  },
  {
    path: '/Ver-secciones/:id',
    name: 'VerSecciones',
    component: VerSecciones
  },
  {
    path: '/ArticulosSeccion/:id',
    name: 'ArticulosSecciones',
    component: ArticulosSeccion
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router