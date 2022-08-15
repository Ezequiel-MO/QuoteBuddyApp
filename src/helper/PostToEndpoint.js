import baseAPI from "../axios/axiosConfig";
import { toast } from "react-toastify";
import { toastOptions } from "./toast";

export const postToEndpoint = async (data, endPoint, object, id, update) => {
  try {
    if (update === true) {
      await baseAPI.patch(`v1/${endPoint}/${id}`, data);
      toast.success(`${object} updated`, toastOptions);
    } else {
      await baseAPI.post(`v1/${endPoint}`, data);
      toast.success(`${object} created`, toastOptions);
    }
  } catch (error) {
    console.log(error);
  }
};
