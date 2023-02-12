const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// Update an Employee by ID
router.patch("/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, {
      $set: req.body
    });
    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
