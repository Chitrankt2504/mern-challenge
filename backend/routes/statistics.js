const express = require('express');
const Transaction = require('../models/transaction');

const router = express.Router();

router.get('/', async (req, res) => {
  const { month } = req.query;

  const filters = {};
  if (month) {
    filters.dateOfSale = { $month: parseInt(month) + 1 }; 
  }

  const totalSold = await Transaction.countDocuments({ ...filters, isSold: true });
  const totalNotSold = await Transaction.countDocuments({ ...filters, isSold: false });
  const totalSale = await Transaction.aggregate([
    { $match: filters },
    { $group: { _id: null, total: { $sum: '$price' } } },
  ]);

  res.json({
    totalSale: totalSale.length ? totalSale[0].total : 0,
    totalSold,
    totalNotSold,
  });
});

module.exports = router;
