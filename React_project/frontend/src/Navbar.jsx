import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    height: fit-content;
`
const Logo = styled.h1`
    color: #044d04;
`
const Ul = styled.ul`
    list-style: none;
`
const B = styled.button`
    
`
const Searchbox = styled.div`
    
`
const Icon =styled.

const Navbar = () => {
  return (
    <Container>
        <Logo> Veggi Basket</Logo>
        <Searchbox>
        <input type="text" placeholder='Search'/>
        
        </Searchbox>
                
        <Ul>
            <li>Home</li>
            <li>About</li>
        </Ul>
        <B>
            login
        </B>
        <B>
            sign up
        </B>


    </Container>
  )
}

export default Navbar