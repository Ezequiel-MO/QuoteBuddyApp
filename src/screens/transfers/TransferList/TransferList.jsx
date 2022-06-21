import React, { useEffect, useState } from "react";
import baseAPI from "../../../axios/axiosConfig";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { toastOptions } from "../../../helper/toast";
import TransferListItem from "./TransferListItem";
import VehicleSizeFilter from "../../../ui/filters/VehicleSizeFilter";
import CityFilter from "../../../ui/filters/CityFilter";
import TransferVendorFilter from "../../../ui/filters/TransferVendorFilter";
import TransferServiceFilter from "../../../ui/filters/TransferServiceFilter";
import Spinner from "../../../ui/spinner/Spinner";
import { useCurrentProject } from "../../../hooks/useCurrentProject";

const TransferList = () => {
  const [transfers, setTransfers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState(20);
  const [company, setCompany] = useState("");
  const [service, setService] = useState("");

  const { currentProject } = useCurrentProject();
  const currentProjectIsLive = Object.keys(currentProject).length !== 0;

  useEffect(() => {
    if (currentProjectIsLive) {
      const { groupLocation } = currentProject;
      setCity(groupLocation);
    }
  }, [currentProject, currentProjectIsLive]);

  useEffect(() => {
    const getTransferList = async () => {
      try {
        setIsLoading(true);
        const response = await baseAPI.get(
          `/v1/transfers?city=${city}&vehicleCapacity=${vehicleCapacity}&company=${company}`
        );
        setTransfers(response.data.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (city && vehicleCapacity && company) {
      getTransferList();
    }
  }, [city, vehicleCapacity, company, service]);

  const handleDeleteTransfer = async (transferId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transfer?"
    );
    if (confirmDelete) {
      try {
        await baseAPI.delete(`v1/transfers/${transferId}`);
        toast.success("Transfer deleted", toastOptions);
        setTransfers(
          transfers.filter((transfer) => transfer._id !== transferId)
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.warn("Transfer not deleted", toastOptions);
      setTimeout(() => window.location.reload(), 1500)();
    }
  };

  const transferList = transfers
    .slice(0, 15)
    .map((transfer) => (
      <TransferListItem
        key={transfer._id}
        transfer={transfer}
        handleDeleteTransfer={handleDeleteTransfer}
        service={service}
      />
    ));

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
        <div className="flex flex-col w-full">
          <h1 className="text-2xl">Transfer List</h1>
          <div className="flex flex-row">
            <div className="flex-1">
              {currentProjectIsLive ? null : <CityFilter setCity={setCity} />}
              <TransferVendorFilter setCompany={setCompany} />
              <VehicleSizeFilter setVehicleCapacity={setVehicleCapacity} />
              <TransferServiceFilter setService={setService} />
            </div>
            <p className="flex flex-row items-center">
              <Icon icon="ic:baseline-swipe-left" color="#ea5933" width="40" />
              <span className="ml-2">
                Swipe list elements right to update / left to remove element
              </span>
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex-1 m-4 flex-col">
        {isLoading ? <Spinner /> : transferList}
      </div>
    </>
  );
};

export default TransferList;
