import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import agent from '../utils/agent';

import NotificationButton from '../components/notification/notificationButton';

const iconStyle = {
  width: '1.4rem',
  margin: "0 5px",
  fontSize: '1.4rem'
}

const logoutButtonStyle = {
  width: "3.2rem",
  height: "3.2rem",
  margin: "auto 5px",
  borderRadius: "50%"
}

function LoggedView(props) {
  const { user } = props;
  const [vis, setVis] = useState(false);

  function handleLogout(ev) {
    ev.preventDefault();
    agent.auth.logout()
  }

  return (
    <div className="navbar-end">
      <NotificationButton />
      <NavLink className="navbar-item has-text-black" to="/userprofile">
        {user.username}<FontAwesomeIcon icon={faUserCircle} style={iconStyle}/>
      </NavLink>
      <button className="navber-item button is-text" style={logoutButtonStyle} onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} style={iconStyle} />
      </button>
    </div>
  );
}

function UnloggedView(props) {
  return (
  <div className="navbar-end">
    <NavLink className="navbar-item has-background-primary has-text-white" to="/login">
      Log in
    </NavLink>
    <NavLink className="navbar-item" to="/registration">
      Register
    </NavLink>
  </div>
  );
}

function Navbar(props) {
  const { user } = props;

  return (
    <div>
      <div className="navbar is-white" style={{ borderBottom: '2px solid #AAA' }}>
        <div
          className="navbar-brand"
          style={{ width: '3.3rem', margin: '0px 15px', padding: '0 10px', fontSize: '1.7rem' }}
        >
          <NavLink exact to="/">
            <FontAwesomeIcon icon={faCalendar} />
          </NavLink>
        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
            {
              user.adminer ?
              <NavLink className="navbar-item" to="/orderlist">
                Orders
              </NavLink> :
              null
              }
              {
                user.adminer ?
                <NavLink className="navbar-item" to="/userlist">
                  Users
                </NavLink> :
                null
              }
            <NavLink className="navbar-item" to="/timetable">
              Timetables
            </NavLink>

            <NavLink className="navbar-item" to="/timeline">
              Timeline
            </NavLink>
            
          </div>
          {user.username ? <LoggedView user={user}/> : <UnloggedView />}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.usersReducer
  };
}

export default connect(mapStateToProps, null)(Navbar);
