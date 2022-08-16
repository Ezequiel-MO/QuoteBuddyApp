import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { removeItemFromList } from "../../../helper/RemoveItemFromList";

const VenueListItem = ({ venue, addVenueToProject, canBeAddedToProject }) => {
  const navigate = useNavigate();
  console.log("venue", venue);
  return (
    <tbody>
      <tr className="mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50">
        <td>{venue.name}</td>
        <td>{venue.city}</td>
        <td>{venue.address}</td>
        <td
          className="cursor-pointer"
          onClick={() => removeItemFromList("venues", venue._id)}
        >
          <Icon icon="fluent:delete-16-regular" color="#ea5933" />
        </td>
        <td
          className="cursor-pointer"
          onClick={() =>
            navigate(`/app/venue/specs`, {
              state: { venue },
            })
          }
        >
          <Icon icon="ic:round-system-update-alt" color="#ea5933" />
        </td>

        {canBeAddedToProject && (
          <td
            className="cursor-pointer flex flex-row items-center"
            onClick={() => addVenueToProject(venue)}
          >
            <Icon icon="gg:insert-after-o" color="#ea5933" width="30" />
            <span>Add to Project</span>
          </td>
        )}
      </tr>
    </tbody>
  );
};

export default VenueListItem;
