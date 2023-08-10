export const SubmitInput = ({ update, title }) => {
	return (
		<input
			type="submit"
			className="my-2 cursor-pointer py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 font-bold uppercase rounded-lg"
			value={!update ? `Save new ${title}` : `Edit ${title}`}
		/>
	)
}
