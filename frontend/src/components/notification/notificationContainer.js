import { useEffect } from 'react';
import { connect } from 'react-redux';
import agent from '../../utils/agent';
import OrderNotificationBox from './orderNotificationBox';

const style = {
  top: '100%',
  left: '-100%',
  position: 'absolute',
  width: '20rem',
  padding: '5%',
  backgroundColor: '#AAA'
}

function OrderNotificationContainer(props) {
  const { user, notifications, isLoad } = props;

  useEffect(() => {
    if (isLoad) {
      agent.notification.load(user.id)
    }
  });

  function removeNotification(id) {
    setState(state.filter(n => n.id !== id));
  }

  return (
    <div style={style}>
      {
        state.map(ntfn =>
          <OrderNotificationBox
            notification={ntfn}
            removeNotification={removeNotification}
          />
        )
      }
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.userReducer,
    notifications: state.notificationReducer.notifications,
    isLoad: state.notificationReducer.isLoad
  }
}

export default connect(mapStateToProps)(OrderNotificationContainer);