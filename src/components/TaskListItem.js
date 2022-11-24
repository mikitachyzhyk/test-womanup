import { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'

/**
 * Component for a single Todo item
 *
 * @component
 */
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
}) {
  const [done, setDone] = useState(completed)
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(title)
  const [editText, setEditText] = useState(text)
  const [editDate, setEditDate] = useState(dayjs(date).format('YYYY-MM-DD'))
  const [editFiles, setEditFiles] = useState(uploadedFiles)
  const [newFiles, setNewFiles] = useState(null)
  const [removeFiles, setRemoveFiles] = useState([])
  const filesInputEl = useRef(null)

  useEffect(() => {
    if (uploadedFiles.length !== editFiles.length) setEditFiles(uploadedFiles)
  }, [uploadedFiles, editFiles])

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
    changeTask(
      id,
      editTitle,
      editText,
      editDate,
      editFiles,
      newFiles,
      removeFiles
    )
    setEditing(false)
    setRemoveFiles([])
  }

  const handleCancel = () => {
    setEditing(false)
    setEditFiles(uploadedFiles)
  }

  const handleFileRemove = (fileUrl) => {
    setRemoveFiles((files) => [...files, fileUrl])
    setEditFiles((files) => files.filter((file) => file !== fileUrl))
  }

  const handleFileChange = (e) => {
    setNewFiles(e.target.files)
  }

  const isExpired =
    new Date(date).setHours(0, 0, 0, 0) <
    new Date(Date.now()).setHours(0, 0, 0, 0)

  const classes = `taskListItem${
    done ? ' taskListItem--done' : isExpired ? ' taskListItem--expired' : ''
  }`

  return (
    <li className={classes}>
      <div className="taskListItem__Title">
        {editing ? (
          <input type="text" value={editTitle} onChange={editTitleHandler} />
        ) : (
          <h3>{title}</h3>
        )}
      </div>

      <div className="taskListItem__Text">
        {editing ? (
          <textarea onChange={editTextHandler} value={editText} />
        ) : (
          <p>{text}</p>
        )}
      </div>

      <div className="taskListItem__Btns">
        {editing ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}
      </div>

      <button
        className="removeBtn taskListItem__removeBtn"
        onClick={handleRemove}
        title="close"
      ></button>

      <div className="taskListItem__Files">
        {editFiles.length > 0 && (
          <>
            <span>Uploaded Files:</span>
            <ul>
              {editFiles.map((fileUrl, i) => (
                <li key={i}>
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noreferrer noopener nofollow"
                  >
                    Attachment-{i + 1}
                  </a>{' '}
                  {editing && (
                    <button
                      className="removeBtn removeBtn--small"
                      onClick={() => {
                        handleFileRemove(fileUrl)
                      }}
                      title="remove"
                    ></button>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}

        {editing && (
          <input
            type="file"
            multiple
            ref={filesInputEl}
            onChange={handleFileChange}
          />
        )}
      </div>

      <div className="taskListItem__Bottom">
        {editing ? (
          <input type="date" value={editDate} onChange={editDateHandler} />
        ) : (
          <>
            <span className="taskListItem__Date">
              {dayjs(date).format('DD MMM YY')}
            </span>
            <div className="taskListItem__Done">
              <input
                id={'done-' + id}
                type="checkbox"
                checked={done}
                onChange={handleDoneChange}
              />
              <label htmlFor={'done-' + id} tabIndex="0">
                <span></span> I'm done!
              </label>
            </div>
          </>
        )}
      </div>
    </li>
  )
}

export default TaskListItem
