interface Props {
	update: boolean
	title: string
	customStyles?: string
}

export const SubmitInput = ({ update, title, customStyles }: Props) => {
	const styles = `m-2 cursor-pointer py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 font-bold uppercase rounded-lg ${customStyles}`
	return (
		<button type="submit" className={styles}>
			{!update ? `Save new ${title}` : `Edit ${title}`}
		</button>
	)
}
