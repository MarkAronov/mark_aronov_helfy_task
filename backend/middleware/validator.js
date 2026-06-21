

function validator(req, res, next) {
    const { title, description, priority, completed } = req.body;
    let errors = {};

    if (req.method === 'POST') {
        if (!title) {
            errors.title = 'title is missing and it is required';
        }
        if (!description) {
            errors.description = 'description is missing and it is required';
        }
        if (!priority) {
            errors.priority = 'priority is missing and it is required';
        }
        else if (!['low', 'medium', 'high'].includes(priority)) {
            errors.priority = 'priority can only be either low, medium or high';
        }
    }

    if (req.method === 'PUT') {
        if (!title && !description && !priority && !completed) {
            return res.status(400).json({ errors: { GENERAL: 'title, description, priority, or completed is required' } });
        }
        if (priority && !['low', 'medium', 'high'].includes(priority)) {
            errors.priority = 'priority can only be either low, medium or high';
        }
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }

    next();
}

module.exports = validator;
