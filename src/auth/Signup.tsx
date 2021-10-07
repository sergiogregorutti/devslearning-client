import React, { useState, MouseEvent } from 'react'
import { Redirect } from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios'
import { isAuth } from './helpers'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    buttonText: 'Submit'
  })

  const { name, email, password, buttonText } = values

  const handleChange = (name: string) => (event: React.FormEvent<HTMLInputElement>) => {
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
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input onChange={handleChange('name')} type="text" value={name} className="form-control"></input>
      </div>

      <div className="form-group">
        <label className="text-muted">E-mail</label>
        <input onChange={handleChange('email')} type="email" value={email} className="form-control"></input>
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input onChange={handleChange('password')} type="password" value={password} className="form-control"></input>
      </div>

      <div>
        <button onClick={clickSubmit} className="btn btn-primary">{buttonText}</button>
      </div>
    </form>
  )

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {isAuth() ? <Redirect to="/" /> : null}
        <h1 className="p-5 text-center">Signup</h1>
        {signupForm()}
      </div>
    </Layout>
  )
}

export default Signup
