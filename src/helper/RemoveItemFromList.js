import baseAPI from "../axios/axiosConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastOptions } from "./toast";

export const removeItemFromList = async (endpoint, ID) => {
  const navigate = useNavigate();
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this Account Manager ?"
  );
  if (confirmDelete) {
    try {
      await baseAPI.delete(`v1/${endpoint}/${ID}`);
      toast.success("Deleted successfully", toastOptions);
      navigate(`/app/${endpoint.slice(0, -1)}`);
    } catch (error) {
      console.log(error);
    }
  } else {
    toast.warn("Could not delete Item successfully", toastOptions);
  }
};
