import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import agent from '../utils/agent';

const listItemStyle = {
  border: '1px solid black',
  backgroundColor: '#EEE'
};

function UserOrders(props) {
  const { userId, orders, isLoad } = props;

  useEffect(() => {
    if (isLoad && userId) {
      console.log(orders);
      agent.orders.getByAuthorId(userId);
    }
  });

  return (
    <table style={{width: '100%'}}>
      <tbody>
        {orders.map(order =>
          <UserOrder
            order={order}
            key={`userOrder${order.id}`}
          />
        )}
      </tbody>
    </table>
  );
}

function UserOrder(props) {
  const { order } = props;

  return (
    <tr style={listItemStyle}>
      <td>{order.timetableName}</td>
      
      <td>
        {
          new Date(order.periodstart).toDateString() + ' ' +
          new Date(order.periodstart).getHours() + ':00 - ' +
          new Date(order.periodstop).getHours() + ':00'
        }
      </td>

      <td>
        {order.status}
      </td>

      <td>
        <Link to={`/orderinfo/${order.id}`}>
          <button
            className="button is-primary" 
            style={{width: '100%'}}
          >
            Update
          </button>
        </Link>
      </td>
    </tr>
  );
}

function mapStateToProps(state) {
  return {
    orders: state.userInfoReducer.orders,
    isLoad: state.userInfoReducer.isLoadOrders
  };
}

export default connect(mapStateToProps)(UserOrders);