import { RichParagraph } from '@components/atoms/paragraphs/RichParagraph'
import { IRestaurant } from '@interfaces/restaurant'
import { EntertainmentCards } from '../cardswrappers/Entertainment'
import { RenderPhotosCaptions } from '@components/organisms/RenderPhotosCaptions'
import { useMemo } from 'react'

interface Props {
	restaurant: IRestaurant
}

export const RestaurantCard = ({ restaurant }: Props) => {
	const { imageContentUrl, imageUrlCaptions } = restaurant

	const images = useMemo(() => {
		if (imageUrlCaptions && imageUrlCaptions.length > 0) {
			return imageUrlCaptions
		} else if (imageContentUrl && imageContentUrl.length > 0) {
			return imageContentUrl.map((url) => ({ imageUrl: url, caption: '' }))
		}

		return []
	}, [imageContentUrl, imageUrlCaptions])

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
