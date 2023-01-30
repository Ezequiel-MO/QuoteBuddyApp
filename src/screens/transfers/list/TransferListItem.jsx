import React from "react";
import { useNavigate } from "react-router-dom";
import { accounting } from "accounting";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { removeItemFromList } from "../../../helper/RemoveItemFromList";

const TransferListItem = ({ transfer, service }) => {
  const navigate = useNavigate();

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        className="bg-green-500 text-lime-50 px-10 font-bold rounded uppercase"
        onClick={() =>
          navigate(`/app/transfer/specs`, {
            state: { transfer },
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
        onClick={() => removeItemFromList("transfers", transfer._id)}
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
          <div className="grid grid-cols-5 w-full">
            <p>{transfer.company}</p>
            <p>{transfer.city}</p>
            <p>{transfer.vehicleType}</p>
            <p>{`${transfer.vehicleCapacity} seats`}</p>
            <p>{accounting.formatMoney(transfer[`${service}`], "€")}</p>
          </div>
        </SwipeableListItem>
      </SwipeableList>
    </div>
  );
};

export default TransferListItem;
