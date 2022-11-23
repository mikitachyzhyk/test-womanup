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

/**
 * Get Todos from Firebase Firestore.
 * @async
 *
 * @return {Array} Array of todos
 */
export const getTodos = async () => {
  const querySnapshot = await getDocs(collection(db, 'todos'))
  const todos = []

  querySnapshot.forEach((doc) => {
    todos.push({ ...doc.data(), id: doc.id })
  })

  return todos
}

/**
 * Upload files to Firebase Storage.
 * @async
 *
 * @param {FileList} files Collection of files of type File
 *
 * @return {Array} Array of file urls
 */
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

/**
 * Delete files from Firebase Storage.
 * @async
 *
 * @param {Array} files Array of URLs of files
 *
 * @returns {void}
 */
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

/**
 * Add new Todo to Firebase Firestore.
 * @async
 *
 * @param {string} title The Todo title
 * @param {string} text The Todo description
 * @param {string} date The Todo date
 * @param {FileList} files Collection of files of type File
 *
 * @returns {boolean} Returns true if todo addition was successful, or false if not
 */
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

    return false
  }
}

/**
 * Delete Todo from Firebase Firestore.
 * @async
 *
 * @param {string} id The Todo id
 * @param {Array} [files=null] Optional Array of URLs of files
 *
 * @returns {boolean} Returns true if todo deletion was successful, or false if not
 */
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
    return false
  }
}

/**
 * Update Todo from Firebase Firestore.
 * @async
 *
 * @param {string} id The Todo id
 * @param {string} title The Todo title
 * @param {string} text The Todo description
 * @param {string} date The Todo date
 * @param {Array} editFiles Array of URLs of files left after deletion
 * @param {Array} newFiles Array of URLs of new files
 * @param {Array} removeFiles Array of URLs of files to be removed
 *
 * @returns {boolean} Returns true if the todo update was successful, or false if not
 */
export const updateTodo = async (
  id,
  title,
  text,
  date,
  editFiles,
  newFiles,
  removeFiles
) => {
  const ref = doc(db, 'todos', id)

  let uploadedFiles = []

  if (newFiles) {
    try {
      uploadedFiles = await uploadFiles(newFiles)
    } catch (e) {
      console.error('Error uploading files: ', e)
    }
  }

  const newUploadedFiles = [...editFiles, ...uploadedFiles]

  deleteFiles(removeFiles)

  try {
    await updateDoc(ref, {
      title,
      text,
      date,
      uploadedFiles: newUploadedFiles,
    })

    console.log('Document updated')

    return true
  } catch (e) {
    console.error('Error updating document: ', e)
    return false
  }
}

/**
 * Update Todo from Firebase Firestore.
 * @async
 *
 * @param {string} id The Todo id
 * @param {boolean} isCompleted The Todo completion status
 *
 * @returns {boolean} Returns true if the todo update was successful, or false if not
 */
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
    return false
  }
}
