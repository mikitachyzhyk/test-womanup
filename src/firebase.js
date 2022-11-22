import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
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
const storage = getStorage(app)

export const getTodos = async () => {
  const querySnapshot = await getDocs(collection(db, 'todos'))
  const todos = []

  querySnapshot.forEach((doc) => {
    todos.push({ ...doc.data(), id: doc.id })
  })

  return todos
}

const uploadFiles = async (files) => {
  console.log(files)
  if (!files || files.length === 0) return []

  const filesUrls = []

  for (const file of files) {
    const imageRef = ref(storage, `${file.name}_${Date.now()}`)
    const snapshot = await uploadBytes(imageRef, file)

    const url = await getDownloadURL(snapshot.ref)

    filesUrls.push(url)
  }

  return filesUrls
}

export const addNewTodo = async (title, text, date, files) => {
  let uploadedFiles

  try {
    uploadedFiles = await uploadFiles(files)
  } catch (e) {
    console.error('Error uploading files: ', e)
  }

  try {
    const docRef = await addDoc(collection(db, 'todos'), {
      title,
      text,
      date,
      completed: false,
      uploadedFiles,
    })

    console.log('Document written with ID: ', docRef.id)

    return true
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export const deleteTodo = async (id) => {
  try {
    await deleteDoc(doc(db, 'todos', id))

    console.log('Document deleted')

    return true
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

    return true
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

    return true
  } catch (e) {
    console.error('Error updating document: ', e)
  }
}
