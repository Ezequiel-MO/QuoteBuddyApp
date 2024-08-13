import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import './index.css'
import { ThemeContextType, ThemeProvider } from './context/theme/ThemeContext'
import cuttLogo from './assets/CUTT_LOGO.png'
import { TranslationProvider } from './context/translations/translationContext'
import { ClientAuthProvider } from './context/auth/ClientAuthProvider'
import { BudgetProvider } from '@screens/budget/context/BudgetContext'
import { QuotationProvider } from '@screens/quotation/context/QuotationContext'
import { ProjectProvider } from '@screens/projects/context/CompanyContext'

const theme: ThemeContextType = {
	colors: {
		primary: 'cutt-orange',
		secondary: 'cutt-gray',
		tertiary: 'cutt-sand'
	},
	fonts: {
		main: 'Barlow Condensed'
	},
	logo: cuttLogo
}

document.title = import.meta.env.VITE_APP_TITLE

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<TranslationProvider>
					<ClientAuthProvider>
						<ProjectProvider>
							<QuotationProvider>
								<BudgetProvider>
									<App />
								</BudgetProvider>
							</QuotationProvider>
						</ProjectProvider>
					</ClientAuthProvider>
				</TranslationProvider>
			</Provider>
		</ThemeProvider>
	</React.StrictMode>
)
