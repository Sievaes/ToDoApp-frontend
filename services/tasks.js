const API_URL = "api/tasks"

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

//GET get all tasks
const fetchTasks = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: { Authorization: token },
  })

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
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(newTask),
  })
  const data = await response.json()
  return data
}
//DELETE delete task
const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "delete",
    headers: { Authorization: token },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error)
  }

  return response
}

//PUT delete subtask
const deleteSubTask = async (taskId, subTaskId) => {
  const response = await fetch(
    `${API_URL}/${taskId}/subtasks/${subTaskId}/remove`,
    {
      method: "put",
      headers: { Authorization: token },
    }
  )

  if (!response.ok) {
    const error = await response.json()

    throw new Error(error)
  }

  const data = await response.json()
  return data
}

//PUT update task
const updateTask = async (task) => {
  const response = await fetch(`${API_URL}/${task.id}`, {
    method: "put",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(task),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error)
  }
  const data = await response.json()
  return data
}

//PUT update subtask
const updateSubTask = async (taskId, subTaskId) => {
  const response = await fetch(
    `${API_URL}/${taskId}/subtasks/${subTaskId}/completed`,
    {
      method: "put",
      headers: { Authorization: token },
    }
  )

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error)
  }

  const data = response.json()
  return data
}

export default {
  fetchTasks,
  addTask,
  deleteTask,
  deleteSubTask,
  updateTask,
  updateSubTask,
  setToken,
}
