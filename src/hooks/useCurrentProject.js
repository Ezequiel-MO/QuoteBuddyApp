import { useDispatch, useSelector } from "react-redux";
import {
  ADD_EVENT_TO_SCHEDULE,
  ADD_HOTEL_TO_PROJECT,
  CLEAR_PROJECT,
  EXPAND_TRANSFERS_TO_OPTIONS,
  REMOVE_EVENT_FROM_SCHEDULE,
  REMOVE_HOTEL_FROM_PROJECT,
  selectCurrentProject,
  SET_CURRENT_PROJECT,
} from "../redux/features/CurrentProjectSlice";

export const useCurrentProject = () => {
  const dispatch = useDispatch();
  const currentProject = useSelector(selectCurrentProject);
  const setCurrentProject = (project) => {
    dispatch(SET_CURRENT_PROJECT(project));
  };
  const addHotelToProject = (hotel) => {
    dispatch(ADD_HOTEL_TO_PROJECT(hotel));
  };
  const addEventToSchedule = (event) => {
    dispatch(ADD_EVENT_TO_SCHEDULE(event));
  };
  const removeHotelFromProject = (hotelId) => {
    dispatch(REMOVE_HOTEL_FROM_PROJECT(hotelId));
  };
  const removeEventFromSchedule = (event) => {
    dispatch(REMOVE_EVENT_FROM_SCHEDULE(event));
  };
  const expandTransfersToOptions = () => {
    dispatch(EXPAND_TRANSFERS_TO_OPTIONS());
  };

  const clearProject = () => {
    dispatch(CLEAR_PROJECT());
  };

  return {
    currentProject,
    setCurrentProject,
    addHotelToProject,
    addEventToSchedule,
    removeHotelFromProject,
    removeEventFromSchedule,
    expandTransfersToOptions,
    clearProject,
  };
};
