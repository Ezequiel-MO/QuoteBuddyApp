import { FC, useEffect, RefObject } from "react"
import { ShowImagesButton } from '../../../../components/atoms'
import { IProject } from 'src/interfaces'

interface IBuget {
    name: string
    value: string
}

interface ProjectBudgetSelectorProps {
    options: IBuget[]
    budget: string
    errors: { [key: string]: string | undefined }
    handleChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
    handleBlur: (
        event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    fileInput: RefObject<HTMLInputElement>
    project: IProject
    openModal: boolean
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}


export const ProjectBudgetSelector: FC<ProjectBudgetSelectorProps> = ({
    options,
    budget,
    handleChange,
    errors,
    handleBlur,
    open,
    setOpen,
    fileInput,
    project,
    openModal,
    setOpenModal
}) => {

    useEffect(() => {
        if (budget === 'budgetAsPdf') {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }, [budget])


    return (
        <div>
            <label className="block uppercase text-lg text-gray-400 font-medium mb-2">
                Budget
            </label>
            <select
                className="cursor-pointer w-full p-2 border rounded-md bg-gray-700 text-white focus:border-blue-500 focus:outline-none text-white-0"
                name="budget"
                value={budget}
                onChange={handleChange}
                onBlur={handleBlur}
            >
                <option value="">-- Choose an option --</option>
                {
                    options?.map((el, index) => {
                        return (
                            <option value={el.value} key={index}>
                                {el.name}
                            </option>
                        )
                    })
                }
            </select>
            {
                open &&
                (project?.imageContentUrl?.length === undefined
                    || project?.imageContentUrl?.length === 0)
                &&
                (
                    <input
                        id="file-upload"
                        type="file"
                        ref={fileInput}
                        name="imageContentUrl"
                        multiple={false}
                        disabled={!open ? true : false}
                        style={{ marginTop: "10px" }}
                        title="Select a pdf file"
                        accept=".pdf"
                    />
                )
            }
            {
                open && project?.imageContentUrl?.length > 0 &&
                <div>
                    <br />
                    <ShowImagesButton
                        name={true}
                        setOpen={setOpenModal}
                        nameValue={'SHOW PDF'}
                    />
                </div>

            }
            {
                errors.budget && (
                    <p className="mt-1 text-red-500">{errors.budget}</p>
                )
            }
        </div>
    )
}