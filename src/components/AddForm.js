function AddForm() {
  return (
    <form className="form">
      <legend>Add new task:</legend>
      <div className="formField">
        <label htmlFor="add-task-title">Title:</label>
        <input id="add-task-title" type="text" />
      </div>
      <div className="formField">
        <label htmlFor="add-task-text">Text:</label>
        <textarea id="add-task-text" />
      </div>
      <div className="formAdditionalFields">
        <div className="formFieldDate">
          <label htmlFor="add-task-date">Due Date:</label>
          <input id="add-task-date" type="date" />
        </div>
        <div className="formFieldFiles">
          <input type="file" multiple />
        </div>
      </div>
      <button className="formBtn">Add task</button>
    </form>
  )
}

export default AddForm
