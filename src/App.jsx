import { Routes,Route } from "react-router-dom"
import DashboardPage from "./Components/DashboardPage"
import LoginPage from "./Components/LoginPage"
import RegisterPage from "./Components/RegisterPage"

import styles from './app.module.css'

function App() {

  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<DashboardPage/>} />
        <Route path="login" element={<LoginPage/>} />
        <Route path="register" element={<RegisterPage/>} />
      </Routes>
    </div>
  )
}

export default App
