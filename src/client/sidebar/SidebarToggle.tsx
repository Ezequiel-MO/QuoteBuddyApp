import { useQuotation } from '../context/QuotationContext'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion'

const SidebarToggle = () => {
	const { state, dispatch } = useQuotation()

	// Toggle function to explicitly open/close the sidebar regardless of hover
	const toggleSidebar = () => {
		dispatch({ type: 'TOGGLE_SIDEBAR', payload: !state.isSidebarOpen })
	}

	// Only show the toggle when the sidebar is hidden
	return (
		<AnimatePresence>
			{!state.isSidebarOpen && (
				<motion.button
					onClick={toggleSidebar}
					className={`
            fixed top-32 sm:top-52 left-4 z-50 p-3 rounded-full shadow-lg
            transition-all duration-300 ease-in-out
            flex items-center justify-center
            bg-white-0 dark:bg-gray-800
            border border-gray-200 dark:border-gray-700
            hover:bg-gray-100 dark:hover:bg-gray-700
            focus:outline-none focus:ring-2 focus:ring-orange-50/50
          `}
					aria-label="Open sidebar menu"
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.9 }}
					transition={{ type: 'spring', damping: 25, stiffness: 500 }}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					{/* Hamburger menu icon */}
					<Icon
						icon="heroicons:bars-3"
						className="h-6 w-6 text-gray-700 dark:text-gray-300"
					/>

					<span className="sr-only">Open sidebar menu</span>
				</motion.button>
			)}
		</AnimatePresence>
	)
}

export default SidebarToggle
