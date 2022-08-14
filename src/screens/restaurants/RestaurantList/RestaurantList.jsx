import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import RestaurantListItem from "./RestaurantListItem";
import PriceFilter from "../../../ui/filters/PriceFilter";
import CityFilter from "../../../ui/filters/CityFilter";
import Spinner from "../../../ui/spinner/Spinner";
import { useCurrentProject } from "../../../hooks/useCurrentProject";
import useGetRestaurants from "../../../hooks/useGetRestaurants";
import TableHeaders from "../../../ui/TableHeaders";

const RestaurantList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [restaurant] = useState({});
  const [price, setPrice] = useState(900);
  const { currentProject } = useCurrentProject();
  const { groupLocation } = currentProject;
  const [city, setCity] = useState(groupLocation || "");
  const { restaurants, isLoading } = useGetRestaurants(city, price);
  const currentProjectIsLive = Object.keys(currentProject).length !== 0;

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
    ?.slice(0, 15)
    .map((restaurant) => (
      <RestaurantListItem
        key={restaurant._id}
        restaurant={restaurant}
        addRestaurantToProject={addRestaurantToProject}
        canBeAddedToProject={location.state}
      />
    ));

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
        <div className="flex flex-col w-full">
          <h1 className="text-2xl">Restaurant List</h1>
          <div className="flex flex-row justify-start">
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
          </div>
        </div>
      </div>

      <hr />

      <table className="w-full p-5">
        <TableHeaders headers="restaurant" />
        {isLoading ? <Spinner /> : restaurantList}
      </table>
    </>
  );
};

export default RestaurantList;
