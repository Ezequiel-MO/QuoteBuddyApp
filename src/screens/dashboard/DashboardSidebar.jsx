import { dashboardData } from "../../helper/dashboardData";

const DashboardSidebar = () => {
  return (
    <ul className="indent-6 text-white-100">
      {dashboardData.map(({ title, route }) => (
        <li
          key={title}
          onClick={() => navigate(`/app/${route}`)}
          className="uppercase hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer"
        >
          {title}
        </li>
      ))}
    </ul>
  );
};

export default DashboardSidebar;
