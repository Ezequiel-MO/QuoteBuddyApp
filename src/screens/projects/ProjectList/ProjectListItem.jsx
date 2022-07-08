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

const ProjectListItem = ({
  project,
  handleDeleteProject,
  handleRecycleProject,
}) => {
  const navigate = useNavigate();

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        className="bg-green-500 text-lime-50 px-10 mr-10 font-bold rounded uppercase"
        onClick={() =>
          navigate(`/app/project/specs`, {
            state: { project },
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
        onClick={() => handleDeleteProject(project._id)}
        destructive={true}
      >
        Remove
      </SwipeAction>
    </TrailingActions>
  );
  return (
    <div className="mb-4 p-3 bg-green-50 hover:bg-green-100 cursor-pointer rounded-md">
      <SwipeableList>
        <SwipeableListItem
          leadingActions={leadingActions()}
          trailingActions={trailingActions()}
        >
          <div className="grid grid-cols-8 w-full">
            <p>{project.code}</p>
            <p>{project.groupLocation}</p>
            <p>{project.groupName}</p>
            <p>{project.nrPax}</p>
            <p>{project.arrivalDay}</p>
            <p>{project.departureDay}</p>
            {/*      <p>{project.accountManager[0]?.firstName}</p> */}
            <div
              className="flex flex-row items-center"
              onClick={() => handleRecycleProject(project._id)}
            >
              <Icon icon="fa6-solid:recycle" color="#ea5933" />
              <span className="ml-2">Recycle Project</span>
            </div>
          </div>
        </SwipeableListItem>
      </SwipeableList>
    </div>
  );
};

export default ProjectListItem;
