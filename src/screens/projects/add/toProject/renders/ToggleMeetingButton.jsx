import { Icon } from '@iconify/react'
import { Button } from '../../../../../ui'

export const ToggleMeetingsButton = ({
	meetingsOpen,
	setMeetingsOpen,
	className
}) => (
	<Button
		type="button"
		handleClick={() => setMeetingsOpen(!meetingsOpen)}
		className={className}
	>
		ADD MEETINGS
		<Icon icon="bi:box-arrow-in-down-right" color="#ea5933" />
	</Button>
)
