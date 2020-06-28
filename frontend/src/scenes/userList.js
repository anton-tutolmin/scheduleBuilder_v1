import { useEffect } from 'react';
import usersActions from '../store/actions/usersActions';
import UserListContent from '../components/lists/users/userListContent';

function UserList() {
  useEffect(() => {
    return () => {
      usersActions.clearUserList();
    };
  });

  return (
    <UserListContent />
  );
}

export default UserList;