import { IEntertainment, IRestaurant } from '../../../../../interfaces'
import { Icon } from '@iconify/react'
import { EntertainmentBreakdownRow } from './EntertainmentBreakdownRow'

interface Props {
	entertainment: IEntertainment
	isOpen: boolean
	date: string
	selectedRestaurant: IRestaurant
	typeMeal: 'lunch' | 'dinner'
	setEntertainment: React.Dispatch<React.SetStateAction<IEntertainment>>
}

export const EntertainmentBreakdownRows = ({
	entertainment,
	isOpen,
	date,
	selectedRestaurant,
	setEntertainment,
	typeMeal
}: Props) => {
	return (
		<tr>
			<td colSpan={6} className="p-0 bg-transparent">
				<div
					className={`transition-all duration-700 ease-in-out overflow-hidden ${
						isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
					}`}
				>
					<div className="mx-4 my-3 bg-indigo-900/20 rounded-lg border border-indigo-700/30 shadow-inner overflow-hidden backdrop-filter backdrop-blur-sm relative">
						{/* Background Icon */}
						<div
							className="absolute inset-0 flex items-center justify-center opacity-10"
							style={{ pointerEvents: 'none' }}
							aria-hidden="true"
						>
							<Icon icon="icon-park-outline:entertainment" width={240} />
						</div>

						<table className="w-full">
							<thead className="bg-indigo-900/40 text-white-0">
								<tr>
									<th className="py-3 px-6 text-left font-semibold tracking-wide">
										Description
									</th>
									<th className="py-3 px-4 text-center font-semibold tracking-wide"></th>
									<th className="py-3 px-4 text-center"></th>
									<th className="py-3 px-4 text-center font-semibold tracking-wide"></th>
									<th className="py-3 px-6 text-center font-semibold tracking-wide">
										Cost
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-indigo-700/30 text-gray-300">
								<EntertainmentBreakdownRow
									title="Artist Fee"
									date={date}
									entertaiment={entertainment}
									keyEntertainmentPrice="artistsFee"
									selectedRestaurant={selectedRestaurant}
									typeMeal={typeMeal}
									setEntertainment={setEntertainment}
								/>
								<EntertainmentBreakdownRow
									title="AudioVisuals"
									date={date}
									entertaiment={entertainment}
									keyEntertainmentPrice="aavv"
									selectedRestaurant={selectedRestaurant}
									typeMeal={typeMeal}
									setEntertainment={setEntertainment}
								/>
								<EntertainmentBreakdownRow
									title="Lighting"
									date={date}
									entertaiment={entertainment}
									keyEntertainmentPrice="lighting"
									selectedRestaurant={selectedRestaurant}
									typeMeal={typeMeal}
									setEntertainment={setEntertainment}
								/>
								<EntertainmentBreakdownRow
									title="Travel Allowance"
									date={date}
									entertaiment={entertainment}
									keyEntertainmentPrice="travelAllowance"
									selectedRestaurant={selectedRestaurant}
									typeMeal={typeMeal}
									setEntertainment={setEntertainment}
								/>
								<EntertainmentBreakdownRow
									title="Meal Allowance"
									date={date}
									entertaiment={entertainment}
									keyEntertainmentPrice="mealAllowance"
									selectedRestaurant={selectedRestaurant}
									typeMeal={typeMeal}
									setEntertainment={setEntertainment}
								/>
								<EntertainmentBreakdownRow
									title="TOTAL COST"
									date={date}
									entertaiment={entertainment}
									keyEntertainmentPrice="other"
									selectedRestaurant={selectedRestaurant}
									typeMeal={typeMeal}
									setEntertainment={setEntertainment}
								/>

								{/* Show additional details if available */}
								{(entertainment.nrArtists || entertainment.duration) && (
									<tr className="bg-indigo-800/10 hover:bg-indigo-800/20 transition-colors duration-150">
										<td colSpan={5} className="p-4">
											<div className="flex items-start bg-indigo-500/10 p-3 rounded-md border border-indigo-500/20">
												<Icon
													icon="mdi:information-outline"
													className="mr-2 text-indigo-400 mt-1 flex-shrink-0"
													width={18}
												/>
												<div>
													<span className="uppercase font-bold text-indigo-400">
														Details:{' '}
													</span>
													<span className="text-gray-300">
														{entertainment.nrArtists &&
															`${entertainment.nrArtists} artists`}
														{entertainment.nrArtists &&
															entertainment.duration &&
															', '}
														{entertainment.duration &&
															`${entertainment.duration} duration`}
														{entertainment.category &&
															` • Category: ${entertainment.category}`}
													</span>
												</div>
											</div>
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</td>
		</tr>
	)
}
