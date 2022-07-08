import { useEffect, useState } from "react";
import baseAPI from "../axios/axiosConfig";

const useGetAccManagers = () => {
  const [accManagers, setAccManagers] = useState([]);
  useEffect(() => {
    const getAccManagers = async () => {
      try {
        const response = await baseAPI.get("v1/accManagers");
        setAccManagers(response.data.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAccManagers();
  }, []);

  return {
    accManagers,
  };
};

export default useGetAccManagers;
