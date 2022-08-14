import { useState } from "react";
import { Icon } from "@iconify/react";
import baseAPI from "../../../axios/axiosConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../../ui/spinner/Spinner";
import ProjectListItem from "./ProjectListItem";
import useGetProjects from "../../../hooks/useGetProjects";
import TableHeaders from "../../../ui/TableHeaders";
import { useCurrentProject } from "../../../hooks/useCurrentProject";
import { toastOptions } from "../../../helper/toast";

const ProjectList = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { projects } = useGetProjects();
  const [project] = useState({});
  const { setCurrentProject, currentProject, clearProject } =
    useCurrentProject();

  const handleClearProject = () => {
    localStorage.removeItem("currentProject");
    clearProject();
    toast.success("Project cleared", toastOptions);
  };

  const handleRecycleProject = async (projectId) => {
    try {
      const res = await baseAPI.get(`v1/projects/${projectId}`);
      /* setCurrentProject(res.data.data.data); */
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
    ?.filter(
      (project) =>
        project.accountManager[0].email === localStorage.getItem("user_email")
    )
    .slice(0, 15)
    .map((project) => (
      <ProjectListItem
        key={project._id}
        project={project}
        handleRecycleProject={handleRecycleProject}
      />
    ));

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="flex flex-col bg-gray-100 w-32 m-1 py-2 px-4 font-bold text-black-50 rounded-xl items-center justify-center">
            <p>Active Project</p>
            <h2>{currentProject.code || "none"}</h2>
          </div>
          <button
            onClick={() =>
              navigate("/app/project/specs", { state: { project } })
            }
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 m-1 rounded-xl inline-flex items-center"
          >
            <Icon icon="icons8:create-new" />
            <span>NEW PROJECT</span>
          </button>
          <button
            onClick={handleClearProject}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 m-1 rounded-xl inline-flex items-center"
          >
            <Icon icon="icons8:create-new" />
            <span>CLEAR PROJECT</span>
          </button>
        </div>
        <hr />
        <div className="flex-1 my-1 flex-col">
          <table className="w-full p-5">
            <TableHeaders headers="project" />
            {isLoading ? <Spinner /> : projectList}
          </table>
        </div>
      </div>
    </>
  );
};

export default ProjectList;
