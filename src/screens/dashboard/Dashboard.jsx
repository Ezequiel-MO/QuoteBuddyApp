import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import baseAPI from "../../axios/axiosConfig";
import { useCurrentProject } from "../../hooks/useCurrentProject";

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentProject, setCurrentProject } = useCurrentProject();
  const currentProjectIsLive = Object.keys(currentProject).length !== 0;

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
      <ul className="indent-6 text-white-100">
        <li
          onClick={() => navigate("/app/project")}
          className="hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer"
        >
          Projects
        </li>
        <li
          onClick={() => navigate("/app/hotel")}
          className="hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer"
        >
          Hotels
        </li>
        <li
          onClick={() => navigate("/app/restaurant")}
          className="hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer"
        >
          Restaurants
        </li>
        <li
          onClick={() => navigate("/app/event")}
          className="hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer"
        >
          Events
        </li>
        <li
          onClick={() => navigate("/app/transfer")}
          className="hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer"
        >
          Transfers
        </li>
        <li
          onClick={() => navigate("/app/client")}
          className="hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer"
        >
          Clients
        </li>
        <li
          onClick={() => navigate("/app/location")}
          className="hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer"
        >
          Locations
        </li>
        <li
          onClick={() => navigate("/app/accManager")}
          className="hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer"
        >
          Account Managers
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
