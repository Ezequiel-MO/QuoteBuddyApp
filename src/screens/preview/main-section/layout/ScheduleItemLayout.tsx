import { Icon } from '@iconify/react'
import { RichParagraph } from '@components/atoms/paragraphs/RichParagraph'

interface Props {
	id: string
	icon: string
	title: string
	introduction?: string
	children?: React.ReactNode
	iconClasses?: string
	titleClasses?: string
	containerClasses?: string
}

export const ScheduleItemLayout: React.FC<Props> = ({
	id,
	icon,
	title,
	introduction,
	children,
	iconClasses = 'text-orange-500 text-3xl mr-3 group-hover:scale-110 transition-transform duration-300',
	titleClasses = 'text-lg md:text-xl font-bold text-gray-800 dark:text-white-0',
	containerClasses = ''
}) => (
	<div id={id} className={`page-break-after ${containerClasses}`}>
		<div className="flex items-center group">
			<Icon icon={icon} className={iconClasses} />
			<h1 className={titleClasses}>{title}</h1>
		</div>
		{introduction && (
			<div className="mt-3 text-gray-700 dark:text-gray-300 prose prose-sm max-w-none dark:prose-invert">
				<RichParagraph text={introduction} />
			</div>
		)}
		<div className="mt-4">{children}</div>
	</div>
)
