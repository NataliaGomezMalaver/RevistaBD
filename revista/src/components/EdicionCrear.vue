<template>
  <div class="card mt-4">
    <h1>NUEVA EDICIÓN</h1>
    <form @submit.prevent="onSubmit">
      <div class="card card-body mt-4" id="myForm">
        <p>Fecha Edicion</p>
        <input v-model="form.fecha" class="form-control" required />
      <button type="submit" class="botones-listas">
        Crear
      </button>
      </div>
    </form>
  </div>
</template>

<script>
import { createEdicion } from '@/firebase'
import { reactive } from 'vue'
export default {
  setup() {
    const form = reactive({ fecha: ''})
    const onSubmit = async () => {
      await createEdicion({ ...form })
      form.fecha = ''
    }
    return { form, onSubmit }
  }
}
</script>