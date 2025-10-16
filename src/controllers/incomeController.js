const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllIncomes = async (req, res) => {
  try {
    const incomes = await prisma.income.findMany({ include: { categories: true } });
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getIncomeById = async (req, res) => {
  const { id } = req.params;
  try {
    const income = await prisma.income.findUnique({ 
      where: { id: parseInt(id) },
      include: { categories: true }
    });
    if (!income) return res.status(404).json({ error: "Income not found" });
    res.json(income);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createIncome = async (req, res) => {
  const { amount, userId } = req.body;
  if (!amount || !userId) return res.status(400).json({ error: "Amount and userId required" });
  try {
    const newIncome = await prisma.income.create({ data: { amount, userId } });
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateIncome = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  try {
    const updatedIncome = await prisma.income.update({
      where: { id: parseInt(id) },
      data: { amount },
    });
    res.json(updatedIncome);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.income.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Income deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
