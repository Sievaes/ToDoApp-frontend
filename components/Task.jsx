import SubTask from "./SubTask"

const Task = ({ taskData }) => {
  const {
    task,
    description,
    priority,
    createdAt,
    updatedAt,
    completed,
    subTasks,
  } = taskData

  const formattedCreatedAtTime = new Date(createdAt).toLocaleString()
  const formattedUpdatedAtTime = new Date(updatedAt).toLocaleString()

  return (
    <div>
      <h3>{task}</h3>
      <p>{description}</p>
      <p>Priority: {priority}</p>
      <p>Created At: {formattedCreatedAtTime}</p>
      <p>Updated At: {formattedUpdatedAtTime}</p>
      <p>Completed: {completed ? "Yes" : "No"}</p>
      {subTasks && subTasks.length > 0 && (
        <ul>
          {subTasks.map((subTask) => (
            <SubTask subTaskData={subTask} key={subTask.task} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default Task
