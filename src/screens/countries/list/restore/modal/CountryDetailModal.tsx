import { ICountry } from '@interfaces/country'
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

interface CountryDetailModalProps {
    country: ICountry
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const CountryDetailModal: FC<CountryDetailModalProps> = ({
    country,
    open,
    setOpen
}) => {
    const handleModalClose = () => {
        setOpen(false)
    }

    return (
        <div role="menuitem">
            <ModalComponent
                open={open}
                setOpen={() => handleModalClose()}
                styleModal={styleModal}
            >
                <ModalCancelButton handleClose={() => handleModalClose()} />
                <h1 className="text-center mb-4 text-4xl">
                    Country Details
                </h1>

                {/* Datos principales */}
                <div className="grid grid-cols-3 gap-2 text-sm text-white">
                    <p>
                        <strong>name: </strong>
                        {country.name}
                    </p>
                    <p>
                        <strong>Access Code: </strong>
                        {country.accessCode}
                    </p>
                    <p>
                        <strong>Quote Language: </strong>
                        {country.quoteLanguage}
                    </p>
                </div>
            </ModalComponent>
        </div>
    )
}