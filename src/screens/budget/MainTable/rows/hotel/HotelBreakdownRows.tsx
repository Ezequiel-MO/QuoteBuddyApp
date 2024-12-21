import React, { useEffect, useState } from 'react'
import { HotelBreakdownRow } from '.'
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
		setTimeout(() => {
			setIsLoading(false)
		}, 1000)
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

	const numberOfNights = schedule.length - 1

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
				units={DUInr + DoubleRoomNr * 2}
				rate={DailyTax}
				nights={numberOfNights}
				title="City Tax"
			/>
			{breakfast > 0 && (
				<HotelBreakdownRow
					units={DUInr + DoubleRoomNr * 2}
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
					className={`transition-all duration-500 ease-in-out overflow-hidden ${
						isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
					}`}
				>
					<table className="w-full">
						<tbody className="w-full bg-white-100 dark:bg-[#a9ba9d] relative">
							<tr>
								<td colSpan={6} className="p-0 bg-transparent">
									{isLoading ? (
										<div className="flex items-center justify-center  dark:opacity-20 z-0 pointer-events-none">
											<Spinner aria-label="Loading hotel details" />
										</div>
									) : (
										<table className="w-full">
											<thead className="text-white-100 bg-zinc-800">
												<tr>
													<td align="center">Description</td>
													<td align="center">Nr. Units</td>
													<td align="center">Nr. of Nights</td>
													<td align="center">Cost per Room per Night</td>
													<td align="center">Total Cost</td>
												</tr>
											</thead>
											<tbody className="text-[#000]">
												{renderBreakdownRows()}
											</tbody>
										</table>
									)}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</td>
		</tr>
	)
}
