import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoadingContext from "../features/LoadingContext";
import AddEmployeeForm from "../components/AddEmployeeForm";
import EmployeeList from "../components/EmployeeList";
import EditEmployeeForm from "../components/EditEmployeeForm";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Employee({ user, setUser }) {
  const { loading, setLoading } = useContext(LoadingContext);
  const [editEmployee, setEditEmployee] = useState(null);
  const [newPhoto, setNewPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="fixed top-24 left-52 w-screen h-72 mt-4 ">
      <div className="flex-1">
        <h1 className="text-4xl mb-4 text-left ml-24 text-gray-700 font-bold ">Employees</h1>
        <div>
          {user && (
            <>
              <EmployeeList
                setLoading={setLoading}
                setEditEmployee={setEditEmployee}
              />
              {editEmployee ? (
                <EditEmployeeForm
                  employee={editEmployee}
                  newPhoto={newPhoto}
                  setNewPhoto={setNewPhoto}
                  setLoading={setLoading}
                  onCancel={() => setEditEmployee(null)}
                />
              ) : (
                <AddEmployeeForm
                  newPhoto={newPhoto}
                  setNewPhoto={setNewPhoto}
                  setLoading={setLoading}
                />
              )}
            </>
          )}
        </div>
      </div>
      <p className="fixed justify-between items-center text-sm my-4 bottom-0">
        {user?.name} is logged in{" "}
  
      </p>
      {/* <Navbar />
      <Sidebar /> */}
    </div>
  );
}

export default Employee;