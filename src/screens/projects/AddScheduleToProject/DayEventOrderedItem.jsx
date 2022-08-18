import { useNavigate } from "react-router-dom";
const DayEventOrderedItem = ({ route, timeOfEvent, text, dayOfEvent }) => {
  const navigate = useNavigate();
  return (
    <li
      className="text-black-50 hover:text-orange-50 cursor-pointer"
      onClick={() =>
        navigate(`/app/${route}`, {
          state: {
            timeOfEvent,
            dayOfEvent,
          },
        })
      }
    >
      {`Add ${text}`}
    </li>
  );
};

export default DayEventOrderedItem;
