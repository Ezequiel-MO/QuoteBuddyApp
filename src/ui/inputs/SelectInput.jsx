import { ErrorMessage, Field } from "formik";

export const SelectInput = (props) => {
  const { label, name, options, value, ...rest } = props;

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field
        id={name}
        name={name}
        value={value}
        as="select"
        {...rest}
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
      >
        <option value="">--- Select an option --- </option>
        {options.map((option, index) => (
          <option
            key={`${option.name + index}`}
            value={`${name === "country" ? option.accessCode : option.name}`}
          >
            {`${option.name}  ${
              name === "clientAccountManager"
                ? "at " + option.company
                : name === "accountManager"
                ? "at " + option.email
                : ""
            }`}
          </option>
        ))}
      </Field>

      <ErrorMessage name={name} component="span" className="error-message" />
    </div>
  );
};

export default SelectInput;
