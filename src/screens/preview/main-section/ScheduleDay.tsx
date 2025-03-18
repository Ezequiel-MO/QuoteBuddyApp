import { IDay } from '@interfaces/project'
import { DateHeader } from './DateHeader'
import { useScheduleFilter } from './useScheduleFilter'
import DayContentRenderer from './DayContentRenderer'
import { motion } from 'framer-motion' // If framer-motion is available in your project

interface Props {
	day: IDay
	index: number
	suplementaryText: boolean
	arrivalDay: string
}

export const ScheduleDay = ({
	day,
	index,
	suplementaryText,
	arrivalDay
}: Props) => {
	const itemsToRender = useScheduleFilter(day)

	// Motion variants - if framer-motion is not available, you can remove this and the motion.div elements
	const containerVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.4, ease: 'easeOut' }
		}
	}

	const MotionComponent = motion ? motion.div : 'div'

	return (
		<MotionComponent
			className="mb-10 last:mb-0 text-gray-800 dark:text-gray-200 scroll-mt-24"
			id={`${day.date}_id`}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: '-100px' }}
			variants={containerVariants}
		>
			<div className="bg-white-0 dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
				<div className="p-6">
					<DateHeader date={day.date} index={index} arrivalDay={arrivalDay} />
					<div className="mt-6">
						<DayContentRenderer
							items={itemsToRender}
							day={day}
							suplementaryText={suplementaryText}
						/>
					</div>
				</div>
				<div className="h-1 w-full bg-gradient-to-r from-orange-500 via-orange-400 to-transparent"></div>
			</div>
		</MotionComponent>
	)
}
