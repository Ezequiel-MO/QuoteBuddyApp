interface Props {
	update: boolean
	title: string
	customStyles?: string
}

export const SubmitInput = ({ update, title, customStyles }: Props) => {
	const styles = `m-2 cursor-pointer py-1 px-6 hover:bg-gray-600 bg-green-500 text-white font-bold uppercase rounded-lg ${customStyles}`
	return (
		<button type="submit" className={styles}>
			{!update ? `Save and Exit ` : `Edit and Exit`}
		</button>
	)
}
