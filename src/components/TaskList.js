function TaskList() {
  return (
    <ul className="taskList">
      <li className="taskListItem">
        <h3>Task #1</h3>
        <p>Lorem ipsum dolor sit amet.</p>
        <div className="taskListItemBottom">
          <div>
            <span>25.11.22</span> / <span>files</span>
          </div>
          <label>
            <input type="checkbox" /> done!
          </label>
        </div>
      </li>
    </ul>
  )
}

export default TaskList
