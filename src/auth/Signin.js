import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    const { email, password, buttonText } = values;

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value});
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, buttonText: 'Submitting'});
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: { email, password }
        })
        .then(response => {
            console.log('Signin success', response);
            setValues({...values, name: '', email: '', password: '', buttonText: 'Submitted'});
            toast.success(`Hi ${response.data.user.name}! Welcome back.`);
        })
        .catch(error => {
            console.log('Signin error', error.response.data);
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error);
        })
    };

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
    );

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                <h1 className="p-5 text-center">Signin</h1>
                {signinForm()}
            </div>
        </Layout>
    );
};

export default Signin;
