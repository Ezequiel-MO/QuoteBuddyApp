import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import baseAPI from "../../../axios/axiosConfig";
import { toast } from "react-toastify";
import { toastOptions } from "../../../helper/toast";
import { useCurrentProject } from "../../../hooks/useCurrentProject";

const AddTransfersINOUTToSchedule = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addEventToSchedule } = useCurrentProject();
  const [city, setCity] = useState("Barcelona");
  const [vehicleCapacity, setVehicleCapacity] = useState(20);
  const [transfers, setTransfers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [nrVehicles, setNrVehicles] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState("");

  const { currentProject } = useCurrentProject();
  const currentProjectIsLive = Object.keys(currentProject).length !== 0;

  useEffect(() => {
    if (currentProjectIsLive) {
      const { groupLocation } = currentProject;
      setCity(groupLocation);
    }
  }, [currentProject, currentProjectIsLive]);

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const response = await baseAPI.get(`/v1/transfers?city=${city}`);
        const companiesArr = response.data.data.data.map(
          (transfer) => transfer.company
        );
        const uniqueCompanies = [...new Set(companiesArr)];
        setCompanies(uniqueCompanies);
      } catch (error) {
        console.log(error);
      }
    };

    getCompanies();
  }, [city]);

  useEffect(() => {
    const getTransferList = async () => {
      try {
        const response = await baseAPI.get(
          `/v1/transfers?city=${city}&vehicleCapacity=${vehicleCapacity}`
        );
        const selectedCompanyTransfers = response.data.data.data.filter(
          (transfer) => transfer.company === selectedCompany
        );
        setTransfers(selectedCompanyTransfers);
      } catch (error) {
        console.log(error);
      }
    };
    getTransferList();
  }, [city, vehicleCapacity, selectedCompany]);

  const handleAddTransfer = (transfer, nrVehicles) => {
    for (let i = 0; i < nrVehicles; i++) {
      addEventToSchedule({
        dayOfEvent: location.state.dayOfEvent,
        timeOfEvent: location.state.timeOfEvent,
        event: transfer,
      });
    }
    toast.success("Transfer added", toastOptions);
    navigate("/app/project/schedule");
  };

  const transferList = transfers.map((transfer) => (
    <tr key={transfer._id}>
      <td>{transfer.company}</td>
      <td>{transfer.vehicleType}</td>
      <td>{transfer.vehicleCapacity}</td>
      <td>
        <input
          type="number"
          className="w-10 mr-2 px-2"
          placeholder="1"
          value={nrVehicles}
          onChange={(e) => setNrVehicles(e.target.value)}
        />
      </td>

      <td
        onClick={() => handleAddTransfer(transfer, nrVehicles)}
        className="cursor-pointer"
      >
        {location.state.timeOfEvent === "transfer_in" ? (
          <p>Add Transfer In</p>
        ) : (
          <p>Add Transfer Out</p>
        )}
      </td>
    </tr>
  ));

  return (
    <>
      <h1 className="text-2xl mb-4 indent-8">Transfer In/Out</h1>
      <div className="container grid grid-cols-4 gap-4 my-4">
        <form>
          <div className="block relative w-64">
            <label htmlFor="company">Filter by Local Vendor:</label>
            <select
              name="company"
              id="company"
              className="block cursor-pointer w-full bg-white-100 border border-gray-400 hover:border-gray-50 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setSelectedCompany(e.target.value)}
            >
              <option value="">Select Preferred vendor</option>
              {companies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>
          <div className="block relative w-64">
            <label htmlFor="vehicleCapacity">Filter by Vehicle Size:</label>
            <select
              name="vehicleCapacity"
              id="vehicleCapacity"
              className="block cursor-pointer w-full bg-white-100 border border-gray-400 hover:border-gray-50 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setVehicleCapacity(parseInt(e.target.value))}
            >
              <option value="">Choose type of Vehicle</option>
              <option value={3}>3-seat Mercedes</option>
              <option value={20}>Mini Bus</option>
              <option value={30}>30-seater Bus</option>
              <option value={50}>50-seater Bus</option>
              <option value={70}>70-seater Bus</option>
            </select>
          </div>
        </form>
        <table className="table-auto col-span-3">
          <thead className="bg-gray-50 border-b text-left">
            <tr>
              <th>Company</th>
              <th>Vehicle Type</th>
              <th>Vehicle Capacity</th>
              <th>Number of Vehicles</th>
              <th>Add To Schedule</th>
            </tr>
          </thead>
          <tbody className="text-white-50">{transferList}</tbody>
        </table>
      </div>
    </>
  );
};

export default AddTransfersINOUTToSchedule;
