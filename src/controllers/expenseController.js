const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({ include: { categories: true } });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getExpenseById = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await prisma.expense.findUnique({
      where: { id: parseInt(id) },
      include: { categories: true }
    });
    if (!expense) return res.status(404).json({ error: "Expense not found" });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createExpense = async (req, res) => {
  const { amount, userId } = req.body;
  if (!amount || !userId) return res.status(400).json({ error: "Amount and userId required" });
  try {
    const newExpense = await prisma.expense.create({ data: { amount, userId } });
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  try {
    const updatedExpense = await prisma.expense.update({
      where: { id: parseInt(id) },
      data: { amount },
    });
    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.expense.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
