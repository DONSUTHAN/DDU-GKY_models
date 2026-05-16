import React from 'react'
import styled from 'styled-components'

const Container =styled.div`
    
`
const H = styled.h1`
    
`
const P = styled.p`
    
`
const Btn =styled.button`
    
`

const Hero = () => {
  return (
    <Container>
        <H>Fresh Produce <br />
        Directly from Farmer
        </H>
        <P>Buy fresh fruits and Vegitable directly from local farmers. <br />
        Quality produces ,fair prices,healthy,life.
        </P>
        <Btn>Shop Now</Btn>
    </Container>
  )
}

export default Hero