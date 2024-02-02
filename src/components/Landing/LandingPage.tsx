import React from 'react'
import Hero from './Hero'
import NavbarLanding from './NavbarLanding'
import Benefits from './Benefits'
import Services from './Services'
import Partners from './Partners'

const LandingPage = () => {
  return (
    <div>
        <NavbarLanding />
        <Hero />
        <Benefits />
        <Services />
        <Partners />
    </div>
  )
}

export default LandingPage