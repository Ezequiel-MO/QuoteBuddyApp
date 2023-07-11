export const ModalConfirmButton = ({ handleConfirm , style , text }) => {
	return (
		<button
			className="cursor-pointer py-2 px-10 hover:bg-gray-600 bg-slate-900 text-white-0 hover:text-white-0 fonrt-bold uppercase rounded-lg"
			style={style ? style : {
				position: 'absolute',
				bottom: '20px',
				right: '10px',
			}}
			onClick={handleConfirm}
		>
			{text ?? "SAVE EDIT"}
		</button>
	)
}
