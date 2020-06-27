import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/authContext'
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const USER_CREATE = gql`
  mutation userCreate
   {
       userCreate
       {
       username
       email
       }
   }

`

const CompleteRegistration = () => {
    const { dispatch } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    let history = useHistory();

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegisteration'));
    }, [history]);


    const [userCreate] = useMutation(USER_CREATE)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!email || !password) {
            toast.error(`Email and Password is Required`);
            return
        }
        try {
            const result = await auth.signInWithEmailLink(email, window.location.href);
            console.log(result);
            if (result.user.emailVerified) {
                window.localStorage.removeItem('emailForRegisteration');
                let user = auth.currentUser;
                await user.updatePassword(password);

                // dispatch user with token and email
                // redirect user

                const idTokenResult = await user.getIdTokenResult();
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: { email: user.email, token: idTokenResult.token }
                });

                // make api request to save/update date to mongodb
                userCreate();

                history.push('/');
            }
        } catch (error) {
            console.log('Registration error', error.message);
            setLoading(false);
            toast.error(error.message);
        }
    };

    return (
        <div className="contianer p-5">
            {loading ? <h4 className="text-danger">Loading...</h4> : <h4>complete Your Register</h4>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        placeholder="Enter email"
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="Enter password"
                        disabled={loading}
                    />
                </div>
                <button className="btn btn-raised btn-primary" disabled={!email || loading}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CompleteRegistration;
