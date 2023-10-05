// Breadcrumbs.tsx
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export const Breadcrumbs: React.FC = () => {
	const location = useLocation()
	let currentLink = ''

	const crumbs = location.pathname
		.split('/')
		.filter((crumb) => crumb !== '')
		.map((crumb, index, array) => {
			currentLink += `/${crumb}`
			return (
				<div key={`${crumb}-${index}`} className="flex items-center">
					<Link to={currentLink} className="text-white-0 hover:underline">
						{crumb}
					</Link>
					{index !== array.length - 1 && (
						<span className="mx-2 text-white-0">/</span>
					)}
				</div>
			)
		})

	return (
		<div className="flex flex-row items-center mt-3 font-semibold text-xl text-gray-700">
			{crumbs}
		</div>
	)
}
