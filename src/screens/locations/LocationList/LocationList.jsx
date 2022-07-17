import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import baseAPI from "../../../axios/axiosConfig";
import { toastOptions } from "../../../helper/toast";
import Spinner from "../../../ui/spinner/Spinner";
import LocationListItem from "./LocationListItem";
import { useNavigate } from "react-router-dom";

const LocationList = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [location] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getLocationList = async () => {
      try {
        setIsLoading(true);
        const response = await baseAPI.get(`/v1/locations`);
        setLocations(response.data.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getLocationList();
  }, []);

  const locationList = locations
    .slice(0, 15)
    .map((location) => (
      <LocationListItem key={location._id} location={location} />
    ));

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
        <div className="flex flex-col w-full">
          <h1 className="text-2xl">List of Available Locations</h1>
          <div className="flex flex-row justify-between">
            <p className="flex flex-row items-center">
              <Icon icon="ic:baseline-swipe-left" color="#ea5933" width="40" />
              <span className="ml-2">
                Swipe list elements right to update / left to remove element
              </span>
            </p>
            <button
              onClick={() =>
                navigate("/app/location/specs", { state: { location } })
              }
              className="focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
            >
              Create New Location
            </button>
          </div>
        </div>
      </div>

      <hr />

      <div className="flex-1 m-4 flex-col">
        {isLoading ? <Spinner /> : locationList}
      </div>
    </>
  );
};

export default LocationList;
