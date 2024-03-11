import { Icon } from '@iconify/react'
import * as styles from '../../../../constants/mainsectionStyles'
import { RichParagraph } from '@components/atoms/paragraphs/RichParagraph'

interface Props {
	id: string
	icon: string
	title: string
	introduction?: string
	children?: React.ReactNode
}

export const ScheduleItemLayout: React.FC<Props> = ({
	id,
	icon,
	title,
	introduction,
	children
}) => (
	<div id={id} className="page-break-after">
		<div className="flex items-center">
			<Icon icon={icon} className="text-3xl mr-2 text-primary" />
			<h1 className={styles.h1Title}>{title}</h1>
		</div>
		{introduction && <RichParagraph text={introduction} />}
		{children}
	</div>
)
