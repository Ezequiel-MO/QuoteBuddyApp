import { useRef } from 'react'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { TextInput } from '../../../ui/inputs/TextInput'
import { TextAreaInput } from '../../../ui/inputs/TextAreaInput'
import { Icon } from '@iconify/react'
import useGetLocations from '../../../hooks/useGetLocations'
import SelectInput from '../../../ui/inputs/SelectInput'
import CheckboxInput from '../../../ui/inputs/CheckboxInput'

const RestaurantMasterForm = ({ submitForm, restaurant }) => {
  const fileInput = useRef()
  const { locations } = useGetLocations()

  const initialValues = {
    name: restaurant?.name ?? '',
    city: restaurant?.city ?? '',
    longitude: restaurant?.location?.coordinates[1] ?? '',
    latitude: restaurant?.location?.coordinates[0] ?? '',
    price: restaurant?.price ?? '',
    textContent: restaurant?.textContent ?? '',
    isVenue: restaurant?.isVenue ?? ''
  }

  const update = Object.keys(restaurant).length > 0 ? true : false

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          submitForm(
            values,
            fileInput.current.files ?? [],
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
              </fieldset>
            </Form>
          </div>
        )}
      </Formik>
    </>
  )
}

export default RestaurantMasterForm
