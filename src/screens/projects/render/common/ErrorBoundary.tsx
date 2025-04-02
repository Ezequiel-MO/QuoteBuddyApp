// src/components/common/ErrorBoundary.tsx (updated version)
import { Component, ReactNode, ErrorInfo } from 'react'
import { toast } from 'react-toastify'
import { errorToastOptions } from '@helper/toast'

interface ErrorBoundaryProps {
	children: ReactNode
	fallbackUI?: ReactNode // Allows custom fallback UI to be passed as props
	isClientDashboard?: boolean // Flag to identify if this is wrapping the client dashboard
}

interface ErrorBoundaryState {
	hasError: boolean
	isProjectError?: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props)
		this.state = { hasError: false, isProjectError: false }
	}

	static getDerivedStateFromError(_: Error): ErrorBoundaryState {
		return { hasError: true }
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// Log error to external monitoring service
		console.error('Uncaught error:', error, errorInfo)

		// Check if it's likely a project structure error
		const isProjectError = this.detectProjectStructureError(error, errorInfo)

		if (isProjectError && this.props.isClientDashboard) {
			this.setState({ isProjectError: true })

			// Show toast notification
			toast.error(
				'This project is using a legacy format and is no longer available. Please contact your account manager if you wish to enable it again.',
				errorToastOptions
			)

			// Clear client login state
			localStorage.removeItem('clientUserIsLoggedIn')
		}
	}

	// Method to detect if the error is related to project structure
	detectProjectStructureError(error: Error, errorInfo: ErrorInfo): boolean {
		const errorMessage = error.message.toLowerCase()
		const errorStack = errorInfo.componentStack?.toLowerCase() || ''

		// Common error patterns from legacy projects
		return (
			errorMessage.includes('cannot read properties of undefined') ||
			errorMessage.includes('cannot read property') ||
			errorMessage.includes('is not defined') ||
			errorMessage.includes('is not an array') ||
			(errorStack.includes('client') &&
				(errorStack.includes('schedule') ||
					errorStack.includes('project') ||
					errorStack.includes('hotels')))
		)
	}

	// Method to handle redirection back to login
	handleBackToLogin = () => {
		localStorage.removeItem('clientUserIsLoggedIn')
		window.location.href = '/'
	}

	render() {
		if (this.state.hasError) {
			// If it's a project error and in client dashboard context
			if (this.state.isProjectError && this.props.isClientDashboard) {
				return (
					<div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
						<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full text-center">
							<h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
								Project Loading Error
							</h2>
							<p className="text-gray-600 dark:text-gray-300 mb-6">
								This project appears to be using a legacy format and cannot be
								displayed. Please contact your account manager if you wish to
								enable it again.
							</p>
							<button
								onClick={this.handleBackToLogin}
								className="px-4 py-2 bg-[#ea5933] text-white rounded-md hover:bg-[#d84b2a] transition-colors"
							>
								Return to Login
							</button>
						</div>
					</div>
				)
			}

			// Default fallback UI
			return (
				this.props.fallbackUI || (
					<h2>Something went wrong. Please try again later.</h2>
				)
			)
		}

		return this.props.children
	}
}

export default ErrorBoundary
