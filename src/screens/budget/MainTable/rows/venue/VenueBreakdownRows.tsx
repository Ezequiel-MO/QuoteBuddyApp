import { useState } from 'react'
import { Icon } from '@iconify/react'
import { IRestaurant } from '../../../../../interfaces'
import { BudgetBreakdownButton } from '@components/atoms/buttons/BudgetBreakdownButton'
import { VenueBreakdownRow } from './VenueBreakdownRow'

interface Props {
	date: string
	id: 'lunch' | 'dinner'
	venue: IRestaurant
	units: number
}

export const VenueBreakdownRows = ({ date, id, venue, units }: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(true)

	const handleToggle = () => {
		setIsOpen(!isOpen)
	}

	return (
		<>
			<BudgetBreakdownButton
				onClick={handleToggle}
				item="Venue"
				isOpen={isOpen}
			/>
			<tr>
				<td colSpan={6} className="p-0bg-[#a9ba9d]">
					<div
						className={`transition-all duration-500 ease-in-out overflow-hidden ${
							isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
						}`}
					>
						<table className="w-full">
							<tbody className="w-full bg-[#a9ba9d] relative">
								<tr>
									<div
										className="absolute inset-0 flex items-center justify-center opacity-50 dark:opacity-20 z-0"
										style={{ pointerEvents: 'none' }}
									>
										<Icon icon="ph:castle-turret-light" width={250} />
									</div>
									<table className="w-full">
										<thead className="text-white-100 bg-zinc-800">
											<tr>
												<td align="left" className="px-6">
													Description
												</td>
												<td align="center">Nr. Units </td>
												<td align="center"></td>
												<td align="center">Unit Cost</td>
												<td align="center">Total Cost</td>
											</tr>
										</thead>
										<tbody className="text-[#000]">
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
											{venue?.venue_price?.notes && (
												<div className="p-6 my-4">
													<span className="uppercase font-bold">Notes :</span>{' '}
													{venue.venue_price?.notes}
												</div>
											)}
										</tbody>
									</table>
								</tr>
							</tbody>
						</table>
					</div>
				</td>
			</tr>
		</>
	)
}
