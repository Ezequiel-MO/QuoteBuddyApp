export const NumberInput = ({ label, handleChange, ...props }) => {
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        className='    
				w-full
				px-3
				py-1.5
				text-base
				text-gray-700
				bg-white bg-clip-padding
				border border-solid border-gray-300
				rounded
				transition
				ease-in-out
				m-0
				focus:text-gray-700 focus:outline-none'
        type='number'
        min='0'
        step='.01'
        onChange={handleChange}
        {...props}
      />
    </>
  )
}
