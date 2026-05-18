import React from 'react'
import styled from 'styled-components'

const Container =styled.div`
    background-color: violet;
    display: flex;
    justify-content: space-around;
`
const H =styled.h1`
    
`
const Ul = styled.ul`
    display: flex;
    gap: 39px;
    list-style: none;
    margin: 0%;
    padding:0%;
`
const Li = styled.li`
    

`
const Btn = styled.button`
    background-color: green;
    
`
const Button = styled.div`
    
`
const Navbar = () => {
  return (
    <Container>
        <H>vegi bascket</H>
        <Ul>
        <Li>Home</Li>
        <Li>Product</Li>
        <Li>About Us</Li>
        <Li>Login</Li>
        <Li>Register</Li>
        </Ul>
        <Button>
        <Btn>login</Btn>
        <Btn>login</Btn>
        </Button>

    </Container>
  )
}

export default Navbar