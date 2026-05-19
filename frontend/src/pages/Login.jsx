import React from "react"

const Login = () => {
  return(
  <div className="form-page">
    <form action="" className="form-container">
      <h2>Login</h2>

      <input type="email" placeholder="Enter your Email" />

      <input type="password" placeholder="Enter your password"/>

      <button>
        login
      </button>

    </form>
  </div>
  )
}

// const Login = () => {
//   return (
//     <Container>
//         <H>Welcome!</H>
//         <P>Login to continue</P>
//         <input type="text"placeholder='Enter your email' />
//         <input type="text"placeholder='Enter your password' />
//         <Btn>Login</Btn>
//         <P>Don't have an account?</P>

//     </Container>
//   )
// }

export default Login