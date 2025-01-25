import React from 'react'
import convertDate from '../commonFunction/convertDate'
const URL = import.meta.env.VITE_BACKEND_URL


const Analytics = (props) => {
  return (
    <div>
       <div>
      {
        props.allAnalytics.length > 0 && (
          <div style={{overflow:"auto",height:"300px"}}>
            <table>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Original Link</th>
                  <th>Short Link</th>
                  <th>ip address</th>
                  <th>User Device</th>
                </tr>
              </thead>
              <tbody>
                {
                  props.allAnalytics.map(analytic => {
                    return (
                      <tr key={analytic._id}>
                        <td>{convertDate(analytic.timestamp)}</td>
                        <td>{analytic.originalLink}</td>
                        <td>{`${URL}/link/${analytic.shortLink}`}</td>
                        <td>{analytic.ipAddress}</td>
                        <td>{analytic.device}</td>
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
    </div>
  )
}

export default Analytics
