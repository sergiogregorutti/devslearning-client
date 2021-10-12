import React, { useState, useEffect, MouseEvent } from 'react'
import { useParams } from 'react-router-dom'
import jwt from 'jsonwebtoken'
import Layout from '../core/Layout'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { TextField, Button } from '@mui/material'

interface RouteParams {
  token: string
}

interface Token {
  name: string;
}

const Reset = () => {
  // props.match from react router dom
  const [values, setValues] = useState({
    name: '',
    token: '',
    newPassword: '',
    buttonText: 'Reset password'
  })

  const params = useParams<RouteParams>()

  useEffect(() => {
    const token = params.token
    const { name } = jwt.decode(token) as Token
    // console.log(name);
    if (token) {
      setValues({ ...values, name, token })
    }
  }, [])

  const { name, token, newPassword, buttonText } = values

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, newPassword: event.currentTarget.value })
  }

  const clickSubmit = (event: MouseEvent) => {
    event.preventDefault()
    setValues({ ...values, buttonText: 'Submitting' })
    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API}/reset-password`,
      data: { newPassword, resetPasswordLink: token }
    })
      .then(response => {
        console.log('RESET PASSWORD SUCCESS', response)
        toast.success(response.data.message)
        setValues({ ...values, buttonText: 'Done' })
      })
      .catch(error => {
        console.log('RESET PASSWORD ERROR', error.response.data)
        toast.error(error.response.data.error)
        setValues({ ...values, buttonText: 'Reset password' })
      })
  }

  const passwordResetForm = () => (
    <form>
      <div>
        <TextField onChange={handleChange} type="password" value={newPassword} label="New Password" variant="standard" />
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
        <h1>Hey {name}, Type your new password</h1>
        {passwordResetForm()}
      </div>
    </Layout>
  )
}

export default Reset
