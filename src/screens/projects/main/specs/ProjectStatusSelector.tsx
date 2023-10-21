import { FC } from "react"

interface ProjectStatusSelectorProps {
    options: string[]
    status: string
    errors: { [key: string]: string | undefined }
    handleChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
    handleBlur: (
        event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
}

export const ProjectStatusSelector: FC<ProjectStatusSelectorProps> = ({
    options,
    status,
    handleChange,
    errors,
    handleBlur
}) => {
    return (
        <div>
            <label className="block uppercase text-lg text-gray-400 font-medium mb-2">
                Project Status
            </label>
            <select
                className="cursor-pointer w-full p-2 border rounded-md bg-gray-700 text-white focus:border-blue-500 focus:outline-none text-white-0"
                name="status"
                value={status}
                onChange={handleChange}
                onBlur={handleBlur}
            >
                <option value="">-- Choose an option --</option>
                {
                    options?.map((el, index) => {
                        return (
                            <option value={el} key={index}>
                                {el}
                            </option>
                        )
                    })
                }
            </select>
            {
                errors.status && (
                    <p className="mt-1 text-red-500">{errors.status}</p>
                )
            }
        </div>
    )
}