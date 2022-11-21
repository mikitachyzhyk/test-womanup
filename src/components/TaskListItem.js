import { useState } from 'react'

function TaskListItem({
  title = 'New task',
  text = 'Do smth!',
  date = 0,
  completed = false,
}) {
  const [done, setDone] = useState(completed)

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
