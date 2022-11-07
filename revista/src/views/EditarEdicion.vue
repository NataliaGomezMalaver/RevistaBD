<template>
  <div class="card mt-4">
    <h1>SECCIONES</h1>
  
  </div>
</template>

// <script>

import { db } from '@/firebase'
// import { useLoadUsers, deleteUser } from '@/firebase'
export default {
  methods:{
     clista(){
      this.lista=[];
      var proyectosL = db.collectionGroup('articulos').where('id_edicion', '==', this.edicion);
        proyectosL.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.lista.push({id: doc.id, data: doc.data()});              
            });
        });
    }
  }
}
</script>