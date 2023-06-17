import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import employeeService from "./services/employeeService";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
<<<<<<< HEAD
=======
import Dashboard from "./components/Dashboard";
import EmployeeForm from "./components/EmployeeForm";
>>>>>>> ce3a3cc95b2907fae93b63a2a4e213d20fa70dcd

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
<<<<<<< HEAD
          <Route
            path="/register"
            element={
              <RegisterForm
                user={user}
                loading={loading}
                setLoading={setLoading}
              />
            }
          />
=======
          <Route path="/register" element={<RegisterForm user={user} />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee" element={<EmployeeForm />} />
          <Route path="/logout" element={
              <LoginForm  
                user={user}
                username={username}
                password={password}
                loading={loading}
                setUsername={setUsername}
                setPassword={setPassword}
                setUser={setUser}
                setLoading={setLoading}/>} />
>>>>>>> ce3a3cc95b2907fae93b63a2a4e213d20fa70dcd
        </Routes>
      </div>
    </div>
  );
}

export default App;
