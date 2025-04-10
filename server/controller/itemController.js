// itemController.js
let items = []; // Temporary in-memory storage

// Middleware for validation
const validateItemId = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid item ID. Must be a number.' });
  }
  req.itemId = id; // Store the parsed ID for later use
  next();
};

const validateItemBody = (req, res, next) => {
  const { id, name, price } = req.body;
  
  // Check if required fields exist
  if (!id || !name || !price) {
    return res.status(400).json({ message: 'Missing required fields: id, name, price' });
  }
  
  // Validate ID is a number
  if (typeof id !== 'number') {
    return res.status(400).json({ message: 'ID must be a number' });
  }
  
  // Validate name is a string with appropriate length
  if (typeof name !== 'string' || name.trim().length === 0 || name.length > 100) {
    return res.status(400).json({ message: 'Name must be a non-empty string with maximum 100 characters' });
  }
  
  // Validate price is a positive number
  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ message: 'Price must be a positive number' });
  }
  
  next();
};

// Controller methods
const createItem = (req, res) => {
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
};

const getAllItems = (req, res) => {
  try {
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const getItemById = (req, res) => {
  try {
    const item = items.find(i => i.id === req.itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const updateItem = (req, res) => {
  try {
    const index = items.findIndex(i => i.id === req.itemId);
    if (index === -1) return res.status(404).json({ message: 'Item not found' });
    items[index] = { ...items[index], ...req.body };
    res.json({ message: 'Item updated', item: items[index] });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const deleteItem = (req, res) => {
  try {
    const index = items.findIndex(i => i.id === req.itemId);
    if (index === -1) return res.status(404).json({ message: 'Item not found' });
    items.splice(index, 1);
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

module.exports = {
  // Middleware
  validateItemId,
  validateItemBody,
  
  // Controller methods
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem
};