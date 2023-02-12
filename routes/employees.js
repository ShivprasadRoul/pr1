const Employee = require('../models/emp.js');

const employeesResolvers = {
  Query: {
    async getAllEmployees() {
      try {
        const employees = await Employee.find();
        return employees;
      } catch (err) {
        throw new Error(err);
      }
    },
    async searchEmployeeById(_, { id }) {
      try {
        const employee = await Employee.findById(id);
        if (!employee) {
          throw new Error('Employee not found');
        }
        return employee;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

module.exports = employeesResolvers;
