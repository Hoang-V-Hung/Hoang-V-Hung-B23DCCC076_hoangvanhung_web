const { message } = require('antd');
const express = require('express');
const app = express();
const post = 5000;

app.use(express.json());
app.listen(post, () => {
    console.log(`Server is running at http://localhost:${post}`);   
});


app.get('/', (req, res) => {
    res.json({
        message : "Hello World"
    });
});

app.get('/user', (req, res) => {
    res.json([
        {id:1, name: 'Hùng'},
        {id:2, name: 'Hưng'},
    ]);
});