import { useState, useRef, useEffect, useContext } from "react";
import EmployeeContext from "../features/EmployeeContext";
import employeeService from "../services/employeeService";

function EmployeeForm({ setLoading, newPhoto, setNewPhoto }) {
  const { employees, setEmployees } = useContext(EmployeeContext);
  const [newFirstName, setNewFirstName] = useState("");
  const [newMiddleName, setNewMiddleName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newDOB, setNewDOB] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    fileInputRef.current.value = null;
  }, [fileInputRef]);

  const addEmployee = (event) => {
    event.preventDefault();

    setLoading(true);

    const newEmployeeData = new FormData();
    newEmployeeData.append("firstname", newFirstName);
    newEmployeeData.append("middlename", newMiddleName);
    newEmployeeData.append("lastname", newLastName);
    newEmployeeData.append("number", newNumber);
    newEmployeeData.append("email", newEmail);
    newEmployeeData.append("gender", newGender);
    newEmployeeData.append("dob", newDOB);
    newEmployeeData.append("image", newPhoto);

    employeeService
      .createEmployee(newEmployeeData)
      .then((returnedEmployee) => {
        setEmployees([...employees].concat(returnedEmployee));
        fileInputRef.current.value = null;
        setNewFirstName("");
        setNewMiddleName("");
        setNewLastName("");
        setNewNumber("");
        setNewEmail("");
        setNewGender("");
        setNewDOB("");
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={addEmployee} className="mt-8 space-y-6">
      {/* <h1>
        Total Employees:{" "}
        <span className="bg-green-500 text-white font-bold w-24 py-2 px-3">
          {employees.length}
        </span>
      </h1> */}

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

      <div className="flex flex-col">
        <label>First Name</label>
        <input
          className="flex items-center justify-between bg-white rounded-lg shadow-md w-64 p-2 mb-1"
          type="text"
          value={newFirstName}
          onChange={(event) => setNewFirstName(event.target.value)}
          placeholder="Enter First Name"
        />
      </div>
      <div className="flex flex-col">
        <label>Middle Name</label>
        <input
          className="flex items-center justify-between bg-white rounded-lg shadow-md w-64 p-2 mb-1"
          type="text"
          value={newMiddleName}
          onChange={(event) => setNewMiddleName(event.target.value)}
          placeholder="Enter Middle Name"
        />
      </div>

      <div className="flex flex-col">
        <label>Last Name</label>
        <input
          className="flex items-center justify-between bg-white rounded-lg shadow-md w-64 p-2 mb-1"
          type="text"
          value={newLastName}
          onChange={(event) => setNewLastName(event.target.value)}
          placeholder="Enter First Name"
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
        <label>Email</label>
        <input
          className="flex items-center justify-between bg-white rounded-lg shadow-md w-64 p-2 mb-2"
          type="email"
          value={newEmail}
          onChange={(event) => setNewEmail(event.target.value)}
          placeholder="Enter Email Address"
        />
      </div>

      <div className="flex flex-col">
        <label>Gender</label>

        <select
          className="flex flex-col"
          id="gender"
          name="gender"
          value={newGender}
          onChange={(event) => setNewGender(event.target.value)}
        >
          <option value=""> -Please Select- </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label>Birthday</label>
        <input
          className="flex items-center justify-between bg-white rounded-lg shadow-md w-64 p-2 mb-2"
          type="date"
          value={newDOB}
          onChange={(event) => setNewDOB(event.target.value)}
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
