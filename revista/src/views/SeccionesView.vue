<template>
    <div v-if="edit" class="card mt-4">  
        <form>
            <input class="tabla" v-model="edicion" type="text" required/>
        </form>
        <button class="botones-listas" @click="act()"> Actualizar </button>
    </div>
    <div v-else class="card mt-4">  
        <h1> 
            {{edicion}}
            <button class="botonEditar" @click="editButton()" >Cambiar Fecha</button>
        </h1>
    </div>    
    <div class="lista">
        <div class="card text-center mt-4" v-for="item in lista" :key="item.id">
            <router-link :to="`/articulos/${item.id}`">
                <button class="botonfechas">
                {{item.data.nombre}}
                </button>
            </router-link>
            <button class="botones-listas" v-on:click="deleteSeccion(item.id); reload();">
            Borrar
            </button>
    </div>

    </div>

   <div class="card card-body mt-4" id="myForm">
    <h1>NUEVA SECCIÓN</h1>
    <form >
      <div class="form-group">
        <p>Nombre Sección</p>
        <input v-model="nombre" class="form-control" required />
      </div>
    </form>
      <button class="botones-listas" @click="setUp()">
        Crear
      </button>
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

            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
                
        },
        act(){
            db.collection("ediciones").doc(this.edicionID).set({
                fecha: this.edicion
            })
            .then(() => {
                console.log(this.fecha)
                console.log("Document successfully written!");
                this.edit = false;
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
        },
        editButton(){
            this.edit = true;
        },
        reload(){
            setTimeout(() => {
            this.$router.go(this.$router.currentRoute)
            }, 2000);
            
        }
    }

}
</script>