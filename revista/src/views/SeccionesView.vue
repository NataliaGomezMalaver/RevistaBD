<template>
  <div class="card mt-4">
    <h2> {{edicion}}</h2>
    <ul v-for="item in lista" :key="item.id">
        <li><router-link :to="`/articulos/${item.id}`">
            <button class="btn btn-primary btn-sm me-2" >
            {{item.data.nombre}}
            </button>
        </router-link></li>
    </ul>

  </div>
</template>

<script>

import { db } from '@/firebase'
import { useRoute } from 'vue-router'

export default {
    data()
    {
        return{
            edicion:'',
            edicionID:'',
            lista:[]
        }
    },
    mounted()
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


    }

}
</script>