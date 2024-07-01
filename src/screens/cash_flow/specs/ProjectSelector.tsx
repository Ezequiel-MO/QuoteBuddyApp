import { FC, useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { useApiFetch } from 'src/hooks/fetchData'
import { usePayment } from '../context/PaymentsProvider'
import { IProject } from '@interfaces/project'

interface ProjectSelectorProps {
    setProjectId: (value: string) => void
    projectId: string
}

export const ProjectSelector: FC<ProjectSelectorProps> = ({ projectId, setProjectId }) => {

    const { data: projects, isLoading } = useApiFetch<IProject[]>('projects')
    const { dispatch, errors, setErrors } = usePayment()


    const [searchTerm, setSearchTerm] = useState('')
    const [isDropdownVisible, setIsDropdownVisible] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const filteredOptions = searchTerm ? projects.filter(
        (el) =>
            el.code.toLowerCase().includes(searchTerm.toLowerCase())
    ) : projects

    const handleChange = (id: string) => {
        setProjectId(id)
        dispatch({
            type: "UPDATE_PAYMENT_FIELD",
            payload: {
                name: "project",
                value: id
            }
        })
        setErrors((prevErrors: any) => ({
            ...prevErrors,
            project: undefined
        }))
        setIsDropdownVisible(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && filteredOptions.length > 0) {
            handleChange(filteredOptions[0]._id as string)
            e.preventDefault()
        }
    }

    const selectProject = projects.find(el => el._id === projectId)

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
                        // selectProject &&
                        //     Object.values(selectProject).length > 0 ?
                        //     selectProject.code
                        //     :
                        //     'Select a Project'
                        projectId ?
                            projects.find(el => el._id === projectId)?.code
                            :
                            'Select a Project'
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
                        Find Active Project by code
                        <input
                            type="text"
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md text-black-50"
                            placeholder="Search Project..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                        {
                            !isLoading ?
                                filteredOptions.map((project, index) => {
                                    return (
                                        <div
                                            key={project._id}
                                            className='p-2 hover:bg-gray-100 hover:text-black-50 cursor-pointer'
                                            onClick={() => handleChange(project._id as string)}
                                        >
                                            {project.code}
                                        </div>
                                    )
                                })
                                :
                                <span>Loading...</span>
                        }
                    </div>
                </div>
            }
            {
                errors.project && (
                    <p className="mt-0 text-red-500">{errors.project}</p>
                )
            }
        </div>
    )
}