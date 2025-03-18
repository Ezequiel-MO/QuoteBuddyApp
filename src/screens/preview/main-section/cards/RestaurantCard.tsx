import { RichParagraph } from '@components/atoms/paragraphs/RichParagraph'
import { IRestaurant } from '@interfaces/restaurant'
import { EntertainmentCards } from '../cardswrappers/Entertainment'
import { RenderPhotosCaptions } from '@components/organisms/RenderPhotosCaptions'
import { useMemo } from 'react'
import { Icon } from '@iconify/react'

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

	const hasImages = images.length > 0
	const hasEntertainment = (restaurant.entertainment ?? []).length > 0

	return (
		<div
			id={restaurant._id}
			className="bg-white-0 dark:bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-100 dark:border-gray-700 mb-6"
		>
			{restaurant.textContent && (
				<div className="p-1">
					<RichParagraph text={restaurant.textContent || ''} />
				</div>
			)}

			{hasImages && (
				<div className="mt-2">
					<div className="flex items-center px-5 py-2 border-t border-gray-100 dark:border-gray-700">
						<Icon
							icon="mdi:image-multiple-outline"
							className="mr-2 text-orange-500"
							width={20}
							height={20}
						/>
						<h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
							Restaurant Photos ({images.length})
						</h4>
					</div>
					<div className="px-1 pb-1">
						<RenderPhotosCaptions images={images} />
					</div>
				</div>
			)}

			{hasEntertainment && (
				<div className={hasImages ? 'mt-4' : 'mt-2'}>
					<div className="flex items-center px-5 py-2 border-t border-gray-100 dark:border-gray-700">
						<Icon
							icon="mdi:party-popper"
							className="mr-2 text-orange-500"
							width={20}
							height={20}
						/>
						<h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
							Entertainment Options
						</h4>
					</div>
					<div className="px-4 py-2">
						<EntertainmentCards
							entertainments={restaurant.entertainment || []}
							restaurant={restaurant.name}
						/>
					</div>
				</div>
			)}

			<div className="h-1 w-full bg-gradient-to-r from-orange-100/20 via-orange-300/20 to-transparent"></div>
		</div>
	)
}
