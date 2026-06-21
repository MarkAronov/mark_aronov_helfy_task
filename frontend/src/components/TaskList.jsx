import useCarousel from '../hooks/useCarousel'
import '../styles/TaskList.css'
import TaskItem from './TaskItem'

function TaskList(props) {
  const tasks = props.tasks
  const onDelete = props.onDelete
  const onToggle = props.onToggle
  const onEdit = props.onEdit

  const carousel = useCarousel(tasks)

  if (tasks.length === 0) {
    return <p className="no-tasks">No tasks found</p>
  }

  return (
    <div className="carousel-container">
      <button onClick={carousel.handlePrevClick}>Prev</button>
      <div className="carousel-outer">
        <div ref={carousel.trackRef} className="carousel-track" style={carousel.trackStyle}>
          {carousel.slides.map(function (task, i) {
            return (
              <div className="carousel-slide" key={i}>
                <TaskItem
                  task={task}
                  onDelete={onDelete}
                  onToggle={onToggle}
                  onEdit={onEdit}
                />
              </div>
            )
          })}
        </div>
      </div>
      <button onClick={carousel.handleNextClick}>Next</button>
    </div>
  )
}

export default TaskList
