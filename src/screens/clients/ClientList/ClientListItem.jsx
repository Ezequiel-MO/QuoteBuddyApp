import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { removeItemFromList } from "../../../helper/RemoveItemFromList";

const ClientListItem = ({ client }) => {
  const navigate = useNavigate();

  return (
    <tbody>
      <tr className="mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50">
        <td>{`${client.firstName} ${client.familyName}`}</td>
        <td>{client.email}</td>
        <td>{client.clientCompany}</td>
        <td>{client.country}</td>
        <td
          className="cursor-pointer"
          onClick={() => removeItemFromList("clients", client._id)}
        >
          <Icon icon="fluent:delete-16-regular" color="#ea5933" />
        </td>
        <td
          className="cursor-pointer"
          onClick={() =>
            navigate(`/app/client/specs`, {
              state: { client },
            })
          }
        >
          <Icon icon="ic:round-system-update-alt" color="#ea5933" />
        </td>
      </tr>
    </tbody>
  );
};

export default ClientListItem;
