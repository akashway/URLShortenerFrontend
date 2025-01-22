import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import profileService from '../services/profileService'
import LeftNav from './LefNav'
import styles from './dashboardPage.module.css'
import DasboardClickInfo from './DasboardClickInfo'
import Links from './Links'
import Analytics from './Analytics'
import Settings from './Settings'
import NewLinkModal from './NewLinkModal'



const DashboardPage = () => {
    const [currentUser, setCurrentUser] = useState({})
    const [activeTab, setActiveTab] = useState('DasboardClickInfo')
    const [newLinkModalVisibility, setNewLinkModalVisibility] = useState(false)

    const navigate = useNavigate()

    const getActiveTab = () => {
        switch (activeTab) {
            case 'DasboardClickInfo':
                return <DasboardClickInfo />

            case 'Links':
                return <Links />

            case 'Analytics':
                return <Analytics />

            case 'Settings':
                return <Settings />

            default:
                return ""
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        navigate("/login")
    }

    const getCurrentProfile = async () => {
        const response = await profileService()
        const responseJson = await response.json()
        setCurrentUser(responseJson)
    }


    const getCurrentTimeAndDate = () => {
        const date = new Date()
        console.log(date)
    }

    const createNewLinkHandler=()=>{
       return <NewLinkModal/>
    }


    useEffect(() => {
        getCurrentProfile()
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            navigate("/")
        }

        else {
            navigate("/login")
        }
    }, [])


    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.dashboardLeftSection}>
                <LeftNav setSelectedTab={setActiveTab} />
            </div>

            <div className={styles.dashboardRightSection}>
                <div className={styles.dashboardHeader}>
                    Good Morning {currentUser.name}
                    <button onClick={()=>setNewLinkModalVisibility(!newLinkModalVisibility)}>Create new</button>
                    <button onClick={logout}>Logout</button>
                </div>
                <div className={styles.dashboardMain}>
                    {getActiveTab()}
                </div>
            </div>

            {newLinkModalVisibility && <NewLinkModal/>}
        </div>
    )
}

export default DashboardPage
