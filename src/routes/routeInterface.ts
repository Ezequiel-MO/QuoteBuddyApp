export interface RouteConfig {
	path?: string
	element: React.ReactElement
	children?: RouteConfig[]
	errorElement?: React.ReactElement
	index?: boolean
	loader?: () => Promise<any>
}
