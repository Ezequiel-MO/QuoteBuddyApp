interface StyleColorMap {
	[key: string]: string
}

interface StyleTheme {
	colors: StyleColorMap
}

interface StyleMap {
	[key: string]: StyleTheme
}

export const styleMap: StyleMap = {
	liberty: {
		colors: {
			'liberty-blue': '#0033A0',
			'liberty-gold': '#C7BAAE',
			'liberty-green': '#009E49'
		}
	}
}
