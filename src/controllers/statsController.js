const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


exports.getSummary = async (req, res) => {
  try {
    const totalIncome = await prisma.income.aggregate({ _sum: { amount: true } });
    const totalExpense = await prisma.expense.aggregate({ _sum: { amount: true } });

    res.json({
      totalIncome: totalIncome._sum.amount || 0,
      totalExpense: totalExpense._sum.amount || 0,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getStatsByCategory = async (req, res) => {
  try {
    const incomeStats = await prisma.incomeCategory.findMany({
      include: { income: true, category: true },
    });
    const expenseStats = await prisma.expenseCategory.findMany({
      include: { expense: true, category: true },
    });

    res.json({ incomeStats, expenseStats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getStatsByUser = async (req, res) => {
  try {
    const incomeStats = await prisma.income.groupBy({
      by: ["userId"],
      _sum: { amount: true },
    });
    const expenseStats = await prisma.expense.groupBy({
      by: ["userId"],
      _sum: { amount: true },
    });

    res.json({ incomeStats, expenseStats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
