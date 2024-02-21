import { RichParagraph } from '@components/atoms/paragraphs/RichParagraph'
import RenderPhotos from '@components/organisms/RenderPhotos'
import { IEntertainment } from '@interfaces/entertainment'

interface Props {
	entertainment: IEntertainment
}

export const EntertainmentCard = ({ entertainment }: Props) => {
	const textContent = entertainment.textContent || ''
	const imageContentUrl = entertainment.imageContentUrl || []
	return (
		<div className="flex flex-col">
			<RichParagraph text={textContent} />
			<RenderPhotos images={imageContentUrl} />
		</div>
	)
}
