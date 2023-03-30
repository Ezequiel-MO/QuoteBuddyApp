export const handleTransferChange = (event, data, setData) => {
	const { name, value } = event.target
	if (!isNaN(value)) {
		setData({
			...data,
			[name]: value
		})
	}
}
