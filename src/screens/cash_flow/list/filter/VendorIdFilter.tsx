import React, { useState, useEffect, useRef } from 'react'
import { filterStyles } from 'src/constants/filterStyles'
import { usePayment } from '../../context/PaymentsProvider'
import { IVendorInvoice } from 'src/interfaces/vendorInvoice'
import { useApiFetch } from 'src/hooks/fetchData'
import { Icon } from '@iconify/react'

export const VendorIdFilter = () => {
	const { state, dispatch } = usePayment()

	const { data: vendorInvoices, isLoading } = useApiFetch<IVendorInvoice[]>(
		`vendorInvoices${'?vendorType=' + state.vendorTypeFilter}${
			state.projectIdFilter && '&project=' + state.projectIdFilter
		}`
	)

	const dropdownRef = useRef<HTMLDivElement>(null)
	const [isDropdownVisible, setIsDropdownVisible] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')

	// if (!state.vendorTypeFilter) {
	// 	return null
	// }

	const vendors = vendorInvoices
		.map((el) => el.vendor)
		.filter(
			(
				vendor: any,
				index,
				vendorInvoices // filter para eleminar los duplicados
			) =>
				index ===
				vendorInvoices.findIndex((item: any) => item._id === vendor?._id)
		)

	const filteredOptions = searchTerm
		? vendors.filter(
				(vendor: any) =>
					(vendor?.name &&
						vendor?.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
					(vendor?.company &&
						vendor?.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
					vendor?.email.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		: vendors

	const handleChangeFilter = (id: string) => {
		dispatch({
			type: 'SET_FILTER',
			payload: { name: 'vendorIdFilter', value: id }
		})
		setIsDropdownVisible(false)
		setSearchTerm('')
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && filteredOptions.length > 0) {
			handleChangeFilter(filteredOptions[0]?._id as string)
			setSearchTerm('')
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

	return (
		<div
			className={`relative  transition-all duration-500 ease-in-out ${
				state.vendorTypeFilter
					? 'opacity-100 max-h-40 mt-2'
					: 'opacity-0 max-h-0 overflow-hidden'
			}`}
			ref={dropdownRef}
		>
			<div
				className="min-w-[150px] cursor-pointer border border-gray-300 rounded-md p-2 flex items-center justify-between hover:border-blue-600"
				onClick={() => setIsDropdownVisible(!isDropdownVisible)}
			>
				<span
					className={`${
						state.vendorTypeFilter === 'Freelancer' ? 'text-[15px]' : ''
					}`}
				>
					{state.vendorIdFilter
						? vendors.find((el) => el?._id === state.vendorIdFilter)?.name ||
						  (vendors.find((el) => el?._id === state.vendorIdFilter) as any)
								?.email ||
						  (vendors.find((el) => el?._id === state.vendorIdFilter) as any)
								?.company
						: `Select a ${state.vendorTypeFilter}`}
				</span>
				{isDropdownVisible ? (
					<Icon icon="raphael:arrowup" />
				) : (
					<Icon icon="raphael:arrowdown" />
				)}
			</div>

			{
				// isDropdownVisible &&
				<div
					className={`min-w-[200px] absolute mt-1 w-[300px] rounded-md bg-gray-600 shadow-lg z-50  transition-all duration-500 ease-in-out ${
						isDropdownVisible
							? 'opacity-100 max-h-[400px]'
							: 'opacity-0 max-h-0 overflow-hidden'
					}`}
				>
					<div className="p-2 border-b border-gray-300">
						Find Active Vendor
						<input
							type="text"
							className="mt-1 w-full p-2 border border-gray-300 rounded-md text-black-50"
							placeholder={`Search ${state.vendorTypeFilter}...`}
							onChange={(e) => setSearchTerm(e.target.value)}
							value={searchTerm}
							onKeyDown={handleKeyDown}
						/>
					</div>
					<div className="max-h-60 overflow-y-auto">
						<div
							className="p-2 hover:bg-gray-100 hover:text-black-50 cursor-pointer"
							onClick={() => handleChangeFilter('')}
						>
							All {state.vendorTypeFilter}
						</div>
						{filteredOptions.map((vendor: any, index) => (
							<div
								key={index}
								className="p-2 hover:bg-gray-100 hover:text-black-50 cursor-pointer text-lg"
								onClick={() => handleChangeFilter(vendor?._id as string)}
							>
								{`${vendor?.name || vendor?.company || vendor?.email}`}
							</div>
						))}
					</div>
				</div>
			}
		</div>
	)
}
