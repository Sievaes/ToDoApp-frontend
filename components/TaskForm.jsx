import { useEffect, useRef, useState } from "react"
import styles from "./TaskForm.module.css"

const TaskForm = ({ handleAddTask, setTaskFormVisible }) => {
  const [task, setTask] = useState("")
  const [description, setDescription] = useState("")
  const [subTaskInputs, setSubTaskInputs] = useState([])
  const [priority, setPriority] = useState(3)

  const isSubtasks = subTaskInputs.length > 0

  //adds a subtask input
  const addInput = (e) => {
    e.preventDefault()
    if (subTaskInputs.length > 4) return
    setSubTaskInputs([...subTaskInputs, { task: "" }])
  }

  //set priority
  const handlePriority = (event) => {
    setPriority(Number(event.target.value))
  }

  //adds subtask input to the inputs state
  const handleInputChange = (event, index) => {
    const newInputs = [...subTaskInputs]
    newInputs[index].task = event.target.value
    setSubTaskInputs(newInputs)
  }

  //submit newTask to parent TaskList
  const handleSubmit = (event) => {
    event.preventDefault()

    const newTask = {
      task: task,
      description: description,
      priority: priority,
      subTasks: subTaskInputs,
    }
    setTask("")
    setDescription("")
    setSubTaskInputs([])
    closeForm()
    handleAddTask(newTask)
  }

  //sets visible to false in parent TaskList component
  const closeForm = () => {
    setTaskFormVisible((current) => !current)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.taskForm}>
      <div className={styles.inputDiv}>
        <label>
          Task
          <input
            type="text"
            value={task}
            onChange={(event) => setTask(event.target.value)}
            autoFocus
          ></input>
        </label>
      </div>
      <div className={styles.inputDiv}>
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></input>
        </label>
      </div>
      <div className={styles.priorityDiv}>
        Priority
        <div>
          <label>
            Low
            <input
              type="radio"
              value="3"
              name="priority"
              onChange={(event) => handlePriority(event)}
              checked={priority === 3}
            />
          </label>
        </div>
        <div>
          <label>
            Medium
            <input
              type="radio"
              value="2"
              name="priority"
              onChange={(event) => handlePriority(event)}
              checked={priority === 2}
            />
          </label>
        </div>
        <div>
          <label>
            High
            <input
              type="radio"
              value="1"
              name="priority"
              onChange={(event) => handlePriority(event)}
              checked={priority === 1}
            />
          </label>
        </div>
      </div>

      <div className={styles.subTaskDiv}>
        {isSubtasks ? "Subtasks" : ""}
        {subTaskInputs.map((input, index) => (
          <div key={index}>
            <input
              type="text"
              value={input.value}
              onChange={(event) => handleInputChange(event, index)}
            />
          </div>
        ))}
      </div>
      <div>
        <button type="button" onClick={addInput}>
          Add Subtask
        </button>
      </div>
      <div>
        <button type="submit">Add Task</button>
        <button type="button" onClick={closeForm}>
          Close
        </button>
      </div>
    </form>
  )
}

export default TaskForm
