import TaskList from "../components/TaskList"
import styles from "./App.module.css"

const App = () => {
  return (
    <div className={styles.app}>
      <div className={styles.headerDiv}>
        <h1>ToDo App</h1>
      </div>
      <div>
        <TaskList />
      </div>
    </div>
  )
}

export default App
