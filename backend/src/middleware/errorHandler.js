

function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'server error';
    console.error(`\n\n[debugging] - ${statusCode} - ${message} - ${err.stack}\n\n`);
    res.status(statusCode).send(message);
}

module.exports = errorHandler