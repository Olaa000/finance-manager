// src/app.js

const express = require('express');
const app = express();

// Middleware для роботи з JSON
app.use(express.json());

// Підключення маршрутів задач
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Task Manager API is running');
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
