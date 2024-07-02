import { RouterProvider, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import router from './routes'

function App() {
	return (
		<div className="dark:bg-black-50 text-lg text-black-50 dark:text-gray-100 p-2">
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
