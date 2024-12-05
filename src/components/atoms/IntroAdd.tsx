import { Icon } from '@iconify/react'
import { IActivity, IMeal, IOvernight } from '@interfaces/project'

interface Props {
	setOpen: (open: boolean) => void
	events: IActivity | IOvernight | IMeal
}

export const IntroAdd: React.FC<Props> = ({ setOpen, events }) => {
	const update = Object.keys(events).includes('intro') && events?.intro !== ''

	const cardClassNames =
		'my-2 rounded-lg cursor-pointer bg-gray-700 text-left w-full p-2 flex items-center justify-between hover:bg-gray-600'
	const headerClassNames =
		'text-sm font-semibold flex items-center hover:bg-gray-600 hover:rounded-lg w-full'
	return (
		<div className={cardClassNames} onClick={() => setOpen(true)}>
			<h2 className={headerClassNames}>
				<Icon
					icon={!update ? 'bi:plus' : 'iconamoon:edit'}
					width="30"
					className="text-orange-700"
				/>
				<span className="uppercase text-cyan-400 ">
					{!update ? ' Add Intro' : ' Edit Intro'}
				</span>
			</h2>
		</div>
	)
}
