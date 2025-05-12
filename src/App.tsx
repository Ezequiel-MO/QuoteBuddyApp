import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import router from './routes'
import { Spinner } from '@components/atoms'

function App() {
	const [isReady, setIsReady] = useState(false)

	useEffect(() => {
		setIsReady(true)
	}, [])

	if (!isReady) {
		return <Spinner />
	}

	return (
		<div className="dark:bg-black-50 text-lg text-black-50 dark:text-gray-100">
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={true}
				newestOnTop={true}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<RouterProvider router={router} />
		</div>
	)
}

export default App
