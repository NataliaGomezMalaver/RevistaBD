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
const usersCollection = db.collection('users')

export const createUser = user => {
  return usersCollection.add(user)
}

export const getUser = async id => {
  const user = await usersCollection.doc(id).get()
  return user.exists ? user.data() : null
}

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user)
}

export const deleteUser = id => {
  return usersCollection.doc(id).delete()
}

export const useLoadUsers = () => {
  const users = ref([])
  const close = usersCollection.onSnapshot(snapshot => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return users
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
