import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore'

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

export const addNewTodo = async (title, text, date) => {
  try {
    const docRef = await addDoc(collection(db, 'todos'), {
      title,
      text,
      date,
      completed: false,
    })

    console.log('Document written with ID: ', docRef.id)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export const deleteTodo = async (id) => {
  try {
    await deleteDoc(doc(db, 'todos', id))

    console.log('Document deleted')
  } catch (e) {
    console.error('Error deleting document: ', e)
  }
}

export const updateTodo = async (id, title, text, date) => {
  const ref = doc(db, 'todos', id)

  try {
    await updateDoc(ref, {
      title,
      text,
      date,
    })

    console.log('Document updated')
  } catch (e) {
    console.error('Error updating document: ', e)
  }
}

export const updateTodoCompletion = async (id, isCompleted) => {
  const ref = doc(db, 'todos', id)

  try {
    await updateDoc(ref, {
      id,
      completed: isCompleted,
    })

    console.log('Document updated')
  } catch (e) {
    console.error('Error updating document: ', e)
  }
}
