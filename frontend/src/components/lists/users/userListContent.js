import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import agent from '../../../utils/agent';

const userListItemStyle = {
  border: '1px solid white',
  backgroundColor: '#EEE'
};

const tableCellStyle = {
  padding: '1%'
}

function UserListContent(props) {
  const { user, users, isLoad } = props;

  useEffect(() => {
    if (isLoad) {
      agent.users.getAll();
    }
  });

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      {!user.adminer ? <Redirect to="/" /> : null}
      <table style={{width: '50%', margin: '1%'}}>
        <tbody>
          {users.map(user => <UserListItem user={user} />)}
        </tbody>
      </table>
    </div>
  );
}

function UserListItem(props) {
  const { user } = props;

  function deleteUser(ev) {
    ev.preventDefault();
    agent.users.delete(user.id);
  }

  return (
    <tr style={userListItemStyle}>
      <td style={tableCellStyle}>
        <Link to={`/userinfo/${user.id}`}>
          {user.username}
        </Link>
      </td>

      <td style={tableCellStyle}>{user.email}</td>

      <td>
        <button
          className="button is-danger"
          onClick={deleteUser}
          style={{width: '100%'}}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

function mapStateToProps(state) {
  return {
    user: state.usersReducer,
    users: state.usersListReducer.users,
    isLoad: state.usersListReducer.isLoad
  };
}

export default connect(mapStateToProps)(UserListContent);