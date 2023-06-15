import { useEffect } from "react";
import employeeService from "../services/employeeService";
import { FaTrash, FaEdit } from "react-icons/fa";

function EmployeeList({ employees, setEmployees, setLoading }) {
  useEffect(() => {
    employeeService
      .getEmployees()
      .then((response) => {
        setEmployees(response);
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteEmployee = (id) => {
    setLoading(true);

    employeeService
      .deleteEmployee(id)
      .then((_response) => {
        setEmployees(employees.filter((employee) => employee.id !== id));
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <ul className="w-full h-full">
      {employees.map((employee) => (
        <li
          key={employee.id}
          className="flex items-center justify-between bg-white rounded-lg shadow-md w-96 p-4 mb-4"
        >
          <img
            src={employee.photoInfo.url}
            alt="contact photo"
            className="w-10 h-10 rounded-full"
          />
          {employee.name} {employee.number}
          <button className="text-blue-500 hover:text-blue-700" onClick="">
            <FaEdit size="1rem" />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => deleteEmployee(employee.id)}
          >
            <FaTrash size="1rem" />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default EmployeeList;
