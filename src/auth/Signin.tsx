import React, { useState, MouseEvent } from 'react'
import { Link, Redirect, RouteComponentProps } from 'react-router-dom'
import Layout from '../core/Layout'
import axios, { AxiosResponse } from 'axios'
import { authenticate, isAuth } from './helpers'
import { ToastContainer, toast } from 'react-toastify'
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

  const handleChange = (name: string) => (event: React.FormEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: event.currentTarget.value })
  }

  const informParent = (response: AxiosResponse) => {
    authenticate(response, () => {
      isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private')
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
          // toast.success(`Hi ${response.data.user.name}! Welcome back.`);
          isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private')
        })
      })
      .catch(error => {
        console.log('Signin error', error.response.data)
        setValues({ ...values, buttonText: 'Submit' })
        toast.error(error.response.data.error)
      })
  }

  const signinForm = () => (
    <form>
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
        <h1 className="p-5 text-center">Signin</h1>
        <Google informParent={informParent} />
        <Facebook informParent={informParent} />
        {signinForm()}
        <br />
        <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">
          Forgot Password
        </Link>
      </div>
    </Layout>
  )
}

export default Signin
