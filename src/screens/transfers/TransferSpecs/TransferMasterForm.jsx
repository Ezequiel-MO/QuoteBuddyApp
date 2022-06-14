import * as Yup from "yup";
import { Form, Formik } from "formik";
import { TextInput } from "../../../ui/inputs/TextInput";

const TransferMasterForm = ({ submitForm, transfer }) => {
  const initialValues = {
    city: transfer?.city ?? "",
    company: transfer?.company ?? "",
    transfer_in_out: transfer?.transfer_in_out ?? "",
    dispo_4h: transfer?.dispo_4h ?? "",
    hextra: transfer?.hextra ?? "",
    hextra_night: transfer?.hextra_night ?? "",
    dispo_5h_out: transfer?.dispo_5h_out ?? "",
    dispo_4h_airport: transfer?.dispo_4h_airport ?? "",
    dispo_4h_night: transfer?.dispo_4h_night ?? "",
    transfer_in_out_night: transfer?.transfer_in_out_night ?? "",
    dispo_6h_night: transfer?.dispo_6h_night ?? "",
    vehicleType: transfer?.vehicleType ?? "",
    vehicleCapacity: transfer?.vehicleCapacity ?? "",
    selectedService: transfer?.selectedService ?? "",
  };

  const update = Object.keys(transfer).length > 0 ? true : false;

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          submitForm(values, "transfers", update);
        }}
        enableReinitialize
        validationSchema={Yup.object({
          city: Yup.string().required("Required"),
          company: Yup.string().required("Required"),
          transfer_in_out: Yup.number(),
          dispo_4h: Yup.number(),
          hextra: Yup.number(),
          hextra_night: Yup.number(),
          dispo_5h_out: Yup.number(),
          dispo_4h_airport: Yup.number(),
          dispo_4h_night: Yup.number(),
          transfer_in_out_night: Yup.number(),
          dispo_6h_night: Yup.number(),
          vehicleType: Yup.string().required("Required"),
          vehicleCapacity: Yup.number().required("Required"),
        })}
      >
        {(formik) => (
          <div className="block p-6 rounded-lg shadow-lg bg-white w-3/4">
            <Form>
              <fieldset className="grid grid-cols-2 gap-4">
                <legend>
                  <h1 className="text-2xl mb-4">Transfer List</h1>
                </legend>
                <div className="form-group mb-6">
                  <TextInput
                    label="City"
                    name="city"
                    placeholder="Ex: Lisboa"
                    type="text"
                  />
                  <TextInput
                    label="Company"
                    name="company"
                    placeholder="Transportation company ..."
                    type="text"
                  />
                  <TextInput
                    label="Transfer in/out"
                    name="transfer_in_out"
                    placeholder="ex : 70"
                    type="number"
                  />
                  <TextInput
                    label="Dispo 4h"
                    name="dispo_4h"
                    placeholder="ex : 220"
                    type="number"
                  />
                  <TextInput
                    label="Hextra"
                    name="hextra"
                    placeholder="ex : 50"
                    type="number"
                  />
                  <TextInput
                    label="Hextra night"
                    name="hextra_night"
                    placeholder="ex : 58"
                    type="number"
                  />

                  <TextInput
                    label="Dispo 5h out"
                    name="dispo_5h_out"
                    placeholder="ex : 260"
                    type="number"
                  />
                </div>

                <div className="form-group mb-6">
                  <TextInput
                    label="Dispo 4h airport"
                    name="dispo_4h_airport"
                    placeholder="ex : 280"
                    type="number"
                  />

                  <TextInput
                    label="Dispo 4h night"
                    name="dispo_4h_night"
                    placeholder="ex : 250"
                    type="number"
                  />

                  <TextInput
                    label="Transfer in/out night"
                    name="transfer_in_out_night"
                    placeholder="ex : 82"
                    type="number"
                  />

                  <TextInput
                    label="Dispo 6h night"
                    name="dispo_6h_night"
                    placeholder="ex : 340"
                    type="number"
                  />

                  <TextInput
                    label="Vehicle type"
                    name="vehicleType"
                    placeholder="ex : Bus"
                    type="text"
                  />

                  <TextInput
                    label="vehicle capacity"
                    name="vehicleCapacity"
                    placeholder="ex : 30"
                    type="text"
                  />
                  <input
                    type="submit"
                    className="cursor-pointer mt-6 py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
                    value={
                      update ? "Edit Transfer Form" : "Create new Transfer"
                    }
                  />
                </div>
              </fieldset>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default TransferMasterForm;
