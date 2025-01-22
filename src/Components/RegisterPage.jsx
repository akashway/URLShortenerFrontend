import React, { useState, useEffect } from 'react'
import { useNavigate,Link } from 'react-router-dom'

import registerService from '../services/registerService'
import styles from './registerPage.module.css'
import mainImage from '../assets/images/m_image.png'

const RegisterPage = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPass: ""
    })

    const [errors, setErrors] = useState({})


    const changeHandler = (e) => {
        const { name, value } = e.target

        setUserData(prevData => {
            return ({
                ...prevData,
                [name]: value
            })
        })
    }


    const validate = () => {
        const tempErrors = {}
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!userData.name) {
            tempErrors.name = 'Name is required'
        }

        if (!userData.email) {
            tempErrors.email = 'Email is required'
        }
        else if (!emailRegex.test(userData.email)) {
            tempErrors.email = 'Email is not valid'
        }

        if (!userData.password) {
            tempErrors.password = "Password is required"
        }

        if (!userData.confirmPass) {
            tempErrors.confirmPass = "Confirm Password is required"
        }

        else if (userData.password !== userData.confirmPass) {
            tempErrors.confirmPass = "Passwords do not match"
        }

        if (!userData.mobile) {
            tempErrors.mobile = "Mobile number is required";
        }
        else if (!/^\d{10}$/.test(userData.mobile)) {
            tempErrors.mobile = "Mobile number must be 10 digits"
        }

        setErrors(tempErrors)
        return Object.keys(tempErrors).length === 0
    }


    const submitHandler = async (e) => {
        e.preventDefault()
        if (validate()) {
            const response = await registerService(userData)
            const responseJson = await response.json()
            alert(responseJson.message)
            navigate("/login")
        }
    }


    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            navigate("/")
        }
    })


    return (
        <div className={styles.registerContainer}>
            <div>
                <img src={mainImage} alt="" />
            </div>
            <div>
                <form onSubmit={submitHandler}>
                    <input
                        type='text'
                        placeholder='Name'
                        name="name"
                        id="name"
                        value={userData.name}
                        onChange={changeHandler}
                    />
                    {errors.name && <p className={styles.error}>{errors.name}</p>}

                    <input
                        type='email'
                        placeholder='Email id'
                        name="email"
                        id="email"
                        value={userData.email}
                        onChange={changeHandler}
                    />
                    {errors.email && <p className={styles.error}>{errors.email}</p>}

                    <input
                        type='text'
                        placeholder='Mobile no.'
                        name="mobile"
                        id="mobile"
                        value={userData.mobile}
                        onChange={changeHandler}
                    />
                    {errors.mobile && <p className={styles.error}>{errors.mobile}</p>}
                    <input
                        type='password'
                        placeholder='Password'
                        name="password"
                        id="password"
                        value={userData.password}
                        onChange={changeHandler}
                    />
                    {errors.password && <p className={styles.error}>{errors.password}</p>}
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        name="confirmPass"
                        id="confirmPass"
                        value={userData.confirmPass}
                        onChange={changeHandler}
                    />
                    {errors.confirmPass && <p className={styles.error}>{errors.confirmPass}</p>}

                    <button type='submit'>Register</button>

                </form>
                <div>
                    Already have an account ? <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
