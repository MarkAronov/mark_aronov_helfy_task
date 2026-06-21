const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler')
const app = express()
const port = 4000

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})