<template>
  <div  class="card mt-4">  
      <h1 class="titulo1"> 
          {{seccion}}
      </h1>
  </div>    
  <div >
      <div class="tabla" >
              <div class="card mt-4" v-for="item in lista" :key="item.id">
                <h1>{{item.data.titulo }}</h1>
                <p>{{item.data.texto }}</p>
                <img :src=item.data.imagen style="width: 100%;" >
              </div>
      </div>
  </div>    
 

   <div class="card card-body mt-4" v-if="!lista.length" >
    <div class="item">
      <p>No hay articulos </p>
    </div>
    </div>

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