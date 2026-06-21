import '../styles/TaskFilter.css'

function TaskFilter(props) {
  const currentFilter = props.currentFilter
  const onFilterChange = props.onFilterChange

  let allClass = ''
  let completedClass = ''
  let pendingClass = ''

  if (currentFilter === 'all') {
    allClass = 'active'
  }
  if (currentFilter === 'completed') {
    completedClass = 'active'
  }
  if (currentFilter === 'pending') {
    pendingClass = 'active'
  }

  function handleAllClick() {
    onFilterChange('all')
  }

  function handleCompletedClick() {
    onFilterChange('completed')
  }

  function handlePendingClick() {
    onFilterChange('pending')
  }

  return (
    <div className="task-filter">
      <button className={allClass} onClick={handleAllClick}>All</button>
      <button className={completedClass} onClick={handleCompletedClick}>Completed</button>
      <button className={pendingClass} onClick={handlePendingClick}>Pending</button>
    </div>
  )
}

export default TaskFilter
