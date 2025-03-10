import styles from "./SubTask.module.css"

const SubTask = ({
  subTaskData,
  taskId,
  handleRemoveSubTask,
  handleUpdateSubTask,
}) => {
  const { task, completed, id } = subTaskData

  const handleComplete = (e) => {
    e.stopPropagation()
    handleUpdateSubTask(taskId, id)
  }

  const handleRemove = (e) => {
    e.stopPropagation()
    handleRemoveSubTask(taskId, id)
  }

  return (
    <li className={styles.subTask}>
      <p className={completed ? styles.completed : ""}>- {task}</p>
      <div className={styles.buttonDiv}>
        {completed ? "" : <button onClick={handleComplete}>Complete</button>}
        <button onClick={handleRemove}>Remove</button>
      </div>
    </li>
  )
}

export default SubTask
