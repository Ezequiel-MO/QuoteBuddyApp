export const RenderColorPalette = ({ colors, handleDelete }) => {
	if (colors.length === 0) return null
	return (
		<div className="rounded-lg bg-white-50 mt-2">
			<p className="uppercase font-bold text-black-50 text-center">
				Selected Colors
			</p>
			{colors.map((element) => {
				return (
					<li key={element} className="text-black-50 ml-12">
						Aggregate color: {element}{' '}
						<button
							className="ml-2 text-white-50 text-sm bg-red-500 hover:bg-red-700 font-bold rounded-full h-6 w-6"
							onClick={() => handleDelete(element)}
						>
							X
						</button>
					</li>
				)
			})}
		</div>
	)
}
