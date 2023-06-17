import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import EmployeeContext from "./features/EmployeeContext";
import LoadingContext from "./features/LoadingContext";
import employeeService from "./services/employeeService";
import EmployeeRecords from "./pages/EmployeeRecords";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      "loggedEmployeeRecordsUser"
    );

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      employeeService.setToken(user.token);
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      <EmployeeContext.Provider value={{ employees, setEmployees }}>
        <LoadingContext.Provider value={{ loading, setLoading }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/login"
              element={<LoginForm user={user} setUser={setUser} />}
            />
            <Route
              path="/employees"
              element={<EmployeeRecords user={user} setUser={setUser} />}
            />
            <Route path="/register" element={<RegisterForm user={user} />} />
          </Routes>
        </LoadingContext.Provider>
      </EmployeeContext.Provider>
    </div>
  );
}

export default App;
