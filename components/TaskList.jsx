import { useEffect, useState } from "react"
import styles from "./TaskList.module.css"
import taskService from "../services/tasks"
import Task from "./Task"
import TaskForm from "./TaskForm"

const TaskList = ({ handleLogout }) => {
  const [tasks, setTasks] = useState([])
  const [taskFormVisible, setTaskFormVisible] = useState(false)
  const [showActive, setShowActive] = useState(true)

  //Fetch initial data from database
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await taskService.fetchTasks()
        setTasks(sortTasks(response))
      } catch (error) {
        console.log(error)
      }

      return
    }
    fetchTasks()
  }, [])

  const sortTasks = (tasks) => {
    const sortedByPriority = tasks.sort((a, b) => a.priority - b.priority)
    return sortedByPriority
  }

  const handleAddTask = async (task) => {
    try {
      const newTask = await taskService.addTask(task)
      const updatedTasks = [...tasks, newTask]
      setTasks(sortTasks(updatedTasks))
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateTask = async (task) => {
    try {
      const response = await taskService.updateTask(task)
      const updatedTask = tasks.map((task) =>
        task.id === response.id ? response : task
      )
      setTasks(updatedTask)
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemoveTask = async (id) => {
    try {
      await taskService.deleteTask(id)
      const updatedTasks = tasks.filter((task) => task.id !== id)
      const filteredTasks = sortTasks(updatedTasks)

      setTasks(filteredTasks)
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemoveSubTask = async (taskId, subTaskId) => {
    try {
      const response = await taskService.deleteSubTask(taskId, subTaskId)
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? response : task
      )

      setTasks(updatedTasks)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateSubTask = async (taskId, subTaskId) => {
    try {
      const response = await taskService.updateSubTask(taskId, subTaskId)
      const updatedTasks = tasks.map((task) =>
        task.id === response.id ? response : task
      )
      console.log(updatedTasks)
      setTasks(updatedTasks)
    } catch (error) {
      console.log(error)
    }
  }

  const onLogout = () => {
    handleLogout()
  }

  return (
    <div className={styles.taskList}>
      <div className={styles.buttonContainer}>
        <div className={styles.buttonContainerLeft}>
          {!taskFormVisible && (
            <button onClick={() => setTaskFormVisible(true)}>Add task</button>
          )}
          {taskFormVisible && (
            <TaskForm
              handleAddTask={handleAddTask}
              setTaskFormVisible={setTaskFormVisible}
            />
          )}
        </div>
        <div className={styles.buttonContainerCenter}>
          <button onClick={() => setShowActive(true)}>Active</button>
          <button onClick={() => setShowActive(false)}>Completed</button>
        </div>
        <div className={styles.buttonContainerRight}>
          <button onClick={onLogout}>Logout</button>
        </div>
      </div>

      <div className={styles.tasksDiv}>
        {showActive &&
          tasks.map((task) =>
            task.completed === false ? (
              <Task
                taskData={task}
                handleUpdateTask={handleUpdateTask}
                handleRemoveTask={handleRemoveTask}
                handleRemoveSubTask={handleRemoveSubTask}
                handleUpdateSubTask={handleUpdateSubTask}
                key={task.id}
              />
            ) : (
              ""
            )
          )}

        {!showActive &&
          tasks.map((task) =>
            task.completed === true ? (
              <Task
                taskData={task}
                handleUpdateTask={handleUpdateTask}
                handleRemoveTask={handleRemoveTask}
                handleRemoveSubTask={handleRemoveSubTask}
                handleUpdateSubTask={handleUpdateSubTask}
                key={task.id}
              />
            ) : (
              ""
            )
          )}
      </div>
    </div>
  )
}

export default TaskList
