<template>
      <h1>EDICIONES</h1>
      <div class="lista">
        <div class="card text-center mt-4 " v-for="{id, fecha} in ediciones" :key="id">
          <router-link :to="`/Ver-secciones/${id}`">
              <button class="botonfechas">
              {{fecha}}
              </button>
          </router-link>
      <EdicionCrear/>
      </div>
    </div>
  
  </template>
  
  <script>
  
  import { useLoadEdiciones, deleteEdicion } from '@/firebase'
  
  export default {
    setup() {
      const ediciones = useLoadEdiciones()
      return {ediciones, deleteEdicion}
    }
  }
  </script>