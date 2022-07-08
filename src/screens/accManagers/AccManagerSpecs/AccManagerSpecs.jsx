import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import baseAPI from "../../../axios/axiosConfig";
import { toastOptions } from "../../../helper/toast";
import AccManagerMasterForm from "./AccManagerMasterForm";

const AccManagerSpecs = () => {
  const navigate = useNavigate();
  const {
    state: { accManager },
  } = useLocation();

  const postToEndpoint = async (data, endPoint, update) => {
    try {
      if (update === true) {
        await baseAPI.patch(`v1/${endPoint}/${accManager._id}`, data);
        toast.success("Account Manager updated", toastOptions);
      } else {
        await baseAPI.post(`v1/${endPoint}`, data);
        toast.success("Account Manager created", toastOptions);
      }
      navigate("/app");
    } catch (error) {
      console.log(error);
    }
  };

  const fillFormData = (values, files) => {
    let formData = new FormData();
    formData.append("firstName", values.firstName);
    formData.append("familyName", values.familyName);
    formData.append("email", values.email);
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append("imageContentUrl", files[i]);
      }
    }
    return formData;
  };

  const fillJSONData = (values) => {
    let jsonData = {};
    jsonData.firstName = values.firstName;
    jsonData.familyName = values.familyName;
    jsonData.email = values.email;
    return jsonData;
  };

  const submitForm = (values, files, endpoint, update) => {
    let dataToPost;
    if (update === false) {
      dataToPost = fillFormData(values, files);
    } else {
      dataToPost = fillJSONData(values);
    }
    postToEndpoint(dataToPost, endpoint, update);
  };

  return (
    <>
      <AccManagerMasterForm submitForm={submitForm} accManager={accManager} />
    </>
  );
};

export default AccManagerSpecs;
