import { Icon } from '@iconify/react'

interface Props {
	priority: number
}

export const PriorityDisplay = ({ priority }: Props) => {
	return (
		<div className="flex justify-start align-baseline">
			<Icon
				icon="ic:baseline-priority-high"
				width={25}
				className={` pr-1 ${
					priority > 0 ? ' text-[#c2ea33]' : ' text-slate-400'
				}`}
			/>
			<Icon
				icon="ic:baseline-priority-high"
				width={25}
				className={` pr-1 ${
					priority > 1 ? ' text-[#c2ea33]' : ' text-slate-400'
				}`}
			/>
			<Icon
				icon="ic:baseline-priority-high"
				width={25}
				className={` pr-1 ${
					priority > 2 ? ' text-[#c2ea33]' : ' text-slate-400'
				}`}
			/>
			<Icon
				icon="ic:baseline-priority-high"
				width={25}
				className={` pr-1 ${
					priority > 3 ? ' text-[#c2ea33]' : ' text-slate-400'
				}`}
			/>
			<Icon
				icon="ic:baseline-priority-high"
				width={25}
				className={` pr-1 ${
					priority > 4 ? ' text-[#c2ea33]' : ' text-slate-400'
				}`}
			/>
		</div>
	)
}
