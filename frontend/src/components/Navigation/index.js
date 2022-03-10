// frontend/src/components/Navigation/index.js
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../images/eventLight.png'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink to="/add-event" >Create an Event</NavLink>
        <NavLink to={`/tickets/users/${sessionUser.id}`}>My Tickets</NavLink>
        {/* <NavLink to="/my-events">My Events</NavLink> */}
          <ProfileButton  user={sessionUser} />


      </>

    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login" >Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className='nav-container'>
      <div className='navbar'>
        <div className='navbar-logo'>
            <NavLink exact to="/">
              <img src={logo} alt="Logo"></img>
            </NavLink>
        </div>
        <div className='navbar-right'>
          {isLoaded && sessionLinks}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
