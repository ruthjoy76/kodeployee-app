import { useState, useRef, useEffect, useContext } from "react";
import EmployeeContext from "../features/EmployeeContext";
import employeeService from "../services/employeeService";

function AddEmployeeForm({
  setLoading,
  newPhoto,
  setNewPhoto,
  showModal,
  closeModal,
}) {
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

  const addEmployee = (e) => {
    e.preventDefault();

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

        closeModal();
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));

    closeModal();
  };

  return (
    <div className={`modalContainer ${showModal ? "block" : "hidden"}`}>
      <form
        onSubmit={addEmployee}
        className="flex flex-col gap-4 p-4 border-solid border-2 border-slate-500 md:max-w-xl md:mx-auto"
      >
        <div className="flex flex-col">
          <label>Upload contact photo</label>
          <input
            className="border-solid border-2 border-slate-500 p-2"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => setNewPhoto(e.target.files[0])}
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
            type="tel"
            id="number"
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
            <option value="Male">Male</option>
            <option value="Female">Female</option>
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

        <button
          className="bg-slate-500 py-2 text-white font-bold"
          type="button"
          onClick={closeModal}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddEmployeeForm;