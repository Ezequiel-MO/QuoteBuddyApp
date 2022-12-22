import { useState, useRef } from 'react'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import {
  TextInput,
  TextAreaInput,
  CheckboxInput,
  SelectInput
} from '../../../ui'
import { Icon } from '@iconify/react'
import { useGetLocations } from '../../../hooks'
import { Modal, Box, ImageList, ImageListItem } from '@mui/material'

const RestaurantMasterForm = ({ submitForm, restaurant }) => {
  const [open, setOpen] = useState(false)
  const [imgList, setImgList] = useState([])
  const [isUpdate, setIsUpdate] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const fileInput = useRef()
  const { locations } = useGetLocations()

  const initialValues = {
    name: restaurant?.name ?? '',
    city: restaurant?.city ?? '',
    longitude: restaurant?.location?.coordinates[1] ?? '',
    latitude: restaurant?.location?.coordinates[0] ?? '',
    price: restaurant?.price ?? '',
    textContent: restaurant?.textContent ?? '',
    isVenue: restaurant?.isVenue ?? false
  }

  const update = Object.keys(restaurant).length > 0 ? true : false
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
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} style={{ paddingRight: '0px' }}>
          <ImageList sx={{ width: 520, height: 450 }} cols={3} rowHeight={164}>
            {restaurant?.imageContentUrl?.map((item, index) => (
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
                      arr.push(restaurant.imageContentUrl[index])
                      setImgList(arr)
                      restaurant.imageContentUrl.splice(index, 1) // 2nd parameter means remove one item only
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
                values['imageContentUrl'] = restaurant.imageContentUrl
                values['deletedImage'] = imgList
                submitForm(
                  values,
                  fileInput.current.files ?? [],
                  'restaurants/image',
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
          submitForm(
            values,
            fileInput?.current.files ?? [],
            'restaurants',
            update
          )
        }}
        enableReinitialize
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          city: Yup.string().required('Required'),
          longitude: Yup.number().required('Required'),
          latitude: Yup.number().required('Required'),
          price: Yup.number().required('Required'),
          isVenue: Yup.boolean()
        })}
      >
        {(formik) => (
          <div className='block p-6 rounded-lg shadow-lg bg-white w-3/4'>
            <Form>
              <fieldset className='grid grid-cols-2 gap-4'>
                <legend>
                  <h1 className='text-2xl mb-4'>General Restaurant Data</h1>
                </legend>
                <div className='form-group mb-6'>
                  <TextInput
                    label='Name'
                    name='name'
                    placeholder='Restaurant Name'
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
                  <TextInput
                    label='Average Menu Price'
                    name='price'
                    placeholder='ex : 35'
                    type='number'
                  />
                </div>
                <div className='form-group mb-6'>
                  <CheckboxInput label='It is a venue' name='isVenue' />
                  <TextAreaInput
                    name='textContent'
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
                    placeholder='Write a description of the restaurant'
                    type='text'
                  />
                  <div className='flex align-center justify-start'>
                    <label htmlFor='file-upload' className='custom-file-upload'>
                      <Icon icon='akar-icons:cloud-upload' width='40' />
                    </label>
                    <input
                      id='file-upload'
                      type='file'
                      ref={fileInput}
                      name='imageContentUrl'
                      multiple
                      disabled={update ? true : false}
                    />
                  </div>
                </div>
                <input
                  type='submit'
                  className='cursor-pointer py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg'
                  value={
                    update ? 'Edit Restaurant Form' : 'Save new Restaurant'
                  }
                />
                {restaurant?.name && (
                  <div className='flex align-center justify-start'>
                    <input
                      onClick={handleOpen}
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

export default RestaurantMasterForm
