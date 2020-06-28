import { Switch, Route } from 'react-router-dom';

import Navbar from './navbar';
import Timetables from './timetabels';
import Timelines from './timelines';
import Profile from './profile';
import FrontPage from './frontPage';
import Login from './login';
import Registration from './registration';
import OrderList from './orderList';
import OrderInfo from './orderInfo';
import UserList from './userList';
import UserInfo from './userInfo';

function Scenes(props) {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={FrontPage} />
        <Route path="/timetable" component={Timetables} />
        <Route path="/timeline" component={Timelines} />
        <Route path="/userprofile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <Route path="/orderlist" component={OrderList} />
        <Route path="/orderinfo/:id" component={OrderInfo} />
        <Route path="/userlist" component={UserList} />
        <Route path="/userinfo/:id" component={UserInfo} />
      </Switch>
    </div>
  );
}

export default Scenes;
