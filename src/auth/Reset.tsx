import React, { useState, useEffect, MouseEvent } from 'react'
import { useParams } from 'react-router-dom'
import jwt from 'jsonwebtoken'
import Layout from '../core/Layout'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { Grid, Typography, TextField, Button } from '@mui/material'

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
      <Grid container justifyContent="center" spacing={2}>
        <Grid item lg={7}>
          <TextField fullWidth onChange={handleChange} type="password" value={newPassword} label="New Password" variant="standard" margin="dense" />

          <div>
            <Button onClick={clickSubmit} variant="contained" sx={{
              marginTop: '20px'
            }}>{buttonText}</Button>
          </div>
        </Grid>
      </Grid>
    </form>
  )

  return (
    <Layout>
      <div>
        <ToastContainer />
        <Grid container justifyContent="center" spacing={2}>
          <Grid item lg={6}>
            <Typography variant="h1" component="div" gutterBottom sx={{ textAlign: 'center', marginBottom: '40px' }}>
              {name}, create your new password
            </Typography>
            {passwordResetForm()}
          </Grid>
        </Grid>
      </div>
    </Layout>
  )
}

export default Reset
