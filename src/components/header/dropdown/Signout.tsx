import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import React from 'react'
import { toast } from 'react-toastify'
import { errorToastOptions } from '@helper/toast'
/**
 * Signout Component
 *
 * Renders a button that allows the user to sign out of the application.
 * When clicked, it clears all data from localStorage and redirects the user
 * to the home page ('/').
 */
const Signout: React.FC = () => {
	const navigate = useNavigate()
	const signout = () => {
		try {
			localStorage.clear()
			navigate('/')
		} catch (error) {
			toast.error('Error signing out', errorToastOptions)
		}
	}
	return (
		<button
			type="button"
			className="w-full font-semibold text-gray-700 dark:text-gray-300 border-b-2 border-gray-300 dark:border-gray-700 p-3 flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
			onClick={signout}
		>
			<Icon icon="bx:log-out" />
			<p className="ml-2">Sign Out</p>
		</button>
	)
}

export default Signout
