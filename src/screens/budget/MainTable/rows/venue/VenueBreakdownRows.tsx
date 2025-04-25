import { useState } from 'react'
import { Icon } from '@iconify/react'
import { IRestaurant } from '../../../../../interfaces'
import { Button } from '@components/atoms/buttons/Button'
import { ArrowIcon } from '@components/atoms/ArrowIcon'
import { VenueBreakdownRow } from './VenueBreakdownRow'

interface Props {
	date: string
	id: 'lunch' | 'dinner'
	venue: IRestaurant
	units: number
}

export const VenueBreakdownRows = ({ date, id, venue }: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(true)

	const handleToggle = () => {
		setIsOpen(!isOpen)
	}

	return (
		<>
			{/* Toggle Button Row */}
			<tr className="breakdown-row w-full bg-gradient-to-r from-blue-900/10 to-blue-800/20 hover:from-blue-900/20 hover:to-blue-800/30 transition-colors duration-150">
				<td
					colSpan={6}
					className="p-0 bg-transparent border-t border-gray-700/20"
				>
					<Button
						id="venue-details"
						handleClick={handleToggle}
						className="text-gray-300 rounded-md px-4 py-2 transition duration-200 ease-in-out hover:text-white-0 flex items-center space-x-2"
						aria-expanded={isOpen}
						aria-controls="venue-breakdown-content"
					>
						<Icon icon="mdi:building" className="mr-2 text-yellow-500" />
						<span>{isOpen ? `Hide Venue Details` : `Show Venue Details`}</span>
						<ArrowIcon open={isOpen} />
					</Button>
				</td>
			</tr>

			{/* Expandable Content Row */}
			<tr>
				<td colSpan={6} className="p-0 bg-transparent">
					<div
						id="venue-breakdown-content"
						className={`transition-all duration-500 ease-in-out overflow-hidden ${
							isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
						}`}
						aria-hidden={!isOpen}
					>
						<div className="mx-4 my-3 bg-blue-900/20 rounded-lg border border-blue-700/30 shadow-inner overflow-hidden backdrop-filter backdrop-blur-sm relative">
							{/* Background Icon */}
							<div
								className="absolute inset-0 flex items-center justify-center opacity-10"
								style={{ pointerEvents: 'none' }}
								aria-hidden="true"
							>
								<Icon icon="ph:castle-turret-light" width={250} />
							</div>

							<table className="w-full">
								<thead className="bg-blue-900/40 text-white-0">
									<tr className="breakdown-row">
										<th className="py-3 px-6 text-left font-semibold tracking-wide">
											Description
										</th>
										<th className="py-3 px-4 text-center font-semibold tracking-wide">
											Nr. Units
										</th>
										<th className="py-3 px-4 text-center"></th>
										<th className="py-3 px-4 text-center font-semibold tracking-wide">
											Unit Cost
										</th>
										<th className="py-3 px-6 text-center font-semibold tracking-wide">
											Total Cost
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-blue-700/30">
									<VenueBreakdownRow
										units={1}
										title="Full Day Rental Rate"
										rate={venue.venue_price?.rental || 0}
										date={date}
										id={id}
										restaurantId={venue._id}
										keyVenueUnit="unit"
										keyVenuePrice="rental"
									/>
									<VenueBreakdownRow
										units={venue.venue_price?.cocktail_units || 0}
										title="Cocktail Reception"
										rate={venue.venue_price?.cocktail_price || 0}
										date={date}
										id={id}
										restaurantId={venue._id}
										keyVenueUnit="cocktail_units"
										keyVenuePrice="cocktail_price"
									/>
									<VenueBreakdownRow
										units={venue.venue_price?.catering_units || 0}
										title="Course Menu"
										rate={venue.venue_price?.catering_price || 0}
										date={date}
										id={id}
										restaurantId={venue._id}
										keyVenueUnit="catering_units"
										keyVenuePrice="catering_price"
									/>
									<VenueBreakdownRow
										units={1}
										title="Audiovisual Equipment"
										rate={venue.venue_price?.audiovisuals || 0}
										date={date}
										id={id}
										restaurantId={venue._id}
										keyVenueUnit="unit"
										keyVenuePrice="audiovisuals"
									/>
									<VenueBreakdownRow
										units={1}
										title="Cleaning"
										rate={venue.venue_price?.cleaning || 0}
										date={date}
										id={id}
										restaurantId={venue._id}
										keyVenueUnit="unit"
										keyVenuePrice="cleaning"
									/>
									<VenueBreakdownRow
										units={1}
										title="Security"
										rate={venue.venue_price?.security || 0}
										date={date}
										id={id}
										restaurantId={venue._id}
										keyVenueUnit="unit"
										keyVenuePrice="security"
									/>
									<VenueBreakdownRow
										units={1}
										title="Entertainment"
										rate={venue.venue_price?.entertainment || 0}
										date={date}
										id={id}
										restaurantId={venue._id}
										keyVenueUnit="unit"
										keyVenuePrice="entertainment"
									/>
									<VenueBreakdownRow
										units={venue.venue_price?.staff_units || 0}
										title="Staff Meals"
										rate={venue.venue_price?.staff_menu_price || 0}
										date={date}
										id={id}
										restaurantId={venue._id}
										keyVenueUnit="staff_units"
										keyVenuePrice="staff_menu_price"
									/>

									{/* Venue Notes */}
									{venue?.venue_price?.notes && (
										<tr className="bg-blue-800/10 hover:bg-blue-800/20 transition-colors duration-150">
											<td colSpan={5} className="p-4">
												<div className="flex items-start bg-yellow-500/10 p-3 rounded-md border border-yellow-500/20">
													<Icon
														icon="mdi:note-text"
														className="mr-2 text-yellow-400 mt-1 flex-shrink-0"
														width={18}
													/>
													<div>
														<span className="uppercase font-bold text-yellow-400">
															Notes:{' '}
														</span>
														<span className="text-gray-300">
															{venue.venue_price?.notes}
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
		</>
	)
}
