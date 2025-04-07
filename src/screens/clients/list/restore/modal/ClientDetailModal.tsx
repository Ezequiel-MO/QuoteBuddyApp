import { IClient } from '@interfaces/client'
import React, { FC } from 'react'
import { ModalComponent, ModalCancelButton } from 'src/components/atoms'

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

interface ClientDetailModalProps {
    client: IClient
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ClientDetailModal: FC<ClientDetailModalProps> = ({ client, open, setOpen }) => {

    const handleModalClose = () => {
        setOpen(false)
    }


    return (
        <div role="menuitem">
            <ModalComponent open={open} setOpen={() => handleModalClose()} styleModal={styleModal}>
                <ModalCancelButton handleClose={() => handleModalClose()} />
                <h1 className='text-center mb-4 text-4xl'>
                    Client Details
                </h1>

                {/* Datos principales */}
                <div className="grid grid-cols-2 gap-2 text-sm text-white">
                    <p>
                        <strong>First Name: </strong>
                        {client?.firstName}
                    </p>
                    <p>
                        <strong>Family Name:</strong>
                        {client?.familyName }
                    </p>
                    <p>
                        <strong>Email: </strong>
                        {client?.email}
                    </p>
                    <p>
                        <strong>Phone number: </strong>
                        {client?.phone}
                    </p>
                    <p>
                        <strong>Quote Language: </strong>
                        {client?.quoteLanguage}
                    </p>
                    <p>
                        <strong>Country: </strong>
                        {client?.country}
                    </p>
                    <p>
                        <strong>Company: </strong>
                        {client?.clientCompany}
                    </p>
                    <p>
                        <strong>Origin Method: </strong>
                        {client.origin?.method}
                    </p>
                    <p>
                        <strong>Qualification Status: </strong>
                        {client.qualification.status}
                    </p>
                </div>

                {/* Descripción */}
                <div className={`mt-6 ${!client.origin.textContent && 'opacity-0 h-0'} `} >
                    <h3 className="text-md font-semibold mb-2">Description of Client Origin</h3>
                    <div className="bg-gray-800 text-white-0 p-4 rounded whitespace-pre-line">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: client.origin.textContent ?? ''
                            }}
                        ></div>
                    </div>
                </div>
                <div className={`mt-6 ${!client.qualification.textContent && 'opacity-0 h-0'} `} >
                    <h3 className="text-md font-semibold mb-2">Description of Client Status</h3>
                    <div className="bg-gray-800 text-white-0 p-4 rounded whitespace-pre-line">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: client.qualification.textContent ?? ''
                            }}
                        ></div>
                    </div>
                </div>
            </ModalComponent>
        </div>
    )
}