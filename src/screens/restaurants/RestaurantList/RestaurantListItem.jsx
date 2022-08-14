import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { accounting } from "accounting";
import { removeItemFromList } from "../../../helper/RemoveItemFromList";

const RestaurantListItem = ({
  restaurant,
  addRestaurantToProject,
  canBeAddedToProject,
}) => {
  const navigate = useNavigate();

  return (
    <tbody>
      <tr className="mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50">
        <td>{restaurant.name}</td>
        <td>{restaurant.city}</td>
        <td>{accounting.formatMoney(restaurant.price, "€")}</td>
        <td
          className="cursor-pointer"
          onClick={() => removeItemFromList("restaurants", restaurant._id)}
        >
          <Icon icon="fluent:delete-16-regular" color="#ea5933" />
        </td>
        <td
          className="cursor-pointer"
          onClick={() =>
            navigate(`/app/restaurant/specs`, {
              state: { restaurant },
            })
          }
        >
          <Icon icon="ic:round-system-update-alt" color="#ea5933" />
        </td>

        {canBeAddedToProject && (
          <td
            className="cursor-pointer flex flex-row items-center"
            onClick={() => addRestaurantToProject(restaurant)}
          >
            <Icon icon="gg:insert-after-o" color="#ea5933" width="30" />
            <span>Add to Project</span>
          </td>
        )}
      </tr>
    </tbody>
  );
};

export default RestaurantListItem;
