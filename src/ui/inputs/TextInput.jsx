import { ErrorMessage, useField } from 'formik'

export const TextInput = ({ label, ...props }) => {
	const [field] = useField(props)

	return (
		<div className="flex flex-col">
			<label htmlFor={props.id || props.name}>{label}</label>
			<input
				className=" min-w-[180px]
                    w-full
                    px-2
                    py-1
                    text-base
                    text-gray-700
                    border border-solid border-gray-300
                    rounded
                    focus:text-gray-700 focus:outline-none"
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
		</div>
	)
}
