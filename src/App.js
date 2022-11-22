import React, { useEffect, useState } from 'react'
import AddForm from './components/AddForm'
import './App.less'
import TaskList from './components/TaskList'
import Footer from './components/Footer'
import {
  addNewTodo,
  getTodos,
  deleteTodo,
  updateTodo,
  updateTodoCompletion,
} from './firebase'

function App() {
  const [tasks, setTasks] = useState(null)

  useEffect(() => {
    getTodos()
      .then((todos) => {
        setTasks(todos)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const addNewTask = (title, text, date) => {
    setTasks((tasks) => [{ id: Date.now(), title, text, date }, ...tasks])
    addNewTodo(title, text, date)
  }

  const removeTask = (id) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id))

    deleteTodo(id)
  }

  const changeTaskCompletion = (id, isCompleted) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, completed: isCompleted } : task
      )
    )

    updateTodoCompletion(id, isCompleted)
  }

  const changeTask = (id, title, text, date) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, title, text, date } : task
      )
    )

    updateTodo(id, title, text, date)
  }

  return (
    <div className="app">
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
