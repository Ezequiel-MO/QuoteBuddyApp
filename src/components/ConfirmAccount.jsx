import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import baseAPI from "../axios/axiosConfig";
import Alert from "../ui/Alert";

const ConfirmAccount = () => {
  const navigate = useNavigate();
  const [accountConfirmed, setAccountConfirmed] = useState(false);
  const [alert, setAlert] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        await baseAPI.get(`v1/users/confirm/${id}`);
        setAlert({
          error: false,
          msg: "Account confirmed",
        });
        setAccountConfirmed(true);
        navigate("/app");
      } catch (error) {
        setAlert({
          error: true,
          msg: "Account could not be confirmed",
        });
      }
    };

    confirmAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { msg } = alert;

  return (
    <>
      <h1 className="font-black text-4xl capitalize">
        Confirm <span className="text-white-100">your account and login</span>
      </h1>
      <div>{msg && <Alert alert={alert} />}</div>
      <div className="mt-20 md:mt-5 shadow-log px-5 py-10 rounded-xl bg-white">
        {accountConfirmed && (
          <Link
            to="/app"
            className="block text-center my-5 text-slate-500 upercase text-2xl"
          >
            Start session
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;
