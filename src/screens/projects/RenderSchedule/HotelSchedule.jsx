import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { toastOptions } from "../../../helper/toast";
import { useCurrentProject } from "../../../hooks/useCurrentProject";

const HotelSchedule = () => {
  const { removeHotelFromProject, currentProject } = useCurrentProject();
  const handleDeleteHotel = (hotelId) => {
    removeHotelFromProject(hotelId);
    toast.success("Hotel Removed", toastOptions);
  };
  return (
    <>
      <h1 className="text-white-50 underline text-orange-200">HOTELS</h1>
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
    </>
  );
};

export default HotelSchedule;
