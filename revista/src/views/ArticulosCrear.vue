<template>
<div class="wrapper">
    <div v-if="successMessage !== ''" class="mensaje"  >
        <h4>{{ successMessage }} </h4>
    </div>
  <div class="fondo">
    <h1>Nuevo Artículo</h1>
    <div class="formulario" id="myForm">
    <form>            
      <div class="titulo">
        <label>Título</label>
        <input  v-model="titulo" class="form-control form-control-lg"  required />
      </div>
      <div class="titulo">
        <label>Texto</label>
        <textarea  v-model="texto" class="form-control" rows="4" style = "resize: none" required></textarea>
      </div>

      <input id="uploadImage1" type="file" accept="image/*" name="images[1]" class="form-control form-control-lg" onchange="previewImage(1);" @change="onFileSelected" required />
      <br>
      <img v-if="slectedFile" id="uploadPreview1" style="height:10vh"/>
    </form>
    </div>
  </div>
</div>
  <div class="boton">
    <div v-if="xhrRequest" class="spinner-border text-secondary _loader" role="status">
        <span class="sr-only"></span>
    </div>
    <button @click="setUp()" class="btn btn-primary btn-sm me-2" >
        <span v-if="! xhrRequest">Enviar</span>
        <span v-if="xhrRequest">Enviar</span>
    </button>
  </div>

</template>

<script>
import firebase from 'firebase'
import { db } from '@/firebase'
import { useRoute } from 'vue-router'

export default {
  
  data(){
    return{
        imageData: null,
        picture: null,
        uploadValue: 0,  
        slectedFile: null,      
        titulo: null,
        texto: null,
        imagen:null,
        seccionID:"",
        edicionID:"",
        seccion:"",
        edicion:"",
        xhrRequest: false,
        successMessage: "",
    }
  },
  mounted(){
      const route = useRoute()
      console.warn('route',route.params)
      this.seccionID = route.params.id

      // SECCIÓN
      var docSeccion = db.collection("secciones").doc(this.seccionID);

      docSeccion.get().then((doc) => {
          if (doc.exists) {
              this.seccion = doc.data().nombre;
              this.edicionID = doc.data().id_edicion;
              console.log("Document data:", doc.data().nombre);
              console.log("Document data:", doc.data().id_edicion);

              
                  //EDICIÓN
                  var docEdicion = db.collection("ediciones").doc(this.edicionID);

                  docEdicion.get().then((doc) => {
                      if (doc.exists) {
                          this.edicion = doc.data().fecha;
                          console.log("Document data:", doc.data().fecha);
                          console.log("SI ENTRAAAA");
                          
                      } else {
                          // doc.data() will be undefined in this case
                          console.log("No such document!");
                      }
                  })

          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      })


  },
  methods:{
      onFileSelected(event){
        this.slectedFile = event.target.files[0];
        this.successMessage = "";
      },
      setUp(){
       
        let v = this;
        v.xhrRequest = true;


        //IMAGEN
        const sotorageref=firebase.storage().ref(`/Imagenes/${this.slectedFile.name}`);
        const task=sotorageref.put(this.slectedFile);
        task.on('state_changed',snapshot =>{
          let percentage = (snapshot.bytesTransfered/snapshot.totalBytes)*100;
          this.uploadValue = percentage;
        }, error=>{console.log(error.message)},
          ()=>{this.uploadValue=100;
          task.snapshot.ref.getDownloadURL().then((url)=>{
          this.picture = url;
                //DATOS
                
                db.collection('articulos').add({
                    titulo: this.titulo,
                    texto: this.texto,
                    imagen: this.picture,
                    id_edicion: this.edicionID,
                    id_seccion: this.seccionID 
                })
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    v.successMessage = "";
                    v.xhrRequest = false;
                      this.titulo= null;
                      this.texto= null;
                      this.slectedFile = null;
                      this.$router.go(-1);
                    
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                }); 
          });
        });
      }
  }      
}
</script>