import TaskListItem from './TaskListItem'

function TaskList({ tasks }) {
  return (
    <ul className="taskList">
      {tasks.map((task) => (
        <TaskListItem
          key={task.id}
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
