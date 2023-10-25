import { FC } from 'react'
import { TextInput } from '@components/atoms'
import { SelectLocation } from '../../../components/molecules'
import { TransferVehicleTypeSelector } from "./TransferVehicleTypeSelector"
import { ITransfer } from 'src/interfaces'

interface TransferFormFieldsProps {
    data: ITransfer
    setData: React.Dispatch<React.SetStateAction<any>>
    errors: { [key: string]: string | undefined }
    handleChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
    handleBlur: (
        event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
    update: boolean
}

const vehiclesTypes = ['SEDAN Car', 'MERCEDES', 'MINI VAN', 'MINI BUS', '30 SEATER BUS', '50 SEATER BUS', '70 SEATER BUS']

export const TransferFormFields: FC<TransferFormFieldsProps> = ({
    data,
    setData,
    handleChange,
    errors,
    handleBlur,
    update
}) => {
    return (
        <fieldset className="max-w-xl mx-auto p-6 bg-gray-800 rounded-lg">
            <legend>
                <h1 className="text-3xl text-white-0">General Transfer Data</h1>
            </legend>
            <div className='space-y-4'>
                <TextInput
                    type='text'
                    label='Company'
                    placeholder="Transportation company ..."
                    name='company'
                    value={data.company}
                    handleChange={handleChange}
                    errors={errors.company}
                    handleBlur={handleBlur}
                />
                <div>
                    <label className="block uppercase text-lg text-gray-400 font-medium mb-2">
                        Group Location
                    </label>
                    <SelectLocation
                        city={data.city}
                        setData={setData}
                        handleChange={handleChange}
                        name="city"
                    />
                    {
                        errors.city && !data.city && (
                            <p className="text-red-500 mt-1" style={{ marginLeft: "65%" }}>{errors.city}</p>
                        )
                    }
                    <div className='flex space-x-4'>
                        <div className='w-1/2'>
                            <TransferVehicleTypeSelector
                                options={vehiclesTypes}
                                vehicleType={data.vehicleType}
                                handleChange={handleChange}
                                errors={errors}
                                handleBlur={handleBlur}
                            />
                        </div>
                        <div className="w-1/2">
                            <TextInput
                                type='number'
                                label="vehicle capacity"
                                name="vehicleCapacity"
                                value={data.vehicleCapacity}
                                handleChange={handleChange}
                                errors={errors.vehicleCapacity}
                                handleBlur={handleBlur}
                            />
                        </div>
                    </div>
                </div>
                <div className='flex space-x-6'>
                    <TextInput
                        type='number'
                        label="Transfer in"
                        name="transfer_in"
                        value={data.transfer_in}
                        handleChange={handleChange}
                        errors={errors.transfer_in}
                        handleBlur={handleBlur}
                    />
                    <TextInput
                        type='number'
                        label="Transfer out"
                        name="transfer_out"
                        value={data.transfer_out}
                        handleChange={handleChange}
                        errors={errors.transfer_out}
                        handleBlur={handleBlur}
                    />
                    <TextInput
                        type='number'
                        label="Transfer in/out night"
                        name="transfer_in_out_night"
                        value={data.transfer_in_out_night}
                        handleChange={handleChange}
                        errors={errors.transfer_in_out_night}
                        handleBlur={handleBlur}
                    />
                </div>
                <div className='flex space-x-6'>
                    <TextInput
                        type='number'
                        label='Dispo 4h'
                        name='dispo_4h'
                        value={data.dispo_4h}
                        handleChange={handleChange}
                        errors={errors.dispo_4h}
                        handleBlur={handleBlur}
                    />
                    <TextInput
                        type='number'
                        label='Dispo 6h'
                        name='dispo_6h'
                        value={data.dispo_6h}
                        handleChange={handleChange}
                        errors={errors.dispo_6h}
                        handleBlur={handleBlur}
                    />
                    <TextInput
                        type='number'
                        label='Dispo 9h'
                        name='dispo_9h'
                        value={data.dispo_9h}
                        handleChange={handleChange}
                        errors={errors.dispo_9h}
                        handleBlur={handleBlur}
                    />
                </div>
                <div className='flex space-x-4'>
                    <TextInput
                        type='number'
                        label='Hextra'
                        name='hextra'
                        value={data.hextra}
                        handleChange={handleChange}
                        errors={errors.hextra}
                        handleBlur={handleBlur}
                    />
                    <TextInput
                        type='number'
                        label='Hextra night'
                        name='hextra_night'
                        value={data.hextra_night}
                        handleChange={handleChange}
                        errors={errors.hextra_night}
                        handleBlur={handleBlur}
                    />
                </div>
                <div className='flex space-x-4'>
                    <TextInput
                        type='number'
                        label='Dispo 5h out'
                        name='dispo_5h_out'
                        value={data.dispo_5h_out}
                        handleChange={handleChange}
                        errors={errors.dispo_5h_out}
                        handleBlur={handleBlur}
                    />
                    <TextInput
                        type='number'
                        label='Dispo 4h airport'
                        name='dispo_4h_airport'
                        value={data.dispo_4h_airport}
                        handleChange={handleChange}
                        errors={errors.dispo_4h_airport}
                        handleBlur={handleBlur}
                    />
                </div>
                <div className='flex space-x-4'>
                    <TextInput
                        type='number'
                        label='Dispo 4h night'
                        name='dispo_4h_night'
                        value={data.dispo_4h_night}
                        handleChange={handleChange}
                        errors={errors.dispo_4h_night}
                        handleBlur={handleBlur}
                    />
                    <TextInput
                        type='number'
                        label='Dispo 6h nightt'
                        name='dispo_6h_night'
                        value={data.dispo_6h_night}
                        handleChange={handleChange}
                        errors={errors.dispo_6h_night}
                        handleBlur={handleBlur}
                    />
                </div>
            </div>
        </fieldset>
    )
}