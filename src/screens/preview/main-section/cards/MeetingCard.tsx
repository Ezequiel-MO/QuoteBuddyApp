import { useState, useEffect } from 'react'
import { RichParagraph } from '@components/atoms/paragraphs/RichParagraph'
import { IImage } from '@interfaces/image'
import { RenderPhotosCaptions } from '@components/organisms/RenderPhotosCaptions'
import { IHotel } from '@interfaces/hotel'


interface Props {
	timing: string
	hotelMeeting: IHotel,
	isActive: boolean
}

export const MeetingCard = ({
	timing,
	hotelMeeting,
	isActive
}: Props) => {

	const [imageUrlCaptions, setImageUrlCaptions] = useState<IImage[]>([])

	useEffect(() => {
		const imageContentUrl = hotelMeeting?.meetingImageContentUrl
		const imageUrlCaptions = hotelMeeting?.meetingImageUrlCaptions
		if (imageUrlCaptions && imageUrlCaptions.length > 0) {
			setImageUrlCaptions(imageUrlCaptions)
		} else {
			const images = imageContentUrl?.map((image, index) => {
				return { imageUrl: image, caption: '' }
			})
			setImageUrlCaptions(images ?? [])
		}
	}, [hotelMeeting])

	return (
		<div id={hotelMeeting._id}>
			{/* <h5 className="text-lg font-semibold mb-2">{`${timing} Hotel Meeting at ${hotelMeeting?.name}`}</h5> */}
			<RichParagraph text={hotelMeeting.meetingDetails.generalComments || ''} isActive={isActive} />
			<RenderPhotosCaptions images={imageUrlCaptions} />
		</div>
	)
}
