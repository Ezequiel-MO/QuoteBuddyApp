import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import baseAPI from "../axios/axiosConfig";
import { toastOptions } from "../helper/toast";

import Alert from "../ui/Alert";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || email.length < 6) {
      setAlert({
        error: true,
        msg: "Email is compulsory",
      });
      return;
    }
    try {
      await baseAPI.post(`v1/users/forgot-password`, {
        email,
      });

      toast.success("Email was sent to reset your password", toastOptions);
      setEmail("");
    } catch (error) {
      setAlert({
        error: true,
        msg: "Email could not be sent",
      });
    }
  };

  const { msg } = alert;
  return (
    <>
      <h1 className="font-black text-4xl capitalize">
        Retrieve <span className="text-white-100">your Account</span>
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

        <input
          type="submit"
          value="Send instructions"
          className="my-5 text-white-100 bg-orange-50 w-full py-2 uppercase font-bold rounded hover:cursor-pointer hover:bg-white-100 hover:text-orange-50 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-white-100 uppercase text-sm"
          to="/"
        >
          You have an account ? Login
        </Link>
        <Link
          className="block text-center my-5 text-white-100 uppercase text-sm"
          to="/register"
        >
          Don't have an account ? Register
        </Link>
      </nav>
    </>
  );
};

export default ForgotPassword;
