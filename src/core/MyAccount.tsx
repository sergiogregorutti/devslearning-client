import React, { useState, useEffect, MouseEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Layout from './Layout'
import axios from 'axios'
import { isAuth, getCookie, signout, updateUser } from '../auth/helpers'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { Typography, TextField, Button } from '@mui/material'

const MyAccount = ({ history }: RouteComponentProps) => {
  const [values, setValues] = useState({
    role: '',
    name: '',
    email: '',
    password: '',
    buttonText: 'Submit'
  })

  const token = getCookie('token')

  const loadProfile = () => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('PRIVATE PROFILE UPDATE', response)
        const { role, name, email } = response.data
        setValues({ ...values, role, name, email })
      })
      .catch(error => {
        console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error)
        if (error.response.status === 401) {
          signout(() => {
            history.push('/')
          })
        }
      })
  }

  useEffect(() => {
    loadProfile()
  }, [])

  const { name, email, password, buttonText } = values

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: event.currentTarget.value })
  }

  const clickSubmit = (event: MouseEvent) => {
    event.preventDefault()
    setValues({ ...values, buttonText: 'Submitting' })
    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API}/user/update`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { name, password }
    })
      .then(response => {
        console.log('PRIVATE PROFILE UPDATE SUCCESS', response)
        updateUser(response, () => {
          setValues({ ...values, buttonText: 'Submitted' })
          toast.success('Profile updated successfully')
        })
      })
      .catch(error => {
        console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error)
        setValues({ ...values, buttonText: 'Submit' })
        toast.error(error.response.data.error)
      })
  }

  const updateForm = () => (
    <form>
      <div>
        <TextField onChange={handleChange('name')} type="text" value={name} label="Name" variant="standard" />
      </div>

      <div>
        <TextField onChange={handleChange('email')} type="email" value={email} label="E-mail" variant="standard" disabled />
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
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        <Typography variant="h1" component="div" gutterBottom>
          My Account
        </Typography>
        {updateForm()}
      </div>
    </Layout>
  )
}

export default MyAccount
