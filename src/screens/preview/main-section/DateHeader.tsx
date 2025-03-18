import { IProject } from '@interfaces/project'
import { useCurrentProject } from 'src/hooks'
import { convertDate } from 'src/helper/dates/date-formatters-converters'
import { Icon } from '@iconify/react'

interface Props {
	date: string
	index: number
	arrivalDay: string
}

export const DateHeader = ({ date, index, arrivalDay }: Props) => {
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const { clientAccManager = [] } = currentProject || {}
	const { quoteLanguage = 'EN' } = clientAccManager[0] || {}

	const formattedDate = convertDate(index, arrivalDay, quoteLanguage)

	return (
		<div className="flex items-center justify-between flex-wrap">
			<h2
				className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white-0 flex items-center gap-2 group"
				id={`day_${index}`}
			>
				<Icon
					icon="mdi:calendar-today-outline"
					className="text-orange-500 group-hover:scale-110 transition-transform duration-300"
					width={24}
					height={24}
				/>
				<span className="relative">
					<span className="inline-block">Day {index + 1}</span>
					<span className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-500 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full origin-left"></span>
				</span>
			</h2>
			<div className="text-sm md:text-base bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-lg text-gray-700 dark:text-gray-300 font-medium flex items-center">
				<Icon
					icon="mdi:calendar-clock"
					className="mr-2 text-orange-500"
					width={18}
				/>
				<span>
					{date} - {formattedDate}
				</span>
			</div>
		</div>
	)
}
