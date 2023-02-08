import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { TableHeaders, SearchInput } from "../../../ui"
import { Spinner } from "../../../components/atoms"
import { useGetCompanies } from "../../../hooks"
import CompanyListItem from "./CompanyListItem"


const CompanyList = () => {
    const navigate = useNavigate()
    const [company] = useState({})
    const [searchItem, setSearchItem] = useState("")
    const { companies, setCompanies, isLoading } = useGetCompanies()
    const [foundCompanies, setFoundCompanies] = useState([])

    useEffect(() => {
        setFoundCompanies(companies)
    }, [companies])

    const filterList = (event) => {
        setSearchItem(event.target.value)
        const result = companies.filter(element =>
            element.name.toLowerCase().includes(event.target.value.toLowerCase())
        )
        setFoundCompanies(result)
        if (searchItem === ``) {
            setFoundCompanies(companies)
        }
    }

    const companyList = foundCompanies?.map(element => (
        <CompanyListItem
            key={element._id}
            company={element}
            companies={companies}
            setCompanies={setCompanies}
        />
    ))


    return (
        <>
            {/* <h1>Comming soon list companies</h1> */}
            <div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
                <div className="flex flex-col w-full">
                    <h1 className="text-2xl">Users List</h1>
                    <div className="flex flex-row justify-start">
                        <button
                            onClick={() => navigate('/app/company/specs', { state: { company } })}
                            className="mr-5 focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
                        >
                            Create New Company
                        </button>
                        <SearchInput searchItem={searchItem} filterList={filterList} />
                    </div>
                </div>
            </div>
            <hr />

            <div className="flex-1 m-4 flex-col">
                {isLoading ? (
                    <Spinner />
                ) : (
                    (companyList.length > 0 && (
                        <table className="w-full p-5">
                            <TableHeaders headers="company" />
                            {companyList}
                        </table>
                    )) || <h1>This company was not found</h1>
                )}
            </div>
        </>
    )
}

export default CompanyList