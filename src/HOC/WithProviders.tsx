export const withProviders = (
	providers: [React.JSXElementConstructor<any>, any?][]
) => {
	return function Wrapper({ children }: { children: React.ReactNode }) {
		return providers.reduceRight(
			(acc, [Provider, props]) => <Provider {...props}>{acc}</Provider>,
			children
		)
	}
}
