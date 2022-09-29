import cutt_logo from '../../assets/CUTT_LOGO.png'
const InvoiceLogo = () => {
  return (
    <div className='border-b-[13px] border-b-white-50 h-[112px] mx-1'>
      <img
        alt='Backoffice header'
        className='object-cover h-6 mt-10 ml-10'
        src={cutt_logo}
      />
    </div>
  )
}

export default InvoiceLogo
