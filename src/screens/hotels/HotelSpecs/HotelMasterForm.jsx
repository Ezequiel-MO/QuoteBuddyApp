import { useRef ,useState } from 'react'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { Icon } from '@iconify/react'
import {
  TextInput,
  TextAreaInput,
  CheckboxInput,
  SelectInput
} from '../../../ui'
import { useGetLocations } from '../../../hooks'
import { Modal, Box, ImageList, ImageListItem } from '@mui/material'

const HotelMasterForm = ({ submitForm, hotel }) => {
  const [open, setOpen] = useState(false)
  const [imgList, setImgList] = useState([])
  const [isUpdate, setIsUpdate] = useState(false)

  const fileInput = useRef()
  const { locations } = useGetLocations()

  const initialValues = {
    name: hotel?.name ?? '',
    city: hotel?.city ?? '',
    address: hotel?.address ?? '',
    numberStars: hotel?.numberStars ?? '',
    numberRooms: hotel?.numberRooms ?? '',
    checkin_out: hotel?.checkin_out ?? '',
    meetingRooms: hotel?.meetingRooms ?? '',
    wheelChairAccessible: hotel?.wheelChairAccessible ?? true,
    wifiSpeed: hotel?.wifiSpeed ?? '',
    swimmingPool: hotel?.swimmingPool ?? '',
    restaurants: hotel?.restaurants ?? '',
    longitude: hotel?.location?.coordinates[1] ?? '',
    latitude: hotel?.location?.coordinates[0] ?? '',
    textContent: hotel?.textContent ?? ''
  }
  const imagesHotel = hotel.imageContentUrl === undefined ? [] : hotel.imageContentUrl

  const update = Object.keys(hotel).length > 0 ? true : false

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2
  }

  return (
    <>
     <Modal open={open} onClose={()=>setOpen(false) }>
        <Box sx={style} style={{ paddingRight: '0px' }}>
          <ImageList sx={{ width: 520, height: 450 }} cols={3} rowHeight={164}>
            {hotel?.imageContentUrl?.map((item, index) => (
              <ImageListItem key={index} style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    color: 'red',
                    margin: '1px'
                  }}
                  onClick={() => {
                    const arr = [...imgList]
                    if (index > -1) {
                      arr.push(hotel.imageContentUrl[index])
                      setImgList(arr)
                      hotel.imageContentUrl.splice(index, 1) // 2nd parameter means remove one item only
                    }
                    setIsUpdate(!isUpdate)
                  }}
                >
                  <Icon icon='material-symbols:cancel' width='30' />
                </div>
                <img
                  src={`${item}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  loading='lazy'
                />
              </ImageListItem>
            ))}
          </ImageList>
          <div className='flex align-center justify-end p-4'>
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => {
                values['imageContentUrl'] = hotel.imageContentUrl
                values['deletedImage'] = imgList
                submitForm(
                  values,
                  fileInput.current.files ?? [],
                  'hotels/image',
                  update
                )
              }}
            >
              {(formik) => (
                <div>
                  <Form>
                    <fieldset className='grid grid-cols-2 gap-4'>
                      <div className='flex align-center justify-start'>
                        <label
                          htmlFor='file-upload'
                          className='custom-file-upload'
                        ></label>
                        <input
                          id='file-upload'
                          type='file'
                          ref={fileInput}
                          name='imageContentUrl'
                          multiple
                        />
                      </div>
                      <input
                        type='submit'
                        className='cursor-pointer py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg'
                        value='Edit now'
                      />
                    </fieldset>
                  </Form>
                </div>
              )}
            </Formik>
          </div>
        </Box>
      </Modal>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          submitForm(values, fileInput.current.files, 'hotels', update)
        }}
        enableReinitialize
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          city: Yup.string().required('Required'),
          address: Yup.string().required('Required'),
          numberStars: Yup.number().required('Required'),
          numberRooms: Yup.number().required('Required'),
          checkin_out: Yup.string().required('Required'),
          meetingRooms: Yup.number().required('Required'),
          wheelChairAccessible: Yup.boolean(),
          wifiSpeed: Yup.string().required('Required'),
          swimmingPool: Yup.string().required('Required'),
          restaurants: Yup.string().required('Required'),
          longitude: Yup.number().required('Required'),
          latitude: Yup.number().required('Required')
        })}
      >
        {(formik) => (
          <div className='block p-6 rounded-lg shadow-lg bg-white w-3/4'>
            <Form>
              <fieldset className='grid grid-cols-3 gap-4'>
                <legend>
                  <h1 className='text-2xl mb-4 indent-8'>General Hotel Data</h1>
                </legend>

                <div className='form-group mb-6'>
                  <TextInput
                    label='Name'
                    name='name'
                    placeholder='Hotel Excelsior - 4star Superior'
                    type='text'
                  />
                  <SelectInput
                    label='Group Location'
                    name='city'
                    placeholder='Barcelona ...'
                    options={locations}
                    value={formik.values.city}
                  />
                  <TextInput
                    label='Address'
                    name='address'
                    placeholder='ex : c/Pina 57'
                    type='text'
                  />
                  <TextInput
                    label='Category'
                    name='numberStars'
                    placeholder='ex : 4'
                    type='number'
                  />
                  <TextInput
                    label='Total Number Of Rooms'
                    name='numberRooms'
                    placeholder='ex : 100 rooms'
                    type='number'
                  />
                  <TextInput
                    label='Check-in and Check-out'
                    name='checkin_out'
                    placeholder='ex : 12noon/3pm'
                    type='text'
                  />
                </div>
                <div className='form-group mb-6'>
                  <TextInput
                    label='Nr Of Meeting Rooms'
                    name='meetingRooms'
                    placeholder='ex : 4'
                    type='number'
                  />
                  <TextInput
                    label='Wi-Fi Speed'
                    name='wifiSpeed'
                    placeholder='ex : Available all rooms/common areas'
                    type='text'
                  />
                  <TextInput
                    label='Swimming Pool'
                    name='swimmingPool'
                    placeholder='ex : 1x Outdoor/ 1x Indoor'
                    type='text'
                  />
                  <TextInput
                    label='Restaurants'
                    name='restaurants'
                    placeholder='ex : 1x Restaurant/ 1x Bar'
                    type='text'
                  />
                  <TextInput
                    label='Coords Longitude'
                    name='longitude'
                    placeholder='ex : 2.154007'
                    type='number'
                  />
                  <TextInput
                    label='Coords Latitude'
                    name='latitude'
                    placeholder='ex : 41.390205'
                    type='number'
                  />
                </div>
                <div className='form-group'>
                  <TextAreaInput
                    className='
                    form-control
                    h-52
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    mt-7
                    focus:text-gray-700 focus:outline-none
                  '
                    name='textContent'
                    placeholder='Write a description'
                    type='text'
                  />
                  <CheckboxInput
                    label='Wheelchair Accessible'
                    name='wheelChairAccessible'
                  />
                  {
                  imagesHotel.length === 0 && 
                    <label htmlFor='file-upload' className='mx-3'>
                    <Icon icon='akar-icons:cloud-upload' width='40' />
                    <span>Upload Images</span>
                  </label>
                  }
                  {
                  imagesHotel.length === 0 && 
                    <input
                    id='file-upload'
                    type='file'
                    ref={fileInput}
                    name='imageContentUrl'
                    multiple
                    disabled={update ? true : false}
                    />
                  }
                </div>
                <input
                  type='submit'
                  className='cursor-pointer py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg'
                  value={update ? 'Edit Hotel Form' : 'Save new Hotel'}
                />
                {hotel?.name && (
                  <div className='flex align-center justify-start'>
                    <input
                      onClick={()=>setOpen(true) }
                      type='button'
                      className='cursor-pointer py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg'
                      value='Show images'
                    />
                  </div>
                )}
              </fieldset>
            </Form>
          </div>
        )}
      </Formik>
    </>
  )
}

export default HotelMasterForm
