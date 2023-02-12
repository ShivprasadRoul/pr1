const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// Route for searching for an employee by their ID
router.get("/:employeeId", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.employeeId);
    if (!employee) return res.status(404).send("Employee not found.");

    res.send(employee);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
