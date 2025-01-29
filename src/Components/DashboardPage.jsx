import React, { useState, useEffect,useContext } from 'react'
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
import { getClickByDays, getClickByDevice, getTotalClicks } from '../services/getClickCounts'
import { MyContext } from '../context/ContextProvider'


const DashboardPage = () => {
    const [allLinks, setAllLinks] = useState([])
    const [linksLoading, setLinksLoading] = useState(true)
    const [allAnalytics, setAllAnalytics] = useState([])
    const [analyticsLoading, setAnalyticsLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState({})
    const [activeTab, setActiveTab] = useState('DasboardClickInfo')
    const [newLinkModalVisibility, setNewLinkModalVisibility] = useState(false)

    const [totalClicks,setTotalClick]=useState({})
    const [dayWiseClicks,setDayWiseClick]=useState([])
    const [deviceWiseClicks,setDeviceWiseClick]=useState([])

    const {offset}=useContext(MyContext)
    const navigate = useNavigate()

    const getActiveTab = () => {
        switch (activeTab) {
            case 'DasboardClickInfo':
                return <DasboardClickInfo
                    totalClicks={totalClicks}
                    dayWiseClicks={dayWiseClicks}
                    deviceWiseClicks={deviceWiseClicks}
                 />

            case 'Links':
                return <Links
                    allLinks={allLinks}
                    setLinksLoading={setLinksLoading}
                    setAnalyticsLoading={setAnalyticsLoading}
                />

            case 'Analytics':
                return <Analytics allAnalytics={allAnalytics} />

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


    const getGreetings = () => {
        const currentHour = new Date().getHours()

        if (currentHour >= 0 && currentHour < 12) {
            return "Good morning!"
        } else if (currentHour >= 12 && currentHour < 17) {
            return "Good afternoon!"
        } else if (currentHour >= 17 && currentHour < 20) {
            return "Good evening!"
        } else {
            return "Good night!"
        }
    }


    const getCurrentTimeAndDate = () => {
        const date = new Date()
        const options = {
            weekday: 'short',
            month: 'short',
            year: '2-digit',

        }
        const formatter = new Intl.DateTimeFormat('en-US', options)
        return formatter.format(date)
    }

    // const createNewLinkHandler=()=>{
    //    return <NewLinkModal/>
    // }


    const getAllLinks = async () => {
        const response = await getAllLinksOfLoggedUser(offset)
        const responseJson = await response.json()
        setAllLinks(responseJson)
    }


    const getAllAnalytics = async () => {
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


    useEffect(()=>{
       const fetchTotalClick=async ()=>{
        const response = await getTotalClicks()
        const responseJson = await response.json()
        setTotalClick(responseJson)
       }
       fetchTotalClick()
    },[])

    useEffect(()=>{
        const fetchDayWiseClick=async ()=>{
         const response = await getClickByDays()
         const responseJson = await response.json()
         setDayWiseClick(responseJson)
        }
        fetchDayWiseClick()
     },[])

     useEffect(()=>{
        const fetchDeviceWiseClick=async ()=>{
         const response = await getClickByDevice()
         const responseJson = await response.json()
         setDeviceWiseClick(responseJson)
        }

        fetchDeviceWiseClick()
     },[])

    useEffect(() => {
        if (linksLoading) {
            getAllLinks()
            setLinksLoading(false)
        }
    }, [linksLoading, setLinksLoading,offset])

    useEffect(() => {
        if (analyticsLoading) {
            getAllAnalytics()
            setAnalyticsLoading(false)
        }
    }, [analyticsLoading, setAnalyticsLoading])


    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.dashboardLeftSection}>
                <LeftNav setSelectedTab={setActiveTab} />
            </div>

            <div className={styles.dashboardRightSection}>
                <div className={styles.dashboardHeader}>
                    <div>
                        <h1>{getGreetings()}{currentUser.name}</h1>
                        <p>{getCurrentTimeAndDate()}</p>
                    </div>
                    <div>
                        <button onClick={() => setNewLinkModalVisibility(!newLinkModalVisibility)}>Create new</button>
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
                <div className={styles.dashboardMain}>
                    {getActiveTab()}
                </div>
            </div>

            {newLinkModalVisibility && <NewLinkModal modalName="New Link" visibility={setNewLinkModalVisibility} setLoading={setLinksLoading} />}
        </div>
    )
}

export default DashboardPage
