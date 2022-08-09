import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { toastOptions } from "../../../helper/toast";
import { useCurrentProject } from "../../../hooks/useCurrentProject";

const TransferOutSchedule = () => {
  const { currentProject, removeTransferFromSchedule } = useCurrentProject();

  const handleDeleteTransfer = (typeOfTransfer) => {
    removeTransferFromSchedule(typeOfTransfer);
    toast.success("Transfer Removed", toastOptions);
  };

  if (
    currentProject["schedule"][currentProject["schedule"].length - 1]
      ?.transfer_out.length === 0
  )
    return;
  return (
    <div className="border-3 bg-white-50 mt-2 text-black-50">
      {
        <p className="flex flex-row items-center">
          Transfer to Airport ,{" "}
          {
            currentProject["schedule"][currentProject["schedule"].length - 1]
              ?.transfer_out.length
          }{" "}
          x{" "}
          {
            currentProject["schedule"][currentProject["schedule"].length - 1]
              ?.transfer_out[0]?.vehicleCapacity
          }
          -seater vehicle(s)
          <span
            className="ml-2 cursor-pointer"
            onClick={() => handleDeleteTransfer("transfer_out")}
          >
            <Icon icon="lucide:delete" color="#ea5933" />
          </span>
        </p>
      }
    </div>
  );
};

export default TransferOutSchedule;
