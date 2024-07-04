import React, { ChangeEvent, FocusEvent } from 'react'
import { typesOfFreelancers } from 'src/constants/typesOfFreelancers'

interface Props {
	type: string
	handleChange: (e: ChangeEvent<HTMLSelectElement>) => void
	handleBlur: (
		e: FocusEvent<HTMLInputElement | HTMLSelectElement, Element>
	) => void
}

export const SelectTypeFreelancer: React.FC<Props> = ({
	type,
	handleChange,
	handleBlur
}) => {
	return (
		<div>
			<select
				className="flex-1 w-full py-1 px-2 border-0 rounded-md bg-gray-700 text-center cursor-pointer ml-2"
				name="type"
				id="type"
				value={type}
				onChange={handleChange}
				onBlur={handleBlur}
			>
				<option value="">Select a type of freelancer</option>
				{typesOfFreelancers.map((el, index) => {
					return (
						<option key={index} value={el}>
							{el}
						</option>
					)
				})}
			</select>
		</div>
	)
}
