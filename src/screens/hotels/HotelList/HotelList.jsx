import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseAPI from "../../../axios/axiosConfig";
import { toast } from "react-toastify";
import { toastOptions } from "../../../helper/toast";
import HotelListItem from "./HotelListItem";
import CityFilter from "../../../ui/filters/CityFilter";
import NrStarsFilter from "../../../ui/filters/NrStarsFilter";
import NrHotelRoomsFilter from "../../../ui/filters/NrHotelRoomsFilter";
import Spinner from "../../../ui/spinner/Spinner";
import { useCurrentProject } from "../../../hooks/useCurrentProject";
import TableHeaders from "../../../ui/TableHeaders";

const HotelList = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [hotel] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [numberStars, setNumberStars] = useState(0);
  const [numberRooms, setNumberRooms] = useState(600);
  const { currentProject } = useCurrentProject();
  const [city, setCity] = useState(currentProject.groupLocation);
  const currentProjectIsLive = Object.keys(currentProject).length !== 0;

  useEffect(() => {
    const getHotelList = async () => {
      try {
        let response;
        setIsLoading(true);
        response = await baseAPI.get(
          `/v1/hotels?city=${city}&numberStars=${numberStars}&numberRooms[lt]=${numberRooms}`
        );

        setHotels(response.data.data.data);
        setIsLoading(false);
      } catch (error) {
        toast.error(error.response.data.message, toastOptions);
      }
    };

    getHotelList();
  }, [city, numberStars, numberRooms]);

  const hotelList = hotels
    .slice(0, 15)
    .map((hotel) => (
      <HotelListItem
        key={hotel._id}
        hotel={hotel}
        canBeAddedToProject={currentProjectIsLive}
      />
    ));

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
        <div className="flex flex-col w-full">
          <h1 className="text-2xl">Hotel List</h1>
          <div className="flex flex-row justify-start">
            <div>
              {currentProjectIsLive ? null : (
                <CityFilter setCity={setCity} city={city} />
              )}
              <NrStarsFilter
                setNumberStars={setNumberStars}
                numberStars={numberStars}
              />
              <NrHotelRoomsFilter
                setNumberRooms={setNumberRooms}
                numberRooms={numberRooms}
              />
            </div>
            <button
              onClick={() => navigate("/app/hotel/specs", { state: { hotel } })}
              className="focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
            >
              Create New Hotel
            </button>
          </div>
        </div>
      </div>
      <hr />

      {isLoading ? (
        <Spinner />
      ) : (
        <table className="w-full p-5">
          <TableHeaders headers="hotel" />
          {hotelList}
        </table>
      )}
    </>
  );
};

export default HotelList;
