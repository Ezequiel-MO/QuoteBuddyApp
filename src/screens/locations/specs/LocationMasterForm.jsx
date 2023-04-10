import { useRef, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { TextInput, TextAreaInput } from '../../../ui'
import { Icon } from '@iconify/react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const LocationMasterForm = ({ submitForm, location }) => {
  const fileInput = useRef()
  const quillRef = useRef()


  const update = Object.keys(location).length > 0 ? true : false

  const [textContent, setTextContent] = useState()

  const handleQuillChange = (content) => {
    setTextContent(content)
  }

  useEffect(() => {
    if (update) {
      setTextContent(
        location?.textContent
          // .replace(/\\(.)/g, '$1')
          // .replace(/\\/g, '')
          // .replace(/\[/g, '')
          // .replace(/\]/g, '')
          // .replace(/"/g, '')
          ?.replace(/&lt;/g, '<')
          ?.replace(/&gt;/g, '>')
        // .replace(/&amp;/g, '&')
      )
    }
  }, [location, update])

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      ['link', 'image'],
      ['clean'],
    ],
  }


  const initialValues = {
    name: location?.name ?? '',
    longitude: location?.location?.coordinates[1] ?? '',
    latitude: location?.location?.coordinates[0] ?? '',
    textContent: location?.textContent ?? ""
  }


  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          values.textContent = textContent
          console.log(values.textContent)
          submitForm(values, fileInput.current.files ?? [], 'locations', update)
        }}
        enableReinitialize
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          longitude: Yup.number().required('Required'),
          latitude: Yup.number().required('Required')
        })}
      >
        {(formik) => (
          <div className='block p-6 rounded-lg shadow-lg bg-white w-3/4'>
            <Form>
              <fieldset className='grid grid-cols-2 gap-4'>
                <legend>
                  <h1 className='text-2xl mb-4'>General Location Data</h1>
                </legend>
                <div className='form-group mb-6'>
                  <TextInput
                    label='Name'
                    name='name'
                    placeholder='Location Name'
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

                <div className='form-group mb-6'>
                  <div className="my-7  ">
                    <ReactQuill
                      className="bg-white-0 text-black-50"
                      style={{ width: '140%', }}
                      theme="snow"
                      modules={modules}
                      ref={quillRef}
                      value={textContent}
                      onChange={handleQuillChange}
                      placeholder='Write a general description of the Location'
                    />
                  </div>

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
                  value={update ? 'Edit Location Form' : 'Save new Location'}
                />
              </fieldset>
            </Form>
          </div>
        )}
      </Formik>
    </>
  )
}

export default LocationMasterForm
