const AddMeetingToProject = ({ date, timing }) => {
  return (
    <div className='text-slate-50'>
      <h1 className='font-bold uppercase'>{`${timing} meeting on ${date}`}</h1>
      <fieldset className=''>Add meeting to project</fieldset>
    </div>
  )
}

export default AddMeetingToProject
