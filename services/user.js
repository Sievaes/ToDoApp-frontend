const API_URL = "api/users"

const handleCreateUser = async (credentials) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error)
  }

  const data = await response.json()
  return data
}

export default { handleCreateUser }
