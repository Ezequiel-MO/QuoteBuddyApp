import { RichParagraph } from '@components/atoms/paragraphs/RichParagraph'
import * as styles from '../../../../constants/mainsectionStyles'
import { Icon } from '@iconify/react'
import { IHotel } from '@interfaces/hotel'
import { Hotels } from '../cardswrappers/Hotels'

interface Props {
	id: string
	introduction: string
	overnight: IHotel[]
}

export const ScheduleDayOvernight = ({
	id,
	introduction,
	overnight
}: Props) => {
	if (overnight.length === 0) return null
	return (
		<div id={id} className="page-break-after">
			<div className="flex items-center">
				<Icon
					icon="icon-park-outline:hotel-please-clean"
					className="text-2xl mr-2"
				/>
				<h1 className={styles.h1Title}>Accommodation options</h1>
			</div>
			<RichParagraph text={introduction} />
			<Hotels hotels={overnight} />
		</div>
	)
}
