import { IRestaurant } from '@interfaces/restaurant'
import { Meals } from '../cardswrappers/Meals'
import { ScheduleItemLayout } from '../layout/ScheduleItemLayout'
import * as styles from '../../../../constants/mainsectionStyles'

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
		<ScheduleItemLayout
			id={id}
			icon="mdi:food-turkey"
			title={`${title} options`}
			introduction={introduction}
		>
			<Meals restaurants={restaurants} />
		</ScheduleItemLayout>
	)
}
