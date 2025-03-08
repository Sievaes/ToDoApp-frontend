import { useState } from "react"
import SubTask from "./SubTask"
import styles from "./Task.module.css"

const Task = ({ taskData }) => {
  const [visible, setVisible] = useState(false)

  const {
    task,
    description,
    priority,
    createdAt,
    updatedAt,
    completed,
    subTasks,
  } = taskData

  const formattedCreatedAtTime = new Date(createdAt).toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
  const formattedUpdatedAtTime = new Date(updatedAt).toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })

  const toggleVisible = () => {
    setVisible((current) => !current)
  }

  const priorityLevel =
    priority === 1
      ? "High"
      : priority === 2
      ? "Medium"
      : priority === 3
      ? "Low"
      : ""

  return (
    <div
      className={`${styles.task} ${
        priority === 1
          ? styles.highPriority
          : priority === 2
          ? styles.mediumPriority
          : priority === 3
          ? styles.lowPriority
          : ""
      }`}
      onClick={toggleVisible}
    >
      <div className={styles.headerContent}>
        <div>
          <h2>{task}</h2>
          {description && <p> {description}</p>}
        </div>
        <button>Remove task</button>
      </div>

      <div className={`${visible ? styles.textContent : ""}`}>
        {visible && (
          <div>
            <p>Priority: {priorityLevel}</p>
            <p>Completed: {completed ? "Yes" : "No"}</p>

            <div className={styles.subTaskDiv}>
              {
                <ul>
                  {subTasks.map((subTask) => (
                    <SubTask subTaskData={subTask} key={subTask.id} />
                  ))}
                  <button>+</button>
                </ul>
              }
            </div>

            <div className={styles.dateDiv}>
              <p>Created At: {formattedCreatedAtTime}</p>
              <p>Updated At: {formattedUpdatedAtTime}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Task
