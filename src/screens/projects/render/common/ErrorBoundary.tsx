// EnhancedErrorBoundary.tsx
import { Component, ReactNode, ErrorInfo } from 'react'

interface ErrorBoundaryProps {
	children: ReactNode
	fallbackUI?: ReactNode // Allows custom fallback UI to be passed as props
}

interface ErrorBoundaryState {
	hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(_: Error): ErrorBoundaryState {
		return { hasError: true }
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// Log error to external monitoring service
		console.error('Uncaught error:', error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			// Render custom fallback UI if provided
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
