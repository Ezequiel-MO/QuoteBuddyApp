import baseAPI from "../axios/axiosConfig";
import { toast } from "react-toastify";
import { toastOptions } from "./toast";

export const postToEndpoint = async (data, endPoint, item, id, update) => {
  try {
    if (update === true) {
      await baseAPI.patch(`v1/${endPoint}/${id}`, data);
      toast.success(`${item} updated`, toastOptions);
    } else {
      await baseAPI.post(`v1/${endPoint}`, data);
      toast.success(`${item} created`, toastOptions);
    }
  } catch (error) {
    toast.error(
      `Error Creating/Updating ${item}, ${error.message}`,
      toastOptions
    );
  }
};
