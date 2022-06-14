import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
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
      </ul>
    </div>
  );
};

export default Dashboard;
