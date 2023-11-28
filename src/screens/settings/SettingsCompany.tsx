import { FC } from "react"
import { CompanyLogo } from "./menu/CompanyLogo"
import { CompanyColors } from "./menu/CompanyColors"

export const SettingsCompany = () => {
    return (
        <>
            <CompanyLogo />
            <div style={{marginTop:"30px"}}>
                <CompanyColors />
            </div>
        </>
    )
}