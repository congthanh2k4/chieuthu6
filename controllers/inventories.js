const Inventory = require('../schemas/inventories');

exports.getAll = async (req, res) => {
    try {
        const inventories = await Inventory.find().populate('product');
        res.status(200).json(inventories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const inventory = await Inventory.findById(req.params.id).populate('product');
        res.status(200).json(inventory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.addStock = async (req, res) => {
    try {
        const { product, quantity } = req.body;
        const result = await Inventory.findOneAndUpdate(
            { product: product },
            { $inc: { stock: quantity } },
            { new: true, runValidators: true }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.removeStock = async (req, res) => {
    try {
        const { product, quantity } = req.body;
        const result = await Inventory.findOneAndUpdate(
            { product: product },
            { $inc: { stock: -quantity } },
            { new: true, runValidators: true }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.reservation = async (req, res) => {
    try {
        const { product, quantity } = req.body;
        const result = await Inventory.findOneAndUpdate(
            { product: product },
            { $inc: { stock: -quantity, reserved: quantity } },
            { new: true, runValidators: true }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.sold = async (req, res) => {
    try {
        const { product, quantity } = req.body;
        const result = await Inventory.findOneAndUpdate(
            { product: product },
            { $inc: { reserved: -quantity, soldCount: quantity } },
            { new: true, runValidators: true }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};