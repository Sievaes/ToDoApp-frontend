import { useState } from "react"
import styles from "./LoginForm.module.css"
import userService from "../services/user"
import loginService from "../services/login"
import taskService from "../services/tasks"

const LoginForm = ({
  // username,
  // setUsername,
  // password,
  // setPassword,
  // handleLogin,
  setUser,
}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [newUserForm, setNewUserForm] = useState(false)
  const [newUserUsername, setNewUserUsername] = useState("")
  const [newUserPassword, setNewUserPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleLogin = async (event) => {
    try {
      event.preventDefault()
      const response = await loginService.handleLogin({ username, password })

      const user = {
        username: response.username,
        name: response.name,
        //bad practise to save token to the customer
        token: response.token,
      }

      taskService.setToken(response.token)
      setUser(user)
      setUsername("")
      setPassword("")
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
    } catch (error) {
      console.log(error)
      handleError("Invalid Username or Password")
    }
  }

  const onCreateUser = async (event) => {
    try {
      event.preventDefault()

      await userService.handleCreateUser({
        newUserUsername,
        newUserPassword,
      })

      setNewUserForm(false)
      setNewUserUsername("")
      setNewUserPassword("")
    } catch (error) {
      console.log(error)
      handleError("Username and Password must be at least 3 characters")
    }
  }

  const onCancelCreateUser = (event) => {
    event.preventDefault()
    setNewUserUsername("")
    setNewUserPassword("")
    setNewUserForm(false)
  }

  const handleError = (error) => {
    setErrorMessage(error)
    setTimeout(() => setErrorMessage(""), 3000)
  }

  return (
    <form onSubmit={handleLogin} className={styles.loginForm}>
      {!newUserForm && (
        <div className={styles.loginDiv}>
          {errorMessage ? (
            <p className={styles.errorMessage}>{errorMessage}</p>
          ) : (
            <h3>Login</h3>
          )}
          <label>
            Username{" "}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password{" "}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className={styles.buttonDiv}>
            <button type="submit">Login</button>
            <button onClick={() => setNewUserForm((c) => !c)}>
              Create User
            </button>
          </div>
        </div>
      )}

      {newUserForm && (
        <div className={styles.loginDiv}>
          {errorMessage ? (
            <p className={styles.errorMessage}>{errorMessage}</p>
          ) : (
            <h3>Create User</h3>
          )}
          <label>
            Username{" "}
            <input
              type="text"
              value={newUserUsername}
              onChange={(e) => setNewUserUsername(e.target.value)}
            />
          </label>
          <label>
            Password{" "}
            <input
              type="password"
              value={newUserPassword}
              onChange={(e) => setNewUserPassword(e.target.value)}
            />
          </label>
          <div className={styles.buttonDiv}>
            <button onClick={onCreateUser}>Create User</button>
            <button onClick={onCancelCreateUser}>Cancel</button>
          </div>
        </div>
      )}
    </form>
  )
}

export default LoginForm
