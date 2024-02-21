import { RichParagraph } from '@components/atoms/paragraphs/RichParagraph'
import RenderPhotos from '@components/organisms/RenderPhotos'
import { IGift } from '@interfaces/gift'

interface Props {
	gift: IGift
}

export const GiftCard = ({ gift }: Props) => {
	return (
		<div className="flex flex-col">
			<div className="flex items-center">
				<h2 className="font-bold">{gift?.name}</h2>
			</div>
			<RichParagraph text={gift?.textContent} />
			<RenderPhotos images={gift?.imageContentUrl} />
		</div>
	)
}
