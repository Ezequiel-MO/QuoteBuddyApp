export const LinesBreakdownCheckBox = ({
	currentInvoice,
	toggleLinesBreakdown
}) => {
	if (currentInvoice.postingStatus !== 'posting') return null
	return (
		<div id="lines_breakdown_checkbox">
			<label htmlFor="BreakDown" className="text-black-50 mr-2">
				Include Breakdown
			</label>
			<input
				type="checkbox"
				id="Breakdown"
				className="mr-2"
				checked={currentInvoice.linesBreakdown}
				onChange={(e) => toggleLinesBreakdown(e.target.checked)}
			/>
		</div>
	)
}
