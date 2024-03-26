const express = require('express');
const Transaction = require('../models/transaction');

const router = express.Router();

router.get('/', async (req, res) => {
  const { month, search, page = 1, perPage = 10 } = req.query;

  const filters = {};
  if (month) {
    filters.dateOfSale = { $month: parseInt(month) + 1 }; 
  }
  if (search) {
    const searchRegex = new RegExp(search, 'i'); 
    filters.$or = [
      { productTitle: searchRegex },
      { productDescription: searchRegex },
      { price: searchRegex },
    ];
  }

  const transactions = await Transaction.find(filters)
    .skip((page - 1) * perPage)
    .limit(perPage);

  const total = await Transaction.countDocuments(filters);

  res.json({ transactions, totalPages: Math.ceil(total / perPage) });
});

module.exports = router;
