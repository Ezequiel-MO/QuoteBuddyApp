import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import baseAPI from "../axios/axiosConfig";
import useAuth from "../hooks/useAuth";
import Alert from "../ui/Alert";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});

  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email, password].includes("")) {
      setAlert({
        error: true,
        msg: "Please fill in all fields",
      });
      return;
    }
    try {
      const { data } = await baseAPI.post(`v1/users/login`, {
        email,
        password,
      });
      setAlert({
        error: false,
        msg: "Access granted",
      });
      localStorage.setItem("token", data.token);
      setAuth(data);
      navigate("/app");
    } catch (error) {
      setAlert({
        error: true,
        msg: "Invalid email or password",
      });
    }
  };

  const { msg } = alert;
  return (
    <>
      <h1 className="font-black text-4xl capitalize">
        Login <span className="text-white-100">to APP</span>
      </h1>
      {msg && <Alert alert={alert} />}
      <form
        className="my-10 bg-gray-50 rounded-lg px-10 py-5"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Register email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Register password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Start Session"
          className="my-5 text-white-100 bg-orange-50 w-full py-2 uppercase font-bold rounded hover:cursor-pointer hover:bg-white-100 hover:text-orange-50 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-white-100 uppercase text-sm"
          to="/register"
        >
          Don't have an account ? Register
        </Link>
        <Link
          className="block text-center text-white-100 my-5 uppercase text-sm"
          to="/forgot-password"
        >
          Forgot your password ?
        </Link>
      </nav>
    </>
  );
};

export default Login;
