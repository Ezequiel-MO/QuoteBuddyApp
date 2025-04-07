import { useState, FC } from 'react'
import { Icon } from '@iconify/react'
import { IProject } from '@interfaces/project'
import { listStyles } from 'src/constants/listStyles'
import { useProject } from '../../context/ProjectContext'
import { formatMoney } from 'src/helper/'
import { formatDate } from 'src/helper/formatDate'
import { MenuRestoreActions } from 'src/components/atoms/modal/menu/MenuRestoreActions'
import baseAPI from 'src/axios/axiosConfig'
import { ProjectDetailModal } from './modal/ProjectDetailModal'

interface ProjectListRestoreItemProps {
    item: IProject
}

export const ProjectListRestoreItem: FC<ProjectListRestoreItemProps> = ({ item: project }) => {

    const { dispatch, state } = useProject()

    const [openModal, setOpenModal] = useState(false)

    const handleViewDetails = () => {
        setOpenModal(true)
    }

    const handleRestore = async (projectId: string) => {
        const updatedProjects = state.projects.filter((el) => el._id !== projectId)
        await baseAPI.patch(`projects/isDeleted/true/${project._id}`)
        dispatch({ type: 'SET_PROJECTS', payload: updatedProjects })
    }

    const handleDelete = async (projectId: string) => {
        const updatedProjects = state.projects.filter((el) => el._id !== projectId)
        await baseAPI.delete(`projects/isDeleted/true/${project._id}`)
        dispatch({ type: 'SET_PROJECTS', payload: updatedProjects })
    }

    return (
        <tr className={`${listStyles.tr}`}>
            <td
                className={`${listStyles.td} hover:text-blue-600 hover:underline flex items-center`}
            >
                <Icon icon="fluent:delete-arrow-back-16-regular" width={20} className='mr-1' />
                {project.code}
            </td>
            <td className={`${listStyles.td} truncate`}>
                {project.groupLocation}
            </td>
            <td className={`${listStyles.td} truncate`}>
                {project?.clientCompany[0]?.name || project?.clientCompanyName}
            </td>
            <td className={`${listStyles.td} truncate`}>
                {project.groupName}
            </td>
            <td className={`${listStyles.td} truncate`}>
                {project.nrPax}
            </td>
            <td className={`${listStyles.td}`}>
                {project.arrivalDay}
            </td>
            <td className={`${listStyles.td}`}>
                {project.departureDay}
            </td>
            <td className={`${listStyles.td} truncate`}>
                {project.status}
            </td>
            <td className={`${listStyles.td} truncate`}>
                {formatMoney(project.estimate)}
            </td>
            <td className={`${listStyles.td} text-red-500`}>
                {project?.deletedAt ? formatDate(project?.deletedAt) : ''}
            </td>
            <td className={`${listStyles.td}`}>
                <ProjectDetailModal project={project} setOpen={setOpenModal} open={openModal} />
                <MenuRestoreActions
                    item={project}
                    itemType="Project"
                    itemName={project.code}
                    onViewDetails={handleViewDetails}
                    onRestore={(projectId) => handleRestore(projectId)}
                    onDelete={(projectId) => handleDelete(projectId)}
                    key={project._id}
                />
            </td>
        </tr>
    )
}
