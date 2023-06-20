import axios from 'axios'

const baseAPI = axios.create({
	baseURL: 'http://mockedurl.com',
	headers: {
		Authorization: `Bearer ${localStorage.getItem('token')}`
	} // Use a mocked URL
})

export default baseAPI
