import * as Yup from "yup";
import { Form, Formik } from "formik";
import { TextInput } from "../../../ui/inputs/TextInput";
import { useEffect, useState } from "react";
import baseAPI from "../../../axios/axiosConfig";
import SelectInput from "../../../ui/inputs/SelectInput";
import useGetLocations from "../../../hooks/useGetLocations";

const ProjectMasterForm = ({ submitForm, project }) => {
  const [clientAccManagers, setClientAccManagers] = useState([]);
  const [accManagers, setAccManagers] = useState([]);
  const { locations } = useGetLocations();

  useEffect(() => {
    const getClients = async () => {
      const response = await baseAPI.get("v1/clients");
      const transformedResponse = response.data.data.data.map((client) => {
        return {
          name: `${client.firstName} ${client.familyName}`,
          value: client._id,
          company: client.clientCompany,
        };
      });
      setClientAccManagers(transformedResponse);
    };

    const getAccountManagers = async () => {
      const response = await baseAPI.get("v1/accManagers");
      const transformedResponse = response.data.data.data.map((mngr) => {
        return {
          name: `${mngr.firstName} ${mngr.familyName}`,
          value: mngr._id,
          email: mngr.email,
        };
      });
      setAccManagers(transformedResponse);
    };

    getAccountManagers();
    getClients();
  }, []);

  const getAccManagerInitialValue = () => {
    if (
      project &&
      project.accountManager &&
      project.accountManager[0].firstName &&
      project.accountManager[0].familyName
    ) {
      return `${project.accountManager[0].firstName} ${project.accountManager[0].familyName}`;
    }
    return "";
  };

  const getClientAccManagerInitialValue = () => {
    if (
      project &&
      project.clientAccManager &&
      project.clientAccManager[0].firstName &&
      project.clientAccManager[0].familyName
    ) {
      return `${project.clientAccManager[0].firstName} ${project.clientAccManager[0].familyName}`;
    }
    return "";
  };

  const initialValues = {
    code: project?.code ?? "",
    accountManager: getAccManagerInitialValue(),
    clientAccountManager: getClientAccManagerInitialValue(),
    groupName: project?.groupName ?? "",
    groupLocation: project?.groupLocation ?? "",
    arrivalDay: project?.arrivalDay ?? "",
    departureDay: project?.departureDay ?? "",
    nrPax: project?.nrPax ?? "",
    status: project?.status ?? "",
    estimate: project?.estimate ?? "",
  };

  const update = Object.keys(project).length > 0 ? true : false;

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          const clientAccManagerId = clientAccManagers?.find(
            (item) => item.name === values.clientAccountManager
          )?.value;
          const accManagerId = accManagers?.find(
            (item) => item.name === values.accountManager
          )?.value;
          values.clientAccountManager = clientAccManagerId;
          values.accountManager = accManagerId;

          submitForm(values, "projects", update);
        }}
        enableReinitialize={true}
        validationSchema={Yup.object({
          code: Yup.string().required("Required"),
          accountManager: Yup.string().required("Required"),
          clientAccountManager: Yup.string().required("Required"),
          groupName: Yup.string().required("Required"),
          groupLocation: Yup.string().required("Required"),
          arrivalDay: Yup.string().required("Required"),
          departureDay: Yup.string().required("Required"),
          nrPax: Yup.number().required("Required"),
          status: Yup.string().required("Required"),
          estimate: Yup.number(),
        })}
      >
        {(formik) => (
          <div className="grid grid-cols-2 gap-2 px-6 rounded-lg shadow-lg bg-white">
            <Form>
              <fieldset>
                <legend>
                  <h1 className="text-2xl mb-4">Base Project</h1>
                </legend>
                <div className="form-group">
                  <div className="flex items-center justify-between mt-4 mb-4">
                    <TextInput
                      label="Code"
                      name="code"
                      placeholder="ex : BEM2022001..."
                      className="form-control          
                    block
                    w-2/4
                    px-3
                    py-1.5
                    my-1
                    text-base
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-orange-50 focus:outline-none"
                      type="text"
                    />

                    <TextInput
                      label="Number of Pax"
                      name="nrPax"
                      placeholder="ex : 20..."
                      className="form-control     
                    block
                    w-1/4
                    px-3
                    py-1.5
                    my-1
                    text-base
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-orange-50 focus:outline-none"
                      type="number"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-4 mb-4">
                    <TextInput
                      label="Arrival Day"
                      name="arrivalDay"
                      className="form-control          
                    block
                    w-1/3
                    px-3
                    py-1.5
                    my-1
                    text-base
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-orange-50 focus:outline-none"
                      type="date"
                    />

                    <TextInput
                      label="Departure Day"
                      name="departureDay"
                      className="form-control     
                    block
                    w-1/3
                    px-3
                    py-1.5
                    my-1
                    text-base
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-orange-50 focus:outline-none"
                      type="date"
                    />
                  </div>

                  <SelectInput
                    label="Account Manager"
                    name="accountManager"
                    placeholder="Account Manager ..."
                    options={accManagers}
                    value={formik.values.accountManager}
                  />

                  <SelectInput
                    label="Client Account Manager"
                    name="clientAccountManager"
                    placeholder="Client Account Manager ..."
                    options={clientAccManagers}
                    value={formik.values.clientAccountManager}
                  />

                  <TextInput
                    label="Group Name"
                    name="groupName"
                    placeholder="ex : Pfizer group ..."
                    type="text"
                  />

                  <SelectInput
                    label="Group Location"
                    name="groupLocation"
                    placeholder="Barcelona ..."
                    options={locations}
                    value={formik.values.groupLocation}
                  />

                  <SelectInput
                    label="Project Status"
                    name="status"
                    options={[
                      "Received",
                      "Sent",
                      "Confirmed",
                      "Cancelled",
                      "Invoiced",
                    ]}
                    value={formik.values.status}
                  />

                  <TextInput
                    label="Estimate turnover"
                    name="estimate"
                    placeholder="ex : 80000"
                    type="number"
                  />

                  <div className="form-group mb-6">
                    <div className="flex space-x-2 justify-center mt-4">
                      <button
                        className="inline-block px-6 py-2 border-2 border-orange-50 text-orange-50 font-medium text-sm leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                        type="submit"
                      >
                        Save and submit
                      </button>
                    </div>
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

export default ProjectMasterForm;
