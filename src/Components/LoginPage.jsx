import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import loginService from '../services/loginService'
import mainImage from '../assets/images/m_image.png'
import styles from './loginPage.module.css'

const LoginPage = () => {

    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })


    const changeHandler = (e) => {
        const { name, value } = e.target

        setUserData(prevData => {
            return ({
                ...prevData,
                [name]: value
            })
        })
    }



    const submitHandler = async (e) => {
        e.preventDefault()
        let responseJson
        const response = await loginService(userData)
        if (response.status === 200) {
            responseJson = await response.json()
            localStorage.setItem('token', responseJson.token)
            alert("Looged in Succesfully")
            navigate("/")
        }
        else{
            responseJson = await response.json()
            alert(responseJson.message)
        }
    }


    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            navigate("/")
        }
    })

    return (
        <div className={styles.loginContainer}>
            <div>
                <img src={mainImage} alt="" />

            </div>
            <div>
                <form onSubmit={submitHandler}>
                    <input
                        type='email'
                        placeholder='Email id'
                        name="email"
                        id="email"
                        value={userData.email}
                        onChange={changeHandler}
                    />

                    <input
                        type='password'
                        placeholder='Password'
                        name="password"
                        id="password"
                        value={userData.password}
                        onChange={changeHandler}
                    />


                    <button type='submit'>Register</button>

                </form>

                <div>
                    Don’t have an account?<Link to="/register">SignUp</Link>
                </div>
            </div>
        </div>

    )
}

export default LoginPage
