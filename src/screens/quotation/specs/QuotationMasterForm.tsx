import React from 'react'
import QuotationFormFields from './QuotationFormFields'

function QuotationMasterForm() {
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	return (
		<form onSubmit={handleSubmit}>
			<QuotationFormFields />
		</form>
	)
}

export default QuotationMasterForm
