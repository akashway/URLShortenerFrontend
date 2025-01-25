import React, { useState } from 'react'
import styles from './dashboardPage.module.css'
import addLinkService from '../services/addLinkService'
import convertDate from '../commonFunction/convertDate'
import updateLinkByIdService from '../services/updateLinkByIdService'

const NewLinkModal = (props) => {

  const [formData, setFormData] = useState({
    originalLink: props.modalName === "New Link" ? "" : props.linkData.originalLink,
    remarks: props.modalName === "New Link" ? "" : props.linkData.remarks,
    expiryDate:props.modalName === "New Link" ? "" : props.linkData.expiryDate
  })

  const changeHandler = (e) => {
    setFormData(prevData => {
      return ({
        ...prevData,
        [e.target.name]: e.target.value
      })
    })
  }

  const closeModal = () => {
    props.visibility(false)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    console.log(formData)
    if (props.modalName === "New Link") {
      const response = await addLinkService(formData)
      const responseJson = await response.json()
      alert(responseJson.message)
    }
    else {
      if (formData.originalLink === "") {
        setFormData((prevData) => ({
          ...prevData,
          originalLink: props.linkData.originalLink
        }))
      }
      if (formData.remarks === "") {
        setFormData((prevData) => ({
          ...prevData,
          remarks: props.linkData.remarks
        }))
      }
      if (formData.expiryDate === "") {
        setFormData((prevData) => ({
          ...prevData,
          expiryDate: props.linkData.expiryDate
        }))
      }
      const response = await updateLinkByIdService(props.linkData.id, formData)
      const responseJson = await response.json()
      alert(responseJson.message)
    }
    props.setLoading(true)
  }

  return (
    <div className={styles.linkModal}>
      <h1>{props.modalName}</h1>
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

        <button type='submit'>{props.modalName === "New Link" ? "Create" : "Save"}</button>
      </form>
    </div>
  )
}

export default NewLinkModal
