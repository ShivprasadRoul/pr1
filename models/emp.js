const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get employee by ID
router.get('/:id', getEmployee, (req, res) => {
  res.json(res.employee);
});

// Add new employee
router.post('/', async (req, res) => {
  const employee = new Employee({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    gender: req.body.gender,
    salary: req.body.salary,
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update employee
router.patch('/:id', getEmployee, async (req, res) => {
  if (req.body.first_name != null) {
    res.employee.first_name = req.body.first_name;
  }
  if (req.body.last_name != null) {
    res.employee.last_name = req.body.last_name;
  }
  if (req.body.email != null) {
    res.employee.email = req.body.email;
  }
  if (req.body.gender != null) {
    res.employee.gender = req.body.gender;
  }
  if (req.body.salary != null) {
    res.employee.salary = req.body.salary;
  }

  try {
    const updatedEmployee = await res.employee.save();
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete employee
router.delete('/:id', getEmployee, async (req, res) => {
  try {
    await res.employee.remove();
    res.json({ message: 'Deleted employee' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getEmployee(req, res, next) {
  try {
    employee = await Employee.findById(req.params.id);
    if (employee == null) {
      return res.status(404).json({ message: 'Cannot find employee' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.employee = employee;
  next();
}
