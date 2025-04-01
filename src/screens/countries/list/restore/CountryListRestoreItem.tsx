import { FC, useState } from 'react'
import { listStyles } from 'src/constants/listStyles'
import { ICountry } from '@interfaces/country'
import { useCountry } from '../../context/CountriesContext'
import { Icon } from '@iconify/react'
import { formatDate } from 'src/helper/formatDate'
import { MenuRestoreActions } from 'src/components/atoms/modal/menu/MenuRestoreActions'
import baseAPI from 'src/axios/axiosConfig'
import { CountryDetailModal } from './modal/CountryDetailModal'

interface CountryListItemProps {
    item: ICountry
    canBeAddedToProject: boolean
}

export const CountryListRestoreItem: React.FC<CountryListItemProps> = ({ item: country }) => {

    const { state, dispatch } = useCountry()

    const [openModal, setOpenModal] = useState(false)

    const handleViewDetails = () => {
        setOpenModal(true)
    }

    const handleRestore = async (countryId: string) => {
        const updatedCountries = state.countries.filter(el => el._id !== countryId)
        await baseAPI.patch(`countries/isDeleted/true/${country._id}`)
        dispatch({ type: 'SET_COUNTRIES', payload: updatedCountries })
    }

    const handleDelete = async (countryId: string) => {
        const updatedCountries = state.countries.filter(el => el._id !== countryId)
        await baseAPI.delete(`countries/isDeleted/true/${country._id}`)
        dispatch({ type: 'SET_COUNTRIES', payload: updatedCountries })
    }

    return (
        <tr className={listStyles.tr}>
            <td
                className={`${listStyles.td} hover:text-blue-600 hover:underline flex items-center`}
            >
                <Icon icon="fluent:delete-arrow-back-16-regular" width={20} className='mr-1' />
                {country.name}
            </td>
            <td className={listStyles.td}>
                {country.accessCode}
            </td>
            <td className={listStyles.td}>
                {country.quoteLanguage}
            </td>
            <td className={`${listStyles.td} text-red-500`}>
                {country.deletedAt ? formatDate(country.deletedAt) : ''}
            </td>
            <td className={`${listStyles.td}`}>
                <CountryDetailModal country={country} open={openModal} setOpen={setOpenModal} />
                <MenuRestoreActions
                    item={country}
                    itemType='Country'
                    onViewDetails={handleViewDetails}
                    onRestore={(countryId) => handleRestore(countryId)}
                    onDelete={(countryId) => handleDelete(countryId)}
                    key={country._id}
                />
            </td>
        </tr>
    )
}
