<template>
  <div v-if="edit" class="card mt-4">  
      <form>
          <input v-model="seccion" type="text" required/>
      </form>
      <button  class="btn btn-success mt-2" @click="act()"> Actualizar </button>
  </div>
  <div v-else class="card mt-4">  
      <h2> 
          {{seccion}}
          <button class="btn btn-info btn-sm me-2" @click="editButton()" > Cambiar Nombre </button>
      </h2>
  </div>    
  <div >
      <div class="body" >
          <table class="table m-0" >
            <thead>
              <tr>
                <th scope="col">Título</th>
                <th scope="col">Texto</th>
                <th scope="col">Imagen</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in lista" :key="item.id">
                <td>{{item.data.titulo }}</td>
                <td>{{item.data.texto }}</td>
                <td> <img :src=item.data.imagen style="height:10vh" > </td>

                <td>
                  <router-link :to="`/edit/${item.id}`">
                    <button class="btn btn-primary btn-sm me-2">
                      Editar
                    </button>
                  </router-link>
                  <button class="btn btn-danger btn-sm" v-on:click="deleteArt(item.id); reload();" >
                    Borrar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
      </div>
  </div>    
 

   <div v-if="!lista.length" class="prueba">
    <div class="item">
      <h4>No hay articulos </h4>
    </div>
    </div>

    <router-link :to="`/articulos-crear/${seccionID}`">
      <button class="btn btn-info btn-sm me-2">
        Nuevo Artículo
      </button>
    </router-link>

</template>

<script>
// import firebase from "firebase";
import {db} from '@/firebase'
import { useLoadArt, deleteArt} from '@/firebase'
import { useRoute } from 'vue-router'

export default {
    setup() {
      const articulos = useLoadArt()
      return { articulos, deleteArt}
    },
    data(){
        return{
            lista: [],
            item: {},
            seccionID: '',
            seccion:'',
            edit: false
        }
    },
    mounted(){     

      const route = useRoute()
      // console.warn('route',route.params)
      this.seccionID = route.params.id

      var docRef = db.collection("secciones").doc(this.seccionID);

      docRef.get().then((doc) => {
          if (doc.exists) {
              this.seccion = doc.data().nombre;
              console.log("Document data:", doc.data().nombre);
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });

      this.lista=[];
      var articulosL = db.collectionGroup('articulos').where('id_seccion', '==', this.seccionID);
        articulosL.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.lista.push({id: doc.id, data: doc.data()});  
                console.log('Hola')  
            });
                    
        });
    },
    methods: {
     
      veritem(id){
      var docRef = db.collection("articulos").doc(id);
      docRef.get().then((doc) => {
          if (doc.exists) {
              console.log("Document data:", doc.data());
              this.item = doc.data();
          } else {
              console.log("No such document!");
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });
      this.articulosid=id;
      },
      act(){
        db.collection("secciones").doc(this.seccionID).update({
            nombre: this.seccion
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