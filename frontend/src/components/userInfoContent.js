import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import agent from '../utils/agent';

import UserOrders from './userOrders';

const deleteButtonStyle = {
  left: '80%',
  width: '20%',
  margin: '2% 0'
};

const userInfoContentStyle = {
  width: '50%',
  margin: '1% auto', 
  padding: '1%',
  boxShadow: '0 4px 6px rgba(0,0,0,0.5)'
};

function UserInfoContent(props) {
  const { id, user, isLoad } = props;
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');


  useEffect(() => {
    if (isLoad) {
      console.log(user);
      agent.users.getById(id);
    }
  });

  function changeUsername(ev) {
    ev.preventDefault();
    setNewUsername(ev.target.value);
  }

  function changeEmail(ev) {
    ev.preventDefault();
    setNewEmail(ev.target.value);
  }

  function updateUsername(ev) {
    ev.preventDefault();
    agent.users.update(user.id, {username: newUsername});
  }

  function updateEmail(ev) {
    ev.preventDefault();
    agent.users.update(user.id, {email: newEmail});
  }

  function deleteUser(ev) {
    ev.preventDefault();
    agent.users.delete(user.id);
  }

  return (
    <div style={userInfoContentStyle}>
      <div>

        <div>
          name: {user.username}
        </div>

        <div>
          <input
            className="input"
            type="text"
            onChange={changeUsername}
            style={{width: '80%'}}
          />

          <button
            className="button is-primary"
            onClick={updateUsername}
            style={{width: '20%'}}
          >
            Update
          </button>

        </div>
      </div>

      <div>
        email: {user.email}
      </div>

      <div>
        <input
          className="input"
          type="text"
          onChange={changeEmail}
          style={{width: '80%'}}
        />

        <button
          className="button is-primary"
          onClick={updateEmail}
          style={{width: '20%'}}
        >
          Update
        </button>
      </div>

      <button
        className="button is-danger"
        onClick={deleteUser}
        style={deleteButtonStyle}
      >
        Delete
      </button>

      <UserOrders userId={user.id}/>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.userInfoReducer.user,
    isLoad: state.userInfoReducer.isLoadUser
  };
}

export default connect(mapStateToProps)(UserInfoContent);