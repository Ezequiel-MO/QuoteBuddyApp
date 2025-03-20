import React, { useEffect, useState, useMemo } from 'react'
import { HotelBreakdownRow } from './HotelBreakdownRow'
import { useCurrentProject } from 'src/hooks'
import { Spinner } from 'src/components/atoms/spinner/Spinner'
import { IDay } from '@interfaces/project'

interface HotelBreakdownRowsProps {
	isOpen: boolean
}

export const HotelBreakdownRows: React.FC<HotelBreakdownRowsProps> = ({
	isOpen
}) => {
	const [isLoading, setIsLoading] = useState(false)
	const { currentProject, budget } = useCurrentProject()

	const selectedHotel = budget.selectedHotel
	const schedule: IDay[] = currentProject.schedule || []

	useEffect(() => {
		setIsLoading(true)
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 500)

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
	const dependentUnits = DUInr + 2 * DoubleRoomNr

	return (
		<tr>
			<td colSpan={6} className="p-0 bg-transparent">
				<div
					data-testid="visibility-container"
					className={`transition-all duration-500 ease-in-out overflow-hidden ${
						isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
					}`}
				>
					<div className="mx-4 my-3 bg-blue-900/30 rounded-lg border border-blue-700/40 shadow-inner overflow-hidden backdrop-filter backdrop-blur-sm">
						<table className="w-full text-sm text-gray-300">
							<thead className="bg-blue-900/50 text-white-0">
								<tr>
									<th className="py-3 px-6 text-left font-semibold">
										Description
									</th>
									<th className="py-3 px-4 text-center font-semibold">
										Nr. Units
									</th>
									<th className="py-3 px-4 text-center font-semibold">
										Nr. of Nights
									</th>
									<th className="py-3 px-4 text-center font-semibold">
										Cost per Room per Night
									</th>
									<th className="py-3 px-6 text-center font-semibold">
										Total Cost
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-blue-700/30">
								{isLoading ? (
									<tr>
										<td colSpan={5} className="py-6 text-center">
											<Spinner aria-label="Loading hotel details" />
										</td>
									</tr>
								) : (
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
								)}
							</tbody>
						</table>
					</div>
				</div>
			</td>
		</tr>
	)
}
