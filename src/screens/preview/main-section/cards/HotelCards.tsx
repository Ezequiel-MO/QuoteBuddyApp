import HotelIcons from '@components/atoms/images/HotelIcons'
import { RichParagraph } from '@components/atoms/paragraphs/RichParagraph'
import { RenderPhotosCaptions } from '@components/organisms/RenderPhotosCaptions'
import { IHotel } from '@interfaces/hotel'
import React, { useEffect, useState } from 'react'
import { useDescription } from 'src/hooks/preview/useDescription'
import { Icon } from '@iconify/react'

interface Props {
	hotel: IHotel
}

export const HotelCards: React.FC<Props> = ({ hotel }) => {
	const [leftIconsText, setLeftIconsText] = useState<string[]>([])
	const [rightIconsText, setRightIconsText] = useState<string[]>([])
	const { description } = useDescription(hotel)

	useEffect(() => {
		const leftIconsTextObj = {
			address: hotel.address,
			restaurants: hotel.restaurants,
			numberRooms: hotel.numberRooms.toString(),
			wifiSpeed: hotel.wifiSpeed
		}

		const rightIconsTextObj = {
			swimmingPool: hotel.swimmingPool,
			checkin_out: hotel.checkin_out,
			meetingRooms: `${hotel.meetingRooms} meeting rooms`,
			wheelChairAccessible: `${hotel.wheelChairAccessible ? 'Yes' : 'No'}`
		}

		const leftIconsTextArr: string[] = Object.values(leftIconsTextObj)
		const rightIconsTextArr: string[] = Object.values(rightIconsTextObj)

		setLeftIconsText(leftIconsTextArr)
		setRightIconsText(rightIconsTextArr)
	}, [hotel])

	const renderStars = (numberStars: number) => {
		return (
			<div className="flex">
				{[...Array(5)].map((_, index) => (
					<Icon
						key={index}
						icon="mdi:star"
						className={`${
							index < numberStars
								? 'text-yellow-400'
								: 'text-gray-300 dark:text-gray-600'
						}`}
						width={20}
						height={20}
					/>
				))}
			</div>
		)
	}

	const hasImages = hotel.imageUrlCaptions?.length > 0

	return (
		<div
			className="bg-white-0 dark:bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-100 dark:border-gray-700 mb-6"
			id={hotel._id}
		>
			{/* Hotel header with name and stars */}
			<div className="p-5 border-b border-gray-100 dark:border-gray-700">
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<Icon
							icon="mdi:hotel-outline"
							className="mr-3 text-orange-500"
							width={24}
							height={24}
						/>
						<h2 className="text-xl font-bold text-gray-800 dark:text-white-0">
							{hotel.name}
						</h2>
					</div>
					<div className="flex items-center">
						{renderStars(hotel.numberStars)}
					</div>
				</div>
			</div>

			{/* Description */}
			{description && (
				<div className="p-1">
					<RichParagraph text={description} truncate={true} maxLines={10} />
				</div>
			)}

			{/* Images */}
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
							Hotel Photos ({hotel.imageUrlCaptions.length})
						</h4>
					</div>
					<div className="px-1 pb-1">
						<RenderPhotosCaptions images={hotel.imageUrlCaptions} />
					</div>
				</div>
			)}

			{/* Amenities and Details */}
			<div className={`${hasImages ? 'mt-4' : 'mt-2'}`}>
				<div className="flex items-center px-5 py-2 border-t border-gray-100 dark:border-gray-700">
					<Icon
						icon="mdi:room-service-outline"
						className="mr-2 text-orange-500"
						width={20}
						height={20}
					/>
					<h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
						Hotel Amenities & Details
					</h4>
				</div>
				<div className="px-4 py-3">
					<HotelIcons
						leftIconsText={leftIconsText}
						rightIconsText={rightIconsText}
					/>
				</div>
			</div>

			<div className="h-1 w-full bg-gradient-to-r from-orange-100/20 via-orange-300/20 to-transparent"></div>
		</div>
	)
}
