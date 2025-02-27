import { RichParagraph } from '@components/atoms/paragraphs/RichParagraph'
import { IRestaurant } from '@interfaces/restaurant'
import { EntertainmentCards } from '../cardswrappers/Entertainment'
import { RenderPhotosCaptions } from '@components/organisms/RenderPhotosCaptions'

interface Props {
	restaurant: IRestaurant
}

export const RestaurantCard = ({ restaurant }: Props) => {
	return (
		<div id={restaurant._id}>
			<RichParagraph text={restaurant.textContent || ''} />
			<RenderPhotosCaptions images={restaurant.imageUrlCaptions || []} />
			<EntertainmentCards
				entertainments={restaurant.entertainment || []}
				restaurant={restaurant.name}
			/>
		</div>
	)
}
