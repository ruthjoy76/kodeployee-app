import { useState } from "react";
import employeeService from "../services/employeeService";

function EmployeeForm({ employees, setEmployees }) {
  const [newEmployee, setNewEmployee] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addEmployee = (event) => {
    event.preventDefault();

    const employeeObject = {
      name: newEmployee,
      number: newNumber,
    };

    employeeService
      .createEmployee(employeeObject)
      .then((returnedEmployee) => {
        setEmployees(employees.concat(returnedEmployee));
        setNewEmployee("");
        setNewNumber("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={addEmployee} className="mt-8 space-y-6">
      <div className="-space-y-px">
        <label>Full Name</label>
        <input
          className="flex items-center justify-between bg-white rounded-lg shadow-md w-64 p-2 mb-1"
          type="text"
          value={newEmployee}
          onChange={(event) => setNewEmployee(event.target.value)}
          placeholder="Enter name"
        />
      </div>

      <div className="flex flex-col">
        <label>Phone Number</label>
        <input
          className="flex items-center justify-between bg-white rounded-lg shadow-md w-64 p-2 mb-2"
          type="text"
          value={newNumber}
          onChange={(event) => setNewNumber(event.target.value)}
          placeholder="Enter phone number"
        />
      </div>

      <button
        className="bg-purple-500 hover:bg-purple-400 text-white font-bold w-24 py-2 px-3 border-b-4 border-purple-800 hover:border-purple-500 rounded"
        type="submit"
      >
        Add
      </button>
    </form>
  );
}

export default EmployeeForm;
