const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");


router.get("/summary", statsController.getSummary);

// Можна додати інші endpoints для stats, якщо будуть групування по категорії/користувачу
 router.get("/by-category", statsController.getStatsByCategory);
router.get("/by-user", statsController.getStatsByUser);
router.get("/", (req, res) => {
  res.send("Stats API is running. Використовуй /summary, /by-category або /by-user");
});

module.exports = router;
