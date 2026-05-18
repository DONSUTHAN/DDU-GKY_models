import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    
`
const H = styled.h1`
    
`
const P =styled.p`
    
`
const Btn = styled.button`
    
` 


const Login = () => {
  return (
    <Container>
        <H>Welcome!</H>
        <P>Login to continue</P>
        <input type="text"placeholder='Enter your email' />
        <input type="text"placeholder='Enter your password' />
        <Btn>Login</Btn>
        <P>Don't have an account?</P>

    </Container>
  )
}

export default Login