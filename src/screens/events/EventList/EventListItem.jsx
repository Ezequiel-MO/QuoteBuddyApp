import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { accounting } from "accounting";
import { removeItemFromList } from "../../../helper/RemoveItemFromList";

const EventListItem = ({ event, addEventToProject, canBeAddedToProject }) => {
  const navigate = useNavigate();

  return (
    <tbody>
      <tr className="mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50">
        <td>{event.name}</td>
        <td>{event.city}</td>
        <td>{accounting.formatMoney(event.price, "€")}</td>
        <td
          className="cursor-pointer"
          onClick={() => removeItemFromList("events", event._id)}
        >
          <Icon icon="fluent:delete-16-regular" color="#ea5933" />
        </td>
        <td
          className="cursor-pointer"
          onClick={() =>
            navigate(`/app/event/specs`, {
              state: { event },
            })
          }
        >
          <Icon icon="ic:round-system-update-alt" color="#ea5933" />
        </td>

        {canBeAddedToProject && (
          <td
            className="flex flex-row items-center"
            onClick={() => addEventToProject(event)}
          >
            <Icon icon="gg:insert-after-o" color="#ea5933" width="30" />
            <span>Add to Project</span>
          </td>
        )}
      </tr>
    </tbody>
  );
};

export default EventListItem;
