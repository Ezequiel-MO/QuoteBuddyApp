import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastOptions } from "../../helper/toast";

import {
  CLEAR_PROJECT,
  selectCurrentProject,
} from "../../redux/features/CurrentProjectSlice";

const MasterProject = () => {
  const navigate = useNavigate();
  const [project] = useState({});
  const dispatch = useDispatch();
  const currentProject = useSelector(selectCurrentProject);
  const currentProjectIsLive = Object.keys(currentProject).length !== 0;

  const handleClearProject = () => {
    localStorage.removeItem("currentProject");
    dispatch(CLEAR_PROJECT());
    toast.success("Project cleared", toastOptions);
    navigate("/");
  };

  return (
    <div className="container">
      <h1 className="text-2xl">Manage Projects</h1>
      {currentProjectIsLive ? (
        <ul className="indent-6 text-white-100">
          <li
            onClick={() => navigate("/app/hotel/list")}
            className="hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer"
          >
            Add a Hotel to current project
          </li>
          <li
            onClick={() => navigate("/app/project/schedule")}
            className="hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer"
          >
            Configure schedule for current project
          </li>
          <li
            onClick={handleClearProject}
            className="hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer"
          >
            CLEAR EXISTING PROJECT
          </li>
        </ul>
      ) : (
        <ul className="indent-6 text-white-100">
          <li
            onClick={() => navigate("/app/project/list")}
            className="hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer"
          >
            Get a List of All Projects in the Data Base
          </li>
          <li
            onClick={() =>
              navigate("/app/project/specs", { state: { project } })
            }
            className="hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer"
          >
            Create a New Project and Save in the Data Base
          </li>
        </ul>
      )}
    </div>
  );
};

export default MasterProject;
