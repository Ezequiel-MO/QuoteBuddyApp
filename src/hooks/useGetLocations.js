import { useEffect, useState } from "react";
import baseAPI from "../axios/axiosConfig";

const useGetLocations = () => {
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    const getLocations = async () => {
      try {
        const response = await baseAPI.get("v1/locations");
        setLocations(response.data.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getLocations();
  }, []);

  return {
    locations,
  };
};

export default useGetLocations;
