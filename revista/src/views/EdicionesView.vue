<template>
  <div class="card mt-4">
    <h1>EDICIONES</h1>
    <!-- <ul v-for="{id, fecha} in ediciones" :key="id">
        <li><router-link to="/editar-edicion">
            <button class="btn btn-primary btn-sm me-2">
            {{fecha}}
            </button>
        </router-link></li>
    </ul> -->

    <ul>
        <li>

            <button class="btn btn-primary btn-sm me-2"  @click="c2019()">
             2019
            </button>
            <button class="btn btn-primary btn-sm me-2"  @click="c2020()">
             2020
            </button>
            <router-link to="/HomeView">
            <button class="btn btn-primary btn-sm me-2"  @click="c2021()">
             2021
            </button>
            </router-link>
            <button class="btn btn-primary btn-sm me-2"  @click="c2022()">
             2022
            </button>
        </li>
    </ul>
    <div class="secciones">
      <ul v-for="item in lista" :key="item.id">
        <li>{{item.data.seccion}}</li>
      </ul>
    </div>
  </div>

</template>

<script>
import { db } from '@/firebase'
import { useLoadEdiciones } from '@/firebase'
// import { useLoadUsers, deleteUser } from '@/firebase'
export default {
  setup() {
    const ediciones = useLoadEdiciones()
    return {ediciones}
  },
  data() {
    return {
      asign:'',
      lista: [],
      matedata: {}
    };
  },
  methods:{
    clista(){
      
      this.lista=[];
      var secciones = db.collectionGroup('articulos').where('id_edicion', '==', this.asign);
        secciones.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.lista.push({id: doc.id, data: doc.data()});              
            });
        });
    },
    c2019(){
       this.asign='2019'; 
       this.clista();
    },
    c2020(){
       this.asign='2020'; 
       this.clista();
    },
    c2021(){
       this.asign='2021'; 
       this.clista();
    },
    c2022(){
       this.asign='2022'; 
       this.clista();
    }
  }
}
</script>