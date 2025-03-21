import React from 'react'
import { Icon } from '@iconify/react'

interface SectionDividerProps {
	title: string
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ title }) => {
	return (
		<tr className="group">
			<td colSpan={6} className="p-0">
				<div className="bg-gradient-to-r from-gray-700/90 via-gray-600/90 to-gray-700/90 py-4 px-6 border-y border-gray-500/50 backdrop-blur-sm shadow-md">
					<div className="flex items-center space-x-3">
						<Icon
							icon="material-symbols:calendar-month"
							className="w-5 h-5 text-blue-300 group-hover:text-blue-200 transition-all duration-300"
						/>
						<h3 className="font-semibold text-xl text-white-0 group-hover:text-blue-200 transition-colors duration-200 tracking-wide">
							{title}
						</h3>
					</div>
				</div>
			</td>
		</tr>
	)
}
