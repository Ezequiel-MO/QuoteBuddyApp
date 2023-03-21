import { Icon } from '@iconify/react'

export const MeetingType = ({ onClick, label, hasMeetings }) => (
	<div
		onClick={onClick}
		className="indent-3 w-[350px] hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer flex items-center justify-start"
	>
		{label}
		<span className={`${hasMeetings ? 'block' : 'hidden'}`}>
			<Icon icon="ci:download-done" color="lime" />
		</span>
	</div>
)
