const Employee = require('../models/emp.js');

const EmployeeResolvers = {
  Query: {
    getAllEmployees: async () => {
      try {
        const employees = await Employee.find({});
        return employees;
      } catch (error) {
        throw new Error(error);
      }
    },
    getEmployeeById: async (_, args) => {
      try {
        const employee = await Employee.findById(args.id);
        return employee;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    addEmployee: async (_, args) => {
      try {
        const newEmployee = new Employee({
          first_name: args.first_name,
          last_name: args.last_name,
          email: args.email,
          gender: args.gender,
          salary: args.salary,
        });

        const savedEmployee = await newEmployee.save();
        return savedEmployee;
      } catch (error) {
        throw new Error(error);
      }
    },
    updateEmployee: async (_, args) => {
      try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
          args.id,
          {
            first_name: args.first_name,
            last_name: args.last_name,
            email: args.email,
            gender: args.gender,
            salary: args.salary,
          },
          { new: true }
        );
        return updatedEmployee;
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteEmployee: async (_, args) => {
      try {
        const deletedEmployee = await Employee.findByIdAndDelete(args.id);
        return deletedEmployee;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

module.exports = EmployeeResolvers;
