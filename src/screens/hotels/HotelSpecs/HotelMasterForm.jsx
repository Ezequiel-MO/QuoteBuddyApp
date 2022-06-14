import { useRef } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { TextInput } from "../../../UI/inputs/TextInput";
import { TextAreaInput } from "../../../UI/inputs/TextAreaInput";
import { CheckboxInput } from "../../../UI/inputs/CheckboxInput";
import { Icon } from "@iconify/react";

const HotelMasterForm = ({ submitForm, hotel }) => {
  const fileInput = useRef();

  const initialValues = {
    name: hotel?.name ?? "",
    city: hotel?.city ?? "",
    address: hotel?.address ?? "",
    numberStars: hotel?.numberStars ?? "",
    numberRooms: hotel?.numberRooms ?? "",
    checkin_out: hotel?.checkin_out ?? "",
    meetingRooms: hotel?.meetingRooms ?? "",
    wheelChairAccessible: hotel?.wheelChairAccessible ?? "",
    wifiSpeed: hotel?.wifiSpeed ?? "",
    swimmingPool: hotel?.swimmingPool ?? "",
    restaurants: hotel?.restaurants ?? "",
    longitude: hotel?.location?.coordinates[1] ?? "",
    latitude: hotel?.location?.coordinates[0] ?? "",
    textContent: hotel?.textContent ?? "",
  };

  const update = Object.keys(hotel).length > 0 ? true : false;

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          submitForm(values, fileInput.current.files, "hotels", update);
        }}
        enableReinitialize
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          city: Yup.string().required("Required"),
          address: Yup.string().required("Required"),
          numberStars: Yup.number().required("Required"),
          numberRooms: Yup.number().required("Required"),
          checkin_out: Yup.string().required("Required"),
          meetingRooms: Yup.number().required("Required"),
          wheelChairAccessible: Yup.boolean().required("Required"),
          wifiSpeed: Yup.string().required("Required"),
          swimmingPool: Yup.string().required("Required"),
          restaurants: Yup.string().required("Required"),
          longitude: Yup.number().required("Required"),
          latitude: Yup.number().required("Required"),
        })}
      >
        {(formik) => (
          <div className="block p-6 rounded-lg shadow-lg bg-white w-3/4">
            <Form>
              <fieldset className="grid grid-cols-3 gap-4">
                <legend>
                  <h1 className="text-2xl mb-4 indent-8">General Hotel Data</h1>
                </legend>

                <div className="form-group mb-6">
                  <TextInput
                    label="Name"
                    name="name"
                    placeholder="Hotel Excelsior - 4star Superior"
                    type="text"
                  />
                  <TextInput
                    label="City"
                    name="city"
                    placeholder="City"
                    type="text"
                  />
                  <TextInput
                    label="Address"
                    name="address"
                    placeholder="ex : c/Pina 57"
                    type="text"
                  />
                  <TextInput
                    label="Category"
                    name="numberStars"
                    placeholder="ex : 4"
                    type="number"
                  />
                  <TextInput
                    label="Total Number Of Rooms"
                    name="numberRooms"
                    placeholder="ex : 100 rooms"
                    type="number"
                  />
                  <TextInput
                    label="Check-in and Check-out"
                    name="checkin_out"
                    placeholder="ex : 12noon/3pm"
                    type="text"
                  />
                </div>
                <div className="form-group mb-6">
                  <TextInput
                    label="Nr Of Meeting Rooms"
                    name="meetingRooms"
                    placeholder="ex : 4"
                    type="number"
                  />
                  <TextInput
                    label="Wi-Fi Speed"
                    name="wifiSpeed"
                    placeholder="ex : Available all rooms/common areas"
                    type="text"
                  />
                  <TextInput
                    label="Swimming Pool"
                    name="swimmingPool"
                    placeholder="ex : 1x Outdoor/ 1x Indoor"
                    type="text"
                  />
                  <TextInput
                    label="Restaurants"
                    name="restaurants"
                    placeholder="ex : 1x Restaurant/ 1x Bar"
                    type="text"
                  />
                  <TextInput
                    label="Coords Longitude"
                    name="longitude"
                    placeholder="ex : 2.154007"
                    type="number"
                  />
                  <TextInput
                    label="Coords Latitude"
                    name="latitude"
                    placeholder="ex : 41.390205"
                    type="number"
                  />
                </div>
                <div className="form-group">
                  <TextAreaInput
                    className="
                    form-control
                    h-52
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    mt-7
                    focus:text-gray-700 focus:bg-white focus:border-orange-50 focus:outline-none
                  "
                    name="textContent"
                    placeholder="Write a description"
                    type="text"
                  />
                  <CheckboxInput
                    label="Wheelchair Accessible"
                    name="wheelChairAccessible"
                  />
                  <label htmlFor="file-upload" className="mx-3">
                    <Icon icon="akar-icons:cloud-upload" width="40" />
                    <span>Upload Images</span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    ref={fileInput}
                    name="imageContentUrl"
                    multiple
                    disabled={update ? true : false}
                  />
                </div>
                <input
                  type="submit"
                  className="cursor-pointer py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
                  value={update ? "Edit Hotel Form" : "Save new Hotel"}
                />
              </fieldset>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default HotelMasterForm;
