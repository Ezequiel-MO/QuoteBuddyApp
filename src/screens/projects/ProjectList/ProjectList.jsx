import React, { useEffect, useState } from "react";
import baseAPI from "../../../axios/axiosConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastOptions } from "../../../helper/toast";
import Spinner from "../../../ui/spinner/Spinner";
import ProjectListItem from "./ProjectListItem";
import CityFilter from "../../../ui/filters/CityFilter";
import AccountMngrFilter from "../../../ui/filters/AccountMngrFilter";
import { Icon } from "@iconify/react";
import { useCurrentProject } from "../../../hooks/useCurrentProject";

const ProjectList = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentProject, currentProject } = useCurrentProject();
  const { groupLocation, accountManager } = currentProject;
  const [city, setCity] = useState(groupLocation || "");
  const [accountManagerID, setAccountManagerID] = useState("");
  const currentProjectIsLive = Object.keys(currentProject).length !== 0;

  useEffect(() => {
    if (currentProjectIsLive) {
      setAccountManagerID(accountManager[0]._id);
    }
  }, [currentProject, currentProjectIsLive]);

  useEffect(() => {
    const getProjectList = async () => {
      try {
        let response;
        setIsLoading(true);
        if (city && accountManagerID) {
          response = await baseAPI.get(
            `v1/projects?groupLocation=${city}&accountManager=${accountManagerID}`
          );
        } else {
          response = await baseAPI.get(`v1/projects`);
        }

        setProjects(response.data.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getProjectList();
  }, [city, accountManagerID]);

  const handleDeleteProject = async (projectId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (confirmDelete) {
      try {
        await baseAPI.delete(`v1/projects/${projectId}`);
        toast.success("Project Deleted", toastOptions);
        setProjects(projects.filter((project) => project._id !== projectId));
        navigate("/app/project/list");
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

      setCurrentProject(res.data.data.data);
      localStorage.setItem(
        "currentProject",
        JSON.stringify(res.data.data.data)
      );

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
      <div className="flex flex-col">
        <div className="flex flex-col">
          <h1 className="text-2xl">Project List</h1>
          <div className="flex flex-row">
            <div className="w-2/3">
              {currentProjectIsLive ? null : (
                <CityFilter setCity={setCity} city={city} />
              )}
              <AccountMngrFilter
                setAccountManager={setAccountManagerID}
                accountManagerID={accountManagerID}
              />
            </div>
            <p className="hidden md:flex md:flex-row md:items-center ">
              <Icon icon="ic:baseline-swipe-left" color="#ea5933" width="40" />
              <span className="ml-2">
                Swipe list elements right to update
                <br />/ left to remove element
              </span>
            </p>
          </div>
        </div>
        <hr />

        <div className="flex-1 m-4 flex-col">
          {isLoading ? <Spinner /> : projectList}
        </div>
      </div>
    </>
  );
};

export default ProjectList;
