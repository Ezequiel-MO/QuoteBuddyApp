import React from 'react'
import { QuotationProvider } from './context/QuotationContext'
import MainLayout from './components/layout/MainLayout'

const QuotationPage: React.FC = () => {
	return (
		<QuotationProvider>
			<MainLayout />
		</QuotationProvider>
	)
}

export default QuotationPage
