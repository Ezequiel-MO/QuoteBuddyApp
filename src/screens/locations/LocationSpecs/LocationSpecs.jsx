import { useLocation, useNavigate } from "react-router-dom";
import { postToEndpoint } from "../../../helper/PostToEndpoint";
import LocationMasterForm from "./LocationMasterForm";

const LocationSpecs = () => {
  const navigate = useNavigate();

  const {
    state: { location },
  } = useLocation();

  const fillFormData = (values, files) => {
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("textContent", JSON.stringify(values.textContent));
    formData.append("location[coordinates][0]", values.latitude);
    formData.append("location[coordinates][1]", values.longitude);
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append("imageContentUrl", files[i]);
      }
    }
    return formData;
  };

  const fillJSONData = (values) => {
    let jsonData = {};
    jsonData.name = values.name;
    jsonData.textContent = JSON.stringify(values.textContent);
    jsonData.location = {
      type: "Point",
      coordinates: [values.latitude, values.longitude],
    };

    return jsonData;
  };

  const submitForm = (values, files, endpoint, update) => {
    let dataToPost;
    if (update === false) {
      dataToPost = fillFormData(values, files);
    } else {
      dataToPost = fillJSONData(values);
    }
    postToEndpoint(dataToPost, endpoint, "Location", location._id, update);
    setTimeout(() => {
      navigate("/app/location");
    }, 1000);
  };

  return (
    <>
      <LocationMasterForm submitForm={submitForm} location={location} />
    </>
  );
};

export default LocationSpecs;
