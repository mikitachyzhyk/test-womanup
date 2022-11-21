function TaskListItem() {
  return (
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
  )
}

export default TaskListItem
