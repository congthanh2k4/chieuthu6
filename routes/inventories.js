const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventories');

router.get('/', inventoryController.getAll);
router.get('/:id', inventoryController.getById);
router.post('/add_stock', inventoryController.addStock);
router.post('/remove_stock', inventoryController.removeStock);
router.post('/reservation', inventoryController.reservation);
router.post('/sold', inventoryController.sold);

module.exports = router;