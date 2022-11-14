<template>
  <div class="card card-body mt-4">
    <h3>NUEVA EDICIÓN</h3>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label>Fecha Edicion</label>
        <input v-model="form.fecha" class="form-control" required />
      </div>
  
      <button type="submit" class="btn btn-success mt-3">
        Crear
      </button>

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