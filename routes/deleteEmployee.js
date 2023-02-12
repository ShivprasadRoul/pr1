const Employee = require('../models/emp.js');

const deleteEmployee = async (_, { eid }) => {
  try {
    const employee = await Employee.findOneAndRemove({ eid });
    return employee;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = deleteEmployee;
