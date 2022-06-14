import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import baseAPI from "../../../axios/axiosConfig";
import { toastOptions } from "../../../helper/toast";
import ClientMasterForm from "./ClientMasterForm";

const ClientSpecs = () => {
  const navigate = useNavigate();
  const {
    state: { client },
  } = useLocation();

  const postToEndpoint = async (data, endPoint, update) => {
    try {
      if (update === true) {
        await baseAPI.patch(`v1/clients/${client._id}`, data);
        toast.success("Client updated", toastOptions);
      } else {
        await baseAPI.post(`v1/${endPoint}`, data);
        toast.success("Client Created", toastOptions);
      }
      setTimeout(() => {
        navigate("/app/client/list");
      }, 2500);
    } catch (error) {
      toast.error(`Error Creating Client, ${error.message}`, toastOptions);
    }
  };
  const submitForm = (values, endpoint, update) => {
    postToEndpoint(values, endpoint, update);
  };
  return (
    <>
      <ClientMasterForm submitForm={submitForm} client={client} />
    </>
  );
};

export default ClientSpecs;
