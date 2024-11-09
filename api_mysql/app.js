const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());  

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello Express!');
});

const todosRouter = require('./src/routers/todos');
app.use('/todos', todosRouter);