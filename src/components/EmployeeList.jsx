import { useEffect } from "react";
import employeeService from "../services/employeeService";

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2H2V5zm15 4H3v9a2 2 0 002 2h10a2 2 0 002-2v-9zM8 8a1 1 0 00-1 1v6a1 1 0 102 0V9a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v6a1 1 0 102 0V9a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default EmployeeList;
