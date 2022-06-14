import { ErrorMessage, useField } from "formik";

export const TextInput = ({ label, ...props }) => {
  const [field] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        className="form-control     
                    w-full
                    px-3
                    py-1.5
                    text-base
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-orange-50 focus:outline-none"
        {...field}
        {...props}
      />
      <div className="bg-red-500 font-bold text-white-50">
        <ErrorMessage
          name={props.name}
          component="span"
          className="error-message"
        />
      </div>
    </>
  );
};

export default TextInput;
