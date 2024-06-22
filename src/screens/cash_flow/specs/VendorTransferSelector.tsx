import { FC, useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { useApiFetch } from 'src/hooks/fetchData'
import { usePayment } from '../context/PaymentsProvider'
import { ITransfer } from "src/interfaces"

interface VendorTransferSelectorProps {
    setVendorId: (value: string) => void
    vendorId: string
}

export const VendorTransferSelector: FC<VendorTransferSelectorProps> = ({ vendorId, setVendorId }) => {

    const { dispatch, state } = usePayment()
    const { data: vendors, isLoading } = useApiFetch<ITransfer[]>(
        `${state.payment?.vendorModel ? state.payment?.vendorModel : "Hotels"}`
    )

    const [searchTerm, setSearchTerm] = useState('')
    const [isDropdownVisible, setIsDropdownVisible] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const filteredOptions = searchTerm ? vendors.filter(
        (el) =>
            el.company.toLowerCase().includes(searchTerm.toLowerCase())
    ) : vendors

    const handleChange = (id: string) => {
        setVendorId(id)
        dispatch({
            type: "UPDATE_PAYMENT_FIELD",
            payload: {
                name: "vendor",
                value: id
            }
        })
        setIsDropdownVisible(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && filteredOptions.length > 0) {
            handleChange(filteredOptions[0]._id as string)
            e.preventDefault()
        }
    }


    //"useEffect" que sirve cuando click fuera del div que se cierre
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setIsDropdownVisible(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [dropdownRef])


    useEffect(() => {
        setSearchTerm("")
    }, [isDropdownVisible])


    return (
        <div className='relative' ref={dropdownRef}>
            <div
                className='min-w-[150px] cursor-pointer border border-gray-300 rounded-md p-1 flex items-center justify-between'
                onClick={() => setIsDropdownVisible(!isDropdownVisible)}
            >
                <span>
                    {
                        vendorId ?
                            vendors.find(el => el._id === vendorId)?.company
                            :
                            `Select a ${state.payment?.vendorType ?? "Vendor"}`
                    }
                </span>
                {
                    isDropdownVisible ?
                        <Icon icon="raphael:arrowup" />
                        :
                        <Icon icon="raphael:arrowdown" />
                }
            </div>
            {
                isDropdownVisible &&
                <div className="min-w-[200px] absolute mt-1 w-full rounded-md bg-gray-600 shadow-lg z-50">
                    <div className="p-2 border-b border-gray-300">
                        Find Active {state.payment?.vendorType}
                        <input
                            type="text"
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md text-black-50"
                            placeholder={`Search ${state.payment?.vendorType ?? "Vendor"} ...`}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                        {
                            !isLoading ?
                                filteredOptions.map((vendor, index) => {
                                    return (
                                        <div
                                            key={vendor._id}
                                            className='p-2 hover:bg-gray-100 hover:text-black-50 cursor-pointer'
                                            onClick={() => handleChange(vendor._id as string)}
                                        >
                                            {`${vendor.company} (${vendor.city} , ${vendor.vehicleType})`}
                                        </div>
                                    )
                                })
                                :
                                <span>Loading...</span>
                        }
                    </div>
                </div>
            }
        </div>
    )
}