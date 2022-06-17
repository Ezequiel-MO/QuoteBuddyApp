import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../../../ui/inputs/TextInput";
import baseAPI from "../../../axios/axiosConfig";
import { toast } from "react-toastify";
import { toastOptions } from "../../../helper/toast";
import { useSelector } from "react-redux";
import { selectCurrentProject } from "../../../redux/features/CurrentProjectSlice";
import { useCurrentProject } from "../../../hooks/useCurrentProject";

const AddHotelToProject = () => {
  let params = useParams();
  const { addHotelToProject } = useCurrentProject();
  const location = useLocation();
  const navigate = useNavigate();
  const { hotels } = useSelector(selectCurrentProject);

  const addHotelWithPricesToProject = async (values) => {
    const { hotelId } = params;

    if (hotels.find((hotel) => hotel._id === hotelId)) {
      toast.error("Hotel already in project", toastOptions);
      setTimeout(() => {
        navigate("/app/project");
      }, 1000);
      return;
    }
    try {
      const res = await baseAPI.get(`v1/hotels/${hotelId}`);
      const hotel = res.data.data.data;
      hotel.price = [values];
      addHotelToProject(hotel);
      toast.success("Hotel added to project", toastOptions);
      navigate("/app/project/schedule");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          DUInr: "",
          DUIprice: "",
          breakfast: "",
          DoubleRoomNr: "",
          DoubleRoomPrice: "",
          DailyTax: "",
        }}
        onSubmit={(values) => {
          addHotelWithPricesToProject(values);
        }}
        validationSchema={Yup.object({
          DUInr: Yup.number(),
          DUIprice: Yup.number(),
          breakfast: Yup.number(),
          DoubleRoomNr: Yup.number(),
          DoubleRoomPrice: Yup.number(),
          DailyTax: Yup.number(),
        })}
      >
        {(formik) => (
          <div className="block px-9 rounded-lg shadow-lg bg-white w-1/3">
            <h1 className="text-2xl">
              {" "}
              {location.state.hotelName && location.state.hotelName}
            </h1>
            <Form>
              <fieldset className="flex items-center justify-between">
                <div className="w-1/3">
                  <div>
                    <TextInput
                      label="Number of DUIs"
                      name="DUInr"
                      placeholder="Ex. 40"
                      type="number"
                    />
                  </div>
                  <div>
                    <TextInput
                      label="Rate per DUI"
                      name="DUIprice"
                      placeholder="Rate per night per room"
                      type="number"
                    />
                  </div>
                  <div>
                    <TextInput
                      label="Breakfast"
                      name="breakfast"
                      placeholder="If included, enter 0"
                      type="number"
                    />
                  </div>
                  <div>
                    <TextInput
                      label="Number of Double Rooms"
                      name="DoubleRoomNr"
                      placeholder="Number of Double Rooms"
                      type="number"
                    />
                  </div>
                  <div>
                    <TextInput
                      label="Rate per Double Room"
                      name="DoubleRoomPrice"
                      placeholder="Rate per night per room"
                      type="number"
                    />
                  </div>
                  <div>
                    <TextInput
                      label="City Tax"
                      name="DailyTax"
                      placeholder="City Tax p.person per night"
                      type="number"
                    />
                  </div>
                </div>

                <div className="flex space-x-2 justify-center">
                  <button
                    className="inline-block px-6 py-2 h-12 w-36 border-2 border-orange-50 text-orange-50 font-medium text-sm leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    type="submit"
                  >
                    Add Hotel Rates to project
                  </button>
                </div>
              </fieldset>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default AddHotelToProject;
