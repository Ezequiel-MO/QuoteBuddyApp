import { IGift } from '@interfaces/gift'
import { GiftCard } from '../cards/GiftCard'
import TabbedContent from '@components/molecules/tabs/TabbedContent'

interface Props {
	gifts: IGift[] | []
}

export const Gifts = ({ gifts }: Props) => {
	return (
		<div className="flex flex-wrap page-break-after" id="gifts_id">
			<TabbedContent
				items={gifts}
				renderItem={(gift) => <GiftCard gift={gift} />}
				type="gift"
			/>
		</div>
	)
}
