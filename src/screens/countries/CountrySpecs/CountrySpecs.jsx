import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import baseAPI from "../../../axios/axiosConfig";
import { toastOptions } from "../../../helper/toast";
import CountryMasterForm from "./CountryMasterForm";

const CountrySpecs = () => {
  const navigate = useNavigate();
  const {
    state: { country },
  } = useLocation();

  const postToEndpoint = async (data, endPoint, update) => {
    try {
      if (update === true) {
        await baseAPI.patch(`v1/countries/${country._id}`, data);
        toast.success("Country updated", toastOptions);
      } else {
        await baseAPI.post(`v1/${endPoint}`, data);
        toast.success("Country Created", toastOptions);
      }
      setTimeout(() => {
        navigate("/app/country");
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
      <CountryMasterForm submitForm={submitForm} country={country} />
    </>
  );
};

export default CountrySpecs;
