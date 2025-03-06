import TaskList from "../components/TaskList"

const App = () => {
  // const handleClick = () => {
  //   taskService.fetchTasks()
  // }

  return (
    <div>
      {/* <div>
        <button onClick={handleClick}>SEND</button>
      </div> */}
      <TaskList />
    </div>
  )
}

export default App
