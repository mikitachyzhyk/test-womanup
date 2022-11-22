import Loader from './Loader'
import TaskListItem from './TaskListItem'

function TaskList({ tasks, changeTaskCompletion, changeTask, removeTask }) {
  console.log(tasks)
  return (
    <ul className="taskList">
      {tasks ? (
        Array.isArray(tasks) && tasks.length === 0 ? (
          'No tasks to complete.'
        ) : (
          tasks.map((task) => (
            <TaskListItem
              key={task.id}
              id={task.id}
              title={task.title}
              text={task.text}
              date={task.date}
              completed={task.completed}
              changeTaskCompletion={changeTaskCompletion}
              changeTask={changeTask}
              removeTask={removeTask}
            />
          ))
        )
      ) : (
        <Loader />
      )}
    </ul>
  )
}

export default TaskList
