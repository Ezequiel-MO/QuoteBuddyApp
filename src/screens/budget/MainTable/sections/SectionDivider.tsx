import React from 'react'

interface SectionDividerProps {
	title: string
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ title }) => {
	return (
		<tr className="group">
			<td colSpan={6} className="p-0">
				<div className="bg-gradient-to-r from-gray-700/90 via-gray-600/90 to-gray-700/90 py-4 px-6 border-y border-gray-500/50 backdrop-blur-sm">
					<div className="flex items-center space-x-3">
						<svg
							className="w-5 h-5 text-blue-300 group-hover:text-blue-200 transition-all duration-300 transform group-hover:scale-110"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
								clipRule="evenodd"
							/>
						</svg>
						<h3 className="font-semibold text-xl text-white-0 group-hover:text-blue-200 transition-colors duration-200 tracking-wide">
							{title}
						</h3>
					</div>
				</div>
			</td>
		</tr>
	)
}
