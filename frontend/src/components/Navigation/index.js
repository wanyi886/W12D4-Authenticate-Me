// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../images/eventLight.png'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div >
        <NavLink to="/add-event" >Create an Event</NavLink>
        <ProfileButton  user={sessionUser} />
      </div>

    );
  } else {
    sessionLinks = (
      <nav className='navbar'>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </nav>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
          {/* <img src={logo} alt="Logo"></img> */}
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
