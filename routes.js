const express = require('express');
const router = express.Router();

let items = []; // Temporary in-memory storage

// Middleware to validate item ID
const validateItemId = (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid item ID. Must be a number.' });
    }
    req.itemId = id; // Store the parsed ID for later use
    next();
};

// Middleware to validate request body
const validateItemBody = (req, res, next) => {
    const { id, name, price } = req.body;
    if (!id || !name || !price) {
        return res.status(400).json({ message: 'Missing required fields: id, name, price' });
    }
    next();
};

// Create (POST)
router.post('/items', validateItemBody, (req, res) => {
    try {
        const item = req.body;
        if (items.find(i => i.id === item.id)) {
            return res.status(409).json({ message: 'Item with this ID already exists' });
        }
        items.push(item);
        res.status(201).json({ message: 'Item created', item });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// Read (GET all)
router.get('/items', (req, res) => {
    try {
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// Read (GET one)
router.get('/items/:id', validateItemId, (req, res) => {
    try {
        const item = items.find(i => i.id === req.itemId);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// Update (PUT)
router.put('/items/:id', validateItemId, (req, res) => {
    try {
        const index = items.findIndex(i => i.id === req.itemId);
        if (index === -1) return res.status(404).json({ message: 'Item not found' });

        items[index] = { ...items[index], ...req.body };
        res.json({ message: 'Item updated', item: items[index] });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// Delete (DELETE)
router.delete('/items/:id', validateItemId, (req, res) => {
    try {
        const index = items.findIndex(i => i.id === req.itemId);
        if (index === -1) return res.status(404).json({ message: 'Item not found' });

        items.splice(index, 1);
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;