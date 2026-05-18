import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'


const Container =styled.div`
    background-color: violet;
    display: flex;
    justify-content: space-around;


    align-items: center;

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




const NavLink = styled.div`
    display: flex;
    align-items: center;
`
const Btn = styled.button`
    background-color: green;
    padding: 13px 20px;
    border-radius: 13px;
`
const Button = styled.div`
    display: flex;
    gap: 4px;
`
// const Ul = styled.ul`
//     display: flex;
//     gap: 15px;

// `
const Li = styled.li`
    list-style: none;
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

       {/* <NavLink> 

        <Link to="/">Home</Link>
         <Link to="/">About</Link>
          <Link to="/">Contact</Link>

        </NavLink> */}
        <Ul>
            <Li>Home</Li>
             <Li>Contact</Li>
              <Li>About us</Li>
        </Ul>
        

        <Button>
        <Btn>Login</Btn>
        <Btn>Sign in</Btn>
        </Button>

    </Container>
  )
}

export default Navbar