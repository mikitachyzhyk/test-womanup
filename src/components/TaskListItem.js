import { useState } from 'react'
import dayjs from 'dayjs'

function TaskListItem({
  id,
  title = 'New task',
  text = 'Do smth!',
  date = 0,
  completed = false,
  changeTaskCompletion,
  removeTask,
}) {
  const [done, setDone] = useState(completed)

  const handleDoneChange = (e) => {
    setDone(e.target.checked)

    changeTaskCompletion(id, !done)
  }

  const handleRemove = () => {
    removeTask(id)
  }

  const classes = `taskListItem${done ? ' taskListItem--done' : ''}`

  return (
    <li className={classes}>
      <h3>{title}</h3>
      <p>{text}</p>
      <div className="taskListItemBottom">
        <div>
          <span>{dayjs(date).format('DD MMM YY')}</span> / <span>files</span>
        </div>
        <label>
          <input type="checkbox" checked={done} onChange={handleDoneChange} />{' '}
          done!
        </label>
      </div>
      <button onClick={handleRemove}>X</button>
    </li>
  )
}

export default TaskListItem
