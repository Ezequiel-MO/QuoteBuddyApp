import { FC } from 'react'

interface SelectMeetingFormProps {
    label: string;
    name: string;
    options: string[];
    value: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export const SelectMeetingForm: FC<SelectMeetingFormProps> = ({ label = "", name, options, value, handleChange }) => {
    return (
        <div>
            <label htmlFor="">{label}</label>
            <select className='
                form-control w-full
                px-3
                py-1.5
                text-base
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:outline-none'
                name={name}
                value={value}
                onChange={(e) => handleChange(e)}
            >
                <option value="">--- Select an option ---</option>
                {
                    options.map((el, index) => (
                        <option key={index} value={el}>
                            {el}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}