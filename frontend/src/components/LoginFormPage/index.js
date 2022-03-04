import './LoginForm.css';

// import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
// import { loginUser } from '../../store/session';

// const LoginFormPage = () => {
//   const dispatch = useDispatch();
//   const sessionUser = useSelector(state => state.session.user)
//   const [ credential, setCredential] = useState('');
//   const [ password, setPassword ] = useState('');
//   const [ errors, setErrors ] = useState([]);

//   if (sessionUser) {
//     return (
//       <Redirect to="/" />
//     )
//   }

//   useEffect(() => {
//     // TODO: validate input info
//     setErrors()
//   })

//   const handleSubmit = (e) => {
//     e.preventDefault;

//     const user = {
//       credential,
//       password
//     }
//     dispatch(loginUser(user))
//   }

//   return (
  //   <>
  //   <h1>Log In</h1>
  //   <form onSubmit={handleSubmit}>
  //     <ul>
  //       {errors.map((error, idx) => <li key={idx}>{error}</li>)}
  //     </ul>
  //     <label>
  //       Username or Email
  //       <input
  //         type="text"
  //         value={credential}
  //         onChange={(e) => setCredential(e.target.value)}
  //         required
  //       />
  //     </label>
  //     <label>
  //       Password
  //       <input
  //         type="password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //         required
  //       />
  //     </label>
  //     <button type="submit">Log In</button>
  //   </form>
  //   </>

  // );
// }


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
    return dispatch(sessionActions.loginUser({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
        // errors comes from /api/session error handler
      });
  }

  return (
    <>
    <h1>Log In</h1>
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Log In</button>
    </form>
    </>

  );
}

export default LoginFormPage;
