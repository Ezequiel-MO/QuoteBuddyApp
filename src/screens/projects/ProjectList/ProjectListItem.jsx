import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import accounting from "accounting";
import baseAPI from "../../../axios/axiosConfig";
import { toast } from "react-toastify";
import { toastOptions } from "../../../helper/toast";

const ProjectListItem = ({ project, handleRecycleProject }) => {
  const navigate = useNavigate();
  const removeItemFromList = async (endpoint, ID) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this ${endpoint.slice(0, -1)}  ?`
    );
    if (confirmDelete) {
      try {
        await baseAPI.delete(`v1/${endpoint}/${ID}`);
        toast.success("Deleted successfully", toastOptions);
        navigate(`/app/${endpoint.slice(0, -1)}`);
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.warn("Could not delete Item successfully", toastOptions);
    }
  };

  return (
    <tbody>
      <tr className="mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50">
        <td
          onClick={() => handleRecycleProject(project._id)}
          className="hover:text-blue-600 hover:underline cursor-pointer"
        >
          {project.code}
        </td>
        <td>{project.groupLocation}</td>
        <td>{project.groupName}</td>
        <td>{project.nrPax}</td>
        <td>{project.arrivalDay}</td>
        <td>{project.departureDay}</td>
        <td>{project.status}</td>
        <td>{accounting.formatMoney(project.estimate, "€")}</td>
        <td
          className="cursor-pointer"
          onClick={() => removeItemFromList("projects", project._id)}
        >
          <Icon icon="fluent:delete-16-regular" color="#ea5933" />
        </td>

        <td
          className="cursor-pointer"
          onClick={() =>
            navigate(`/app/project/specs`, {
              state: { project },
            })
          }
        >
          <Icon icon="ic:round-system-update-alt" color="#ea5933" />
        </td>
      </tr>
    </tbody>
  );
};

export default ProjectListItem;
