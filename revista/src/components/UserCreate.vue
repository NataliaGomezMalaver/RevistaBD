<template>
  <div class="card card-body mt-4">
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label>Título</label>
        <input v-model="form.titulo" class="form-control" required />
      </div>

      <div class="form-group mt-3">
        <label>Texto</label>
        <input
          v-model="form.texto" class="form-control" required />
      </div>
  
      <button type="submit" class="btn btn-success mt-3">
        Publicar Artículo
      </button>

    </form>
  </div>
</template>

<script>
import { createArt } from '@/firebase'
import { reactive } from 'vue'
export default {
  setup() {
    const form = reactive({ titulo: '', texto: '' })
    const onSubmit = async () => {
      await createArt({ ...form })
      form.titulo = ''
      form.texto = ''
    }
    return { form, onSubmit }
  }
}
</script>