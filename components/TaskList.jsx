import { useEffect, useState } from "react"
import styles from "./TaskList.module.css"
import taskService from "../services/tasks"
import Task from "./Task"
import TaskForm from "./TaskForm"

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [taskFormVisible, setTaskFormVisible] = useState(false)

  //Fetch initial data from database
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await taskService.fetchTasks()
        const sortedByPriority = response.sort(
          (a, b) => a.priority - b.priority
        )
        setTasks(sortedByPriority)
      } catch (error) {
        console.log(error)
      }

      return
    }
    fetchTasks()
  }, [])

  const addTask = async () => {}

  const updateTask = async () => {}

  const removeTask = async () => {}

  const handleNewTaskForm = () => {}

  return (
    <div className={styles.taskList}>
      <div className={styles.buttonContainer}>
        {!taskFormVisible && (
          <button onClick={() => setTaskFormVisible(true)}>Add task</button>
        )}
        {taskFormVisible && <TaskForm addTask={addTask} />}
      </div>

      <div className={styles.tasks}>
        {tasks.map((task) => (
          <Task taskData={task} key={task.id} />
        ))}
      </div>
    </div>
  )
}

export default TaskList
