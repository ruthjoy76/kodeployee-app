import { useState, useRef, useContext } from "react";
import EmployeeContext from "../features/EmployeeContext";
import employeeService from "../services/employeeService";

function EditEmployeeForm({
  employee,
  onCancel,
  newPhoto,
  setNewPhoto,
  setLoading,
}) {
  const { employees, setEmployees } = useContext(EmployeeContext);
  const [newEmployee, setNewEmployee] = useState(employee);
  const { id, firstname, middlename, lastname, number, email, gender, dob } =
    newEmployee;
  const fileInputRef = useRef(null);

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedEmployee = new FormData();
    updatedEmployee.append("firstname", firstname);
    updatedEmployee.append("middlename", middlename);
    updatedEmployee.append("lastname", lastname);
    updatedEmployee.append("number", number);
    updatedEmployee.append("email", email);
    updatedEmployee.append("gender", gender);
    updatedEmployee.append("dob", dob);
    newPhoto ? updatedEmployee.append("image", newPhoto) : null;

    employeeService
      .updatedEmployee(id, updatedEmployee)
      .then((updatedEmployee) => {
        setEmployees(
          employees.map((employee) =>
            employee.id === updatedEmployee.id ? updatedEmployee : employee
          )
        );

        setNewPhoto(null);
        onCancel();
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const onChange = (e) => {
    setNewEmployee((prevEmployee) => ({
      ...prevEmployee,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form
      className="flex flex-col gap-4 p-4 border-solid border-2 border-slate-500"
      onSubmit={handleUpdate}
    >
      <div className="flex flex-col">
        <label>Upload new contact photo?</label>
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
          value={firstname}
          onChange={onChange}
          name="firstname"
        />
      </div>
      <div className="flex flex-col">
        <label>Middle Name</label>
        <input
          className="flex items-center justify-between bg-white rounded-lg shadow-md w-64 p-2 mb-1"
          type="text"
          value={middlename}
          onChange={onChange}
          name="middlename"
        />
      </div>

      <div className="flex flex-col">
        <label>Last Name</label>
        <input
          className="flex items-center justify-between bg-white rounded-lg shadow-md w-64 p-2 mb-1"
          type="text"
          value={lastname}
          onChange={onChange}
          name="lastname"
        />
      </div>

      <div className="flex flex-col">
        <label>Phone Number</label>
        <input
          className="flex items-center justify-between bg-white rounded-lg shadow-md w-64 p-2 mb-2"
          type="text"
          value={number}
          onChange={onChange}
          name="number"
        />
      </div>

      <div className="flex flex-col">
        <label>Email</label>
        <input
          className="flex items-center justify-between bg-white rounded-lg shadow-md w-64 p-2 mb-2"
          type="email"
          value={email}
          name="email"
        />
      </div>

      <div className="flex flex-col">
        <label>Gender</label>

        <select
          className="flex flex-col"
          id="gender"
          name="gender"
          value={gender}
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
          value={dob}
          name="dob"
        />
      </div>
      <button className="bg-slate-500 py-2 text-white font-bold" type="submit">
        Save
      </button>
      <button
        className="bg-slate-500 py-2 text-white font-bold"
        type="button"
        onClick={onCancel}
      >
        Cancel
      </button>
    </form>
  );
}

export default EditEmployeeForm;
