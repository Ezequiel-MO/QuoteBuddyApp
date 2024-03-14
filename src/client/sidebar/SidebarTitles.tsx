import { Icon } from '@iconify/react'
import { Link } from 'react-scroll'

interface SidebarTitlesProps {
	iconText: string
	title: string
	colorPalette: string[]
	setMenuOpen: (isOpen: boolean) => void
	isSidebarVisible: boolean
}

export const SidebarTitles = ({
	iconText,
	title,
	colorPalette,
	setMenuOpen,
	isSidebarVisible
}: SidebarTitlesProps) => {
	return (
		<Link
			to={`${title}_id`}
			spy={true}
			smooth={true}
			duration={500}
			offset={-100}
			className="flex items-center space-x-2 px-4 rounded-lg cursor-pointer transition-all duration-200 group hover:bg-gray-50 dark:hover:bg-gray-50"
			onMouseEnter={() => setMenuOpen(true)}
			onMouseLeave={() => setMenuOpen(false)}
		>
			<div
				className="flex-shrink-0"
				data-for="main"
				data-tip={title}
				data-iscapture="true"
			>
				<Icon
					icon={iconText}
					color={colorPalette.length > 0 ? colorPalette[2] : '#009E49'}
					width="32"
				/>
			</div>
			{isSidebarVisible && (
				<p className="group-hover:text-orange-50 hidden md:inline-flex text-sm lg:text-base font-body">
					{title?.replace(/^\w/, (c: string) => c.toUpperCase())}
				</p>
			)}
		</Link>
	)
}
