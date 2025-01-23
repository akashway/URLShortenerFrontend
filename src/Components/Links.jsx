import React from 'react'
const URL = import.meta.env.VITE_BACKEND_URL

const Links = (props) => {

  const shortLinkClickHandler = async (shortLink) => {
    const deviceInfo = {
      device: navigator.userAgent,
    }
    const response= await fetch(`${URL}/link/${shortLink}`,{
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
    },
    body:JSON.stringify(deviceInfo)
    })
    props.setLinksLoading(true)
    props.setAnalyticsLoading(true)
    return response
  }

  return (
    <div>
      {
        props.allLinks.length > 0 && (
          <div>
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
                        <td>{link.createdAt}</td>
                        <td>{link.originalLink}</td>
                        <td onClick={() => shortLinkClickHandler(link.shortLink)}>{`${URL}/link/${link.shortLink}`}</td>
                        <td>{link.remarks}</td>
                        <td>{link.clickCount}</td>
                        <td>{link.status ? "Active" : "Not Active"}</td>
                        <td>Action</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        )
      }
    </div>
  )
}

export default Links
