import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import './index.css'
import { ThemeProvider, ThemeContextType } from './context/ThemeContext'
import libertyLogo from './assets/LIBERTY_LOGO.png'

const theme: ThemeContextType = {
	colors: {
		primary: 'liberty-blue',
		secondary: 'liberty-gold',
		tertiary: 'liberty-green'
	},
	fonts: {
		main: 'Montserrat'
	},
	logo: libertyLogo
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<App />
			</Provider>
		</ThemeProvider>
	</React.StrictMode>
)
