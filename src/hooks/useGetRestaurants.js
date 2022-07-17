import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import baseAPI from "../axios/axiosConfig";
import { toastOptions } from "../helper/toast";

const useGetRestaurants = (city, price) => {
  const [isLoading, setIsLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const getRestaurants = async (city, price) => {
      const url =
        city && !price
          ? `/v1/restaurants?city=${city}`
          : !city && price
          ? `/v1/restaurants?price[lte]=${price}`
          : city && price
          ? `v1/restaurants?city=${city}&price[lte]=${price}`
          : `/v1/restaurants`;
      setIsLoading(true);
      try {
        const response = await baseAPI.get(url);
        setRestaurants(response.data.data.data);
        setIsLoading(false);
      } catch (error) {
        toast.error(error, toastOptions);
      }
    };
    getRestaurants(city, price);
  }, [city, price]);

  return { restaurants, isLoading };
};

export default useGetRestaurants;
