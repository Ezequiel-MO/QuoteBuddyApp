import { FC } from "react"
import { useGetAccManagers } from '../../../../hooks'
import { IAccManager } from 'src/interfaces'


interface ProjectBudgetSelectorProps {
    accManagerValue: string
    errors: { [key: string]: string | undefined }
    handleChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
    handleBlur: (
        event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
}

export const ProjectAccManagersSelector: FC<ProjectBudgetSelectorProps> = ({
    accManagerValue,
    handleChange,
    errors,
    handleBlur
}) => {

    const { accManagers } = useGetAccManagers()
    const options: IAccManager[] = accManagers
    return (
        <div>
            <label className="block uppercase text-lg text-gray-400 font-medium mb-2">
                Account Manager
            </label>
            <select
                className="cursor-pointer w-full p-2 border rounded-md bg-gray-700 text-white focus:border-blue-500 focus:outline-none text-white-0"
                name="accountManager"
                value={accManagerValue}
                onChange={handleChange}
                onBlur={handleBlur}
            >
                <option value="">-- Choose an option --</option>
                {
                    options?.map((el) => {
                        return (
                            <option value={el._id} key={el._id}>
                                {el.email}
                            </option>
                        )
                    })
                }
            </select>
            {
                errors.accountManager && (
                    <p className="mt-1 text-red-500">{errors.accountManager}</p>
                )
            }
        </div>
    )
}