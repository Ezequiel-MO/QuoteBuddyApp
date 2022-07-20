import React from "react";

const TableHeaders = ({ headers }) => {
  return (
    <thead className="text-left">
      <tr>
        <th>Code</th>
        <th>Location</th>
        <th>Group Name</th>
        <th>Pax</th>
        <th>Arrival</th>
        <th>Departure</th>
        <th>Status</th>
        <th>Estimate</th>
        <th>Delete</th>
        <th>Update</th>
      </tr>
    </thead>
  );
};

export default TableHeaders;
