import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import TaskFilter from './components/TaskFilter'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { createTask, deleteTask, getTasks, patchTask, updateTask } from './services/api'
import './styles/App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [editingTask, setEditingTask] = useState(null)
  const [createErrors, setCreateErrors] = useState({})

  useEffect(() => {
    async function loadTasks() {
      setLoading(true)
      try {
        const data = await getTasks()
        setTasks(data)
      } catch (err) {
        setError('Failed to load tasks')
      }
      setLoading(false)
    }
    loadTasks()
  }, [])

  async function handleCreate(formData) {
    setCreateErrors({})
    try {
      const newTask = await createTask(formData)
      const newList = [...tasks, newTask]
      setTasks(newList)
      return true
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setCreateErrors(err.response.data.errors)
      } else {
        setError('Failed to create task')
      }
      return false
    }
  }

  async function handleUpdate(formData) {
    try {
      const updatedTask = await updateTask(editingTask.id, formData)
      const updatedList = []
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === editingTask.id) {
          updatedList.push(updatedTask)
        } else {
          updatedList.push(tasks[i])
        }
      }
      setTasks(updatedList)
      setEditingTask(null)
    } catch (err) {
      setError('Failed to update task')
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTask(id)
      const remainingTasks = []
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id !== id) {
          remainingTasks.push(tasks[i])
        }
      }
      setTasks(remainingTasks)
    } catch (err) {
      setError('Failed to delete task')
    }
  }

  async function handleToggle(id) {
    try {
      const updatedTask = await patchTask(id)
      const updatedList = []
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
          updatedList.push(updatedTask)
        } else {
          updatedList.push(tasks[i])
        }
      }
      setTasks(updatedList)
    } catch (err) {
      setError('Failed to toggle task')
    }
  }

  function handleCloseModal() {
    setEditingTask(null)
  }

  const filteredTasks = []
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i]
    if (filter === 'all') {
      filteredTasks.push(task)
    } else if (filter === 'completed' && task.completed === true) {
      filteredTasks.push(task)
    } else if (filter === 'pending' && task.completed === false) {
      filteredTasks.push(task)
    }
  }

  if (loading === true) {
    return <p className="loading">Loading...</p>
  }

  return (
    <div className="app">
      <h1>Task Manager</h1>
      {error !== null && (
        <p className="error-message">{error}</p>
      )}
      <TaskForm onSubmit={handleCreate} errors={createErrors} />
      <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
      <TaskList
        tasks={filteredTasks}
        onDelete={handleDelete}
        onToggle={handleToggle}
        onEdit={setEditingTask}
      />
      {editingTask !== null && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-box" onClick={function(e) { e.stopPropagation() }}>
            <h2>Edit Task</h2>
            <TaskForm
              onSubmit={handleUpdate}
              editingTask={editingTask}
              onCancel={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
