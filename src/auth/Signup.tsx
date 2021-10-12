import React, { useState, MouseEvent } from 'react'
import { Redirect } from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios'
import { isAuth } from './helpers'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { TextField, Button } from '@mui/material'

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    buttonText: 'Submit'
  })

  const { name, email, password, buttonText } = values

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: event.currentTarget.value })
  }

  const clickSubmit = (event: MouseEvent) => {
    event.preventDefault()
    setValues({ ...values, buttonText: 'Submitting' })
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/signup`,
      data: { name, email, password }
    })
      .then(response => {
        console.log('Signup success', response)
        setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' })
        toast.success(response.data.message)
      })
      .catch(error => {
        console.log('Signup error', error.response.data)
        setValues({ ...values, buttonText: 'Submit' })
        toast.error(error.response.data.error)
      })
  }

  const signupForm = () => (
    <form>
      <div>
        <TextField onChange={handleChange('name')} type="text" value={name} label="Name" variant="standard" />
      </div>

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
      </div>
    </form>
  )

  return (
    <Layout>
      <div>
        <ToastContainer />
        {isAuth() ? <Redirect to="/" /> : null}
        <h1>Signup</h1>
        {signupForm()}
      </div>
    </Layout>
  )
}

export default Signup
