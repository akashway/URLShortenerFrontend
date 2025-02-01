import React,{useContext} from 'react'
import convertDate from '../commonFunction/convertDate'
import { MyContext } from '../context/ContextProvider'
const URL = import.meta.env.VITE_BACKEND_URL


const Analytics = (props) => {
    const { setOffsetAnalytics } = useContext(MyContext)
  
  return (
    <div>
       <div>
      {
        props.allAnalytics.length > 0 && (
          <div style={{ overflow: "auto", maxWidth: "1200px", height: "500px" }}>
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

    <button onClick={() => setOffsetAnalytics(currPage => {
        props.setAnalyticsLoading(true)
        return Math.max(currPage - 1, 1)
      })}>Prev</button>
      <button onClick={() => setOffsetAnalytics(currPage => {
        props.setAnalyticsLoading(true)
        return currPage + 1
      })}>Next</button>
    </div>
  )
}

export default Analytics
