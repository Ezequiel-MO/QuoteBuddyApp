// HotelBreakdownRows.tsx

import React, { useEffect, useState } from 'react'
import { HotelBreakdownRow } from './HotelBreakdownRow'
import { useCurrentProject } from 'src/hooks'
import { Spinner } from 'src/components/atoms/spinner/Spinner'
import { IDay } from '@interfaces/project'

interface Props {
	isOpen: boolean
}

export const HotelBreakdownRows: React.FC<Props> = ({ isOpen }) => {
	const [isLoading, setIsLoading] = useState(false)
	const { currentProject, budget } = useCurrentProject()

	const selectedHotel = budget.selectedHotel
	const schedule: IDay[] = currentProject.schedule || []

	useEffect(() => {
		setIsLoading(true)
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 500) // Adjust as needed for loading simulation

		return () => clearTimeout(timer)
	}, [selectedHotel?._id])

	if (!selectedHotel) {
		return null
	}

	const { price } = selectedHotel
	if (!price || price.length === 0) {
		return null
	}

	const {
		DUInr = 0,
		DUIprice = 0,
		DoubleRoomNr = 0,
		DoubleRoomPrice = 0,
		DailyTax = 0,
		breakfast = 0
	} = price[0]

	const numberOfNights = schedule.length > 1 ? schedule.length - 1 : 0

	// Calculate dependent units
	const dependentUnits = DUInr + 2 * DoubleRoomNr

	const renderBreakdownRows = () => (
		<>
			<HotelBreakdownRow
				units={DUInr}
				rate={DUIprice}
				nights={numberOfNights}
				title="Double Room Single Use"
			/>
			<HotelBreakdownRow
				units={DoubleRoomNr}
				rate={DoubleRoomPrice}
				nights={numberOfNights}
				title="Double Room // Twin Room"
			/>
			<HotelBreakdownRow
				units={dependentUnits}
				rate={DailyTax}
				nights={numberOfNights}
				title="City Tax"
			/>
			{breakfast > 0 && (
				<HotelBreakdownRow
					units={dependentUnits}
					rate={breakfast}
					nights={numberOfNights}
					title="Breakfast"
				/>
			)}
		</>
	)

	return (
		<tr>
			<td colSpan={6} className="p-0 bg-transparent">
				<div
					data-testid="visibility-container"
					className={`transition-all duration-500 ease-in-out overflow-hidden ${
						isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
					}`}
				>
					<table className="w-full text-sm text-gray-300">
						<thead className="bg-zinc-700 text-white-0">
							<tr>
								<th className="py-3 px-4 text-left">Description</th>
								<th className="py-3 px-4 text-center">Nr. Units</th>
								<th className="py-3 px-4 text-center">Nr. of Nights</th>
								<th className="py-3 px-4 text-center">
									Cost per Room per Night
								</th>
								<th className="py-3 px-4 text-center">Total Cost</th>
							</tr>
						</thead>
						<tbody className="bg-cyan-800">
							{isLoading ? (
								<tr>
									<td colSpan={5} className="py-6 text-center">
										<Spinner aria-label="Loading hotel details" />
									</td>
								</tr>
							) : (
								renderBreakdownRows()
							)}
						</tbody>
					</table>
				</div>
			</td>
		</tr>
	)
}
