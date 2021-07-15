import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { REGISTER_USER, LOGIN_USER } from '../../utils/mutations'
import AuthService from '../../utils/auth.js'

const Auth = () => {
  const [authState, setAuthState] = useState({
    name: '',
    email: '',
    password: '',
    lEmail: '',
    lPassword: ''
  })

  const [register] = useMutation(REGISTER_USER)
  const [login] = useMutation(LOGIN_USER)

  const handleInputChange = ({ target }) => {
    setAuthState({ ...authState, [target.name]: target.value })
  }
  const handleRegisterUser = async event => {
    event.preventDefault()
    const { data: { register: { token, user } } } = await register({
      variables: {
        name: authState.name,
        email: authState.email,
        password: authState.password
      }
    })
    console.log(token, user)
    AuthService.login(token)
  }
  const handleLoginUser = async event => {
    event.preventDefault()
    const { data: { login: { token, user } } } = await login({
      variables: {
        email: authState.lEmail,
        password: authState.lPassword
      }
    })
    console.log(token, user)
    AuthService.login(token)
  }
  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleRegisterUser}>
        <div className='flex-row space-between my-2'>
          <label htmlFor='name'>Name:</label>
          <input
            placeholder='name'
            name='name'
            type='name'
            id='name'
            onChange={handleInputChange}
          />
        </div>
        <div className='flex-row space-between my-2'>
          <label htmlFor='email'>Email:</label>
          <input
            placeholder='youremail@test.com'
            name='email'
            type='email'
            id='email'
            onChange={handleInputChange}
          />
        </div>
        <div className='flex-row space-between my-2'>
          <label htmlFor='pwd'>Password:</label>
          <input
            placeholder='******'
            name='password'
            type='password'
            id='pwd'
            onChange={handleInputChange}
          />
        </div>
        <div className='flex-row flex-end'>
          <button type='submit'>Register</button>
        </div>
      </form>
      <hr />
      <h1>Login</h1>
      <form onSubmit={handleLoginUser}>
        <div className='flex-row space-between my-2'>
          <label htmlFor='lEmail'>Email:</label>
          <input
            placeholder='youremail@test.com'
            name='lEmail'
            type='lEmail'
            id='lEmail'
            onChange={handleInputChange}
          />
        </div>
        <div className='flex-row space-between my-2'>
          <label htmlFor='lPassword'>Password:</label>
          <input
            placeholder='******'
            name='lPassword'
            type='lPassword'
            id='lPassword'
            onChange={handleInputChange}
          />
        </div>
        <div className='flex-row flex-end'>
          <button type='submit'>Login</button>
        </div>
      </form>
    </>
  )
}

export default Auth
