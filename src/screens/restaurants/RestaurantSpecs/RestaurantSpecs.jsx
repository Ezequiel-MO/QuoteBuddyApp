import { useLocation, useNavigate } from "react-router-dom";
import { postToEndpoint } from "../../../helper/PostToEndpoint";
import RestaurantMasterForm from "./RestaurantMasterForm";

const RestaurantSpecs = () => {
  const navigate = useNavigate();
  const {
    state: { restaurant },
  } = useLocation();

  const fillFormData = (values, files) => {
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("city", values.city);
    formData.append("textContent", JSON.stringify(values.textContent));
    formData.append("price", values.price);
    formData.append("location[coordinates][0]", values.latitude);
    formData.append("location[coordinates][1]", values.longitude);
    formData.append("isVenue", values.isVenue);
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
    jsonData.city = values.city;
    jsonData.textContent = JSON.stringify(values.textContent);
    jsonData.price = values.price;
    jsonData.location = {
      type: "Point",
      coordinates: [values.latitude, values.longitude],
    };
    jsonData.isVenue = values.isVenue;

    return jsonData;
  };

  const submitForm = (values, files, endpoint, update) => {
    let dataToPost;
    if (update === false) {
      dataToPost = fillFormData(values, files);
    } else {
      dataToPost = fillJSONData(values);
    }

    postToEndpoint(dataToPost, endpoint, "Restaurant", restaurant._id, update);
    setTimeout(() => {
      navigate("/app/restaurant");
    }, 1000);
  };

  return (
    <>
      <RestaurantMasterForm submitForm={submitForm} restaurant={restaurant} />
    </>
  );
};

export default RestaurantSpecs;
