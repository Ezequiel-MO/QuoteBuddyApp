export const AssistanceCostInput = ({ assistance, setAssistance }) => {
	return (
		<div className="flex flex-row justify-start my-1">
			<label className="text-xl text-gray-100 mr-8" htmlFor="assistance">
				Assistance cost
			</label>
			<input
				type="number"
				name="assistance"
				value={assistance}
				onChange={(e) => setAssistance(e.target.value)}
				className="py-1 border-0 rounded-xl bg-green-50 text-center cursor-pointer w-20"
			/>
		</div>
	)
}
