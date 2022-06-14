import * as Yup from "yup";
import { Form, Formik } from "formik";
import { TextInput } from "../../../ui/inputs/TextInput";

const ClientMasterForm = ({ submitForm, client }) => {
  const initialValues = {
    firstName: client?.firstName ?? "",
    familyName: client?.familyName ?? "",
    email: client?.email ?? "",
    clientCompany: client?.clientCompany ?? "",
    phone: client?.phone ?? "",
    quoteLanguage: client?.quoteLanguage ?? "",
    country: client?.country ?? "",
  };

  const update = Object.keys(client).length > 0 ? true : false;

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          submitForm(values, "clients", update);
        }}
        enableReinitialize
        validationSchema={Yup.object({
          firstName: Yup.string().required("Required"),
          familyName: Yup.string().required("Required"),
          email: Yup.string().required("Required"),
          clientCompany: Yup.string().required("Required"),
          phone: Yup.string(),
          quoteLanguage: Yup.string(),
          country: Yup.string().required("Required"),
        })}
      >
        {(formik) => (
          <div className="block p-6 rounded-lg shadow-lg bg-white w-full">
            <Form>
              <fieldset className="grid grid-cols-2 gap-2">
                <legend>
                  <h1 className="text-2xl mb-4">Account Manager Details</h1>
                </legend>
                <div className="form-group mb-6">
                  <TextInput
                    label="First Name"
                    name="firstName"
                    placeholder="ex : Jonas ..."
                    type="text"
                  />

                  <TextInput
                    label="Family Name"
                    name="familyName"
                    placeholder="ex : Smith ..."
                    type="text"
                  />

                  <TextInput
                    label="Email"
                    name="email"
                    placeholder="ex : jonas.smith@example.com ..."
                    type="text"
                  />
                  <TextInput
                    label="Phone Nr"
                    name="phone"
                    placeholder="+46 1234 12345 ..."
                    type="text"
                  />
                  <TextInput
                    label="Quote Language"
                    name="quoteLanguage"
                    placeholder="EN"
                    type="text"
                  />

                  <TextInput
                    label="Client Company"
                    name="clientCompany"
                    placeholder="Client Name"
                    type="text"
                  />

                  <TextInput
                    label="Country"
                    name="country"
                    placeholder="ie UK, DK, ES, RO ..."
                    type="text"
                  />

                  <div className="form-group mb-6">
                    <input
                      data-testid="btn-submit"
                      type="submit"
                      className="cursor-pointer mt-6 py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
                      value={update ? "Edit Client Form" : "Create new Client"}
                    />
                  </div>
                </div>
              </fieldset>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default ClientMasterForm;
