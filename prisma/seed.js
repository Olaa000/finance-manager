const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Створюємо 10 користувачів
  const users = await Promise.all([
    prisma.user.create({ data: { name: "Alice", email: "alice@example.com", role: "user" } }),
    prisma.user.create({ data: { name: "Bob", email: "bob@example.com", role: "user" } }),
    prisma.user.create({ data: { name: "Charlie", email: "charlie@example.com", role: "user" } }),
    prisma.user.create({ data: { name: "David", email: "david@example.com", role: "user" } }),
    prisma.user.create({ data: { name: "Eve", email: "eve@example.com", role: "user" } }),
    prisma.user.create({ data: { name: "Frank", email: "frank@example.com", role: "user" } }),
    prisma.user.create({ data: { name: "Grace", email: "grace@example.com", role: "user" } }),
    prisma.user.create({ data: { name: "Heidi", email: "heidi@example.com", role: "user" } }),
    prisma.user.create({ data: { name: "Ivan", email: "ivan@example.com", role: "user" } }),
    prisma.user.create({ data: { name: "Judy", email: "judy@example.com", role: "user" } }),
  ]);

  // Створюємо 5 категорій
  const categories = await Promise.all([
    prisma.category.create({ data: { name: "Food" } }),
    prisma.category.create({ data: { name: "Transport" } }),
    prisma.category.create({ data: { name: "Entertainment" } }),
    prisma.category.create({ data: { name: "Health" } }),
    prisma.category.create({ data: { name: "Salary" } }),
  ]);

  // Створюємо 3 доходи
  const incomes = await Promise.all([
    prisma.income.create({ data: { amount: 1000, userId: users[0].id, categories: { create: { categoryId: categories[4].id } } } }),
    prisma.income.create({ data: { amount: 2000, userId: users[1].id, categories: { create: { categoryId: categories[4].id } } } }),
    prisma.income.create({ data: { amount: 1500, userId: users[2].id, categories: { create: { categoryId: categories[4].id } } } }),
  ]);

  // Створюємо 10 витрат
  const expenses = await Promise.all([
    prisma.expense.create({ data: { amount: 50, userId: users[0].id, categories: { create: { categoryId: categories[0].id } } } }),
    prisma.expense.create({ data: { amount: 30, userId: users[0].id, categories: { create: { categoryId: categories[1].id } } } }),
    prisma.expense.create({ data: { amount: 70, userId: users[1].id, categories: { create: { categoryId: categories[2].id } } } }),
    prisma.expense.create({ data: { amount: 100, userId: users[1].id, categories: { create: { categoryId: categories[3].id } } } }),
    prisma.expense.create({ data: { amount: 25, userId: users[2].id, categories: { create: { categoryId: categories[0].id } } } }),
    prisma.expense.create({ data: { amount: 40, userId: users[3].id, categories: { create: { categoryId: categories[1].id } } } }),
    prisma.expense.create({ data: { amount: 60, userId: users[4].id, categories: { create: { categoryId: categories[2].id } } } }),
    prisma.expense.create({ data: { amount: 80, userId: users[5].id, categories: { create: { categoryId: categories[3].id } } } }),
    prisma.expense.create({ data: { amount: 20, userId: users[6].id, categories: { create: { categoryId: categories[0].id } } } }),
    prisma.expense.create({ data: { amount: 90, userId: users[7].id, categories: { create: { categoryId: categories[2].id } } } }),
  ]);

  console.log("Дані успішно додано!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
