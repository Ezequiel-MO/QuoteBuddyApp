import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import baseAPI from "../axios/axiosConfig";
import { toastOptions } from "../helper/toast";

const useGetRestaurants = (city, price, venueOrRestaurant) => {
  const [isLoading, setIsLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const getRestaurants = async (city, price, venueOrRestaurant) => {
      let isVenue = false;
      if (venueOrRestaurant === "venues") isVenue = true;
      const url = city
        ? price
          ? venueOrRestaurant === "all"
            ? `/v1/restaurants?city=${city}&price[lte]=${price}`
            : `/v1/restaurants?city=${city}&price[lte]=${price}&isVenue=${isVenue}`
          : venueOrRestaurant === "all"
          ? `/v1/restaurants?city=${city}`
          : `/v1/restaurants?city=${city}&isVenue=${isVenue}`
        : price
        ? venueOrRestaurant === "all"
          ? `/v1/restaurants?price[lte]=${price}`
          : `/v1/restaurants?price[lte]=${price}&isVenue=${isVenue}`
        : venueOrRestaurant === "all"
        ? `/v1/restaurants`
        : `/v1/restaurants?isVenue=${isVenue}`;

      setIsLoading(true);
      try {
        const response = await baseAPI.get(url);
        setRestaurants(response.data.data.data);
        setIsLoading(false);
      } catch (error) {
        toast.error(error, toastOptions);
      }
    };
    getRestaurants(city, price, venueOrRestaurant);
  }, [city, price, venueOrRestaurant]);

  return { restaurants, isLoading };
};

export default useGetRestaurants;
