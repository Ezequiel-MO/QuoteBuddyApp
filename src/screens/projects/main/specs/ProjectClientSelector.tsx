import { FC, ChangeEvent, useState, useEffect } from "react"
import { useGetCompany } from '../../../../hooks'
import { IClientCompany, IClient } from 'src/interfaces'
import { Spinner } from '../../../../components/atoms'

interface ProjectClientSelectorProps {
    clientCompay: string,
    client: string
    errors: { [key: string]: string | undefined }
    handleChange: (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
    handleBlur: (
        event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
}

export const ProjectClientSelector: FC<ProjectClientSelectorProps> = ({
    clientCompay,
    client,
    handleChange,
    errors,
    handleBlur
}) => {

    const { company, isLoading } = useGetCompany(clientCompay) as {
        company: IClientCompany
        isLoading: boolean
    }

    const employees = !isLoading ? company.employees : []


    return (
        <div>
            <label className="block uppercase text-lg text-gray-400 font-medium mb-2">
                Account Manager
            </label>
            <select
                className="cursor-pointer w-full p-2 border rounded-md bg-gray-700 text-white focus:border-blue-500 focus:outline-none text-white-0"
                name="clientAccManager"
                value={client}
                onChange={handleChange}
                onBlur={handleBlur}
            >
                {
                    !clientCompay &&
                    <option value="">
                        --First select a company--
                    </option>
                }
                {
                    isLoading &&
                    <option value="">
                        loading...
                    </option>
                }
                {
                    employees?.length > 0 ?
                        <option value="">
                            --- Select an option ---
                        </option>
                        :
                        clientCompay &&
                        <option value="">
                            has no employees
                        </option>

                }
                {
                    employees?.map((el) => {
                        return (
                            <option value={el._id} key={el._id}>
                                {`${el.firstName} ${el.familyName}`}
                            </option>
                        )
                    })
                }
            </select>
            {
                errors.clientAccManager && (
                    <p className="mt-1 text-red-500">{errors.clientAccManager}</p>
                )
            }
        </div>
    )
}