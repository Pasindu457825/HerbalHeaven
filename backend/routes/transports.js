const express = require('express');
const Transport = require('../model/transports');

const router = express.Router();

// save posts
router.post('/transport/save', async (req, res) => {
  try {
    let newTransport = new Transport(req.body);
    await newTransport.save();
    res.status(200).json({
      success: 'Driver saved successfully',
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
});

// get posts
router.get('/transports', async (req, res) => {
  try {
    const transports = await Transport.find().exec();
    res.status(200).json({
      success: true,
      existingTransports: transports,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
});

// get a specific post
router.get('/transport/:id', async (req, res) => {
  try {
    const transport = await Transport.findById(req.params.id).exec();
    res.status(200).json({
      success: true,
      transport,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err,
    });
  }
});

// update post
router.put('/transport/update/:id', async (req, res) => {
  try {
    await Transport.findByIdAndUpdate(req.params.id, { $set: req.body }).exec();
    res.status(200).json({
      success: 'Update Successfully',
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
});

// delete posts
router.delete('/transport/delete/:id', async (req, res) => {
  try {
    const deletedTransport = await Transport.findByIdAndRemove(
      req.params.id
    ).exec();
    res.json({
      message: 'Delete Successfully',
      deletedTransport,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Delete unsuccessfully',
      error: err,
    });
  }
});

module.exports = router;
