import { useEffect, useState } from "react";
import baseAPI from "../axios/axiosConfig";

const useGetAccManagers = () => {
  const [accManagers, setAccManagers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getAccManagers = async () => {
      setIsLoading(true);
      try {
        const response = await baseAPI.get("v1/accManagers");
        setAccManagers(response.data.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getAccManagers();
  }, []);

  return {
    isLoading,
    accManagers,
  };
};

export default useGetAccManagers;
