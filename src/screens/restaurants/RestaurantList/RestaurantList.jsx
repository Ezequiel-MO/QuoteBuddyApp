import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import baseAPI from "../../../axios/axiosConfig";
import RestaurantListItem from "./RestaurantListItem";
import { toast } from "react-toastify";
import { toastOptions } from "../../../helper/toast";
import PriceFilter from "../../../ui/filters/PriceFilter";
import CityFilter from "../../../ui/filters/CityFilter";
import Spinner from "../../../ui/spinner/Spinner";
import { useCurrentProject } from "../../../hooks/useCurrentProject";

const RestaurantList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [restaurants, setRestaurants] = useState([]);
  const [restaurant] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(900);
  const { currentProject } = useCurrentProject();
  const currentProjectIsLive = Object.keys(currentProject).length !== 0;

  useEffect(() => {
    if (currentProjectIsLive) {
      const { groupLocation } = currentProject;
      setCity(groupLocation);
    }
  }, [currentProject, currentProjectIsLive]);

  useEffect(() => {
    const getRestaurantList = async () => {
      try {
        setIsLoading(true);
        const response = await baseAPI.get(
          `v1/restaurants?city=${city}&price[lte]=${price}`
        );
        setRestaurants(response.data.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (city) {
      getRestaurantList();
    }
  }, [city, price]);

  const handleDeleteRestaurant = async (restaurantId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this restaurant?"
    );
    if (confirmDelete) {
      try {
        await baseAPI.delete(`v1/restaurants/${restaurantId}`);
        toast.success("Restaurant Deleted", toastOptions);
        setRestaurants(
          restaurants.filter((restaurant) => restaurant._id !== restaurantId)
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.warn("Restaurant Not Deleted", toastOptions);
      setTimeout(() => window.location.reload(), 1500)();
    }
  };

  const addRestaurantToProject = (restaurant) => {
    navigate(`/app/project/schedule/${restaurant._id}`, {
      state: {
        event: restaurant,
        dayOfEvent: location.state.dayOfEvent,
        timeOfEvent: location.state.timeOfEvent,
      },
    });
  };

  const restaurantList = restaurants
    .slice(0, 15)
    .map((restaurant) => (
      <RestaurantListItem
        key={restaurant._id}
        restaurant={restaurant}
        handleDeleteRestaurant={handleDeleteRestaurant}
        addRestaurantToProject={addRestaurantToProject}
        canBeAddedToProject={location.state}
      />
    ));

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
        <div className="flex flex-col w-full">
          <h1 className="text-2xl">Restaurant List</h1>
          <div className="flex flex-row justify-between">
            <div>
              {currentProjectIsLive ? null : (
                <CityFilter setCity={setCity} city={city} />
              )}
              <PriceFilter setPrice={setPrice} />
            </div>
            <button
              onClick={() =>
                navigate("/app/restaurant/specs", { state: { restaurant } })
              }
              className="focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
            >
              Create New Restaurant
            </button>
            <p className="flex flex-row items-center">
              <Icon icon="ic:baseline-swipe-left" color="#ea5933" width="40" />
              <span className="ml-2">
                Swipe list elements right to update / left to remove element
              </span>
            </p>
          </div>
        </div>
      </div>

      <hr />

      <div className="flex-1 m-4 flex-col">
        {isLoading ? <Spinner /> : restaurantList}
      </div>
    </>
  );
};

export default RestaurantList;
