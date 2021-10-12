import React, { useState, MouseEvent } from 'react'
import { Link as RouterLink, Redirect, RouteComponentProps } from 'react-router-dom'
import Layout from '../core/Layout'
import axios, { AxiosResponse } from 'axios'
import { authenticate, isAuth } from './helpers'
import { ToastContainer, toast } from 'react-toastify'
import { TextField, Button } from '@mui/material'
import Google from './Google'
import Facebook from './Facebook'
import 'react-toastify/dist/ReactToastify.css'

const Signin = ({ history }: RouteComponentProps) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    buttonText: 'Submit'
  })

  const { email, password, buttonText } = values

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: event.target.value })
  }

  const informParent = (response: AxiosResponse) => {
    authenticate(response, () => {
      history.push('/')
    })
  }

  const clickSubmit = (event: MouseEvent) => {
    event.preventDefault()
    setValues({ ...values, buttonText: 'Submitting' })
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/signin`,
      data: { email, password }
    })
      .then(response => {
        console.log('Signin success', response)

        authenticate(response, () => {
          setValues({ ...values, email: '', password: '', buttonText: 'Submitted' })
          history.push('/')
        })
      })
      .catch(error => {
        console.log('Signin error', error.response.data)
        setValues({ ...values, buttonText: 'Submit' })
        toast.error(error.response.data.error)
      })
  }

  const signinForm = () => (
    <form style={{ marginTop: '15px' }}>
      <div>
        <TextField onChange={handleChange('email')} type="email" value={email} label="E-mail" variant="standard" />
      </div>

      <div>
        <TextField onChange={handleChange('password')} type="password" value={password} label="Password" variant="standard" />
      </div>

      <div>
        <Button onClick={clickSubmit} variant="contained" sx={{
          marginTop: '20px'
        }}>{buttonText}</Button>
        <Button variant="text" component={RouterLink} to="/auth/password/forgot" sx={{
          marginTop: '20px', marginLeft: '10px'
        }}>Forgot Password</Button>
      </div>
    </form>
  )

  return (
    <Layout>
      <div>
        <ToastContainer />
        {isAuth() ? <Redirect to="/" /> : null}
        <h1>Sign In</h1>
        <Google informParent={informParent} />
        <Facebook informParent={informParent} />
        {signinForm()}
      </div>
    </Layout>
  )
}

export default Signin
