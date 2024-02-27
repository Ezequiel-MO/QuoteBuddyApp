import { HotelBreakdownRow } from '.'
import { Icon } from '@iconify/react'
import { useContextBudget } from '../../../context/BudgetContext'

interface Props {
	isOpen: boolean
}

export const HotelBreakdownRows = ({ isOpen }: Props) => {
	const { state } = useContextBudget()
	if (!state.selectedHotel) return null

	const {
		DUInr = 0,
		DUIprice = 0,
		DoubleRoomNr = 0,
		DoubleRoomPrice = 0,
		DailyTax = 0,
		breakfast = 0
	} = state.selectedHotel.price[0]

	return (
		<>
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
										<div
											className="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-20 z-0"
											style={{ pointerEvents: 'none' }}
										>
											<Icon icon="ic:twotone-local-hotel" width={300} />
										</div>
										<table className="w-full">
											<thead className="text-white-100 bg-zinc-800">
												<tr>
													<td align="center">Description</td>
													<td align="center">Nr. Units </td>
													<td align="center">Nr. of nights </td>
													<td align="center">Cost per room per night</td>
													<td align="center">Total Cost</td>
												</tr>
											</thead>
											<tbody className="text-[#000]">
												<HotelBreakdownRow
													units={DUInr}
													rate={DUIprice}
													nights={state.schedule.length - 1}
													title="Double Room Single Use"
												/>
												<HotelBreakdownRow
													units={DoubleRoomNr}
													rate={DoubleRoomPrice}
													nights={state.schedule.length - 1}
													title="Double Room //Twin Room"
												/>
												<HotelBreakdownRow
													units={DUInr + DoubleRoomNr * 2}
													rate={DailyTax}
													nights={state.schedule.length - 1}
													title="City Tax"
												/>
												{breakfast ? (
													<HotelBreakdownRow
														units={DUInr + DoubleRoomNr * 2}
														rate={breakfast}
														nights={state.schedule.length - 1}
														title="Breakfast"
													/>
												) : null}
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</td>
			</tr>
		</>
	)
}
