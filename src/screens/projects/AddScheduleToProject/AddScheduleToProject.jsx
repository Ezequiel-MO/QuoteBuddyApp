import { useCurrentProject } from "../../../hooks/useCurrentProject";
import { useNavigate } from "react-router-dom";
import RenderSchedule from "../RenderSchedule/RenderSchedule";
import DayEventOrderedItem from "./DayEventOrderedItem";
import VerticalMarker from "./verticalMarker";

const AddScheduleToProject = () => {
  const { currentProject } = useCurrentProject();
  const { schedule } = currentProject;
  const navigate = useNavigate();

  const renderSchedule = schedule?.map((day, index) => (
    <li key={day.date}>
      <div className="md:flex flex-start">
        <VerticalMarker />
        <div className="block p-6 rounded-lg shadow-lg bg-gray-100 max-w-md ml-6 mb-10">
          <div className="flex justify-between mb-4">
            <h3 className="font-medium text-orange-50 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-lg">
              {day.date}
            </h3>
          </div>

          <ol>
            <li
              className="text-black-50 hover:text-orange-50 cursor-pointer"
              onClick={() =>
                navigate(`/app/event`, {
                  state: {
                    timeOfEvent: "morningEvents",
                    dayOfEvent: index,
                  },
                })
              }
            >
              Add morning events
            </li>
            <li
              className="text-black-50 hover:text-orange-50 cursor-pointer"
              onClick={() =>
                navigate(`/app/restaurant`, {
                  state: {
                    timeOfEvent: "lunch",
                    dayOfEvent: index,
                  },
                })
              }
            >
              Add lunch venues ...
            </li>
            <li
              className="text-black-50 hover:text-orange-50 cursor-pointer"
              onClick={() =>
                navigate(`/app/event`, {
                  state: {
                    timeOfEvent: "afternoonEvents",
                    dayOfEvent: index,
                  },
                })
              }
            >
              Add any afternoon events
            </li>
            <li
              className="text-black-50 hover:text-orange-50 cursor-pointer"
              onClick={() =>
                navigate(`/app/restaurant`, {
                  state: {
                    timeOfEvent: "dinner",
                    dayOfEvent: index,
                  },
                })
              }
            >
              Add dinner venues ...
            </li>

            {day.date === "Arrival Day" ? (
              <DayEventOrderedItem
                route="project/schedule/transfers_in_out"
                dayOfEvent={0}
                timeOfEvent="transfer_in"
                text="transfer in"
              />
            ) : day.date === "Departure Day" ? (
              <DayEventOrderedItem
                route="project/schedule/transfers_in_out"
                dayOfEvent={schedule.length - 1}
                timeOfEvent="transfer_out"
                text="transfer out"
              />
            ) : null}
          </ol>
        </div>
      </div>
    </li>
  ));

  return (
    <div className="container p-10 flex justify-around">
      <ol className="border-l-2 border-camel-50">
        {schedule ? renderSchedule : <h1>Click on the logo to continue</h1>}
      </ol>
      {schedule ? <RenderSchedule /> : null}
    </div>
  );
};

export default AddScheduleToProject;
