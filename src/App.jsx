import TaskList from "../components/TaskList"
import styles from "./App.module.css"

const App = () => {
  return (
    <div className={styles.app}>
      <h1>ToDo App</h1>
      <TaskList />
    </div>
  )
}

export default App
