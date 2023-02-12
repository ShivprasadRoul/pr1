const { gql } = require("apollo-server");

const typeDefs = gql`
  # Define the GraphQL types here

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Employee {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String
    salary: Float!
  }

  type Query {
    # Define your Query operations here

    # Example: Get all employees
    getAllEmployees: [Employee]

    # Example: Search employee by ID
    searchEmployeeById(id: ID!): Employee
  }

  type Mutation {
    # Define your Mutation operations here

    # Example: Sign up
    signup(
      username: String!
      email: String!
      password: String!
    ): User

    # Example: Add new employee
    addEmployee(
      first_name: String!
      last_name: String!
      email: String!
      gender: String
      salary: Float!
    ): Employee

    # Example: Update employee by ID
    updateEmployeeById(
      id: ID!
      first_name: String
      last_name: String
      email: String
      gender: String
      salary: Float
    ): Employee

    # Example: Delete employee by ID
    deleteEmployeeById(id: ID!): Employee
  }
`;

module.exports = typeDefs;
