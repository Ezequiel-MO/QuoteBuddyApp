import { useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './components/Login'
import { AuthProvider } from './context/AuthProvider'
import AuthLayout from './layouts/AuthLayout'
import GeneralLayout from './layouts/GeneralLayout'
import ProtectedRoute from './layouts/ProtectedRoute'
import ReactToPrint from 'react-to-print'
import {
  AccManagerList,
  AccManagerSpecs,
  AddEventToSchedule,
  AddHotelToProject,
  AddScheduleToProject,
  AddTransfersINOUTTOProject,
  ClientList,
  ClientSpecs,
  CountryList,
  CountrySpecs,
  Dashboard,
  EventList,
  EventSpecs,
  HotelList,
  HotelSpecs,
  LocationList,
  LocationSpecs,
  ProjectList,
  ProjectSpecs,
  RestaurantList,
  RestaurantSpecs,
  TransferList,
  TransferSpecs,
  Invoice
} from './screens'
import './App.css'
import { Icon } from '@iconify/react'

function App() {
  const componentRef = useRef()
  return (
    <div className='text-lg text-orange-50 p-2 min-h-screen'>
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
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
            </Route>
            <Route path='app' element={<ProtectedRoute />}>
              <Route index element={<Dashboard />} />

              <Route path='accManager' element={<GeneralLayout />}>
                <Route index element={<AccManagerList />} />
                <Route path='specs' element={<AccManagerSpecs />} />
              </Route>
              <Route path='client' element={<GeneralLayout />}>
                <Route index element={<ClientList />} />
                <Route path='specs' element={<ClientSpecs />} />
              </Route>
              <Route path='country' element={<GeneralLayout />}>
                <Route index element={<CountryList />} />
                <Route path='specs' element={<CountrySpecs />} />
              </Route>
              <Route path='event' element={<GeneralLayout />}>
                <Route index element={<EventList />} />
                <Route path='specs' element={<EventSpecs />} />
              </Route>
              <Route path='hotel' element={<GeneralLayout />}>
                <Route index element={<HotelList />} />
                <Route path='specs' element={<HotelSpecs />} />
                <Route path=':hotelId' element={<AddHotelToProject />} />
              </Route>
              <Route path='location' element={<GeneralLayout />}>
                <Route index element={<LocationList />} />
                <Route path='specs' element={<LocationSpecs />} />
              </Route>
              <Route path='project' element={<GeneralLayout />}>
                <Route index element={<ProjectList />} />
                <Route path='specs' element={<ProjectSpecs />} />
                <Route path='schedule' element={<GeneralLayout />}>
                  <Route index element={<AddScheduleToProject />} />
                  <Route
                    path='transfers_in_out'
                    element={<AddTransfersINOUTTOProject />}
                  />
                  <Route path=':eventId' element={<AddEventToSchedule />} />
                </Route>
              </Route>

              <Route path='restaurant' element={<GeneralLayout />}>
                <Route index element={<RestaurantList />} />
                <Route path='specs' element={<RestaurantSpecs />} />
              </Route>

              <Route path='transfer' element={<GeneralLayout />}>
                <Route index element={<TransferList />} />
                <Route path='specs' element={<TransferSpecs />} />
              </Route>
            </Route>
            <Route
              path='app/invoice'
              element={
                <div>
                  <ReactToPrint
                    trigger={() => (
                      <button className='flex flex-row items-center mb-2'>
                        <span>
                          <Icon
                            icon='ant-design:file-pdf-twotone'
                            color='#ea5933'
                            width='40'
                          />
                        </span>
                        Print the Invoice to a PDF
                      </button>
                    )}
                    content={() => componentRef.current}
                  />
                  <Invoice ref={componentRef} />
                </div>
              }
            />
            <Route
              path='*'
              element={
                <main className='indent-10'>
                  <h1 className='text-xl'>
                    Page not found! Pls click on the logo
                  </h1>
                </main>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
