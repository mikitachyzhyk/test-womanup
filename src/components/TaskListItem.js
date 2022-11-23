import { useState } from 'react'
import dayjs from 'dayjs'

function TaskListItem({
  id,
  title = 'New task',
  text = 'Do smth!',
  date = 0,
  uploadedFiles = [],
  completed = false,
  changeTaskCompletion,
  changeTask,
  removeTask,
  removeFile,
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

  const handleCancel = () => {
    setEditing(false)
  }

  const handleFileRemove = (fileUrl) => {
    removeFile(id, fileUrl)
  }

  const isExpired =
    new Date(date).setHours(0, 0, 0, 0) <
    new Date(Date.now()).setHours(0, 0, 0, 0)

  const classes = `taskListItem${
    done ? ' taskListItem--done' : isExpired ? ' taskListItem--expired' : ''
  }`

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
        {editing ? (
          <input type="date" value={editDate} onChange={editDateHandler} />
        ) : (
          <>
            <span>{dayjs(date).format('DD MMM YY')}</span>
            <label>
              <input
                type="checkbox"
                checked={done}
                onChange={handleDoneChange}
              />{' '}
              done!
            </label>
          </>
        )}
      </div>
      {editing ? (
        <>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}

      {!editing && <button onClick={handleRemove}>X</button>}

      {uploadedFiles.length > 0 && (
        <div className="taskListItemFiles">
          <span>Uploaded Files:</span>
          <ul>
            {uploadedFiles.map((fileUrl, i) => (
              <li key={i}>
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noreferrer noopener nofollow"
                >
                  Attachment-{i + 1}
                </a>{' '}
                {editing && (
                  <button onClick={() => handleFileRemove(fileUrl)}>X</button>
                )}
              </li>
            ))}
          </ul>

          {editing && <input type="file" />}
        </div>
      )}
    </li>
  )
}

export default TaskListItem
