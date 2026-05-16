import React from 'react'

const Register = () => {
  return (
    // <Container>
    //     <H1>Create Account</H1>
    // <P>Register to get started</P>
    // <input type="text"placeholder='Full Name' />
    // <input type="text"placeholder='Enter your email' />
    // <input type="text"placeholder='Enter your password' />
    // <input type="text"placeholder='Confirm your password' />
    // {/* <input type="text"placeholder='Enter your email' /> */}
    // <Btn>Register</Btn>
    // <P>Already have an account?Login</P>
    // </Container>
    <div className="container">
      <h1>Create Account</h1>
      <p>Register to get started</p>
      <div className="inputs">
        <input type="text"placeholder='Full Name' />
        <input type="text"placeholder='Enter your email' />
        <input type="text"placeholder='Enter your password' />
        <input type="text"placeholder='Confirm your password' />
        <button></button>
      </div>
    </div>
  )
}

export default Register