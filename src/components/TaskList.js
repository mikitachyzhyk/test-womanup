import Loader from './Loader'
import TaskListItem from './TaskListItem'

function TaskList({ tasks, changeTaskCompletion, changeTask, removeTask }) {
  return (
    <ul className="taskList">
      {tasks ? (
        tasks.length === 0 ? (
          'No tasks to complete.'
        ) : (
          [...tasks]
            .sort((todo1, todo2) => {
              return (
                new Date(todo2.date).getTime() - new Date(todo1.date).getTime()
              )
            })
            .map((task) => (
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
