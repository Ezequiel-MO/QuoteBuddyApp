export const ShowImagesButton = ({ name, setOpen }) => {
	if (!name) return null
	return (
		<div className="absolute bottom-0 right-0">
			<div className="flex align-center justify-start">
				<input
					onClick={() => setOpen(true)}
					type="button"
					className="cursor-pointer py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
					value="Show images"
				/>
			</div>
		</div>
	)
}
