import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import RightBar from '../../components/rightbar/Rightbar'
import './home.css'

const Home = () => {
  return (
    <>
      <Topbar />
      <div className='homeContainer'>
        <Sidebar />
        <Feed />
        <RightBar />
      </div>
    </>
  )
}

export default Home
