export const TransferForm = ({ onSubmit, children }) => {
	return (
		<form onSubmit={onSubmit} className="flex flex-col">
			{children}
		</form>
	)
}
