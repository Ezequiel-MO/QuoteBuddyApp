import React from 'react'

interface Props {
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const AddHotelPricesToProject: React.FC<Props> = ({ handleChange }) => {
	return (
		<fieldset className="bg-slate-700 shadow-md rounded-lg p-6">
			<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
				<div className="flex flex-col">
					<label
						htmlFor="DUInr"
						className="text-sm font-semibold text-gray-200"
					>
						Number of DUIs
					</label>
					<input
						id="DUInr"
						name="DUInr"
						onChange={handleChange}
						type="number"
						min="0"
						step=".01"
						className="mt-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div className="flex flex-col">
					<label
						htmlFor="DUIprice"
						className="text-sm font-semibold text-gray-200"
					>
						DUI Price
					</label>
					<input
						id="DUIprice"
						name="DUIprice"
						onChange={handleChange}
						type="number"
						min="0"
						step=".01"
						className="mt-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div className="flex flex-col">
					<label
						htmlFor="DoubleRoomNr"
						className="text-sm font-semibold text-gray-200"
					>
						Number of Double Rooms
					</label>
					<input
						id="DoubleRoomNr"
						name="DoubleRoomNr"
						onChange={handleChange}
						type="number"
						min="0"
						step=".01"
						className="mt-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div className="flex flex-col">
					<label
						htmlFor="DoubleRoomPrice"
						className="text-sm font-semibold text-gray-200"
					>
						Rate per Double Room
					</label>
					<input
						id="DoubleRoomPrice"
						name="DoubleRoomPrice"
						onChange={handleChange}
						type="number"
						min="0"
						step=".01"
						className="mt-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div className="flex flex-col">
					<label
						htmlFor="breakfast"
						className="text-sm font-semibold text-gray-200"
					>
						Breakfast
					</label>
					<input
						id="breakfast"
						name="breakfast"
						onChange={handleChange}
						type="number"
						min="0"
						step=".01"
						className="mt-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div className="flex flex-col">
					<label
						htmlFor="DailyTax"
						className="text-sm font-semibold text-gray-200"
					>
						City Tax
					</label>
					<input
						id="DailyTax"
						name="DailyTax"
						onChange={handleChange}
						type="number"
						min="0"
						step=".01"
						className="mt-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
			</div>
		</fieldset>
	)
}
