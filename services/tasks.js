const API_URL = "http://localhost:3001"

const fetchTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/api/tasks/`)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
  }
}

export default { fetchTasks }
