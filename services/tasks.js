const API_URL = "api/tasks"

//GET get all tasks
const fetchTasks = async () => {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  const data = await response.json()
  return data
}

//POST add task
const addTask = async (newTask) => {
  const response = await fetch(API_URL, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
  })
  const data = await response.json()
  return data
}
//DELETE delete task
const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "delete",
  })

  return response
}

//PUT delete subtask
const deleteSubTask = async (taskId, subTaskId) => {
  const response = await fetch(`${API_URL}/${taskId}/subtasks/${subTaskId}`, {
    method: "put",
  })

  const data = response.json()
  return data
}

//PUT update task
const updateTask = async (task) => {
  const response = await fetch(`${API_URL}/${task.id}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  })
  const data = response.json()
  return data
}

export default { fetchTasks, addTask, deleteTask, deleteSubTask, updateTask }
