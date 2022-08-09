import { headerItems } from "../helper/headersData";

const TableHeaders = ({ headers }) => {
  return (
    <thead className="text-white-50 text-left font-bold border-b">
      <tr>
        {headerItems[headers].map((item, index) => (
          <th key={`${item}${index}`}>{item}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeaders;
