<template>
  <div class="card mt-4">
    <h1>EDICIONES</h1>
    <ul v-for="{id, fecha} in ediciones" :key="id">
        <li><router-link :to="`/secciones/${id}`">
            <button class="btn btn-primary btn-sm me-2" >
            {{fecha}}
            </button>
        </router-link>
        <!-- <router-link :to="`/edit/${item.id}`"> -->
          <button class="btn btn-primary btn-sm me-2">
            Editar
          </button>
        <!-- </router-link> -->
        <button class="btn btn-danger btn-sm" @click="deleteEdicion(id)" >
          Borrar
        </button>
        </li>
    </ul>
    <EdicionCrear/>
  </div>

</template>

<script>

import { useLoadEdiciones, deleteEdicion } from '@/firebase'
import EdicionCrear from '@/components/EdicionCrear.vue'

export default {
  components:{
    EdicionCrear
  },
  setup() {
    const ediciones = useLoadEdiciones()
    return {ediciones, deleteEdicion}
  }
}
</script>