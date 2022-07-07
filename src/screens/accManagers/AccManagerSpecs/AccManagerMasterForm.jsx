import { useRef } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { TextInput } from "../../../ui/inputs/TextInput";
import { Icon } from "@iconify/react";

const AccManagerMasterForm = ({ submitForm, accManager }) => {
  const fileInput = useRef();

  const initialValues = {
    firstName: accManager?.firstName ?? "",
    lastName: accManager?.lastName ?? "",
    email: accManager?.email ?? "",
  };

  const update = Object.keys(accManager).length > 0 ? true : false;

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          submitForm(
            values,
            fileInput.current.files ?? [],
            "accManagers",
            update
          );
        }}
        enableReinitialize
        validationSchema={Yup.object({
          firstName: Yup.string().required("Required"),
          lastName: Yup.string().required("Required"),
          email: Yup.string().required("Required"),
        })}
      >
        {(formik) => (
          <div className="block p-6 rounded-lg shadow-lg bg-white w-3/4">
            <Form>
              <fieldset className="grid grid-cols-2 gap-4">
                <legend>
                  <h1 className="text-2xl mb-4">
                    General Account Manager Data
                  </h1>
                </legend>
                <div className="form-group mb-6">
                  <TextInput
                    label="First Name"
                    name="firstName"
                    placeholder="Acc manager Given Name"
                    type="text"
                  />
                  <TextInput
                    label="Last Name"
                    name="lastName"
                    placeholder="Acc manager Family Name"
                    type="text"
                  />
                  <TextInput
                    label="Email"
                    name="email"
                    placeholder="Acc manager company email"
                    type="text"
                  />
                </div>

                <div className="flex align-center justify-start">
                  <label htmlFor="file-upload" className="custom-file-upload">
                    <Icon icon="akar-icons:cloud-upload" width="40" />
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
                  value={
                    update
                      ? "Edit Account Manager Form"
                      : "Save new Account Manager"
                  }
                />
              </fieldset>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default AccManagerMasterForm;
