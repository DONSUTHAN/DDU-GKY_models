import React from 'react'
import styled from 'styled-components'

const Container = styled.div `
    
`
const Logo = styled.h1 `
    color: brown;

`
const Navbar = () => {
  return (
    <Container>
        <Logo>
            eszy shop
        </Logo>
    </Container>
  )
}

export default Navbar