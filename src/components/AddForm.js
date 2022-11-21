import { useRef, useState } from 'react'

function AddForm() {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [date, setDate] = useState('')
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

  return (
    <form className="form">
      <legend>Add new task:</legend>
      <div className="formField">
        <label htmlFor="add-task-title">Title:</label>
        <input
          id="add-task-title"
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="formField">
        <label htmlFor="add-task-text">Text:</label>
        <textarea id="add-task-text" value={text} onChange={handleTextChange} />
      </div>
      <div className="formAdditionalFields">
        <div className="formFieldDate">
          <label htmlFor="add-task-date">Expiry Date:</label>
          <input
            id="add-task-date"
            type="date"
            value={date}
            onChange={handleDateChange}
          />
        </div>
        <div className="formFieldFiles">
          <input type="file" multiple ref={filesInputEl} />
        </div>
      </div>
      <button className="formBtn">Add task</button>
    </form>
  )
}

export default AddForm
