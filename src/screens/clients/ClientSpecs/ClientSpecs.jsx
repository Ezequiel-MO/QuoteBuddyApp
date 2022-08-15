import { useLocation, useNavigate } from "react-router-dom";
import { postToEndpoint } from "../../../helper/PostToEndpoint";
import ClientMasterForm from "./ClientMasterForm";

const ClientSpecs = () => {
  const navigate = useNavigate();
  const {
    state: { client },
  } = useLocation();

  const submitForm = (values, endpoint, update) => {
    postToEndpoint(values, endpoint, "Client", client._id, update);
    setTimeout(() => {
      navigate("/app/client");
    }, 1000);
  };
  return (
    <>
      <ClientMasterForm submitForm={submitForm} client={client} />
    </>
  );
};

export default ClientSpecs;
