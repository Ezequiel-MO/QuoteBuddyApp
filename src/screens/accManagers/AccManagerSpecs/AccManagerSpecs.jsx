import { useLocation, useNavigate } from "react-router-dom";
import { postToEndpoint } from "../../../helper/PostToEndpoint";
import AccManagerMasterForm from "./AccManagerMasterForm";

const AccManagerSpecs = () => {
  const navigate = useNavigate();
  const {
    state: { accManager },
  } = useLocation();

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
    postToEndpoint(
      dataToPost,
      endpoint,
      "Account Manager",
      accManager._id,
      update
    );
    setTimeout(() => {
      navigate("/app/accManager");
    }, 1000);
  };

  return (
    <>
      <AccManagerMasterForm submitForm={submitForm} accManager={accManager} />
    </>
  );
};

export default AccManagerSpecs;
