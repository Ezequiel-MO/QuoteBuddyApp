export const VATCheckbox = ({ currentInvoice, toggleTaxBreakdown }) => {
	if (currentInvoice.postingStatus !== 'posting') return null
	return (
		<div id="vat_checkbox">
			<label htmlFor="VAT" className="text-black-50 mr-2">
				Include VAT
			</label>
			<input
				type="checkbox"
				id="VAT"
				className="mr-2"
				checked={currentInvoice.taxBreakdown}
				onChange={(e) => toggleTaxBreakdown(e.target.checked)}
			/>
		</div>
	)
}
