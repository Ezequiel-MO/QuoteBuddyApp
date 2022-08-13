import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import baseAPI from "../../axios/axiosConfig";
import { dashboardData } from "../../helper/dashboardData";
import { useCurrentProject } from "../../hooks/useCurrentProject";
import useGetProjects from "../../hooks/useGetProjects";
import ProjectList from "../projects/ProjectList/ProjectList";
import DashboardSidebar from "./DashboardSidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentProject, setCurrentProject } = useCurrentProject();
  const currentProjectIsLive = Object.keys(currentProject).length !== 0;
  const { projects } = useGetProjects();

  useEffect(() => {
    const getCurrentProjectFromDB = async () => {
      try {
        const res = await baseAPI.get(`v1/projects/${currentProject._id}`);
        const project = res.data.data.data;
        setCurrentProject(project);
      } catch (error) {
        console.log(error);
      }
    };

    if (currentProjectIsLive) {
      getCurrentProjectFromDB();
    }
  }, []);

  return (
    <div className="container">
      <h1 className="text-2xl">Master Resources</h1>
      <div className="flex flex-row ">
        <DashboardSidebar />
        <div className="w-4/5 ml-5">
          <ProjectList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
