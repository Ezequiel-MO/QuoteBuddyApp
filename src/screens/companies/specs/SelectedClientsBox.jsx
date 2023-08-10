export const SelectedClientsBox = ({ employees, handleDelete }) => {
	if (employees.length === 0) return null
	return (
		<div className="rounded-lg bg-white-50 mt-2 p-4 shadow-lg">
			<p className="uppercase font-bold text-gray-700 text-center mb-4">
				Selected Clients
			</p>
			<ul className="space-y-2">
				{employees.map((employee) => {
					const regex = /^[0-9a-fA-F]+ (.+)$/
					const match = employee.match(regex)
					return (
						<li
							key={employee}
							className="flex items-center justify-between p-2 rounded-lg bg-gray-100"
						>
							<span className="text-gray-700">{match && match[1]}</span>
							<button
								className="text-white-0 text-sm bg-red-500 hover:bg-red-700 font-bold rounded-full h-6 w-6 flex items-center justify-center"
								onClick={() => handleDelete(employee)}
							>
								X
							</button>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
