import { ErrorMessage, useField } from "formik";

export const CheckboxInput = ({ label, ...props }) => {
  const [field] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label>{label}</label>
      <input type='checkbox' {...field} {...props} />

      <ErrorMessage
        name={props.name}
        component='span'
        className='error-message'
      />
    </>
  );
};

export default CheckboxInput;
