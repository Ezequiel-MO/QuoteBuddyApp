const InvoiceBankDetails = () => {
  return (
    <div className='text-black-50 ml-10 mt-96 w-[700px] h-[300px]'>
      <div>Please use the following Bank Account for transfers</div>
      <div className='italic'>All bank fees must be paid by the sender</div>
      <div className='font-bold'>
        DEUTSCHE BANK:
        <span className='font-normal'>
          Quatre Cantons 1, St. Cugat del Vallès
        </span>
      </div>
      <div className='font-bold'>
        ACCOUNT NUMBER:{' '}
        <span className='italic font-normal'>0019 0066 52 4010037723</span>
      </div>
      <div className='font-bold'>
        IBAN:{' '}
        <span className='italic font-normal'>ES90 0019 0066 52 4010037723</span>
      </div>
      <div className='font-bold'>
        SWIFT: <span className='italic font-normal'>DEUTESBBXXX</span>
      </div>
    </div>
  )
}

export default InvoiceBankDetails
