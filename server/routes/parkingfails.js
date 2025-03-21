const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ParkingFail = require('../models/ParkingFail');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// GET a single parking fail by ID
router.get('/:id', async (req, res) => {
  try {
    const parkingFail = await ParkingFail.findById(req.params.id);
    if (!parkingFail) {
      return res.status(404).json({ message: 'Parking fail not found' });
    }
    res.json(parkingFail);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// UPDATE a parking fail by ID
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const parkingFail = await ParkingFail.findById(req.params.id);
    
    if (!parkingFail) {
      return res.status(404).json({ message: 'Parking fail not found' });
    }
    
    // Update text fields
    parkingFail.title = req.body.title || parkingFail.title;
    parkingFail.description = req.body.description || parkingFail.description;
    
    // Update image if provided
    if (req.file) {
      // Remove old image if it exists
      if (parkingFail.imagePath) {
        const oldImagePath = path.join(__dirname, '..', parkingFail.imagePath);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      
      // Update with new image
      parkingFail.imagePath = `uploads/${req.file.filename}`;
      parkingFail.imageUrl = `/api/uploads/${req.file.filename}`;
    }
    
    const updatedParkingFail = await parkingFail.save();
    res.json(updatedParkingFail);
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
});

module.exports = router;