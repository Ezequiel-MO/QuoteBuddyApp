import { useState, useEffect } from "react"
import { TextInput, SelectInput } from '@components/atoms'
import { usePayment } from '../../context/PaymentsProvider'
import { useAuth } from 'src/context/auth/AuthProvider'
import { useLocation } from 'react-router-dom'




export const PaymentFormFields = () => {
    const { state, handleChange, errors, handleBlur } = usePayment()
    const { auth } = useAuth()

    const location = useLocation()

    const optionsStatus = [
        { name: 'Completed', value: 'Completed' },
        { name: 'Pending', value: 'Pending' },
        { name: 'Failed', value: 'Failed' }
    ]

    return (
        <fieldset className="max-w-xl mx-auto p-6 bg-gray-800 rounded-lg">
            <legend>
                <h1 className={`text-3xl ${location.pathname === "/app/cash_flow" ? "text-green-600 mt-4" : "text-white-0" }`}>
                    General Vendor Payment Data
                </h1>
            </legend>
            <div className="space-y-4">
                <div className="flex space-x-4">
                    <TextInput
                        label='amount'
                        placeholder='example: 001'
                        type='number'
                        name="amount"
                        value={state.payment?.amount}
                        handleChange={(e) => handleChange(e, "UPDATE_PAYMENT_FIELD")}
                    // errors={errors.invoiceNumber}
                    // handleBlur={handleBlur}
                    />
                    <TextInput
                        label='payment date'
                        placeholder='example: 001'
                        type='date'
                        name="paymentDate"
                        value={state.payment?.paymentDate}
                        handleChange={(e) => handleChange(e, "UPDATE_PAYMENT_FIELD")}
                    // errors={errors.invoiceNumber}
                    // handleBlur={handleBlur}
                    />
                </div>
                <div className="flex space-x-4">
                    <TextInput
                        label='method'
                        placeholder='Cash, Credit Card, Bank Transfer'
                        type='text'
                        name="method"
                        value={state.payment?.method}
                        handleChange={(e) => handleChange(e, "UPDATE_PAYMENT_FIELD")}
                    // errors={errors.invoiceNumber}
                    // handleBlur={handleBlur}
                    />
                    <div className="w-1/2">
                        <SelectInput
                            titleLabel="status"
                            placeholderOption="-- select a status --"
                            name="status"
                            value={state.payment?.status as string}
                            options={
                                auth.role === "admin" ? optionsStatus
                                    : [{ name: 'Pending', value: 'Pending' },]
                            }
                            handleChange={(e) => handleChange(e, "UPDATE_PAYMENT_FIELD")}
                        // errorKey="status"
                        // errors={errors}
                        // handleBlur={handleBlur}
                        />
                    </div>
                </div>
            </div>
        </fieldset>
    )
}