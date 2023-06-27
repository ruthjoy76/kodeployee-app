import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoadingContext from "../features/LoadingContext";
import AddEmployeeForm from "../components/AddEmployeeForm";
import EmployeeList from "../components/EmployeeList";
import EditEmployeeForm from "../components/EditEmployeeForm";
import LoadingSpinner from "../components/LoadingSpinner";

function Employee({ user, setUser }) {
  const { loading, setLoading } = useContext(LoadingContext);
  const [showModal, setShowModal] = useState(false);

  const [editEmployee, setEditEmployee] = useState(null);
  const [newPhoto, setNewPhoto] = useState(null);
  const navigate = useNavigate();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedEmployeeUser");
    setUser(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="fixed top-24 left-52 w-1/5 h-72 mt-4 border border-gray-300 rounded-xl bg-[#FAF7F7] flex justify-center items-center space-y-96 space-x-96">
      <div className="flex-1">
        <h1 className="text-4xl mb-4 text-center font-bold">Employees</h1>

        <button
          onClick={openModal}
          className="bg-purple-500 hover:bg-purple-400 text-white font-bold w-24 py-2 px-3 border-b-4 border-purple-800 hover:border-purple-500 rounded"
        >
          Add New Employee
        </button>
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
                  showModal={showModal}
                />
              )}
            </>
          )}
        </div>
      </div>
      <p className="flex justify-between items-center text-sm my-4">
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

export default Employee;
