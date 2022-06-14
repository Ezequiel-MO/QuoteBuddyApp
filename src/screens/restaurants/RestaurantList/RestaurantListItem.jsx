import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { accounting } from "accounting";

const RestaurantListItem = ({
  restaurant,
  handleDeleteRestaurant,
  addRestaurantToProject,
  canBeAddedToProject,
}) => {
  const navigate = useNavigate();

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        className="bg-green-500 text-lime-50 px-10 mr-10 font-bold rounded uppercase"
        onClick={() =>
          navigate(`/app/restaurant/specs`, {
            state: { restaurant },
          })
        }
      >
        Update
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        className="bg-red-500 text-lime-50 px-10 font-bold rounded uppercase"
        onClick={() => handleDeleteRestaurant(restaurant._id)}
        destructive={true}
      >
        Remove
      </SwipeAction>
    </TrailingActions>
  );
  return (
    <div className="mb-4 p-3 bg-green-50 hover:bg-green-100 cursor-pointer rounded-md">
      <SwipeableList threshold={0.25}>
        <SwipeableListItem
          leadingActions={leadingActions()}
          trailingActions={trailingActions()}
        >
          <div className="grid grid-cols-4 w-full">
            <p>{restaurant.name}</p>
            <p>{restaurant.city}</p>
            <p>{accounting.formatMoney(restaurant.price, "€")}</p>

            {canBeAddedToProject && (
              <div
                className="flex flex-row items-center"
                onClick={() => addRestaurantToProject(restaurant)}
              >
                <Icon icon="gg:insert-after-o" color="#ea5933" width="35" />
                <span>Add to Project</span>
              </div>
            )}
          </div>
        </SwipeableListItem>
      </SwipeableList>
    </div>
  );
};

export default RestaurantListItem;
