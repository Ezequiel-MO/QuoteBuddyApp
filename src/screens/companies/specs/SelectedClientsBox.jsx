export const SelectedClientsBox = ({ employees, handleDelete }) => {
	if (employees.length === 0) return null
	return (
		<div className="rounded-lg bg-white-50">
			<p className="uppercase font-bold text-black-50 text-center">
				Selected Clients
			</p>
			{employees.map((employee) => {
				const regex = /^[0-9a-fA-F]+ (.+)$/
				const match = employee.match(regex)
				return (
					<li className="text-black-50 ml-12" key={employee}>
						{match && match[1]}
						<button
							className="ml-2 text-white text-sm bg-red-500 hover:bg-red-700 font-bold rounded-full h-6 w-6"
							onClick={() => handleDelete(employee)}
						>
							X
						</button>
					</li>
				)
			})}
		</div>
	)
}
