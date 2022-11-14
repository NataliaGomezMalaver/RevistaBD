<template>
<div class="card mt-4">  
    <h2> {{edicion}}</h2>
</div>
  <div class="card mt-4">
    <ul v-for="item in lista" :key="item.id">
        <li><router-link :to="`/articulos/${item.id}`">
            <button class="btn btn-dark btn-sm me-2" >
            {{item.data.nombre}}
            </button>
        </router-link>
         <!-- <router-link :to="`/edit/${item.id}`"> -->
          <button class="btn btn-primary btn-sm me-2">
            Editar
          </button>
        <!-- </router-link> -->
        <button class="btn btn-danger btn-sm" v-on:click="deleteSeccion(item.id); reload();">
          Borrar
        </button>
        </li>
    </ul>

  </div>

   <div class="card card-body mt-4" id="myForm">
    <h3>NUEVA SECCIÓN</h3>
    <form >
      <div class="form-group">
        <label>Nombre Sección</label>
        <input v-model="nombre" class="form-control" required />
      </div>
    </form>
      <button @click="setUp()" class="btn btn-success mt-3">
        Crear
      </button>
  </div>

</template>

<script>

import { db , deleteSeccion, useLoadSecciones} from '@/firebase'
import { useRoute } from 'vue-router'
// import { useRoute, useRouter } from 'vue-router'
// import { createSeccion } from '@/firebase'
// import { reactive } from 'vue'

export default {

    data()
    {
        return{
            edicion:'',
            edicionID:'',
            nombre:'',
            lista:[]
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

    },
    setup() {     
        const secciones = useLoadSecciones()
        return {secciones, deleteSeccion}
    },
    methods:{
        setUp(){
            //DATOS
            console.log('HOLA',this.edicionID)    
            db.collection('secciones').add({
                nombre: this.nombre,
                id_edicion: this.edicionID,               
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                this.nombre = null;
                this.$router.go(this.$router.currentRoute)

                // document.getElementById("myForm").reset();
               
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
            // location.reload() 
                
        },
        reload(){
            setTimeout(() => {
            // document.location.reload();
            this.$router.go(this.$router.currentRoute)
            }, 2000);
            
        }
    }

}
</script>