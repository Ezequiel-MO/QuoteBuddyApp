import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import { toastOptions } from "../../../helper/toast";
import { useCurrentProject } from "../../../hooks/useCurrentProject";
import AddScheduleAndIntroToProject from "../AddIntro/AddScheduleAndIntroToProject";

const RenderSchedule = () => {
  const {
    currentProject,
    removeHotelFromProject,
    removeEventFromSchedule,
    removeTransferFromSchedule,
  } = useCurrentProject();

  const handleDeleteHotel = (hotelId) => {
    removeHotelFromProject(hotelId);
    toast.success("Hotel Removed", toastOptions);
  };

  const handleDeleteEvent = (dayOfEvent, timeOfEvent, eventId) => {
    removeEventFromSchedule({ dayOfEvent, timeOfEvent, eventId });
    toast.success("Event Removed", toastOptions);
  };

  const handleDeleteTransfer = (typeOfTransfer) => {
    removeTransferFromSchedule(typeOfTransfer);
    toast.success("Transfer Removed", toastOptions);
  };

  return (
    <div className="container w-3/4 flex flex-col">
      <table className="table-auto border-collapse border border-white-50 text-white-50">
        <thead>
          <tr className="border-b border-white-50 text-left">
            <th>Code</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Group Name</th>
            <th>Location</th>
            <th>Number of Pax</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-white-50 text-left">
            <td>{currentProject["code"]}</td>
            <td>{currentProject["arrivalDay"]}</td>
            <td>{currentProject["departureDay"]}</td>
            <td>{currentProject["groupName"]}</td>
            <td>{currentProject["groupLocation"]}</td>
            <td>{currentProject["nrPax"]}</td>
          </tr>
        </tbody>
      </table>
      <br />

      {currentProject && currentProject["schedule"][0]?.transfer_in.length > 0 && (
        <div className="border-3 bg-white-50 mb-2 text-black-50">
          {
            <p className="flex flex-row items-center">
              Transfer from Airport ,{" "}
              {currentProject["schedule"][0]?.transfer_in.length} x{" "}
              {currentProject["schedule"][0]?.transfer_in[0]?.vehicleCapacity}
              -seater vehicle(s)
              <span
                className="ml-2 cursor-pointer"
                onClick={() => handleDeleteTransfer("transfer_in")}
              >
                <Icon icon="lucide:delete" color="#ea5933" />
              </span>
            </p>
          }
        </div>
      )}

      <table className="table-auto border-collapse border border-white-50 text-white-50">
        <thead>
          <tr className="border-b border-white-50 text-left">
            <th>Hotels/ Days</th>
            <th>Morning Events</th>
            <th>Lunch Options</th>
            <th>Afternoon Events</th>
            <th>Dinner Options</th>
          </tr>
        </thead>
        <tbody>
          {currentProject["hotels"]?.map((hotel) => (
            <tr key={hotel._id}>
              <td className="flex flex-row items-center">
                {hotel.name}
                <span
                  className="ml-2 cursor-pointer"
                  onClick={() => handleDeleteHotel(hotel._id)}
                >
                  <Icon icon="lucide:delete" color="#ea5933" />
                </span>
              </td>
            </tr>
          ))}

          {currentProject["schedule"]?.map((day, index) => (
            <tr key={day._id} className="border border-white-100">
              <td>{day.date}</td>
              <td>
                {day["morningEvents"].map((event) => (
                  <div key={event._id} className="flex flex-row items-center">
                    <p>{event.name}</p>
                    <span
                      className="ml-2 cursor-pointer"
                      onClick={() =>
                        handleDeleteEvent(index, "morningEvents", event._id)
                      }
                    >
                      <Icon icon="lucide:delete" color="#ea5933" />
                    </span>
                  </div>
                ))}
              </td>
              <td>
                {day["lunch"].map((event) => (
                  <div key={event._id} className="flex flex-row items-center">
                    <p>{event.name}</p>
                    <span
                      className="ml-2 cursor-pointer"
                      onClick={() =>
                        handleDeleteEvent(index, "lunch", event._id)
                      }
                    >
                      <Icon icon="lucide:delete" color="#ea5933" />
                    </span>
                  </div>
                ))}
              </td>
              <td>
                {day["afternoonEvents"].map((event) => (
                  <div key={event._id} className="flex flex-row items-center">
                    <p>{event.name}</p>
                    <span
                      className="ml-2 cursor-pointer"
                      onClick={() =>
                        handleDeleteEvent(index, "afternoonEvents", event._id)
                      }
                    >
                      <Icon icon="lucide:delete" color="#ea5933" />
                    </span>
                  </div>
                ))}
              </td>
              <td>
                {day["dinner"].map((event) => (
                  <div key={event._id} className="flex flex-row items-center">
                    <p>{event.name}</p>
                    <span
                      className="ml-2 cursor-pointer"
                      onClick={() =>
                        handleDeleteEvent(index, "dinner", event._id)
                      }
                    >
                      <Icon icon="lucide:delete" color="#ea5933" />
                    </span>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {currentProject &&
        currentProject["schedule"][currentProject["schedule"].length - 1]
          ?.transfer_out.length > 0 && (
          <div className="border-3 bg-white-50 mt-2 text-black-50">
            {
              <p className="flex flex-row items-center">
                Transfer to Airport ,{" "}
                {
                  currentProject["schedule"][
                    currentProject["schedule"].length - 1
                  ]?.transfer_out.length
                }{" "}
                x{" "}
                {
                  currentProject["schedule"][
                    currentProject["schedule"].length - 1
                  ]?.transfer_out[0]?.vehicleCapacity
                }
                -seater vehicle(s)
                <span
                  className="ml-2 cursor-pointer"
                  onClick={() => handleDeleteTransfer("transfer_out")}
                >
                  <Icon icon="lucide:delete" color="#ea5933" />
                </span>
              </p>
            }
          </div>
        )}
      <AddScheduleAndIntroToProject project={currentProject} />
    </div>
  );
};

export default RenderSchedule;
