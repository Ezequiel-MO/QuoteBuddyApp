import { useLocation, useNavigate } from "react-router-dom";
import { postToEndpoint } from "../../../helper/PostToEndpoint";
import CountryMasterForm from "./CountryMasterForm";

const CountrySpecs = () => {
  const navigate = useNavigate();
  const {
    state: { country },
  } = useLocation();

  const submitForm = (values, endpoint, update) => {
    postToEndpoint(values, endpoint, "Country", country._id, update);
    setTimeout(() => {
      navigate("/app/country");
    }, 1000);
  };
  return (
    <>
      <CountryMasterForm submitForm={submitForm} country={country} />
    </>
  );
};

export default CountrySpecs;
