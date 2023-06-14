import { useEffect } from "react";
import employeeService from "../services/employeeService";
import { FaTrash } from "react-icons/fa";

function EmployeeList({ employees, setEmployees }) {
  useEffect(() => {
    employeeService
      .getEmployees()
      .then((response) => {
        setEmployees(response);
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteEmployee = (id) => {
    employeeService.deleteEmployee(id).then((_response) => {
      setEmployees(employees.filter((employee) => employee.id !== id));
    });
  };

  return (
    <ul className="grid grid-cols-3 gap-4  items-left justify-center w-full h-full">
      {employees.map((employee) => (
        <li
          key={employee.id}
          className="flex items-center justify-between bg-white rounded-lg shadow-md w-96 p-4 mb-4"
        >
          <span className="text-gray-800">
            {employee.name}: {employee.number}
          </span>
          <button
            className="text-purple-500 hover:text-purple-700 focus:outline-none"
            onClick={() => deleteEmployee(employee.id)}
          >
            {" "}
            <FaTrash size="1.5rem" />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default EmployeeList;
