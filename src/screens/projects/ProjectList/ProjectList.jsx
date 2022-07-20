import { useState } from "react";
import baseAPI from "../../../axios/axiosConfig";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../ui/spinner/Spinner";
import ProjectListItem from "./ProjectListItem";
import useGetProjects from "../../../hooks/useGetProjects";
import TableHeaders from "../../../ui/TableHeaders";
import { useCurrentProject } from "../../../hooks/useCurrentProject";

const ProjectList = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { projects } = useGetProjects();
  const { setCurrentProject } = useCurrentProject();

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
        <div className="flex flex-col">
          <h1 className="text-2xl">Project List</h1>
        </div>
        <hr />
        <div className="flex-1 my-1 flex-col">
          <table className="w-full">
            <TableHeaders headers="project" />
            {isLoading ? <Spinner /> : projectList}
          </table>
        </div>
      </div>
    </>
  );
};

export default ProjectList;
