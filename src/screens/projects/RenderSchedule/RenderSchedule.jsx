import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import { toastOptions } from "../../../helper/toast";
import { useCurrentProject } from "../../../hooks/useCurrentProject";
import AddScheduleAndIntroToProject from "../AddIntro/AddScheduleAndIntroToProject";
import ScheduleHeader from "./ScheduleHeader";
import TransferInSchedule from "./TransferInSchedule";
import TableHeaders from "../../../ui/TableHeaders";
import HotelSchedule from "./HotelSchedule";

const RenderSchedule = () => {
  const { currentProject, removeEventFromSchedule } = useCurrentProject();

  const handleDeleteEvent = (dayOfEvent, timeOfEvent, eventId) => {
    removeEventFromSchedule({ dayOfEvent, timeOfEvent, eventId });
    toast.success("Event Removed", toastOptions);
  };

  return (
    <div className="container w-3/4 flex flex-col">
      <ScheduleHeader currentProject={currentProject} />
      <br />
      <TransferInSchedule />
      <HotelSchedule />

      <table className="table-auto border-collapse border border-white-50 text-white-50">
        <TableHeaders headers="projectBase" />
        <tbody>
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
