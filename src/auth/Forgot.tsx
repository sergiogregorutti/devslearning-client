import React, { useState, MouseEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { TextField, Button } from '@mui/material'

const Forgot = ({ history }: RouteComponentProps) => {
  const [values, setValues] = useState({
    email: '',
    buttonText: 'Request password reset link'
  })

  const { email, buttonText } = values

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    setValues({ ...values, [name]: event.currentTarget.value })
  }

  const clickSubmit = (event: MouseEvent) => {
    event.preventDefault()
    setValues({ ...values, buttonText: 'Submitting' })
    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API}/forgot-password`,
      data: { email }
    })
      .then(response => {
        console.log('FORGOT PASSWORD SUCCESS', response)
        toast.success(response.data.message)
        setValues({ ...values, buttonText: 'Requested' })
      })
      .catch(error => {
        console.log('FORGOT PASSWORD ERROR', error.response.data)
        toast.error(error.response.data.error)
        setValues({ ...values, buttonText: 'Request password reset link' })
      })
  }

  const passwordForgotForm = () => (
    <form>
      <div>
        <TextField onChange={handleChange('email')} type="email" value={email} label="E-mail" variant="standard" />
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
        <h1>Forgot password</h1>
        {passwordForgotForm()}
      </div>
    </Layout>
  )
}

export default Forgot
