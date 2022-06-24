import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentProject } from "../../../hooks/useCurrentProject";
import RenderSchedule from "../RenderSchedule/RenderSchedule";

const AddScheduleToProject = () => {
  const navigate = useNavigate();
  const { currentProject } = useCurrentProject();
  const { schedule } = currentProject;

  const renderSchedule = schedule?.map((day, index) => (
    <li key={day.date}>
      <div className="md:flex flex-start">
        <div className="bg-white-50 w-10 h-10 flex items-center justify-center rounded-full -ml-5">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            className="text-white w-5 h-5"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"
            ></path>
          </svg>
        </div>
        <div className="block p-6 rounded-lg shadow-lg bg-gray-100 max-w-md ml-6 mb-10">
          <div className="flex justify-between mb-4">
            <a
              href="#!"
              className="font-medium text-orange-50 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-lg"
            >
              {day.date}
            </a>
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
              <li
                className="text-black-50 hover:text-orange-50 cursor-pointer"
                onClick={() =>
                  navigate(`/app/project/schedule/transfers_in_out`, {
                    state: {
                      timeOfEvent: "transfer_in",
                      dayOfEvent: index,
                    },
                  })
                }
              >
                Add transfer in
              </li>
            ) : day.date === "Departure Day" ? (
              <li
                className="text-black-50 hover:text-orange-50 cursor-pointer"
                onClick={() =>
                  navigate(`/app/project/schedule/transfers_in_out`, {
                    state: {
                      timeOfEvent: "transfer_out",
                      dayOfEvent: index,
                    },
                  })
                }
              >
                Add transfer out
              </li>
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
