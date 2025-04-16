import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { useCurrentProject } from 'src/hooks'

export const IntermediatePage = () => {
    const navigate = useNavigate()
    const { currentProject } = useCurrentProject()

    const handleNavigate = (path:string) =>{
        setTimeout(()=>{
            navigate(path)
        },350)
    }

    return (
        <div className="min-h-screen w-full px-4 py-12 bg-[#e5ebf2]">
            <h1 className="text-3xl font-semibold text-center text-gray-900 mb-12">
                Group Name: <span className="text-[#e95420]">{currentProject.groupName}</span>
            </h1>

            <div className="flex flex-wrap justify-center gap-10">
                <div
                    className="bg-[#4b5a70] text-white-0 rounded-xl p-6 w-80 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out active:scale-95 shadow-md hover:bg-amber-600"
                    onClick={() => handleNavigate('/client/main-page')}
                >
                    <div className="flex items-center mb-4">
                        <Icon icon="material-symbols:description" className="mr-2 text-white" width="24" height="24" />
                        <h2 className="text-lg">Original Quote</h2>
                    </div>
                    <p className="text-sm text-white/90 leading-relaxed">
                        Access the complete trip details, including schedule, images, hotels, and more.
                    </p>
                </div>

                <div
                    className="bg-[#4b5a70] text-white-0 rounded-xl p-6 w-80 cursor-pointer hover:scale-105  transition-all duration-300 ease-in-out active:scale-95 shadow-md hover:bg-amber-600"
                    onClick={() => handleNavigate('/client/intermediate/documentation')}
                >
                    <div className="flex items-center mb-4">
                        <Icon icon="hugeicons:coming-soon-02" className="mr-2 text-white" width="24" height="24" />
                        <h2 className="text-lg">More coming soon</h2>
                    </div>
                    <p className="text-sm text-white/90 leading-relaxed">
                        Additional content is under development and will be available soon.
                    </p>
                </div>
            </div>
        </div>
    )
}