import { RichParagraph } from '@components/atoms/paragraphs/RichParagraph'
import RenderPhotos from '@components/organisms/RenderPhotos'
import { IRestaurant } from '@interfaces/restaurant'
import { EntertainmentCards } from '../cardswrappers/Entertainment'

interface Props {
	restaurant: IRestaurant
}

export const RestaurantCard = ({ restaurant }: Props) => {
	return (
		<div id={restaurant._id}>
			<RichParagraph text={restaurant.textContent || ''} />
			<RenderPhotos images={restaurant.imageContentUrl || []} />
			<EntertainmentCards
				entertainments={restaurant.entertainment || []}
				restaurant={restaurant.name}
			/>
		</div>
	)
}
