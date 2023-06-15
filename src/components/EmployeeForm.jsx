import { useState, useRef, useEffect } from "react";
import employeeService from "../services/employeeService";

function EmployeeForm({ employees, setEmployees, setLoading }) {
  const [newEmployee, setNewEmployee] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newPhoto, setNewPhoto] = useState(null);
  const fileInputRef = useRef(null);

  const addEmployee = (event) => {
    event.preventDefault();

    setLoading(true);

    const employeeObject = new FormData();
    employeeObject.append("name", newEmployee);
    employeeObject.append("number", newNumber);
    employeeObject.append("image", newPhoto);

    employeeService
      .createEmployee(employeeObject)
      .then((returnedEmployee) => {
        setEmployees(employees.concat(returnedEmployee));
        fileInputRef.current.value = null;
        setNewEmployee("");
        setNewNumber("");
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={addEmployee} className="mt-8 space-y-6">
      <h1>
        Total Employees:{" "}
        <span className="bg-green-500 text-white font-bold w-24 py-2 px-3">
          {employees.length}
        </span>
      </h1>

      <div className="flex flex-col">
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
      <div className="flex flex-col">
        <label>Upload contact photo</label>
        <input
          className="flex items-center justify-between bg-white rounded-lg shadow-md w-64 p-2 mb-1"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(event) => setNewPhoto(event.target.files[0])}
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
