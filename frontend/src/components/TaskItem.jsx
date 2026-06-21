import '../styles/TaskItem.css'

function TaskItem(props) {
  const task = props.task
  const onDelete = props.onDelete
  const onToggle = props.onToggle
  const onEdit = props.onEdit

  let className = 'task-item'
  if (task.priority === 'low') {
    className = className + ' priority-low'
  } else if (task.priority === 'medium') {
    className = className + ' priority-medium'
  } else if (task.priority === 'high') {
    className = className + ' priority-high'
  }
  if (task.completed === true) {
    className = className + ' completed'
  }

  let badgeClass = 'priority-badge'
  if (task.priority === 'low') {
    badgeClass = badgeClass + ' priority-badge-low'
  } else if (task.priority === 'medium') {
    badgeClass = badgeClass + ' priority-badge-medium'
  } else if (task.priority === 'high') {
    badgeClass = badgeClass + ' priority-badge-high'
  }

  const dateObject = new Date(task.createdAt)
  const dateString = dateObject.toLocaleDateString()

  function handleDeleteClick() {
    const confirmed = window.confirm('Delete this task?')
    if (confirmed === true) {
      onDelete(task.id)
    }
  }

  function handleToggleClick() {
    onToggle(task.id)
  }

  function handleEditClick() {
    onEdit(task)
  }

  return (
    <div className={className}>
      <div className="task-header">
        <span className="task-title">{task.title}</span>
        <span className={badgeClass}>{task.priority}</span>
      </div>
      <p className="task-description">{task.description}</p>
      <p className="task-date">{dateString}</p>
      <div className="task-actions">
        <input type="checkbox" checked={task.completed} onChange={handleToggleClick} />
        <button onClick={handleEditClick}>Edit</button>
        <button className="btn-delete" onClick={handleDeleteClick}>Delete</button>
      </div>
    </div>
  )
}

export default TaskItem
