import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import LoadingSpinner from "../components/LoadingSpinner";

function EmployeeRecords({
  user,
  employees,
  loading,
  setEmployees,
  setUser,
  setLoading,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInformationUser");
    setUser(null);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl mb-4 text-center font-bold">Employee</h1>

      {user && (
        <>
          {" "}
          <EmployeeList
            employees={employees}
            setEmployees={setEmployees}
            setLoading={setLoading}
          />
          <EmployeeForm
            employees={employees}
            setEmployees={setEmployees}
            setLoading={setLoading}
          />
        </>
      )}

      <p className="flex justify-between items-center text-sm">
        {user?.name} is logged in{" "}
        <button
          onClick={handleLogout}
          className="bg-purple-700 p-2 text-white font-bold"
        >
          Logout
        </button>
      </p>
    </div>
  );
}

export default EmployeeRecords;
