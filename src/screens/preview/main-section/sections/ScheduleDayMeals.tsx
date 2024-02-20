import { RichParagraph } from '@components/atoms/paragraphs/RichParagraph'
import * as styles from '../../../../constants/mainsectionStyles'
import { Icon } from '@iconify/react'
import { IRestaurant } from '@interfaces/restaurant'

interface Props {
	id: string
	title: string
	restaurants: IRestaurant[]
	introduction: string
	suplementaryText: boolean
}

export const ScheduleDayMeals = ({
	id,
	title,
	restaurants,
	introduction,
	suplementaryText
}: Props) => {
	if (!restaurants?.length) {
		return suplementaryText ? (
			<h3
				className={styles.supplemmentaryText}
			>{`No ${title.toLowerCase()} planned`}</h3>
		) : null
	}
	return (
		<div id={id} className="page-break-after">
			<div className="flex items-center">
				<Icon icon="mdi:food-turkey" className="text-2xl mr-2" />
				<h1 className={styles.h1Title}>{title} options</h1>
			</div>
			<RichParagraph text={introduction} />
			{/* <Meals restaurants={restaurants} /> */}
		</div>
	)
}
