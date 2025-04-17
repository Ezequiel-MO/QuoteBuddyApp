export type LoginRoute = 'agency' | 'client'

export const saveLoginRoute = (route: LoginRoute): void => {
	localStorage.setItem('loginRoute', route)
}

export const getLoginRoute = (): LoginRoute | null => {
	const route = localStorage.getItem('loginRoute')
	return route === 'agency' || route === 'client' ? route : null
}
