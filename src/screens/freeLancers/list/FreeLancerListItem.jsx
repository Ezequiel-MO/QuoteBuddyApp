import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../hooks"
import { ButtonDeleted } from "../../../components/atoms"

export const FreeLancerListItem = ({ freeLancer, freelancers, setFreelancers }) => {

    const navigate = useNavigate()
    const { auth } = useAuth()

    return (
        <tbody>
            <tr className="mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50">
                <td
                    className="hover:text-blue-600 hover:underline cursor-pointer"
                    onClick={() => navigate("/app/freelancer/specs", { state: { freeLancer } })}
                >
                    {freeLancer.firstName}
                </td>
                <td>
                    {freeLancer.familyName}
                </td>
                <td>
                    {freeLancer.email}
                </td>
                <td>
                    {freeLancer.phone}
                </td>
                <td>
                    {freeLancer.halfDayRate}
                </td>
                <td>
                    {freeLancer.fullDayRate}
                </td>
                <td>
                    {freeLancer.languageSupplement}
                </td>
                <td>
                    {freeLancer.weekendHDRate}
                </td>
                <td>
                    {freeLancer.weekendFDRate}
                </td>
                <td>
                    {freeLancer.type}
                </td>
                <td>
                    {freeLancer.city}
                </td>
                <td className="cursor-pointer">
                    {
                        auth.role === "admin" &&
                        <ButtonDeleted
                        endpoint={"freelancers"}
                        ID={freeLancer._id}
                        setter={setFreelancers}
                        items={freelancers}
                        />
                    } 
                </td>
            </tr>
        </tbody>
    )
}
