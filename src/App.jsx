import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import employeeService from "./services/employeeService";
import EmployeeRecords from "./pages/EmployeeRecords";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  const [employees, setEmployees] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInformationUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      employeeService.setToken(user.token);
    }
  }, []);

  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Routes>
          <Route
            path="/"
            element={
              <EmployeeRecords
                user={user}
                employees={employees}
                loading={loading}
                setEmployees={setEmployees}
                setUser={setUser}
                setLoading={setLoading}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginForm
                user={user}
                username={username}
                password={password}
                loading={loading}
                setUsername={setUsername}
                setPassword={setPassword}
                setUser={setUser}
                setLoading={setLoading}
              />
            }
          />
          <Route path="/register" element={<RegisterForm user={user} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
