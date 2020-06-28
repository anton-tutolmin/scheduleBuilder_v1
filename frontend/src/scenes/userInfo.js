import { useEffect } from 'react';
import usersActions from '../store/actions/usersActions';
import UserInfoContent from '../components/userInfoContent';

function UserInfo(props) {
  
  useEffect(() => {
    return () => {
      usersActions.clearUserInfo();
    }
  });

  return (
    <UserInfoContent id={props.match.params.id} />
  );
}

export default UserInfo;