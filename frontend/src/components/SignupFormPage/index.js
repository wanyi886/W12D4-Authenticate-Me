// frontend/src/components/SignupFormPage/index.js
import './SignupForm.css';
import drinking from '../../images/drinking.jpg'
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className='outter-container'>
      <div className='form-container'>
        <h1>Create an Account</h1>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <div>
            <label>
              Email
            </label>
          </div>

          <div className='form-input'>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
          </div>

          <div>
            <label>
              Username
            </label>
          </div>

          <div className='form-input'>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
          </div>

          <div>
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
            <label>
              Confirm Password
            </label>
          </div>
          <div className='form-input'>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
          </div>
          <div>
            <button className="btn-login" type="submit">Sign Up</button>
          </div>
          <div className='login-container'>
            <button  className="btn-demo" href="/login">Already have an account?</button>
          </div>
        </form>
      </div>
      <div className='img-container'>
        <img src={drinking} />
      </div>

    </div>
  );
}

export default SignupFormPage;
