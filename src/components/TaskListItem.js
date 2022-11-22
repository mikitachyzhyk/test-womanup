import { useState } from 'react'
import dayjs from 'dayjs'

function TaskListItem({
  id,
  title = 'New task',
  text = 'Do smth!',
  date = 0,
  completed = false,
  changeTaskCompletion,
  changeTask,
  removeTask,
}) {
  const [done, setDone] = useState(completed)
  const [editing, setEditing] = useState(false)

  const [editTitle, setEditTitle] = useState(title)
  const [editText, setEditText] = useState(text)
  const [editDate, setEditDate] = useState(dayjs(date).format('YYYY-MM-DD'))

  const editTitleHandler = (e) => {
    setEditTitle(e.target.value)
  }
  const editTextHandler = (e) => {
    setEditText(e.target.value)
  }
  const editDateHandler = (e) => {
    setEditDate(e.target.value)
  }

  const handleDoneChange = (e) => {
    setDone(e.target.checked)

    changeTaskCompletion(id, !done)
  }

  const handleRemove = () => {
    removeTask(id)
  }

  const handleEdit = () => {
    setEditing(true)
  }

  const handleSave = () => {
    changeTask(id, editTitle, editText, editDate)
    setEditing(false)
  }

  const classes = `taskListItem${done ? ' taskListItem--done' : ''}`

  return (
    <li className={classes}>
      {editing ? (
        <input type="text" value={editTitle} onChange={editTitleHandler} />
      ) : (
        <h3>{title}</h3>
      )}
      {editing ? (
        <textarea onChange={editTextHandler} value={editText} />
      ) : (
        <p>{text}</p>
      )}
      <div className="taskListItemBottom">
        <div>
          {editing ? (
            <input type="date" value={editDate} onChange={editDateHandler} />
          ) : (
            <span>{dayjs(date).format('DD MMM YY')}</span>
          )}{' '}
          / <span>files</span>
        </div>
        <label>
          <input type="checkbox" checked={done} onChange={handleDoneChange} />{' '}
          done!
        </label>
      </div>
      {editing ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
      <button onClick={handleRemove}>X</button>
    </li>
  )
}

export default TaskListItem
