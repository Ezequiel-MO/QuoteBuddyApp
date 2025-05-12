import React, { ChangeEvent, useState } from 'react'

type IsVenueFilterProps = {
	isVenue: boolean
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const IsVenueFilter: React.FC<IsVenueFilterProps> = ({
	isVenue,
	handleChange
}) => {
	const [isFocused, setIsFocused] = useState(false)

	return (
		<div className="relative inline-block w-full">
			<label className="flex items-center justify-between mt-2 min-w-[150px] cursor-pointer border border-gray-300 bg-slate-900 text-white-0 rounded-md p-2">
				<span className="mr-2">List Venues</span>
				<input
					type="checkbox"
					id="isVenue"
					name="isVenue"
					checked={isVenue}
					onChange={handleChange}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					className="form-checkbox text-slate-900 bg-gray-700 rounded focus:outline-none"
				/>
			</label>
		</div>
	)
}

export default IsVenueFilter
