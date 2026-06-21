import { useState, useEffect } from 'react'
import '../styles/TaskForm.css'

function TaskForm(props) {
  const onSubmit = props.onSubmit
  const editingTask = props.editingTask
  const onCancel = props.onCancel
  const errors = props.errors

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')

  useEffect(() => {
    if (editingTask !== null && editingTask !== undefined) {
      setTitle(editingTask.title)
      setDescription(editingTask.description)
      setPriority(editingTask.priority)
    } else {
      setTitle('')
      setDescription('')
      setPriority('medium')
    }
  }, [editingTask])

  function handleTitleChange(e) {
    setTitle(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  function handlePriorityChange(e) {
    setPriority(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const formData = {
      title: title,
      description: description,
      priority: priority,
    }
    const success = await onSubmit(formData)
    if (success === true) {
      setTitle('')
      setDescription('')
      setPriority('medium')
    }
  }

  let buttonLabel = 'Add Task'
  if (editingTask !== null && editingTask !== undefined) {
    buttonLabel = 'Update Task'
  }

  let showCancel = false
  if (editingTask !== null && editingTask !== undefined) {
    showCancel = true
  }

  let titleError = ''
  let descriptionError = ''
  let priorityError = ''

  if (errors !== null && errors !== undefined) {
    if (errors.title) {
      titleError = errors.title
    }
    if (errors.description) {
      descriptionError = errors.description
    }
    if (errors.priority) {
      priorityError = errors.priority
    }
  }

  let titleClass = ''
  if (titleError !== '') {
    titleClass = 'input-error'
  }

  let descriptionClass = ''
  if (descriptionError !== '') {
    descriptionClass = 'input-error'
  }

  let priorityClass = ''
  if (priorityError !== '') {
    priorityClass = 'input-error'
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
        className={titleClass}
      />
      {titleError !== '' && (
        <p className="field-error">{titleError}</p>
      )}
      <textarea
        placeholder="Description"
        value={description}
        onChange={handleDescriptionChange}
        className={descriptionClass}
      />
      {descriptionError !== '' && (
        <p className="field-error">{descriptionError}</p>
      )}
      <select value={priority} onChange={handlePriorityChange} className={priorityClass}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      {priorityError !== '' && (
        <p className="field-error">{priorityError}</p>
      )}
      <div className="form-actions">
        <button type="submit">{buttonLabel}</button>
        {showCancel === true && (
          <button type="button" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  )
}

export default TaskForm
