const express = require('express');
const router = express.Router();
const validator = require('../middleware/validator');
let tasks = [];
let taskIdCounter = 1;

function findTaskById(id) {
    const index = tasks.findIndex(t => t.id === Number(id));
    return { index, task: tasks[index] };
}

router.get('/', (req, res) => {
    res.json(tasks);
});

router.post('/', validator, (req, res, next) => {
    const { title, description, priority } = req.body;
    const task = { id: taskIdCounter, title, description, completed: false, createdAt: Date.now(), priority };
    taskIdCounter++;
    tasks.push(task);
    res.status(201).json(task);
});

router.put('/:id', validator, (req, res, next) => {
    const { task } = findTaskById(req.params.id);
    if (!task) {
        const err = new Error('task not found');
        err.statusCode = 404;
        return next(err);
    }

    const { title, description, priority, completed } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (priority !== undefined) task.priority = priority;
    if (completed !== undefined) task.completed = completed;
    res.json(task);
});

router.delete('/:id', (req, res, next) => {
    const { index } = findTaskById(req.params.id);

    if (index === -1) {
        const err = new Error('task not found');
        err.statusCode = 404;
        return next(err);
    }

    tasks.splice(index, 1);
    res.status(204).send();
});

router.patch('/:id/toggle', (req, res, next) => {
    const { task } = findTaskById(req.params.id);

    if (!task) {
        const err = new Error('task not found');
        err.statusCode = 404;
        return next(err);
    }

    task.completed = !task.completed;
    res.status(202).send(task);
});

module.exports = router;
