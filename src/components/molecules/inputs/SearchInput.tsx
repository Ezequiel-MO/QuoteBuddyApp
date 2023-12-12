import React from 'react'

interface Props {
	searchItem: string
	filterList: (event: React.ChangeEvent<HTMLInputElement>) => void
	placeHolder?: string
}

export const SearchInput: React.FC<Props> = ({
	searchItem,
	filterList,
	placeHolder = 'name'
}) => {
	return (
		<div className="relative w-96">
			<input
				type="search"
				value={searchItem}
				onChange={filterList}
				id="search-dropdown"
				className="block p-2.5 w-full z-20 text-sm text-slate-100 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
				placeholder={`Search by ${placeHolder} ...`}
			/>
			<div className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
				<svg
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					></path>
				</svg>
			</div>
		</div>
	)
}
