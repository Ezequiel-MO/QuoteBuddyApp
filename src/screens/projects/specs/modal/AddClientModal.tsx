import React, { FC, ChangeEvent } from 'react'
import { ModalComponent } from 'src/components/atoms/modal/Modal'
import { ModalCancelButton } from 'src/components/atoms/'
import ClientMasterForm from "src/screens/clients/specs/ClientMasterForm"
import baseAPI from 'src/axios/axiosConfig'
import { toast } from 'react-toastify'
import { toastOptions, errorToastOptions } from 'src/helper/toast'
import { logger } from "src/helper/debugging/logger"
import { IClient } from '@interfaces/client'
import { useClient } from '@screens/clients/context/ClientContext'
import { useCurrentProject } from 'src/hooks'


const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '45%',
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflow: 'auto',
    padding: 5
}

interface ModalPaymentFormProps {
    companyId: string
    companyEmployees: IClient[]
    setEmployees: React.Dispatch<React.SetStateAction<IClient[]>>
    setSelectedEmployee: React.Dispatch<React.SetStateAction<string | undefined>>
}


export const ModalAddClientForm: FC<ModalPaymentFormProps> = ({
    companyId,
    companyEmployees,
    setEmployees,
    setSelectedEmployee
}) => {
    const { openAddClient, setOpenAddClient } = useClient()
    const { handleProjectInputChange } = useCurrentProject()

    const handleAddClientSubmit = async (dataClient: IClient) => {
        const loadingToast = toast.loading("please wait!")
        try {
            const responseClient = await baseAPI.post(`clients`, dataClient, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const update = {
                employees: [
                    ...companyEmployees,
                    responseClient.data.data.data._id
                ]
            }
            const responseCompany = await baseAPI.patch(`client_companies/${companyId}`, update) // hago un update para agregar el nuevo Client a la Company
            setEmployees(employees => [...employees, responseClient.data.data.data])
            // const value = [responseClient.data.data.data._id] as string | string[]
            const event = {
                target: {
                    name: 'clientAccManager',
                    value: [responseClient.data.data.data._id] as any,
                    type: 'select-one'
                }
            } as ChangeEvent<HTMLInputElement | HTMLSelectElement>
            handleProjectInputChange(event)
            setSelectedEmployee(responseClient.data.data.data._id)
            toast.dismiss(loadingToast)
            toast.success(`Client, created successfully`, toastOptions)
            setTimeout(() => {
                setOpenAddClient(false)
            }, 200)
        } catch (error: any) {
            toast.dismiss(loadingToast)
            console.log(error)
            toast.error(`Failed to create Client , ${error.response.data.message || ""}`, errorToastOptions)
            logger.logErrorToDatabase(error.response.data.message, `validation of the  Client  Create, in createEntity.ts`, "info")
            throw error
        }
    }

    return (
        <>
            <ModalComponent open={openAddClient} setOpen={setOpenAddClient} styleModal={styleModal}>
                <ModalCancelButton handleClose={() => setOpenAddClient(false)} />
                <div className='text-white-0'>
                    <ClientMasterForm handleAddClient={(client) => handleAddClientSubmit(client)} />
                </div>
            </ModalComponent>
        </>
    )
}