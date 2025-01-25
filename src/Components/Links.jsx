import React, { useState } from 'react'
import convertDate from '../commonFunction/convertDate'
import editIcon from '../assets/images/icons/edit-icons.png'
import deleteIcon from '../assets/images/icons/delete-icons.png'
import copyIcon from '../assets/images/icons/copy-icon.png'
import NewLinkModal from './NewLinkModal'
import getLinkById from '../services/getLinkById'
import deleteLinkById from '../services/deleteLinkById'
import { ToastContainer,toast } from 'react-toastify'

const URL = import.meta.env.VITE_BACKEND_URL

const Links = (props) => {

  const [editLinkModalVisibility, setEditLinkModalVisibility] = useState(false)
  const [linkData, setLinkData] = useState({
    originalLink: "",
    remarks: "",
    expiryDate: ""
  })

  function formatToDate(inputDateTime) {
    const date = new Date(inputDateTime)
    const year = date.getUTCFullYear()
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const day = String(date.getUTCDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const editClickHandler = async (id) => {
    const response = await getLinkById(id)
    const responseJson = await response.json()
    setLinkData({
      id:responseJson._id,
      originalLink: responseJson.originalLink,
      remarks: responseJson.remarks,
      expiryDate: formatToDate(responseJson.expiryDate)
    })
    setEditLinkModalVisibility(true)
  }

  const deleteClickHandler = async (id) => {
    const response = await deleteLinkById(id)
    const responseJson = await response.json()
    alert(responseJson.message)
    props.setLinksLoading(true)
    props.setAnalyticsLoading(true)
  }

  const copyClickHandler=(link)=>{
    navigator.clipboard.writeText(link).then(()=>{
      toast.success('Link Copied')
    })
    .catch((err)=>{
      console.error("Failed to copy text: ", err)
    })
  }

  // const shortLinkClickHandler = async (shortLink) => {
  //   const response = await fetch(`${URL}/link/click/${shortLink}`, {
  //     method: "GET",
  //     headers: {
  //       'Content-Type': 'application/json',
  //     }
  //   })
  //   console.log(response)
  //   if (response.redirected) { 
  //     window.location.href = response.url
  //   }
  //   props.setLinksLoading(true)
  //   props.setAnalyticsLoading(true)
  // }

  return (
    <div>
      {
        props.allLinks.length > 0 && (
          <div style={{ overflow: "auto", height: "300px" }}>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Original Link</th>
                  <th>Short Link</th>
                  <th>Remarks</th>
                  <th>Clicks</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  props.allLinks.map(link => {
                    return (
                      <tr key={link.shortLink}>
                        <td>{convertDate(link.createdAt)}</td>
                        <td>{link.originalLink}</td>
                        {/* <td onClick={() => shortLinkClickHandler(link.shortLink)}>{`${URL}/link/click/${link.shortLink}`}</td> */}
                        <td>
                        {`${URL}/${link.shortLink}`}
                        <img src={copyIcon} alt="edit-icon" onClick={() => copyClickHandler(`${URL}/${link.shortLink}`)} />
                        </td>
                        <td>{link.remarks}</td>
                        <td>{link.clickCount}</td>
                        <td>{link.status}</td>
                        <td>
                          <img src={editIcon} alt="edit-icon" onClick={() => editClickHandler(link._id)} />
                          <img src={deleteIcon} alt='delete-icon' onClick={() => deleteClickHandler(link._id)} />
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        )
      }

      <ToastContainer/>

      {editLinkModalVisibility && <NewLinkModal modalName="Edit Link" visibility={setEditLinkModalVisibility} setLoading={props.setLinksLoading} linkData={linkData} />}
    </div>
  )
}

export default Links
