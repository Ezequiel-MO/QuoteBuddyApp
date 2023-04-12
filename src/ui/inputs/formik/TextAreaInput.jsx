import { ErrorMessage, useField } from 'formik'

export const TextAreaInput = ({ className, ...props }) => {
  const [field] = useField(props)

  return (
    <>
      <textarea className={className} {...field} {...props} />
      <div className='bg-red-500 font-bold mb-2'>
        <ErrorMessage
          name={props.name}
          component='span'
          className='error-message'
        />
      </div>
    </>
  )
}
