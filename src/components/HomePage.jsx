import React from 'react'
import Navbar from './Navbar'
import LandingPage from './LandingPage'
import FeaturesSection from './FeaturesSection'
import studentImg from '../../public/assets/student.png'

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
    <Navbar />
    <main>
      <LandingPage studentImg={studentImg}/>
      <FeaturesSection />
    </main>
    <footer className="bg-white py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto text-center text-gray-500">
        <p>© {new Date().getFullYear()} EduManage. All rights reserved.</p>
      </div>
    </footer>
  </div>
  )
}

export default HomePage
