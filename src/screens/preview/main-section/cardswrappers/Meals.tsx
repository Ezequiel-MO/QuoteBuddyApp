import { IRestaurant } from '@interfaces/restaurant'
import { RestaurantCard } from '../cards/RestaurantCard'
import TabbedContent from '@components/molecules/tabs/TabbedContent'

interface Props {
	restaurants: IRestaurant[]
}

export const Meals = ({ restaurants }: Props) => {
	return (
		<div className="flex flex-wrap">
			<TabbedContent
				items={restaurants}
				renderItem={(restaurant, index, isActive) => (
					<RestaurantCard restaurant={restaurant} isActive={isActive} />
				)}
				type="restaurant"
			/>
		</div>
	)
}
