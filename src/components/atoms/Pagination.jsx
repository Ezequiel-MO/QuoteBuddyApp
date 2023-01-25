export const Pagination = ({ page, totalPages, onChangePage }) => {
	return (
		<div className="flex flex-col items-center">
			<span className="text-sm text-gray-700 dark:text-gray-400">
				Showing Page{' '}
				<span className="font-semibold text-white-50 dark:text-white">
					{page}
				</span>{' '}
				of{' '}
				<span className="font-semibold text-white-50 dark:text-white">
					{totalPages}
				</span>{' '}
				Pages
			</span>

			<div className="inline-flex mt-2 xs:mt-0">
				<button
					onClick={() => onChangePage('prev')}
					className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
				>
					Prev
				</button>
				<button
					onClick={() => onChangePage('next')}
					className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
				>
					Next
				</button>
			</div>
		</div>
	)
}
