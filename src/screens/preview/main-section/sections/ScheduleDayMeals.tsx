import { IRestaurant } from '@interfaces/restaurant'
import { Meals } from '../cardswrappers/Meals'
import { ScheduleItemLayout } from '../layout/ScheduleItemLayout'
import { Icon } from '@iconify/react'

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
			<div className="py-3 px-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
				<div className="flex items-center text-gray-500 dark:text-gray-400">
					<Icon
						icon="mdi:silverware-fork-knife"
						className="mr-2 text-orange-500"
						width={20}
						height={20}
					/>
					<h3 className="text-sm font-medium">{`No ${title.toLowerCase()} planned`}</h3>
				</div>
			</div>
		) : null
	}

	return (
		<ScheduleItemLayout
			id={id}
			icon="mdi:food-turkey"
			title={`${title} options`}
			introduction={introduction}
		>
			<div className="mt-4">
				<Meals restaurants={restaurants} />
			</div>
		</ScheduleItemLayout>
	)
}
