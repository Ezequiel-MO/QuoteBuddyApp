import { useRef, useState } from 'react'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { TextInput } from '../../../ui'
import { Icon } from '@iconify/react'
import { ModalPictures } from '../../../components/molecules'

const AccManagerMasterForm = ({ submitForm, accManager }) => {
  const fileInput = useRef()
  const [open, setOpen] = useState(false)

  const initialValues = {
    firstName: accManager?.firstName ?? '',
    familyName: accManager?.familyName ?? '',
    email: accManager?.email ?? ''
  }

  const update = Object.keys(accManager).length > 0 ? true : false

  return (
    <>
      <ModalPictures
       screen={accManager}
       submitForm={submitForm}
       open={open}
       setOpen={setOpen}
       initialValues={initialValues}
       multipleCondition={false}
       nameScreen="accManagers"
      />

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          submitForm(values, fileInput.current ?? [], 'accManagers',update)
        }}
        enableReinitialize
        validationSchema={Yup.object({
          firstName: Yup.string().required('Required'),
          familyName: Yup.string().required('Required'),
          email: Yup.string().required('Required')
        })}
      >
        {(formik) => (
          <div className='block p-6 rounded-lg shadow-lg bg-white w-3/4'>
            <Form>
              <fieldset className='grid grid-cols-2 gap-4'>
                <legend>
                  <h1 className='text-2xl mb-4'>
                    General Account Manager Data
                  </h1>
                </legend>
                <div className='form-group mb-6'>
                  <TextInput
                    label='First Name'
                    name='firstName'
                    placeholder='Acc manager Given Name'
                    type='text'
                  />
                  <TextInput
                    label='Last Name'
                    name='familyName'
                    placeholder='Acc manager Family Name'
                    type='text'
                  />
                  <TextInput
                    label='Email'
                    name='email'
                    placeholder='Acc manager company email'
                    type='text'
                  />
                </div>

                <div className='flex align-center justify-start'>
                  {
                    !update && 
                    <label htmlFor='file-upload' className='custom-file-upload'>
                    <Icon icon='akar-icons:cloud-upload' width='40' />
                  </label>
                  }
                  {
                    !update && 
                      <input
                      id='file-upload'
                      type='file'
                      ref={fileInput}
                      name='imageContentUrl'
                      multiple = {false}
                      disabled={update ? true : false}
                      />
                  }
                </div>

                <input
                  type='submit'
                  className='cursor-pointer py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg'
                  value={update ? 'Edit Account Manager Form' : 'Save new Account Manager'}
                />
                {accManager?.firstName && (
									<div className="flex align-center justify-start">
										<input
											onClick={() => setOpen(true)}
											type="button"
											className="cursor-pointer py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
											value="Show images"
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

export default AccManagerMasterForm
