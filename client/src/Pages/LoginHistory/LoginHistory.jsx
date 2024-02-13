import React from 'react'
import LoginHistoryPage from './LoginHistoryPage'
import LeftSideBar from '../../components/LeftSidebar/LeftSidebar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
const LoginHistory = ({ slideIn, handleSlideIn }) => {
  return (
    <div className="home-container-1">
     <LeftSideBar slideIn={slideIn} handleSlideIn={handleSlideIn}/>
     <div className="home-container-2">
        <LoginHistoryPage/>
        <RightSidebar />
      </div>
    </div>
  )
}

export default LoginHistory
