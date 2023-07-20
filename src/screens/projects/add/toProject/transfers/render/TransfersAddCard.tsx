import { Icon } from '@iconify/react'
import { FC } from 'react'
import { useTransfers } from './context'

export const TransfersAddCard: FC = () => {
	const { setOpen } = useTransfers()
	let update = false
	const cardClassNames =
		'rounded-lg cursor-pointer border border-transparent bg-[#000] text-left w-[280px] flex items-center active:scale-95 active:transition active:duration-150 active:ease-in-out'
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
				<span className="uppercase text-[#fff] ">
					{!update ? ' Add Transfer In' : ' Edit Transfer In'}
				</span>
			</h2>
		</div>
	)
}
