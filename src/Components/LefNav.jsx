import React from 'react'

import cuvetteLogo from '../assets/images/download 2.png'
import dashboardIcon from '../assets/images/icons/Icons.png'
import linksIcon from '../assets/images/icons/Icons (1).png'
import analyticsIcon from '../assets/images/icons/Icons (2).png'
import settingIcon from '../assets/images/icons/Icons (3).png'

import styles from './dashboardPage.module.css'


const LeftNav = (props) => {


    const DashboardClickHandler = (e) => {
        props.setSelectedTab('DasboardClickInfo')
    }

    const LinksClickHandler = (e) => {
        props.setSelectedTab('Links')
    }

    const AnalyticsClickHandler = (e) => {
        props.setSelectedTab('Analytics')
    }

    const SettingsClickHandler = (e) => {
        props.setSelectedTab('Settings')
    }


    return (
        <>
            <div>
                <img src={cuvetteLogo} alt='cuvette-logo' />
            </div>

            <div>
                <ul className={styles.dashboardLeftNavigation}>
                    <li onClick={DashboardClickHandler}>
                        <a><img src={dashboardIcon} alt='icon' />Dashboard</a>
                    </li>
                    <li onClick={LinksClickHandler}>
                        <a><img src={linksIcon} alt='icon' />Links</a>
                    </li>
                    <li onClick={AnalyticsClickHandler}>
                        <a><img src={analyticsIcon} alt='icon' />Analytics</a>
                    </li>
                    <li onClick={SettingsClickHandler}>
                        <a><img src={settingIcon} alt='icon' />Settings</a>
                    </li>
                </ul>

            </div>

        </>
    )
}

export default LeftNav
