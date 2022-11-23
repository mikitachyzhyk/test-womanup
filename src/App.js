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
  updateTodoFileList,
} from './firebase'

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

  const addNewTask = async (title, text, date, files) => {
    setLoading(true)
    const added = await addNewTodo(title, text, date, files)
    if (added) setReload(true)
  }

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

  const changeTaskCompletion = async (id, isCompleted) => {
    setLoading(true)
    const updated = await updateTodoCompletion(id, isCompleted)
    if (updated) setReload(true)
  }

  const changeTask = async (id, title, text, date) => {
    setLoading(true)
    const updated = await updateTodo(id, title, text, date)
    if (updated) setReload(true)
  }

  const removeFile = async (id, fileUrl) => {
    setLoading(true)
    const removed = await updateTodoFileList(id, fileUrl)
    if (removed) setReload(true)
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
        removeFile={removeFile}
      />

      <Footer />
    </div>
  )
}

export default App
