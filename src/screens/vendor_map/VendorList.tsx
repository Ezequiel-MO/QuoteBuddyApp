import { CoordItem } from './MapLogic'

interface Props {
  vendors: CoordItem[]
  setLocation: (location: CoordItem) => void
  onVendorClick?: (vendor: CoordItem) => void
  onShowAllVendors?: () => void
  activeInfoWindow?: CoordItem
}

export const VendorList = ({
  vendors,
  setLocation,
  onVendorClick,
  onShowAllVendors,
  activeInfoWindow
}: Props) => {
  const handleVendorClick = (vendor: CoordItem) => {
    setLocation({
      ...vendor,
      place: vendor.place,
      coords: vendor.coords
    })
    onVendorClick && onVendorClick(vendor)
  }

  const handleShowAllVendors = () => {
    onShowAllVendors && onShowAllVendors()
  }

  const vendor_item =
    'cursor-pointer px-4 py-2 my-2 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition duration-200 ease-in overflow-x-hidden'

  return (
    <div className='controls bg-transparent text-black-50 p-4 overflow-y-auto'>
      {vendors.map((vendor, index) => {
        return (
          <div
            key={index}
            className={`
            ${vendor_item} 
            ${
              activeInfoWindow && activeInfoWindow.place === vendor.place
                ? 'bg-orange-500 hover:bg-orange-600 text-white-0 font-bold'
                : 'bg-white-50'
            }
          `}
            onClick={() => handleVendorClick(vendor)}
          >
            {vendor.place}
          </div>
        )
      })}

      <div
        className='cursor-pointer px-4 py-2 my-2 bg-gray-100 rounded-full font-bold hover:text-orange-500  hover:bg-gray-200 transition duration-200 ease-in'
        onClick={handleShowAllVendors}
      >
        Show all vendors
      </div>
    </div>
  )
}
