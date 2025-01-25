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
import getAllLinksOfLoggedUser from '../services/getAllLinksOfLoggedUser'
import getAllAnalyticsOfLoggedUser from '../services/getAllAnalyticsOfLoggedUser'


const DashboardPage = () => {
    const [allLinks, setAllLinks] = useState([])
    const [linksLoading,setLinksLoading]=useState(true)
    const [allAnalytics, setAllAnalytics] = useState([])
    const [analyticsLoading,setAnalyticsLoading]=useState(true)
    const [currentUser, setCurrentUser] = useState({})
    const [activeTab, setActiveTab] = useState('DasboardClickInfo')
    const [newLinkModalVisibility, setNewLinkModalVisibility] = useState(false)

    const navigate = useNavigate()

    const getActiveTab = () => {
        switch (activeTab) {
            case 'DasboardClickInfo':
                return <DasboardClickInfo />

            case 'Links':
                return <Links allLinks={allLinks} setLinksLoading={setLinksLoading} setAnalyticsLoading={setAnalyticsLoading} />

            case 'Analytics':
                return <Analytics allAnalytics={allAnalytics}/>

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


    const getCurrentTimeAndDate = () => {
        const date = new Date()
        console.log(date)
    }

    // const createNewLinkHandler=()=>{
    //    return <NewLinkModal/>
    // }


    const getAllLinks = async () => {
        const response = await getAllLinksOfLoggedUser()
        const responseJson = await response.json()
        setAllLinks(responseJson)
    }


    const getAllAnalytics=async ()=>{
        const response = await getAllAnalyticsOfLoggedUser()
        const responseJson = await response.json()
        setAllAnalytics(responseJson)
    }


    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            navigate("/")
        }

        else {
            navigate("/login")
        }
    }, [])

    useEffect(() => {
        const getCurrentProfile = async () => {
            const response = await profileService()
            const responseJson = await response.json()
            setCurrentUser(responseJson)
        }
        getCurrentProfile()
    }, [])

    useEffect(() => {
        if(linksLoading){
            getAllLinks()
            setLinksLoading(false)
        }
    }, [linksLoading,setLinksLoading])

    useEffect(() => {
        if(analyticsLoading){
            getAllAnalytics()
            setAnalyticsLoading(false)
        }
    }, [analyticsLoading,setAnalyticsLoading])


    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.dashboardLeftSection}>
                <LeftNav setSelectedTab={setActiveTab} />
            </div>

            <div className={styles.dashboardRightSection}>
                <div className={styles.dashboardHeader}>
                    Good Morning {currentUser.name}
                    <button onClick={() => setNewLinkModalVisibility(!newLinkModalVisibility)}>Create new</button>
                    <button onClick={logout}>Logout</button>
                </div>
                <div className={styles.dashboardMain}>
                    {getActiveTab()}
                </div>
            </div>

            {newLinkModalVisibility && <NewLinkModal modalName="New Link" visibility={setNewLinkModalVisibility} setLoading={setLinksLoading}/>}
        </div>
    )
}

export default DashboardPage
