export const BBVADetails = () => {
	return (
		<div className="text-black-50 ml-10 mt-10 w-[700px] h-[300px]">
			<div>Please use the following Bank Account for transfers</div>
			<div className="italic">All bank fees must be paid by the sender</div>
			<div className="font-bold">
				BBVA:
				<span className="font-normal ml-2">
					Banco Bilbao Vizcaya Argentaria
				</span>
			</div>
			<div className="font-bold">
				ACCOUNT NUMBER:{' '}
				<span className="italic font-normal">0182 8186 21 0201647461</span>
			</div>
			<div className="font-bold">
				IBAN:{' '}
				<span className="italic font-normal">ES9101828186210201647461</span>
			</div>
			<div className="font-bold">
				SWIFT: <span className="italic font-normal">BBVAESMMXXX</span>
			</div>
		</div>
	)
}
