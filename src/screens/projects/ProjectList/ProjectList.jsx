import React, { useEffect, useState } from "react";
import baseAPI from "../../../axios/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentProject,
  SET_CURRENT_PROJECT,
} from "../../../redux/features/CurrentProjectSlice";
import { toast } from "react-toastify";
import { toastOptions } from "../../../helper/toast";
import Spinner from "../../../UI/spinner/Spinner";
import ProjectListItem from "./ProjectListItem";
import CityFilter from "../../../UI/filters/CityFilter";
import { Icon } from "@iconify/react";
import AccountMngrFilter from "../../../UI/filters/AccountMngrFilter";

const ProjectList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState("");
  const [accountManager, setAccountManager] = useState("");
  const currentProject = useSelector(selectCurrentProject);
  const currentProjectIsLive = Object.keys(currentProject).length !== 0;

  useEffect(() => {
    if (currentProjectIsLive) {
      const { groupLocation, accountManager } = currentProject;
      setCity(groupLocation);
      setAccountManager(accountManager);
    }
  }, [currentProject, currentProjectIsLive]);

  useEffect(() => {
    const getProjectList = async () => {
      try {
        setIsLoading(true);
        const response = await baseAPI.get(
          `/v1/projects?groupLocation=${city}&accountManager=${accountManager}`
        );
        setProjects(response.data.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (city) {
      getProjectList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, accountManager]);

  const handleDeleteProject = async (projectId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (confirmDelete) {
      try {
        await baseAPI.delete(`v1/projects/${projectId}`);
        toast.success("Project Deleted", toastOptions);
        setProjects(projects.filter((project) => project._id !== projectId));
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.warn("Project not deleted", toastOptions);

      setTimeout(() => window.location.reload(), 1500)();
    }
  };

  const handleRecycleProject = async (projectId) => {
    try {
      const res = await baseAPI.get(`v1/projects/${projectId}`);
      dispatch(SET_CURRENT_PROJECT(res.data.data.data));
      navigate("/app/project/schedule");
    } catch (error) {
      console.log(error);
    }
  };

  const projectList = projects
    .slice(0, 15)
    .map((project) => (
      <ProjectListItem
        key={project._id}
        project={project}
        handleDeleteProject={handleDeleteProject}
        handleRecycleProject={handleRecycleProject}
      />
    ));

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
        <div className="flex flex-col w-full">
          <h1 className="text-2xl">Project List</h1>
          <div className="flex flex-row">
            <div className="flex-1">
              {currentProjectIsLive ? null : <CityFilter setCity={setCity} />}
              <AccountMngrFilter setAccountManager={setAccountManager} />
            </div>
            <p className="flex flex-row items-center">
              <Icon icon="ic:baseline-swipe-left" color="#ea5933" width="40" />
              <span className="ml-2">
                Swipe list elements right to update / left to remove element
              </span>
            </p>
          </div>
        </div>
      </div>

      <hr />

      <div className="flex-1 m-4 flex-col">
        {isLoading ? <Spinner /> : projectList}
      </div>
    </>
  );
};

export default ProjectList;
