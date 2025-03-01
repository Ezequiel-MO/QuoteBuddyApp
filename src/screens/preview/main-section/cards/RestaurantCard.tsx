import { RichParagraph } from '@components/atoms/paragraphs/RichParagraph'
import { IRestaurant } from '@interfaces/restaurant'
import { EntertainmentCards } from '../cardswrappers/Entertainment'
import { RenderPhotosCaptions } from '@components/organisms/RenderPhotosCaptions'

interface Props {
	restaurant: IRestaurant
}

export const RestaurantCard = ({ restaurant }: Props) => {
	const imageContentUrl = restaurant.imageContentUrl
	const imageUrlCaptions = restaurant.imageUrlCaptions
	let images
	//check if imageContentUrl is not empty
	if (imageContentUrl) {
		//convert each item of imageContentUrl to an object with imageUrl and caption
		images = imageContentUrl.map((image, index) => {
			return { imageUrl: image, caption: '' }
		})
	}
	//if imageUrlCaptions is not empty, use it
	else if (imageUrlCaptions) {
		images = imageUrlCaptions
	}
	return (
		<div id={restaurant._id}>
			<RichParagraph text={restaurant.textContent || ''} />
			<RenderPhotosCaptions images={images || []} />
			<EntertainmentCards
				entertainments={restaurant.entertainment || []}
				restaurant={restaurant.name}
			/>
		</div>
	)
}
