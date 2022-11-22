import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { collection, getDocs } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAlqj5ZienrNR2Jbt6j_fD-tZ5jpp8EkuA',
  authDomain: 'womanup-9dd8a.firebaseapp.com',
  databaseURL:
    'https://womanup-9dd8a-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'womanup-9dd8a',
  storageBucket: 'womanup-9dd8a.appspot.com',
  messagingSenderId: '171313422641',
  appId: '1:171313422641:web:4b76fda7f0dade43b19010',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const getTodos = async () => {
  const querySnapshot = await getDocs(collection(db, 'todos'))
  const todos = []

  querySnapshot.forEach((doc) => {
    todos.push({ ...doc.data(), id: doc.id })
  })

  return todos
}
