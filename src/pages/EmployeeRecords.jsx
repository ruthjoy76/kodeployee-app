import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoadingContext from "../features/LoadingContext";
import EmployeeList from "../components/EmployeeList";
import AddEmployeeForm from "../components/AddEmployeeForm";
import EditEmployeeForm from "../components/EditEmployeeForm";
import LoadingSpinner from "../components/LoadingSpinner";

function EmployeeRecords({ user, setUser }) {
  const { loading, setLoading } = useContext(LoadingContext);
  const [editEmployee, setEditEmployee] = useState(null);
  const [newPhoto, setNewPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedEmployeeFormUser");
    setUser(null);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl mb-4 text-center font-bold">Employee</h1>
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
      <p className="flex justify-between items-center text-sm">
        {user?.name} is logged in{" "}
        <button
          onClick={handleLogout}
          className="bg-red-500 p-2 text-white font-bold"
        >
          Logout
        </button>
      </p>
    </div>
  );
}

export default EmployeeRecords;
