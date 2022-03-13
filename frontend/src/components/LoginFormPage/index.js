import './LoginForm.css';
import coffeImg from '../../images/coffee.jpg'

import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
        // errors comes from /api/session error handler
      });
  }

  const handleClick = () => {
    return dispatch(sessionActions.login({ credential: "Demo-lition", password: "password" }))
  }

  return (
    <div className='outter-container'>
      <div className='form-container'>
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <div className='form-label'>
            <label>
              Username or Email
            </label>
          </div>
          <div className='form-input'>
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
          </div>

          <div className='form-label'>
            <label>
              Password
            </label>
          </div>

          <div className='form-input'>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
          </div>

          <div>
            <button className="btn-login" type="submit">Log In</button>
          </div>
        </form>

        <div>
          <button className="btn-demo" type="submit" onClick={handleClick}>Demo User Log In</button>
        </div>
      </div>

      <div className='img-container'>
        <img src={coffeImg} />
      </div>
    </div>
  );
}

export default LoginFormPage;
