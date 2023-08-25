export const ModalConfirmButton = ({ handleConfirm, text }) => {
	return (
		<button
			className="cursor-pointer py-2 px-10 hover:bg-gray-600 bg-slate-900 text-white-0 hover:text-white-0 fonrt-bold uppercase rounded-lg"
			onClick={handleConfirm}
		>
			{text ?? 'SAVE EDIT'}
		</button>
	)
}
