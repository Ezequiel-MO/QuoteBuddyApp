import { useEffect } from 'react'
import baseAPI from '../../axios/axiosConfig'
import { useCurrentProject } from '../../hooks/useCurrentProject'
import ProjectList from '../projects/ProjectList/ProjectList'

const Dashboard = () => {
  const { currentProject, setCurrentProject } = useCurrentProject()
  const currentProjectIsLive = Object.keys(currentProject).length !== 0

  useEffect(() => {
    const getCurrentProjectFromDB = async () => {
      try {
        const res = await baseAPI.get(`v1/projects/${currentProject._id}`)
        const project = res.data.data.data
        setCurrentProject(project)
      } catch (error) {
        console.log(error)
      }
    }

    if (currentProjectIsLive) {
      getCurrentProjectFromDB()
    }
  }, [])

  return (
    <div className='flex flex-row'>
      <ProjectList />
    </div>
  )
}

export default Dashboard
