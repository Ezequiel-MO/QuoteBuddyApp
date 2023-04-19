export const RenderColorPalette = ({ colors, handleDelete }) => {
	if (!colors) return null
	return (
		<div
			style={{
				backgroundColor: 'white',
				borderRadius: '10px',
				position: 'absolute',
				marginLeft: '35%',
				marginTop: '-400px',
				padding: '2%'
			}}
		>
			<h1 style={{ textAlign: 'center' }}>{'Selected colors'}</h1>
			{colors.map((element) => {
				return (
					<li key={element} style={{ color: element, marginLeft: '50px' }}>
						Aggregate color: {element}{' '}
						<button
							style={{
								marginLeft: '10px',
								color: 'white',
								fontSize: '15px'
							}}
							className="bg-red-500 hover:bg-red-700 text-white font-bold rounded-full h-6 w-6"
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
