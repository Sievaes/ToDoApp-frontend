const SubTask = ({ subTaskData }) => {
  const { title, completed } = subTaskData
  console.log(subTaskData)
  return (
    <li>
      <h3>{title}</h3>
      <p>Completed? {completed ? "Yes" : "No"}</p>
    </li>
  )
}

export default SubTask
