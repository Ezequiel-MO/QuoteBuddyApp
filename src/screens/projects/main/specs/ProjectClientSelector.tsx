import { FC, ChangeEvent, useState, useEffect } from "react"
import { useGetCompany } from '../../../../hooks'
import { IClientCompany, IClient } from 'src/interfaces'
import { ModalComponent } from '../../../../components/atoms'
import { AddClientToCompany } from '../../../clients/add/AddClientToCompany'

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


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    maxHeight: '90vh',
    overflow: 'auto',
    bgcolor: '#E1E1E1',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2
}
const classButtonDisabled = " px-5 rounded-md  cursor-not-allowed  bg-green-50 text-black-50"
const classButtonActivated = "px-5 rounded-md  cursor-pointer hover:bg-blue-300 bg-green-50 text-black-50"


export const ProjectClientSelector: FC<ProjectClientSelectorProps> = ({
    clientCompay,
    client,
    handleChange,
    errors,
    handleBlur
}) => {
    const [openModal, setOpenModal] = useState(false)
    const [forceRefresh, setForceRefresh] = useState(0)

    const { company, isLoading } = useGetCompany(clientCompay, forceRefresh) as {
        company: IClientCompany
        isLoading: boolean
    }

    const employees = !isLoading ? company.employees : []

    const comapnies: any = company

    const handleAddClient = () => {
        setForceRefresh((prevCount) => prevCount + 1)
        setOpenModal(false)
    }


    return (
        <div>
            <ModalComponent open={openModal} setOpen={setOpenModal} styleModal={style}>
                <AddClientToCompany selectedCompanyName={company.name} setOpen={handleAddClient} />
            </ModalComponent>
            <div className="flex justify-between items-center">
                <label className="block uppercase text-lg text-gray-400 font-medium mb-2">
                    CLIENT ACCOUNT MANAGER
                </label>
                <button
                    type="button"
                    className={comapnies.length > 0 ? classButtonDisabled : classButtonActivated}
                    onClick={(e) => {
                        e.stopPropagation()
                        setOpenModal((prev) => !prev ? true : false)
                    }}
                    disabled={comapnies.length > 0}
                >
                    ADD CLIENT
                </button>
            </div>
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