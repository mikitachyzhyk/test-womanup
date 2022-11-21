import React, { useState } from 'react'
import AddForm from './components/AddForm'
import './App.less'
import TaskList from './components/TaskList'
import Footer from './components/Footer'
import todos from './todos.json'

function App() {
  const [tasks, setTasks] = useState(todos)

  const addNewTask = (title, text, date) => {
    setTasks((tasks) => [{ id: Date.now(), title, text, date }, ...tasks])
  }

  const removeTask = (id) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id))
  }

  const changeTaskCompletion = (id, isCompleted) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, completed: isCompleted } : task
      )
    )
    // TODO: change all filelds (title, text, date)
  }

  return (
    <div className="app">
      <AddForm addNewTask={addNewTask} />
      <TaskList
        tasks={tasks}
        changeTaskCompletion={changeTaskCompletion}
        removeTask={removeTask}
      />

      <Footer />
    </div>
  )
}

export default App
