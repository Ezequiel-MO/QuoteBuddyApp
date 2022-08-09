import { useCurrentProject } from "../../../hooks/useCurrentProject";

const ScheduleHeader = () => {
  const { currentProject } = useCurrentProject();
  return (
    <table className="table-auto border-collapse border border-white-50 text-white-50">
      <thead>
        <tr className="border-b border-white-50 text-left">
          <th>Code</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Group Name</th>
          <th>Location</th>
          <th>Number of Pax</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-white-50 text-left">
          <td>{currentProject["code"]}</td>
          <td>{currentProject["arrivalDay"]}</td>
          <td>{currentProject["departureDay"]}</td>
          <td>{currentProject["groupName"]}</td>
          <td>{currentProject["groupLocation"]}</td>
          <td>{currentProject["nrPax"]}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ScheduleHeader;
