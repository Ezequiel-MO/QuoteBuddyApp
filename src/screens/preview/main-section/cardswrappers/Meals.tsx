import { TabContent } from '@components/atoms/tabs/TabContent'
import { TabList } from '@components/molecules/tabs/TabList'
import { IRestaurant } from '@interfaces/restaurant'
import { useState, useMemo } from 'react'
import { RestaurantCard } from '../cards/RestaurantCard'

interface Props {
	restaurants: IRestaurant[]
}

export const Meals = ({ restaurants }: Props) => {
	const [openTab, setOpenTab] = useState<number>(1)

	const restaurantListItems = useMemo(
		() =>
			restaurants.map((restaurant) => {
				const { _id, name } = restaurant
				return { _id, name }
			}),
		[restaurants]
	)

	return (
		<>
			<div className="flex flex-wrap">
				<div className="w-full">
					<TabList
						tabListItems={restaurantListItems}
						type="restaurant"
						activeTab={openTab}
						setActiveTab={setOpenTab}
						onTabClick={function (id: string): void {
							console.log('tab list from meals')
						}}
					/>

					<div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded">
						<div className="py-5 flex-auto">
							<div className="tab-content tab-space">
								{restaurants.map((restaurant, index) => (
									<TabContent key={index} activeTab={openTab} index={index}>
										<RestaurantCard restaurant={restaurant} />
									</TabContent>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
