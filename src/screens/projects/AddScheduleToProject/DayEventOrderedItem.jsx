import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const DayEventOrderedItem = ({
  route,
  timeOfEvent,
  text,
  index,
  dayOfEvent,
}) => {
  const navigate = useNavigate();
  const [dayOfEventState, setDayOfEventState] = useState(dayOfEvent);

  useEffect(() => {
    if (timeOfEvent === "transfer_in" || timeOfEvent === "transfer_out") {
      setDayOfEventState(dayOfEvent);
    } else {
      setDayOfEventState(index - 1);
    }
  }, [dayOfEvent]);
  return (
    <li
      className="text-black-50 hover:text-orange-50 cursor-pointer"
      onClick={() =>
        navigate(`/app/${route}`, {
          state: {
            timeOfEvent,
            dayOfEvent: dayOfEventState,
          },
        })
      }
    >
      {`Add ${text}`}
    </li>
  );
};

export default DayEventOrderedItem;
