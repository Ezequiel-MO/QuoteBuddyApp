import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import baseAPI from "../../axios/axiosConfig";
import { toastOptions } from "../../helper/toast";
import {
  EXPAND_TRANSFERS_TO_OPTIONS,
  selectCurrentProject,
} from "../../redux/features/CurrentProjectSlice";

const PatchProject = ({ projectIntro }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentProject = useSelector(selectCurrentProject);
  const [project, setProject] = useState(currentProject);

  useEffect(() => {
    dispatch(EXPAND_TRANSFERS_TO_OPTIONS());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setProject(currentProject);
  }, [currentProject]);

  const handlePatchProject = async () => {
    try {
      await baseAPI.patch(`/v1/projects/${project._id}`, {
        schedule: project["schedule"],
        hotels: project["hotels"],
        projectIntro,
      });
      toast.success("Project Completed, congratulations !!", toastOptions);
      setTimeout(() => navigate("/app/project/schedule"), 1000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className="h-12 mt-4 inline-block px-6 py-2 border-2 border-orange-50 text-orange-50 font-medium text-sm leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
      onClick={handlePatchProject}
    >
      Save Final Project
    </button>
  );
};

export default PatchProject;
