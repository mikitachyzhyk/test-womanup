import { initializeApp } from 'firebase/app'
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
import {
  collection,
  getDocs,
  getDoc,
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

const deleteFiles = async (files) => {
  for (const file of files) {
    const desertRef = ref(storage, file)

    deleteObject(desertRef)
      .then(() => {
        console.log('File deleted successfully')
      })
      .catch((e) => {
        console.error('Error deleting files: ', e)
      })
  }
}

const deleteFile = async (file) => {
  const desertRef = ref(storage, file)

  return deleteObject(desertRef)
    .then(() => {
      console.log('File deleted successfully')

      return true
    })
    .catch((e) => {
      console.error('Error deleting files: ', e)
    })
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

export const deleteTodo = async (id, files = null) => {
  try {
    await deleteDoc(doc(db, 'todos', id))

    if (files) {
      deleteFiles(files)
    }

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

export const updateTodoFileList = async (id, file) => {
  const ref = doc(db, 'todos', id)

  const docRef = doc(db, 'todos', id)
  const docSnap = await getDoc(docRef)
  let todo

  if (docSnap.exists()) {
    todo = docSnap.data()
  } else {
    console.log('No such document!')
  }

  const newUploadedFiles = todo?.uploadedFiles.filter((f) => f !== file)

  deleteFile(file)

  try {
    await updateDoc(ref, {
      id,
      uploadedFiles: newUploadedFiles,
    })

    console.log('Document updated')

    return true
  } catch (e) {
    console.error('Error updating document: ', e)
  }
}
