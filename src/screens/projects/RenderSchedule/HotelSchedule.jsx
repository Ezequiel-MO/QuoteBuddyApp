import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { toastOptions } from "../../../helper/toast";
import { useCurrentProject } from "../../../hooks/useCurrentProject";

const HotelSchedule = () => {
  const navigate = useNavigate();
  const { removeHotelFromProject, currentProject } = useCurrentProject();
  const handleDeleteHotel = (hotelId) => {
    removeHotelFromProject(hotelId);
    toast.success("Hotel Removed", toastOptions);
  };
  return (
    <>
      <h1 className="underline text-orange-200">HOTELS</h1>
      <div className="flex flex-col items-start">
        {currentProject["hotels"]?.map((hotel) => (
          <div
            key={hotel._id}
            className="flex flex-row items-center text-white-50"
          >
            {hotel.name}
            <span
              className="ml-2 cursor-pointer"
              onClick={() => handleDeleteHotel(hotel._id)}
            >
              <Icon icon="lucide:delete" color="#ea5933" />
            </span>
          </div>
        ))}
        <button
          onClick={() => navigate("/app/hotel")}
          className="my-2 focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
        >
          Add new Hotel
        </button>
      </div>
    </>
  );
};

export default HotelSchedule;
