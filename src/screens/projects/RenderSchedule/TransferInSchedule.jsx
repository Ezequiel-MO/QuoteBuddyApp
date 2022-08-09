import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { toastOptions } from "../../../helper/toast";
import { useCurrentProject } from "../../../hooks/useCurrentProject";

const TransferInSchedule = ({ currentProject }) => {
  const { removeTransferFromSchedule } = useCurrentProject();

  const handleDeleteTransfer = (typeOfTransfer) => {
    removeTransferFromSchedule(typeOfTransfer);
    toast.success("Transfer Removed", toastOptions);
  };
  return (
    <div className="border-3 bg-white-50 mb-2 text-black-50">
      {
        <p className="flex flex-row items-center">
          Transfer from Airport ,{" "}
          {currentProject["schedule"][0]?.transfer_in.length} x{" "}
          {currentProject["schedule"][0]?.transfer_in[0]?.vehicleCapacity}
          -seater vehicle(s)
          <span
            className="ml-2 cursor-pointer"
            onClick={() => handleDeleteTransfer("transfer_in")}
          >
            <Icon icon="lucide:delete" color="#ea5933" />
          </span>
        </p>
      }
    </div>
  );
};

export default TransferInSchedule;
