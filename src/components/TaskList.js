import TaskListItem from './TaskListItem'

function TaskList({ tasks }) {
  return (
    <ul className="taskList">
      {tasks.map((task) => (
        <TaskListItem
          title={task.title}
          text={task.text}
          date={task.date}
          completed={task.completed}
        />
      ))}
    </ul>
  )
}

export default TaskList
