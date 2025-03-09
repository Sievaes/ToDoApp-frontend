import styles from "./SubTask.module.css"

const SubTask = ({ subTaskData, taskId, handleRemoveSubTask }) => {
  const { task, completed, id } = subTaskData

  const handleComplete = (e) => {
    e.stopPropagation()
  }

  const handleRemove = (e) => {
    e.stopPropagation()
    handleRemoveSubTask(taskId, id)
  }

  return (
    <li className={styles.subTask}>
      <p>- {task}</p>
      <div className={styles.buttonDiv}>
        <button onClick={handleComplete}>Completed</button>
        <button onClick={handleRemove}>Remove</button>
      </div>
    </li>
  )
}

export default SubTask
