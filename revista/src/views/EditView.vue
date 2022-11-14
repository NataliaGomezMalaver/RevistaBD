<template>
  <div class="card card-body mt-4">
    <h3>Editar Articulo</h3>
    <form @submit.prevent="update">
      <div class="form-group">
        <label>Título</label>
        <input v-model="form.titulo" class="form-control" required />
      </div>

      <div class="form-group mt-3">
        <label>Texto</label>
        <input v-model="form.texto" class="form-control" required />
      </div>

      <button type="submit" class="btn btn-primary  mt-3">
        Actualizar
      </button>
    </form>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getArt, updateArt } from '@/firebase'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const artId = computed(() => route.params.id)

    const form = reactive({ titulo: '', texto: '' })
    onMounted(async () => {
      const art = await getArt(artId.value)
      console.log(art, artId.value)
      form.titulo = art.titulo
      form.texto = art.texto
    })

    const update = async () => {
      await updateArt(artId.value, { ...form })
      router.back()
      form.titulo = ''
      form.texto = ''
    }

    return { form, update }
  }
}
</script>