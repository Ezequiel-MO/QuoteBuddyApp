import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { IconNotification } from "src/components/header/notification/IconNotification"

export const FinancialReports = () => {

    const navigate = useNavigate()

    const handleNavigate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as Element;
        if (target.closest('.MuiModal-backdrop')) { // condicion si esta open el modal
            // console.log(target)
            return
        }
        navigate('/app/invoice')
    }

    return (
        <div
            className="relative text-white-100 bg-black-100 rounded bg-slate-500 p-3 m-1 mt-3 h-48 min-h-full w-60 card"
            onClick={(e) => handleNavigate(e)}
        >
            <div className="absolute top-4 right-3">
                <IconNotification modoleQuery='FinancialReports' />
            </div>
            <div className="indent-3 flex items-center text-white-100 bg-black-100 h-fit mt-3">
                <Icon
                    icon="fluent-mdl2:financial"
                    width="22"
                    height="22"
                    inline={true}
                />
                <p>Financial Reports</p>
            </div>
            <div>
                <p className="text-base pt-3 pl-0">
                    <i>
                        View all your invoices, proformas and sales forecast in one
                        place
                    </i>
                </p>
            </div>
        </div>
    )
}