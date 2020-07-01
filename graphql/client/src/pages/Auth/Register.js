import React, { useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import AuthForm from '../../components/forms/AuthForm';

const Register = () => {


    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const config = {
            url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
            handleCodeInApp: true
        }
        await auth.sendSignInLinkToEmail(email, config)

        // notification for verification
        toast.success(`verification link is sent to ${email}. click on the link to complete Registeration`);

        // set email in local storage
        window.localStorage.setItem('emailForRegisteration', email);

        // clear state
        setEmail('');
        setLoading('');
    };

    return (
        <div className="contianer p-5">
            {loading ? <h4 className="text-danger">Loading....</h4> : <h4>Register</h4>}
            <AuthForm email={email} loading={loading} setEmail={setEmail} handleSubmit={handleSubmit} />
        </div>
    );
};

export default Register;
