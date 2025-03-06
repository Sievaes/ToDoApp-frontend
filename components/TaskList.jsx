import { useEffect, useState } from "react"
import taskService from "../services/tasks"
import Task from "./Task"

const TaskList = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await taskService.fetchTasks()
        setTasks(response)
      } catch (error) {
        console.log(error)
      }

      return
    }
    fetchTasks()
  }, [])

  return (
    <div>
      {tasks.map((task) => (
        <Task taskData={task} key={task.task} />
      ))}
    </div>
  )
}

export default TaskList
