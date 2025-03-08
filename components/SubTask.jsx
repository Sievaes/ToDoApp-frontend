import styles from "./SubTask.module.css"

const SubTask = ({ subTaskData }) => {
  const { task, completed } = subTaskData

  const handleComplete = (e) => {
    e.stopPropagation()
    console.log("Done button pressed")
  }

  const handleRemove = (e) => {
    e.stopPropagation()
    console.log("Done button pressed")
  }

  return (
    <li className={styles.subTask}>
      <p>- {task}</p>
      <div className={styles.buttonDiv}>
        <button onClick={(e) => handleComplete(e)}>Done</button>
        <button onClick={(e) => handleRemove(e)}>Remove</button>
      </div>
    </li>
  )
}

export default SubTask
