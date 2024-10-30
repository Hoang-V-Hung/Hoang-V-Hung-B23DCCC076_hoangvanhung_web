const { message } = require('antd');
const express = require('express');
const app = express();
const post = 5000;

app.use(express.json());
app.listen(post, () => {
    console.log(`Server is running at http://localhost:${post}`);   
});


app.get('/users', (req, res) => {
    res.json([
        {id:1, name: 'Hùng'},
        {id:2, name: 'Hưng'},
    ]);
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    res.status(201).json({ message: 'Người dùng mới đã được tạo', user: newUser });
  });

app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;
    res.json({ message: `Người dùng có ID ${userId} đã được cập nhật`, updatedData });
  });

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ message: `Người dùng có ID ${userId} đã bị xóa` });
  });
