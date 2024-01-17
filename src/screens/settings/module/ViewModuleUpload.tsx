import { useState, FC } from "react"
import { Icon } from '@iconify/react'
import Switch from '@mui/material/Switch'
import { ISetting } from "src/interfaces"

interface ViewModuleUploadProps {
    setting: ISetting
    onUpload: (value: boolean) => void
}


export const ViewModuleUpload: FC<ViewModuleUploadProps> = ({ setting, onUpload }) => {

    const [viewModule, setViewModule] = useState(setting?.viewFinancial)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setViewModule(e.target.checked)
        setTimeout(() => {
            onUpload(e.target.checked)
        }, 400)
    }

    return (
        <div
            className={`flex flex-col items-center p-4 border-2 border-gray-600 bg-gray-800  rounded-md shadow-md space-y-2 overflow-hidden relative`}
        >
            <h1 className="self-start text-xl text-white-0">
                Enable/Disable Module
            </h1>
            <form>
                <ul className=" list-outside px-16 py-3  border-2 border-gray-600 bg-slate-700  rounded-xl shadow-md space-y-2">
                    <li>
                        <div className="flex items-center space-x-2 mb-[15px]">
                            <Icon className="w-5 h-5" icon="fluent-mdl2:financial" />
                            <span className='text-xl'>Financial Reports</span>
                            <Switch
                                // inputProps={{ 'aria-label': 'controlled' }}
                                checked={viewModule}
                                onChange={handleChange}
                                color="success"
                            />
                        </div>
                    </li>
                </ul>
            </form>
        </div>
    )
}