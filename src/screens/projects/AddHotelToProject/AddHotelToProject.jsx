import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import baseAPI from '../../../axios/axiosConfig'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../helper/toast'
import { useCurrentProject } from '../../../hooks/useCurrentProject'
import { Icon } from '@iconify/react'
import Button from '../../../ui/Button'
import AddHotelPricesToProject from './AddHotelPricesToProject'
import DisplayMeetingDays from './DisplayMeetingDays'

const AddHotelToProject = () => {
  const [meetingsOpen, setMeetingsOpen] = useState(false)
  const [meetingForm, setMeetingForm] = useState({
    date: '',
    dayOfEvent: '',
    open: false,
    timing: '',
    timeOfEvent: ''
  })
  let params = useParams()
  const { hotelId } = params
  const location = useLocation()
  const navigate = useNavigate()
  const { currentProject, addHotelToProject } = useCurrentProject()
  const { hotels } = currentProject

  const addHotelWithPricesToProject = async (values) => {
    if (hotels.find((hotel) => hotel._id === hotelId)) {
      toast.error('Hotel already in project', toastOptions)
      setTimeout(() => {
        navigate('/app/project')
      }, 1000)
      return
    }
    try {
      const res = await baseAPI.get(`v1/hotels/${hotelId}`)
      const hotel = res.data.data.data
      hotel.price = [values]
      addHotelToProject(hotel)
      toast.success('Hotel added to project', toastOptions)
      navigate('/app/project/schedule')
    } catch (error) {
      console.log(error)
    }
  }

  const handleMeeting = (dayOfEvent, timing, timeOfEvent, date) => {
    setMeetingForm({
      ...meetingForm,
      date,
      dayOfEvent,
      open: !meetingForm.open,
      timing,
      timeOfEvent
    })
  }

  return (
    <>
      <Formik
        initialValues={{
          DUInr: '',
          DUIprice: '',
          breakfast: '',
          DoubleRoomNr: '',
          DoubleRoomPrice: '',
          DailyTax: '',
          roomCapacity: '',
          HDRate: '',
          FDRate: '',
          HDDDR: '',
          FDDDR: '',
          cofeeBreakUnits: '',
          coffeeBreakPrice: '',
          workingLunchUnits: '',
          workingLunchPrice: '',
          aavvPackage: '',
          hotelDinnerUnits: '',
          hotelDinnerPrice: '',
          introduction: ''
        }}
        onSubmit={(values) => {
          const {
            DUInr,
            DUIprice,
            breakfast,
            DoubleRoomNr,
            DoubleRoomPrice,
            DailyTax
          } = values

          addHotelWithPricesToProject({
            DUInr,
            DUIprice,
            breakfast,
            DoubleRoomNr,
            DoubleRoomPrice,
            DailyTax
          })
        }}
        enableReinitialize
        validationSchema={Yup.object({
          DUInr: Yup.number(),
          DUIprice: Yup.number(),
          breakfast: Yup.number(),
          DoubleRoomNr: Yup.number(),
          DoubleRoomPrice: Yup.number(),
          DailyTax: Yup.number()
        })}
      >
        {(formik) => (
          <div className='flex flex-col'>
            <h1 className='text-2xl uppercase bg-orange-50 text-slate-50 text-center font-bold'>
              {' '}
              {location.state.hotelName && location.state.hotelName}
            </h1>
            <Form className='relative'>
              <AddHotelPricesToProject />
              <div className='mb-10 pl-1'>
                <Button
                  type='button'
                  handleClick={() => setMeetingsOpen(!meetingsOpen)}
                  className='flex flex-row justify-start'
                >
                  ADD MEETINGS
                  <Icon icon='bi:box-arrow-in-down-right' color='#ea5933' />
                </Button>

                <div className={`${meetingsOpen ? 'block' : 'hidden'}`}>
                  <DisplayMeetingDays
                    hotelId={hotelId}
                    handleMeeting={handleMeeting}
                    meetingForm={meetingForm}
                    meetingValues={formik.values}
                  />
                </div>
              </div>
              <hr />

              <div className='mt-10'>
                <Button type='submit'>Add Hotel Rates to project</Button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </>
  )
}

export default AddHotelToProject
