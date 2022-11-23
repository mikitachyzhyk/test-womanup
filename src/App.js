import React, { useEffect, useState } from 'react'
import './App.less'
import AddForm from './components/AddForm'
import TaskList from './components/TaskList'
import Footer from './components/Footer'
import {
  addNewTodo,
  getTodos,
  deleteTodo,
  updateTodo,
  updateTodoCompletion,
} from './firebase'

/**
 * The main component of the application
 *
 * @component
 */
function App() {
  const [tasks, setTasks] = useState(null)
  const [reload, setReload] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (reload) {
      getTodos()
        .then((todos) => {
          setTasks(todos)
          setReload(false)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      setLoading(false)
    }
  }, [reload])

  /**
   * Passes parameters to a function that adds new todo to data store
   * @async
   *
   * @param {string} title The Todo title
   * @param {string} text The Todo description
   * @param {string} date The Todo date
   * @param {FileList} files Collection of files of type File
   *
   * @returns {void}
   */
  const addNewTask = async (title, text, date, files) => {
    setLoading(true)
    const added = await addNewTodo(title, text, date, files)
    if (added) setReload(true)
  }

  /**
   * Passes parameters to a function that remove todo from data store
   * @async
   *
   * @param {string} id The Todo id
   *
   * @returns {void}
   */
  const removeTask = async (id) => {
    setLoading(true)

    let removed
    const task = tasks.find((task) => task.id === id)

    if (task.uploadedFiles.length > 0) {
      removed = await deleteTodo(id, task.uploadedFiles)
    } else {
      removed = await deleteTodo(id)
    }

    if (removed) setReload(true)
  }

  /**
   * Passes parameters to a function that changes the completion status of todo in data store
   * @async
   *
   * @param {string} id The Todo id
   * @param {boolean} isCompleted The Todo completion status
   *
   * @returns {void}
   */
  const changeTaskCompletion = async (id, isCompleted) => {
    setLoading(true)
    const updated = await updateTodoCompletion(id, isCompleted)
    if (updated) setReload(true)
  }

  /**
   * Passes parameters to a function that modifies todo in data store
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
   * @returns {void}
   */
  const changeTask = async (
    id,
    title,
    text,
    date,
    editFiles,
    newFiles,
    removeFiles
  ) => {
    setLoading(true)
    const updated = await updateTodo(
      id,
      title,
      text,
      date,
      editFiles,
      newFiles,
      removeFiles
    )
    if (updated) setReload(true)
  }

  const classes = `app${loading ? ' app--loading' : ''}`

  return (
    <div className={classes}>
      <AddForm addNewTask={addNewTask} />

      <TaskList
        tasks={tasks}
        changeTaskCompletion={changeTaskCompletion}
        changeTask={changeTask}
        removeTask={removeTask}
      />

      <Footer />
    </div>
  )
}

export default App
