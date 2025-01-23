import React, { useState } from 'react'
import styles from './dashboardPage.module.css'
import addLinkService from '../services/addLinkService'


const NewLinkModal = (props) => {

  const [formData, setFormData] = useState({
    originalLink: "",
    remarks: "",
    expiryDate: ""
  })

  const changeHandler = (e) => {
    setFormData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }

  const closeModal=()=>{
    props.visibility(false)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    console.log(formData)
    const response =await addLinkService(formData)
    const responseJson=await response.json()
    alert(responseJson.message)
    props.setLoading(true)
  }

  return (
    <div className={styles.linkModal}>

      <button type='button' onClick={closeModal}>Close</button>
      <form onSubmit={submitHandler}>
        <div>
          <label>Destination Url</label>
          <input
            type='text'
            name='originalLink'
            id='originalLink'
            value={formData.originalLink}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label>Remarks</label>
          <textarea
            id="remarks"
            name="remarks"
            value={formData.remarks}
            onChange={changeHandler}
          >

          </textarea>
        </div>

        <div>
          <label>Link Expiration</label>
          <input
            type='date'
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={changeHandler}
          />
        </div>

        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default NewLinkModal
