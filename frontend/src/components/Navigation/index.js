// frontend/src/components/Navigation/index.js
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../images/eventLight2.png'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <div className="left-nav">
        <div className="icon">
          <NavLink exact to="/">
            <img src={logo} alt="Logo" className='eventlight'></img>
          </NavLink>
        </div>
      </div>

      <div className='right-nav'>
        <ul className='nav-menu'>
          <li className='nav-item'>
            <NavLink to="/add-event" >Create an Event</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to={`/tickets/users/${sessionUser.id}`}>My Tickets</NavLink>
          </li>
          <li className='nav-item'>
            <ProfileButton  user={sessionUser} />
          </li>
        </ul>
      </div>

      </>
    );
  } else {
    sessionLinks = (
      <div className="nav-container">
        <NavLink exact to="/" className="nav-logo">
          <img src={logo} alt="Logo"></img>
        </NavLink>
        <ul className='nav-menu'>
          <li className='nav-item'>
            <NavLink to="/login" >Log In</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to="/signup">Sign Up</NavLink>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <header className='navbar'>
          {isLoaded && sessionLinks}
    </header>
  );
}

export default Navigation;
