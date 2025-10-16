const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const userRoutes = require("./src/routes/userRoutes");
const incomeRoutes = require("./src/routes/incomeRoutes");
const expenseRoutes = require("./src/routes/expenseRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const statsRoutes = require("./src/routes/statsRoutes");

app.use("/users", userRoutes);
app.use("/incomes", incomeRoutes);
app.use("/expenses", expenseRoutes);
app.use("/categories", categoryRoutes);
app.use("/stats", statsRoutes);

app.get("/", (req, res) => {
  res.send("Finance Manager API is running!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
