const express = require('express');
const Transaction = require('../models/transaction');

const router = express.Router();

const priceRanges = [
  { label: '0-100', min: 0, max: 100 },
  { label: '101-200', min: 101, max: 200 },
  { label: '201-300', min: 201, max: 300 },
  { label: '301-400', min: 301, max: 400 },
  { label: '401-500', min: 401, max: 500 },
  { label: '501-600', min: 501, max: 600 },
  { label: '601-700', min: 601, max: 700 },
  { label: '701-800', min: 701, max: 800 },
  { label: '801-900', min: 801, max: 900 },
  { label: '901-1000', min: 901, max: 1000 },
];

router.get('/', async (req, res) => {
  const { month } = req.query;

  const filters = {};
  if (month) {
    filters.dateOfSale = { $month: parseInt(month) + 1 }; 
  }

  const transactions = await Transaction.find(filters);

  const chartData = priceRanges.map((range) => ({
    label: range.label,
    count: transactions.filter((transaction) => transaction.price >= range.min && transaction.price <= range.max).length,
  }));

  res.json({ chartData });
});

module.exports = router;
