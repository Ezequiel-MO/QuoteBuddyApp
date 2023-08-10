export const RenderColorPalette = ({ colors, handleDelete }) => {
	if (colors.length === 0) return null
	return (
		<div className="rounded-lg bg-white-50 mt-2 p-4 shadow-lg">
			<p className="uppercase font-bold text-gray-700 text-center mb-4">
				Selected Colors
			</p>
			<ul className="space-y-2">
				{colors.map((element) => {
					return (
						<li
							key={element}
							className="flex items-center justify-between p-2 rounded-lg bg-gray-100"
						>
							<div className="flex items-center gap-2">
								<div
									className="w-6 h-6 rounded-full"
									style={{ backgroundColor: element }}
								></div>
								<span className="text-gray-700">{element}</span>
							</div>
							<button
								className="text-white-0 text-sm bg-red-500 hover:bg-red-700 font-bold rounded-full h-6 w-6 flex items-center justify-center"
								onClick={() => handleDelete(element)}
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
