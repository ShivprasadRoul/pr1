const Employee = require('../models/emp.js');

const addEmployee = async (root, args, context, info) => {
  try {
    // extract employee data from args
    const { firstName, lastName, email, gender, salary } = args;

    // create a new Employee instance
    const newEmployee = new Employee({
      first_name: firstName,
      last_name: lastName,
      email,
      gender,
      salary
    });

    // save the new employee in the database
    const savedEmployee = await newEmployee.save();

    // return the saved employee
    return savedEmployee;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to add a new employee');
  }
};

module.exports = addEmployee;
