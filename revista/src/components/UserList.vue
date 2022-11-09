<template>
  <div class="card mt-4">
    <table class="table m-0">
      <thead>
        <tr>
          <th scope="col">Título</th>
          <th scope="col">Texto</th>
          <th scope="col">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ id, titulo, texto } in articulos" :key="id">
          <td>{{ titulo }}</td>
          <td>{{ texto }}</td>
          <td>
            <router-link :to="`/edit/${id}`">
              <button class="btn btn-primary btn-sm me-2">
                Editar
              </button>
            </router-link>
            <button class="btn btn-danger btn-sm" @click="deleteArt(id)">
              Borrar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useLoadArt, deleteArt } from '@/firebase'
export default {
  setup() {
    const articulos = useLoadArt()
    return { articulos, deleteArt }
  }
}
</script>