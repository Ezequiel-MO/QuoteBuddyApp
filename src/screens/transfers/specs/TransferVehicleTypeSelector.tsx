import { FC, ChangeEvent, FocusEvent } from 'react'

interface TransferVehicleTypeSelectorProps {
	options: string[]
	vehicleType: string
	handleChange: (
		event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void
	errors: { [key: string]: string | undefined }
	handleBlur: (event: FocusEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export const TransferVehicleTypeSelector: FC<
	TransferVehicleTypeSelectorProps
> = ({ options, vehicleType, handleChange, errors, handleBlur }) => {
	return (
		<div>
			<label className="uppercase text-xl text-gray-600 font-bold mr-2">
				Vehicle type
			</label>
			<select
				className="cursor-pointer w-full p-2 border rounded-md bg-gray-700 text-white focus:border-blue-500 focus:outline-none text-white-0"
				name="vehicleType"
				value={vehicleType}
				onChange={handleChange}
				onBlur={handleBlur}
			>
				<option value="">-- Choose an option --</option>
				{options?.map((el, index) => {
					return (
						<option value={el} key={index}>
							{el}
						</option>
					)
				})}
			</select>
			{errors.vehicleType && (
				<p className="mt-1 text-red-500">{errors.vehicleType}</p>
			)}
		</div>
	)
}
