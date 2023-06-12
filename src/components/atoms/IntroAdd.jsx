import { Icon } from '@iconify/react'

export const IntroAdd = ({setOpen }) => {
	const handleClick = () =>{
		setOpen(true)
    }
	const cardClassNames =
		'rounded-lg cursor-pointer border border-transparent bg-[#000] text-left w-[280px] flex items-center active:scale-95 active:transition active:duration-150 active:ease-in-out'
	const headerClassNames =
		'text-sm font-semibold flex items-center hover:bg-gray-600 hover:rounded-lg w-full'
	return (
		<div className={cardClassNames} onClick={handleClick}>
			<h2 className={headerClassNames}>
				<Icon icon="bi:plus" width="30" className="text-orange-700" />
				<span className="uppercase text-cyan-400 ">Add Intro</span>
			</h2>
		</div>
	)
}