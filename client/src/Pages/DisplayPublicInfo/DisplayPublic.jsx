import React from 'react'
import DisplayPublicPage from './displayPublicPage'
import LeftSideBar from "../../components/LeftSidebar/LeftSidebar"
import RightSidebar from '../../components/RightSidebar/RightSidebar'

const DisplayPublic = ({ slideIn, handleSlideIn }) => {
  return (
    <div className="home-container-1">
     <LeftSideBar slideIn={slideIn} handleSlideIn={handleSlideIn}/>
     <div className="home-container-2">
        <DisplayPublicPage/>
        <RightSidebar />
      </div>
    </div>
  )
}

export default DisplayPublic
