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
        <thead>
          <tr key={employee.id} className="flex items-center justify-between">
            <th class="py-2 px-4 bg-gray-100 border-b">Employee Photo</th>
            <th class="py-2 px-4 bg-gray-100 border-b">First Name</th>
            <th class="py-2 px-4 bg-gray-100 border-b">Middle Name</th>
            <th class="py-2 px-4 bg-gray-100 border-b">Last Name</th>
            <th class="py-2 px-4 bg-gray-100 border-b">Contact Number</th>
            <th class="py-2 px-4 bg-gray-100 border-b">Email</th>
            <th class="py-2 px-4 bg-gray-100 border-b">Gender</th>
            <th class="py-2 px-4 bg-gray-100 border-b">Birthdate</th>
            <th class="py-2 px-4 bg-gray-100 border-b">Action</th>
          </tr>

          <tbody>
            <tr>
              <td class="py-2 px-4 border-b">
                {" "}
                <img
                  src={employee.photoInfo.url}
                  alt="Contact photo"
                  className="w-10"
                />
              </td>
              <td class="py-2 px-4 border-b">{employee.firstname}</td>
              <td class="py-2 px-4 border-b"> {employee.middlename}</td>
              <td class="py-2 px-4 border-b">{employee.lastname}</td>
              <td class="py-2 px-4 border-b">{employee.number}</td>
              <td class="py-2 px-4 border-b">{employee.email}</td>
              <td class="py-2 px-4 border-b">{employee.gender}</td>
              <td class="py-2 px-4 border-b"> {employee.dob}</td>
              <td class="py-2 px-4 border-b">
                {" "}
                <FaUserEdit
                  className="hover: cursor-pointer"
                  onClick={() => editEmployee(employee)}
                />
                <FaTrashAlt
                  className="hover: cursor-pointer"
                  onClick={() => deleteEmployee(employee.id)}
                />
              </td>
            </tr>
          </tbody>
        </thead>
      ))}
    </ul>
  );
      }

export default EmployeeList;
