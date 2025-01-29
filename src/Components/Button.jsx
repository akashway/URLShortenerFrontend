import React from 'react'
import styles from './button.module.css'

const Button = (props) => {
  return (
    <button className={props.children=="SignUp"?styles.signupButton:styles.loginButton} onClick={props.clickNavigation}>
      {props.children}
    </button>
  )
}

export default Button
