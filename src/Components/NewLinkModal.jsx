import React from 'react'
import styles from './dashboardPage.module.css'


const NewLinkModal = () => {
  return (
    <div className={styles.linkModal}>
      <form>
        <div>
            <label>Destination Url</label>
            <input type='text'/>
        </div>
        <div>
            <label>Remarks</label>
            <textarea></textarea>
        </div>

        <div>
            <label>Link Expiration</label>
            <input type='date'/>
        </div>
      </form>
    </div>
  )
}

export default NewLinkModal
