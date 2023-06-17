import "../App.css";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginService from "../services/loginService";
import employeeService from "../services/employeeService";
import { FaFacebookSquare, FaGithubSquare, FaGoogle } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";

function LoginForm({
  user,
  username,
  password,
  loading,
  setUsername,
  setPassword,
  setLoading,
  setUser,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.token) navigate("/");
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    loginService
      .login({ username, password })
      .then((res) => {
        window.localStorage.setItem(
          "loggedInformationUser",
          JSON.stringify(res)
        );
        employeeService.setToken(res.token);
        setUser(res);
        setUsername("");
        setPassword("");
      })
      .catch((error) => console.log(error));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden ">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-gray-600/40 ring-2 ring-purple-600 lg:max-w-xl">
        <img className="mx-auto w-40" src=" /logo.png" alt="logo" />
        <h1 className=" text -xl font-bold text-center text-purple-500 uppercase decoration-wavy">
          sign in
        </h1>
        <form onSubmit={handleLogin} className="mt-6">
          <div className="mb-2">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className=" block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring- purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <label>Password🔐</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring- purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover :bg-purple-600 focus:outline-none focus:bg-purple-600">
              <Link to="/dashboard" className="text-blue-500">
                Login{" "}
              </Link>
            </button>
          </div>
        </form>

        <div className="relative flex items-center justify-center w-full mt-6 border border-t">
          <div className="absolute px-5 bg-white"> Or </div>
        </div>
        <div className="flex mt-4 gap-x-2">
          <button className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600">
            <FaGoogle size="1.5rem" />
          </button>
          <button className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset- 1 focus:ring-violet-600">
            <FaFacebookSquare size="1.5rem" />
          </button>

          <button className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset -1 focus:ring-violet-600">
            <FaGithubSquare size="1.5rem" />
          </button>
        </div>

        <p className="mt-8 text-small font-bold text-center text-gray-700">
          Don't have an account?
          <Link
            to="/register"
            className="text-small font-bold  text-purple-600 hover:underline"
          >
            {" "}
            Sign Up here.
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
