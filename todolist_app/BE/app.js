const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./src/routers/todoRouter');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', todoRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});