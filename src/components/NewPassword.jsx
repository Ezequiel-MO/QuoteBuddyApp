import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import baseAPI from "../axios/axiosConfig";
import Alert from "../ui/Alert";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [modifiedPassword, setModifiedPassword] = useState(false);
  const [validToken, setValidToken] = useState(false);
  const [alert, setAlert] = useState({});
  const { token } = useParams();
  useEffect(() => {
    const checkToken = async () => {
      try {
        await baseAPI.get(`v1/users/forgot-password/${token}`);
        setModifiedPassword(true);
        setValidToken(true);
      } catch (error) {
        setAlert({
          error: true,
          msg: error.message,
        });
      }
    };
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setAlert({
        error: true,
        msg: "Password must be at least 6 characters long",
      });
      return;
    }
    try {
      await baseAPI.post(`v1/users/forgot-password/${token}`, {
        password,
      });
      setAlert({
        error: false,
        msg: "Password changed successfully",
      });
    } catch (error) {
      setAlert({
        error: true,
        msg: "Something went wrong",
      });
    }
  };

  const { msg } = alert;
  return (
    <>
      <h1 className="font-black text-4xl capitalize">
        Reset <span className="text-white-100">your password</span>
      </h1>
      {msg && <Alert alert={alert} />}
      {validToken && (
        <form
          className="my-10 bg-gray-50 rounded-lg px-10 py-5"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Insert your new password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Save New password"
            className="my-5 text-white-100 bg-orange-50 w-full py-2 uppercase font-bold rounded hover:cursor-pointer hover:bg-white-100 hover:text-orange-50 transition-colors"
          />
        </form>
      )}

      {modifiedPassword && (
        <Link
          className="block text-center my-5 text-white-100 uppercase text-sm"
          to="/register"
        >
          Start session
        </Link>
      )}
    </>
  );
};

export default NewPassword;
