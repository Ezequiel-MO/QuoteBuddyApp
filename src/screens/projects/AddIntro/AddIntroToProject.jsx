import { Form, Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentProject } from "../../../redux/features/CurrentProjectSlice";
import TextAreaInput from "../../../ui/inputs/TextAreaInput";

const AddIntroToProject = ({ submitForm }) => {
  const { projectIntro } = useSelector(selectCurrentProject);

  return (
    <>
      <Formik
        initialValues={{
          introduction: "",
        }}
        onSubmit={(values) => {
          submitForm(values.introduction);
        }}
      >
        {(formik) => (
          <div className="block rounded-lg shadow-lg bg-white w-full">
            <Form>
              <TextAreaInput
                name="introduction"
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
                     my-7
                     focus:text-gray-700 focus:bg-white focus:border-orange-50 focus:outline-none
                   "
                placeholder={`${
                  projectIntro
                    ? projectIntro
                    : "Write here an introduction for the whole project - that will be displayed in the top of the project page"
                } `}
                type="text"
              />
              <div className="flex space-x-2 justify-center">
                <button
                  className="inline-block px-6 py-2 border-2 border-orange-50 text-orange-50 font-medium text-sm leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                  type="submit"
                >
                  Add Introduction to Project
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default AddIntroToProject;
