import Loader from './Loader'
import TaskListItem from './TaskListItem'

/**
 * Component for list of Todo items
 *
 * @component
 */
function TaskList({ tasks, changeTaskCompletion, changeTask, removeTask }) {
  let sortedTasks = [],
    currentTasks,
    completedTasks,
    expiredTasks

  if (tasks) {
    const sortByDate = (todo1, todo2) =>
      new Date(todo2.date).getTime() - new Date(todo1.date).getTime()

    currentTasks = tasks
      .filter(
        (task) =>
          !task.completed &&
          !(new Date(task.date) < new Date().setHours(0, 0, 0, 0))
      )
      .sort(sortByDate)

    completedTasks = tasks?.filter((task) => task.completed).sort(sortByDate)

    expiredTasks = tasks
      ?.filter(
        (task) =>
          !task.completed &&
          new Date(task.date) < new Date().setHours(0, 0, 0, 0)
      )
      .sort(sortByDate)

    sortedTasks = [...currentTasks, ...expiredTasks, ...completedTasks]
  }

  return (
    <ul className="taskList">
      {tasks ? (
        tasks.length === 0 ? (
          'No tasks to complete.'
        ) : (
          sortedTasks.map((task) => (
            <TaskListItem
              key={task.id}
              id={task.id}
              title={task.title}
              text={task.text}
              date={task.date}
              uploadedFiles={task.uploadedFiles}
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
