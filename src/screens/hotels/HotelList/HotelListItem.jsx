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
import { removeItemFromList } from "../../../helper/RemoveItemFromList";

const HotelListItem = ({ hotel, canBeAddedToProject }) => {
  const navigate = useNavigate();

  const addHotelToProject = () => {
    navigate(`/app/hotel/${hotel._id}`, {
      state: { hotelName: hotel.name },
    });
  };

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        className="bg-green-500 text-lime-50 px-10 font-bold rounded uppercase"
        onClick={() =>
          navigate(`/app/hotel/specs`, {
            state: { hotel },
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
        onClick={() => removeItemFromList("hotels", hotel._id)}
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
          <div className="grid grid-cols-6 w-full">
            <p>{hotel.name}</p>
            <p>{`${hotel.numberStars} stars`}</p>
            <p>{hotel.address}</p>
            <p>{`${hotel.numberRooms} rooms`}</p>
            <p>{`${hotel.meetingRooms ?? ""} meeting rooms`}</p>

            {canBeAddedToProject && (
              <div
                className="flex flex-row items-center"
                onClick={addHotelToProject}
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

export default HotelListItem;
