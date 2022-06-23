import baseAPI from "../../../axios/axiosConfig";
import { useLocation, useNavigate } from "react-router-dom";
import TransferMasterForm from "./TransferMasterForm";
import { toastOptions } from "../../../helper/toast";
import { toast } from "react-toastify";

const TransferSpecs = () => {
  const navigate = useNavigate();
  const {
    state: { transfer },
  } = useLocation();

  const postToEndpoint = async (data, endPoint, update) => {
    try {
      if (update === true) {
        await baseAPI.patch(`v1/${endPoint}/${transfer._id}`, data);
        toast.success("Transfer updated", toastOptions);
      } else {
        await baseAPI.post(`v1/${endPoint}`, data);
        toast.success("Transfer service created", toastOptions);
      }
      navigate("/app/transfer/list");
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = (values, endpoint, update) => {
    postToEndpoint(values, endpoint, update);
  };

  return (
    <>
      <TransferMasterForm submitForm={submitForm} transfer={transfer} />
    </>
  );
};

export default TransferSpecs;
