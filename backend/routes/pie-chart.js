const express = require('express');
const Transaction = require('../models/transaction');

const router = express.Router();

router.get('/', async (req, res) => {
  const { month } = req.query;

  const filters = {};
  if (month) {
    filters.dateOfSale = { $month: parseInt(month) + 1 }; 
  }

  const chartData = await Transaction.aggregate([
    { $match: filters },
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } }, 
  ]);

  res.json({ chartData });
});

module.exports = router;
