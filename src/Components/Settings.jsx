import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import updateUserById from '../services/updateUserService'
import DeleteUserById from '../services/deleteUserService'

const Settings = (props) => {

    const [userData, setUserData] = useState(props.currentUser)
    const navigate=useNavigate()

    const deleteUser = async () => {
        try {
            const response = await DeleteUserById(userData.id)
            const responseJson = await response.json()
            alert(responseJson.message)
            localStorage.removeItem('token')
            navigate("/register")

        }
        catch (err) {
            alert('Some error while Deleting user')
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const response = await updateUserById(userData, userData.id)
            const responseJson = await response.json()
            alert(responseJson.message)
        }
        catch (err) {
            alert('Some error while upadating')
        }
    }

    const changeHandler = (e) => {
        setUserData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    return (
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
                <input
                    type='email'
                    placeholder='Email id'
                    name="email"
                    id="email"
                    value={userData.email}
                    onChange={changeHandler}
                />
                <input
                    type='text'
                    placeholder='Mobile no.'
                    name="mobile"
                    id="mobile"
                    value={userData.mobile}
                    onChange={changeHandler}
                />
                <button type='submit'>Save Changes</button>
                <button type='button' onClick={deleteUser}>Delete Account</button>
            </form>
        </div>
    )
}

export default Settings
