<template>
    <div class="card mt-4">
      <h1>EDICIONES</h1>
      <ul v-for="{id, fecha} in ediciones" :key="id">
          <li><router-link :to="`/Ver-secciones/${id}`">
              <button class="btn btn-primary btn-sm me-2" >
              {{fecha}}
              </button>
          </router-link>
          </li>
      </ul>
      <EdicionCrear/>
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