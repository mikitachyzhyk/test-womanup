import TaskListItem from './TaskListItem'

function TaskList({ tasks, changeTaskCompletion, removeTask }) {
  return (
    <ul className="taskList">
      {tasks.map((task) => (
        <TaskListItem
          key={task.id}
          id={task.id}
          title={task.title}
          text={task.text}
          date={task.date}
          completed={task.completed}
          changeTaskCompletion={changeTaskCompletion}
          removeTask={removeTask}
        />
      ))}
    </ul>
  )
}

export default TaskList
