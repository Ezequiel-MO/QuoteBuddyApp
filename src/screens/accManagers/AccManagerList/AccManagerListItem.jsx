import { useNavigate } from "react-router-dom";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

const AccManagerListItem = ({ accManager, handleDeleteAccManager }) => {
  const navigate = useNavigate();

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        className="bg-green-500 text-lime-50 px-10 mr-10 font-bold rounded uppercase"
        onClick={() =>
          navigate(`/app/accManager/specs`, {
            state: { accManager },
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
        onClick={() => handleDeleteAccManager(accManager._id)}
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
            <p>{accManager.firstName}</p>
            <p>{accManager.familyName}</p>
            <p>{accManager.email}</p>
          </div>
        </SwipeableListItem>
      </SwipeableList>
    </div>
  );
};

export default AccManagerListItem;
