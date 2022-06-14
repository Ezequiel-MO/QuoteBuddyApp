import { useDispatch } from "react-redux";
import baseAPI from "../../../axios/axiosConfig";
import { SET_CURRENT_PROJECT } from "../../../redux/features/CurrentProjectSlice";
import ProjectMasterForm from "./ProjectMasterForm";
import { useNavigate, useLocation } from "react-router-dom";
import { computeTotalDays, whichDay } from "../../../helper/helperFunctions";
import { toast } from "react-toastify";
import { toastOptions } from "../../../helper/toast";

const ProjectSpecs = () => {
  const navigate = useNavigate();
  const {
    state: { project },
  } = useLocation();

  const dispatch = useDispatch();

  const transformData = (data, diffDays) => {
    let transformedData = { ...data };
    transformedData.clientAccManager = [data.clientAccountManager.toString()];
    transformedData.schedule = [];
    for (let i = 1; i <= diffDays; i++) {
      transformedData.schedule.push({
        date: whichDay(i, diffDays),
        dayOfEvent: i,
        morningEvents: [],
        lunch: [],
        afternoonEvents: [],
        dinner: [],
        transfer_in: [],
        transfer_out: [],
      });
    }
    return transformedData;
  };

  const postToEndpoint = async (data, endPoint, update) => {
    const diffDays = computeTotalDays(data.arrivalDay, data.departureDay);
    let transformedData = transformData(data, diffDays);

    try {
      if (update === true) {
        const updatedData = { ...data };
        updatedData.clientAccManager = [data.clientAccountManager.toString()];
        const res = await baseAPI.patch(
          `v1/${endPoint}/${project._id}`,
          updatedData
        );
        localStorage.setItem(
          "currentProject",
          JSON.stringify(res.data.data.data)
        );
        dispatch(SET_CURRENT_PROJECT(res.data.data.data));
        toast.success("Project updated", toastOptions);
        setTimeout(() => {
          navigate("/app");
        }, 1500);
      } else {
        const res = await baseAPI.post(`v1/${endPoint}`, transformedData);
        localStorage.setItem(
          "currentProject",
          JSON.stringify(res.data.data.data)
        );
        dispatch(SET_CURRENT_PROJECT(res.data.data.data));
        toast.success("Base Project Created", toastOptions);
      }
    } catch (error) {
      toast.error(`${error.response.data.message}`, toastOptions);
    }
  };

  const submitForm = (values, endpoint, update) => {
    postToEndpoint(values, endpoint, update);
  };

  return (
    <>
      <ProjectMasterForm submitForm={submitForm} project={project} />
    </>
  );
};

export default ProjectSpecs;
