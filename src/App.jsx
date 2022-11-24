import { 
  BrowserRouter as Router, 
  RouterProvider,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import { element } from 'prop-types'
import router from './routes'

function App() {
  return (
    <div className='text-lg p-2 text-orange-50 min-h-screen'>
      <ToastContainer
        position='top-right'
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
