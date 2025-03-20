import React from 'react'
import { IProject } from '@interfaces/project'
import { useCurrentProject } from '../../../../hooks'
import { IClientCompany } from '../../../../interfaces'

export const BudgetTableHead: React.FC = () => {
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const { clientCompany } = currentProject as {
		clientCompany: IClientCompany[]
	}
	const { colorPalette = [] } = (clientCompany && clientCompany[0]) || {}

	// Default colors if company colors aren't available
	const primaryColor =
		colorPalette?.length > 0 ? `${colorPalette[0]}` : '#3B82F6'
	const secondaryColor =
		colorPalette?.length > 1 ? `${colorPalette[1]}` : '#172B4D'

	const headerClasses =
		'py-5 px-4 text-left font-semibold tracking-wider text-white-0 border-b border-gray-600/80 whitespace-nowrap backdrop-blur-sm'

	return (
		<tr
			className="shadow-lg"
			style={{
				background: `linear-gradient(to right, ${secondaryColor}EE, ${secondaryColor}99)`
			}}
		>
			<th
				className={`${headerClasses} rounded-tl-lg w-[10%] font-bold text-blue-100`}
			>
				Date
			</th>
			<th className={`${headerClasses} w-[18%] font-bold text-blue-100`}>
				Event Type
			</th>
			<th className={`${headerClasses} w-[32%] font-bold text-blue-100`}>
				Service
			</th>
			<th className={`${headerClasses} w-[12%]`}>
				<div className="flex items-center space-x-2 text-blue-100 font-bold">
					<span>Pax/Units</span>
					<svg
						className="w-4 h-4 text-blue-300"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
					</svg>
				</div>
			</th>
			<th className={`${headerClasses} w-[14%]`}>
				<div className="flex items-center space-x-2 text-blue-100 font-bold">
					<span>Unit Cost w/VAT</span>
					<svg
						className="w-4 h-4 text-blue-300"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979a1 1 0 001.715-1.029C12.279 4.784 11.232 4 10 4s-2.279.784-2.979 1.95a1 1 0 001.715 1.029zM6 12a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm7.25-3a.75.75 0 100-1.5.75.75 0 000 1.5zM6.75 9a.75.75 0 100-1.5.75.75 0 000 1.5zM8 9.75a.75.75 0 100-1.5.75.75 0 000 1.5zm3.25.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
			</th>
			<th className={`${headerClasses} rounded-tr-lg w-[14%]`}>
				<div className="flex items-center space-x-2 text-blue-100 font-bold">
					<span>Total Cost w/VAT</span>
					<svg
						className="w-4 h-4 text-blue-300"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
			</th>
		</tr>
	)
}
