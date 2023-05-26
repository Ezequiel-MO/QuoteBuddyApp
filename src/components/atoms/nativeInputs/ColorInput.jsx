export const ColorInput = ({ colorPalette, handleColor }) => {
	return (
		<>
			<label htmlFor="colorPalette">Color</label>
			<input
				className="   
				ml-6
				px-2
                              py-1
                              text-base
							  w-60
                              text-gray-700
                              border border-solid border-gray-300
                              rounded
                              focus:text-gray-700 focus:outline-none"
				type="color"
				placeholder="user given password"
				name="colorPalette"
				value={colorPalette[colorPalette.length - 1]}
				id={colorPalette[0]}
				onChange={handleColor}
			/>
		</>
	)
}
