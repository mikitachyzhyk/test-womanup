import React, { useState } from 'react'
import AddForm from './components/AddForm'
import './App.less'
import TaskList from './components/TaskList'
import todos from './todos.json'

function App() {
  const [tasks, setTasks] = useState(todos)

  return (
    <div className="app">
      <AddForm />
      <TaskList tasks={tasks} />
    </div>
  )
}

export default App
