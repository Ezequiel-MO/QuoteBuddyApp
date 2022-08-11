import { useNavigate } from "react-router-dom";
import { dayEventOrderedItemData } from "../../../helper/scheduleData";
import { useCurrentProject } from "../../../hooks/useCurrentProject";
import RenderSchedule from "../RenderSchedule/RenderSchedule";
import DayEventOrderedItem from "./DayEventOrderedItem";
import VerticalMarker from "./verticalMarker";

const AddScheduleToProject = () => {
  const navigate = useNavigate();
  const { currentProject } = useCurrentProject();
  const { schedule } = currentProject;

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
            {dayEventOrderedItemData.map(
              ({ route, timeOfEvent, text }, index) => (
                <div key={`${text}_${index}`}>
                  <DayEventOrderedItem
                    route={route}
                    timeOfEvent={timeOfEvent}
                    text={text}
                    index={index}
                  />
                </div>
              )
            )}

            {day.date === "Arrival Day" ? (
              <DayEventOrderedItem
                route="project"
                timeOfEvent="transfer_in"
                text="transfer in"
                index={index}
              />
            ) : day.date === "Departure Day" ? (
              <DayEventOrderedItem
                route="project"
                timeOfEvent="transfer_out"
                text="transfer out"
                index={index}
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
