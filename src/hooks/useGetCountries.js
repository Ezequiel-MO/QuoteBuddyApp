import { useEffect, useState } from "react";
import baseAPI from "../axios/axiosConfig";

const useGetCountries = () => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await baseAPI.get("v1/countries");
        setCountries(response.data.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCountries();
  }, []);

  return {
    countries,
  };
};

export default useGetCountries;
