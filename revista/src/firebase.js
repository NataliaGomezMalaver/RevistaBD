// import firebase from './firebase'
// import * as firebase from "firebase/app";
import firebase from 'firebase/app';
import 'firebase/firestore';

import { ref, onUnmounted } from 'vue'

const config = {
  apiKey: "AIzaSyBXQlBzBIY31EX5bWVBx-kcw-7vY4YFTa8",
  authDomain: "revistabd.firebaseapp.com",
  databaseURL: "https://revistabd-default-rtdb.firebaseio.com",
  projectId: "revistabd",
  storageBucket: "revistabd.appspot.com",
  messagingSenderId: "800758758520",
  appId: "1:800758758520:web:d7650e2d216adcd960418d"
}

const firebaseApp = firebase.initializeApp(config)

const db = firebaseApp.firestore()
const artCollection = db.collection('articulos')

export const createArt = art => {
  return artCollection.add(art)
}

export const getArt = async id => {
  const art = await artCollection.doc(id).get()
  return art.exists ? art.data() : null
}

export const updateArt = (id, art) => {
  return artCollection.doc(id).update(art)
}

export const deleteArt = id => {
  return artCollection.doc(id).delete()
}

export const useLoadArt = () => {
  const articulos = ref([])
  const close = artCollection.onSnapshot(snapshot => {
    articulos.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return articulos
}

// EDICIONES
// export const getEdicion = async id => {
//   const edicion = await edicionesCollection.doc(id).get()
//   return edicion.exists ? user.data() : null
// }
const edicionesCollection = db.collection('ediciones')

export const useLoadEdiciones = () => {
  const ediciones = ref([])
  const close = edicionesCollection.onSnapshot(snapshot => {
    ediciones.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return ediciones
}
