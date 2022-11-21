import React from 'react'
import AddForm from './components/AddForm'
import './App.less'
import TaskList from './components/TaskList'

function App() {
  return (
    <div className="app">
      <AddForm />
      <TaskList />
    </div>
  )
}

export default App
