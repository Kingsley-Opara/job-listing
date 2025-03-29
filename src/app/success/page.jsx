import React from 'react'
import Navbar from '../components/Navbar'
import { GlobalStateProvider } from '../context'


function Page() {
  return (
    <div className='dark:bg-black text-black dark:text-white'>
      <GlobalStateProvider>
        <Navbar/>
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-green-500 text-2xl font-bold">Form Submitted Successfully!</h1>
        </div>
      </GlobalStateProvider>
    </div>
  )
}

export default Page
