import { useEffect, useState } from 'react'
import { useClientAuth } from '../context/auth/ClientAuthProvider'
import { useCurrentProject } from './redux/useCurrentProject'
import { LoginRoute, getLoginRoute, saveLoginRoute } from '../utils/auth'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../context/auth/AuthProvider'

interface AuthorInfo {
	authorId: string
	authorName: string
	authorRole: 'AM' | 'Client'
}

export const useLoginRoute = (): {
	loginRoute: LoginRoute | null
	authorInfo: AuthorInfo
} => {
	const [loginRoute, setLoginRoute] = useState<LoginRoute | null>(
		getLoginRoute()
	)
	const { clientUserIsLoggedIn } = useClientAuth()
	const { currentProject } = useCurrentProject()
	const location = useLocation()

	// Safely use auth if available - wrapped in try/catch to avoid errors
	let authData
	try {
		const { auth } = useAuth()
		authData = auth
	} catch (error) {
		authData = null
	}

	// Determine login route from client auth context and URL path
	useEffect(() => {
		// If accessing via client login or in client routes
		const isClientRoute = location.pathname.startsWith('/client/')

		// If in regular app planner (not client planner), it's an agency user
		const isAppPlannerRoute =
			location.pathname === '/planner' ||
			location.pathname.startsWith('/planner/')

		if (clientUserIsLoggedIn || isClientRoute) {
			// User is logged in through client route
			saveLoginRoute('client')
			setLoginRoute('client')
		} else if (isAppPlannerRoute) {
			// User is accessing the planner from the app routes (agency side)
			saveLoginRoute('agency')
			setLoginRoute('agency')
		} else {
			// Default to agency if not explicitly client
			saveLoginRoute('agency')
			setLoginRoute('agency')
		}
	}, [clientUserIsLoggedIn, location.pathname])

	// Get author information based on login route
	const getAuthorInfo = (): AuthorInfo => {
		// Agency user - try to get info from auth context first
		if (loginRoute === 'agency') {
			try {
				// If we have auth context data (agency-side), use it
				if (authData && authData._id) {
					return {
						authorId: authData._id,
						authorName: authData.name || 'Agency User',
						authorRole: 'AM'
					}
				}

				// Fallback to currentProject if auth is not available
				if (currentProject?.accountManager?.length > 0) {
					const manager = currentProject.accountManager[0]
					return {
						authorId: manager._id,
						authorName: `${manager.firstName} ${manager.familyName}`,
						authorRole: 'AM'
					}
				}
			} catch (error) {
				console.log('Error getting agency user info:', error)
			}
		}
		// Client user
		else if (
			loginRoute === 'client' &&
			currentProject?.clientAccManager?.length > 0
		) {
			const clientManager = currentProject.clientAccManager[0]
			return {
				authorId: clientManager._id,
				authorName: `${clientManager.firstName} ${clientManager.familyName}`,
				authorRole: 'Client'
			}
		}

		// Fallback for when information is not available
		return {
			authorId: (authData && authData._id) || 'unknown',
			authorName: (authData && authData.name) || 'Unknown User',
			authorRole: loginRoute === 'client' ? 'Client' : 'AM'
		}
	}

	return {
		loginRoute,
		authorInfo: getAuthorInfo()
	}
}
