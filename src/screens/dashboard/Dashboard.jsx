import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import baseAPI from "../../axios/axiosConfig";
import { useCurrentProject } from "../../hooks/useCurrentProject";
import useGetProjects from "../../hooks/useGetProjects";

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
          <li
            onClick={() => navigate("/app/country")}
            className="hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer"
          >
            Countries
          </li>
        </ul>
        <div className="w-4/5 ml-5">
          <table className="w-full">
            <thead className="border border-collapse border-zinc-200">
              <tr>
                <th className="text-left uppercase ">Code</th>
                <th className="text-left uppercase">Starts</th>
                <th className="text-left uppercase">Ends</th>
                <th className="text-left uppercase">Pax</th>
                <th className="text-left uppercase">Client</th>
                <th className="text-left uppercase">Status</th>
              </tr>
            </thead>

            <tbody className="text-white-50">
              {projects
                ?.filter(
                  (project) =>
                    project.accountManager[0].email ===
                    localStorage.getItem("user_email")
                )
                .map((project) => (
                  <tr key={project._id}>
                    <td>{project.code}</td>
                    <td>{project.arrivalDay}</td>
                    <td>{project.departureDay}</td>
                    <td>{project.nrPax}</td>
                    <td>{project.clientAccManager[0].email}</td>
                    <td>{project.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
