<template>
  <h1>EDICIONES</h1>
  <div class="lista">
        <div class="card text-center mt-4 " v-for="{id, fecha} in ediciones" :key="id">
          <router-link :to="`/secciones/${id}`">
              <button class="botonfechas">
              {{fecha}}
              </button>
          </router-link>
            <button class="botones-listas" @click="deleteEdicion(id)" >
            Borrar
          </button>
        </div>
  </div>
  <EdicionCrear/>

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