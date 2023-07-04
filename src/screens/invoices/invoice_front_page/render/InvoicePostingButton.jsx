export const InvoicePostingButton = ({ currentInvoice, handlePostInvoice }) => (
	<div className=" h-[112px] mx-1 flex justify-between">
		<div className="flex items-center">
			<button
				type="button"
				className={`${
					currentInvoice.postingStatus !== 'posting'
						? 'hidden'
						: 'text-black-50 mr-2 my-5 p-2 border border-white-50 text-center rounded-lg active:scale-105 hover:bg-white-50 hover:text-white-100 hover:font-bold'
				}`}
				onClick={handlePostInvoice}
			>
				{currentInvoice.postingStatus === 'posted'
					? 'Invoice Saved in DB'
					: 'Generate New Invoice'}
			</button>
		</div>
	</div>
)
