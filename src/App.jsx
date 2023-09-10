import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import router from './routes'

function App() {
	return (
		<div className="bg-gray-900 text-gray-200 min-h-screen p-4">
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
