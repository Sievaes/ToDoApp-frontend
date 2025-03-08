const API_URL = "api/tasks"

const fetchTasks = async () => {
  try {
    const response = await fetch(API_URL)

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
