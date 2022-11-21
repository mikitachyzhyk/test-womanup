import { useState } from 'react'

function TaskListItem({ title, text, date }) {
  const [done, setDone] = useState(false)

  const handleDoneChange = (e) => {
    setDone(e.target.checked)
  }

  const classes = `taskListItem${done ? ' taskListItem--done' : ''}`

  return (
    <li className={classes}>
      <h3>{title}</h3>
      <p>{text}</p>
      <div className="taskListItemBottom">
        <div>
          <span>{date}</span> / <span>files</span>
        </div>
        <label>
          <input type="checkbox" checked={done} onChange={handleDoneChange} />{' '}
          done!
        </label>
      </div>
      <button>X</button>
    </li>
  )
}

export default TaskListItem
