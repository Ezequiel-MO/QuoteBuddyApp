import React from "react";
import { toast } from "react-toastify";
import baseAPI from "../../../axios/axiosConfig";
import EventMasterForm from "./EventMasterForm";
import { useLocation, useNavigate } from "react-router-dom";
import { toastOptions } from "../../../helper/toast";

const EventSpecs = () => {
  const navigate = useNavigate();
  const {
    state: { event },
  } = useLocation();

  const postToEndpoint = async (data, endPoint, update) => {
    try {
      if (update === true) {
        await baseAPI.patch(`v1/${endPoint}/${event._id}`, data);
        toast.success("Event updated", toastOptions);
      } else {
        await baseAPI.post(`v1/${endPoint}`, data);
        toast.success("Event created", toastOptions);
      }
      setTimeout(() => {
        navigate("/app");
      }, 2500);
    } catch (error) {
      console.log(error);
    }
  };

  const fillFormData = (values, files) => {
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("city", values.city);
    formData.append("textContent", JSON.stringify(values.textContent));
    formData.append("price", values.price);
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
    jsonData.city = values.city;
    jsonData.textContent = JSON.stringify(values.textContent);
    jsonData.price = values.price;
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
    postToEndpoint(dataToPost, endpoint, update);
  };

  return (
    <>
      <EventMasterForm submitForm={submitForm} event={event} />
    </>
  );
};

export default EventSpecs;
