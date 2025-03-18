import React, { useMemo } from 'react'
import { RichParagraph } from '@components/atoms/paragraphs/RichParagraph'
import { IEvent } from '@interfaces/event'
import { RenderPhotosCaptions } from '@components/organisms/RenderPhotosCaptions'
import { Icon } from '@iconify/react'

interface Props {
	event: IEvent
	isActive: boolean
}

const EventCard: React.FC<Props> = ({ event, isActive }) => {
	const { imageContentUrl, imageUrlCaptions } = event

	const images = useMemo(() => {
		if (imageUrlCaptions && imageUrlCaptions.length > 0) {
			return imageUrlCaptions
		} else if (imageContentUrl && imageContentUrl.length > 0) {
			return imageContentUrl.map((url) => ({ imageUrl: url, caption: '' }))
		}

		return []
	}, [imageContentUrl, imageUrlCaptions])

	const hasImages = images.length > 0

	return (
		<div
			id={event._id}
			className="bg-white-0 dark:bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-100 dark:border-gray-700"
		>
			{event.textContent && (
				<div className="p-1">
					<RichParagraph text={event.textContent || ''} isActive={isActive} />
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
							Event Photos ({images.length})
						</h4>
					</div>
					<div className="px-1 pb-1">
						<RenderPhotosCaptions images={images} />
					</div>
				</div>
			)}

			<div className="h-1 w-full bg-gradient-to-r from-orange-100/20 via-orange-300/20 to-transparent"></div>
		</div>
	)
}

export default EventCard
