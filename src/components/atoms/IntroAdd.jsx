import { Icon } from '@iconify/react'

export const IntroAdd = ({ setOpen, events }) => {
	const update = Object.keys(events).includes('intro') && events?.intro !== ''

	const handleClick = () => {
		setOpen(true)
	}

	const cardClassNames =
		'rounded-lg cursor-pointer bg-gray-700 text-left w-full p-4 flex items-center justify-between hover:bg-gray-600'
	const headerClassNames =
		'text-sm font-semibold flex items-center hover:bg-gray-600 hover:rounded-lg w-full'
	return (
		<div className={cardClassNames} onClick={handleClick}>
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
