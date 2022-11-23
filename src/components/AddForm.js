import { useRef, useState } from 'react'

/**
 * Component for adding a new Todo item
 *
 * @component
 */
function AddForm({ addNewTask }) {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [date, setDate] = useState('')
  const [files, setFiles] = useState(null)

  const filesInputEl = useRef(null)

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleTextChange = (e) => {
    setText(e.target.value)
  }

  const handleDateChange = (e) => {
    setDate(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    addNewTask(title, text, date, files)
    setTitle('')
    setText('')
    setDate('')
    setFiles(null)
  }

  const handleFileChange = (e) => {
    setFiles(e.target.files)
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <legend>Add new task:</legend>
      <div className="formField">
        <label htmlFor="add-task-title">Title:</label>
        <input
          id="add-task-title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div className="formField">
        <label htmlFor="add-task-text">Text:</label>
        <textarea
          id="add-task-text"
          value={text}
          onChange={handleTextChange}
          required
        />
      </div>
      <div className="formAdditionalFields">
        <div className="formField__Date">
          <label htmlFor="add-task-date">Expiry Date:</label>
          <input
            id="add-task-date"
            type="date"
            value={date}
            onChange={handleDateChange}
            required
          />
        </div>
        <div className="formField__Files">
          <input
            type="file"
            multiple
            ref={filesInputEl}
            onChange={handleFileChange}
          />
        </div>
      </div>
      <button className="formBtn">Add task</button>
    </form>
  )
}

export default AddForm
