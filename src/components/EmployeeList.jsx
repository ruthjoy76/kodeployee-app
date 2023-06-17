import { useEffect, useContext } from "react";
import { FaTrashAlt, FaUserEdit } from "react-icons/fa";
import EmployeeContext from "../features/EmployeeContext";
import employeeService from "../services/employeeService";

function EmployeeList({ setLoading, setEditEmployee }) {
  const { employees, setEmployees } = useContext(EmployeeContext);

  useEffect(() => {
    employeeService
      .getEmployees()
      .then((response) => {
        setEmployees(response);
      })
      .catch((error) => console.log(error));
  }, []);

  const editEmployee = (employee) => {
    setEditEmployee(employee);
  };

  const deleteEmployee = (id) => {
    setLoading(true);
    employeeService
      .deleteEmployee(id)
      .then((_response) => {
        setEmployees(employees.filter((person) => employee.id !== id));
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <ul className="border-solid border-2 border-slate-500 p-4">
      {employees.map((employee) => (
        <li key={employee.id} className="flex items-center justify-between">
          <span className="w-10">
            <img src={employee.photoInfo.url} alt="Contact photo" />
          </span>
          {employee.firstname}
          {employee.middlename}
          {employee.lastname}({employee.number}){employee.email}
          {employee.gender}
          {employee.dob}
          <div className="flex gap-2">
            <FaUserEdit
              className="hover: cursor-pointer"
              onClick={() => editEmployee(employee)}
            />
            <FaTrashAlt
              className="hover: cursor-pointer"
              onClick={() => deleteEmployee(employee.id)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default EmployeeList;
