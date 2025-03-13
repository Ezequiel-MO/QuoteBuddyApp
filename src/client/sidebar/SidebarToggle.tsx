import { useQuotation } from '../context/QuotationContext' // Adjust path
import { Icon } from '@iconify/react'

const SidebarToggle = () => {
	const { state, dispatch } = useQuotation()
	return (
		<button
			onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
			className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
			aria-label={state.isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
		>
			<Icon icon={state.isSidebarOpen ? 'mdi:close' : 'mdi:menu'} width="32" />
			{/* Display a message saying Open Sidebar or Close Sidebar */}
		</button>
	)
}

export default SidebarToggle
