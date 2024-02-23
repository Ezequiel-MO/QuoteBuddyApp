import { IEntertainment } from '@interfaces/entertainment'
import { EntertainmentCard } from '../cards/EntertainmentCard'
import TabbedContent from '@components/molecules/tabs/TabbedContent'

interface Props {
	entertainments: IEntertainment[] | []
	restaurant: string
}

export const EntertainmentCards: React.FC<Props> = ({
	entertainments,
	restaurant
}) => {
	if (entertainments.length === 0) return null

	return (
		<div className="entertainment-cards-container">
			<div className="my-5 text-2xl font-semibold text-white-0 mb-4">
				Entertainment/Shows @ {restaurant}
			</div>
			<TabbedContent
				items={entertainments}
				renderItem={(entertainment) => (
					<EntertainmentCard entertainment={entertainment} />
				)}
				type="entertainment"
			/>
		</div>
	)
}
