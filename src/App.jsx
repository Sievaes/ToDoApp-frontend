import { useEffect, useState } from "react"
import TaskList from "../components/TaskList"
import Login from "../components/Login"
// import loginService from "../services/login"
import taskService from "../services/tasks"
import styles from "./App.module.css"

const App = () => {
  // const [username, setUsername] = useState("")
  // const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser")
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      taskService.setToken(user.token)
      setUser(user)
    }
  }, [])

  // const handleLogin = async (event) => {
  //   try {
  //     event.preventDefault()
  //     const response = await loginService.handleLogin({ username, password })

  //     const user = {
  //       username: response.username,
  //       name: response.name,
  //       //bad practise to save token to the customer
  //       token: response.token,
  //     }

  //     taskService.setToken(response.token)
  //     setUser(user)
  //     setUsername("")
  //     setPassword("")
  //     window.localStorage.setItem("loggedUser", JSON.stringify(user))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem("loggedUser")
  }

  return (
    <div className={styles.app}>
      <div className={styles.headerDiv}>
        <h1>ToDo App</h1>
      </div>
      <div>
        {user ? (
          <TaskList handleLogout={handleLogout} />
        ) : (
          <Login
            // username={username}
            // setUsername={setUsername}
            // password={password}
            // setPassword={setPassword}
            // handleLogin={handleLogin}
            setUser={setUser}
          />
        )}
      </div>
    </div>
  )
}

export default App
