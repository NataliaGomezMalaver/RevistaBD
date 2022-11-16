<template>
  <div class="card mt-4">  
      <h1> 
          {{edicion}}
      </h1>
  </div>    
  <div class="lista">
        <div class="card mt-4" v-for="item in lista" :key="item.id">
          <router-link :to="`/ArticulosSeccion/${item.id}`">
              <button class="botonfechas">
              {{item.data.nombre}}
              </button>
          </router-link>
        </div>
  </div>

<div class="tabla">
    <div class="card mt-4" v-for="item in listaArt" :key="item.id">
            <h1>{{item.data.titulo }}</h1>
            <p>{{item.data.texto }}</p>
            <img :src=item.data.imagen style="width:100%" >
    </div>
</div>



</template>

<script>

import { db , deleteSeccion, useLoadSecciones} from '@/firebase'
import { useRoute } from 'vue-router'

export default {

  data()
  {
      return{
          edicion:'',
          edicionID:'',
          nombre:'',
          lista:[],
          listaArt:[],
          edit: false
      }
  },
  created()
  {
      const route = useRoute()
      // console.warn('route',route.params)
      this.edicionID = route.params.id

      var docRef = db.collection("ediciones").doc(this.edicionID);

      docRef.get().then((doc) => {
          if (doc.exists) {
              this.edicion = doc.data().fecha;
              console.log("Document data:", doc.data().fecha);
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });


      this.lista=[];
      var secciones = db.collectionGroup('secciones').where('id_edicion', '==', this.edicionID);
          secciones.get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  this.lista.push({id: doc.id, data: doc.data()});
              });
              console.log(this.edicionID); 
              console.log(this.lista); 
          });

      this.listaArt =[];
      var articulos = db.collectionGroup('articulos').where('id_edicion', '==', this.edicionID);
          articulos.get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  this.listaArt.push({id: doc.id, data: doc.data()});
              });
              console.log(this.edicionID); 
              console.log(this.listaArt); 
          });

  },
  setup() {     
      const secciones = useLoadSecciones()
      return {secciones, deleteSeccion}
  },
  methods:{
  }
}
</script>