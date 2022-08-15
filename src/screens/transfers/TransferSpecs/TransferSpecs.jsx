import { useLocation, useNavigate } from "react-router-dom";
import { postToEndpoint } from "../../../helper/PostToEndpoint";
import TransferMasterForm from "./TransferMasterForm";

const TransferSpecs = () => {
  const navigate = useNavigate();
  const {
    state: { transfer },
  } = useLocation();

  const submitForm = (values, endpoint, update) => {
    postToEndpoint(values, endpoint, "Transfer", transfer._id, update);
    setTimeout(() => {
      navigate("/app/transfer");
    }, 1000);
  };

  return (
    <>
      <TransferMasterForm submitForm={submitForm} transfer={transfer} />
    </>
  );
};

export default TransferSpecs;
