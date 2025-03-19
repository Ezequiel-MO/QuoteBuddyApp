import { useQuotation } from '../context/QuotationContext'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion' // Optional: add animations

const SidebarToggle = () => {
	const { state, dispatch } = useQuotation()

	return (
		<motion.button
			onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
			className={`
        fixed top-32 sm:top-52 left-4 z-50 p-3 rounded-full shadow-lg
        transition-all duration-300 ease-in-out
        flex items-center justify-center
        bg-white-0 dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        hover:bg-gray-100 dark:hover:bg-gray-700
        focus:outline-none focus:ring-2 focus:ring-orange-50/50
        ${state.isSidebarOpen ? 'md:left-64 md:translate-x-0' : 'md:left-4'}
      `}
			aria-label={state.isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
		>
			<Icon
				icon={state.isSidebarOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'}
				className="h-6 w-6 text-gray-700 dark:text-gray-300"
			/>

			<AnimatePresence>
				{!state.isSidebarOpen && (
					<motion.span
						initial={{ opacity: 0, width: 0 }}
						animate={{ opacity: 1, width: 'auto' }}
						exit={{ opacity: 0, width: 0 }}
						className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 hidden lg:inline-block overflow-hidden whitespace-nowrap"
					>
						Menu
					</motion.span>
				)}
			</AnimatePresence>
		</motion.button>
	)
}

export default SidebarToggle
