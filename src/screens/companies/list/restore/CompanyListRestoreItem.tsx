import { FC, useState } from 'react'
import { Icon } from '@iconify/react'
import { listStyles } from 'src/constants/listStyles'
import { IClientCompany } from '@interfaces/clientCompany'
import { useCompany } from '../../context/CompanyContext'
import { formatDate } from 'src/helper/formatDate'
import { MenuRestoreActions } from 'src/components/atoms/modal/menu/MenuRestoreActions'
import baseAPI from 'src/axios/axiosConfig'
import { CompanyDetailModal } from './modal/CompanyDetailModal'

interface CompanyListRestoreItemProps {
    item: IClientCompany
    canBeAddedToProject: boolean
}

export const CompanyListRestoreItem: FC<CompanyListRestoreItemProps> = ({ item: company, }) => {

    const { state, dispatch } = useCompany()

    const [openModal, setOpenModal] = useState(false)

    const handleViewDetails = () => {
        setOpenModal(true)
    }

    const handleRestore = async (companyId: string) => {
        const updatedCompanies = state.companies.filter(el => el._id !== companyId)
        await baseAPI.patch(`client_companies/isDeleted/true/${company._id}`)
        dispatch({ type: 'SET_COMPANIES', payload: updatedCompanies })
    }

    const handleDelete = async (companyId: string) => {
        const updatedCompanies = state.companies.filter(el => el._id !== companyId)
        await baseAPI.delete(`client_companies/isDeleted/true/${company._id}`)
        dispatch({ type: 'SET_COMPANIES', payload: updatedCompanies })
    }



    return (
        <tr className={listStyles.tr}>
            <td
                className={`${listStyles.td} hover:text-blue-600 hover:underline flex items-center`}
            >
                <Icon icon="fluent:delete-arrow-back-16-regular" width={20} className='mr-1' />
                {company.name}
            </td>
            <td className={listStyles.td}>
                {company.address}
            </td>
            <td className={listStyles.td}>
                {company.country}
            </td>
            <td className={`${listStyles.td} text-red-500`}>
                {company?.deletedAt ? formatDate(company.deletedAt) : ''}
            </td>
            <td className={`${listStyles.td}`}>
                <CompanyDetailModal clientCompany={company} open={openModal} setOpen={setOpenModal} />
                <MenuRestoreActions
                    item={company}
                    itemType='Company'
                    onViewDetails={handleViewDetails}
                    onRestore={(companyId) => handleRestore(companyId)}
                    onDelete={(companyId) => handleDelete(companyId)}
                    key={company._id}
                />
            </td>
        </tr>
    )
}