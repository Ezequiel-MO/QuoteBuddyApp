import { useEffect } from 'react'
import { ErrorMessage, Field } from 'formik'

export const SelectBuget = (props) => {
	const { label, name, options, value, setOpen, ...rest } = props

	useEffect(() => {
		if (value === 'budgetAsPdf') {
			setOpen(true)
		} else {
			setOpen(false)
		}
	}, [value, setOpen])

	return (
		<div>
			<label htmlFor={name}>{label}</label>
			<Field
				id={name}
				name={name}
				value={value}
				as="select"
				{...rest}
				className="
                form-control w-full
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
              focus:text-gray-700 focus:outline-none"
			>
				<option value="">--- Select an option --- </option>
				{options.map((option, index) => (
					<option value={option.value} key={index}>
						{option.name}
					</option>
				))}
			</Field>

			<ErrorMessage name={name} component="span" className="error-message" />
		</div>
	)
}
