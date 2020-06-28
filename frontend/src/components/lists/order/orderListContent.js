import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import agent from '../../../utils/agent';

import OrderListItem from './orderListItem';

const tableHeadStyle = {
  paddig: '1%'
}

function OrderListContent(props) {
  const { user, orders, isLoad } = props;

  useEffect(() => {
    if (isLoad) {
      agent.orders.getAll();
    }
  });

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
        {!user.adminer ? <Redirect to="/" />: null}
        <table style={{margin: '2% auto', width: '50%'}}>
          <thead>
            <tr>
              <th style={tableHeadStyle}>Timetable</th>
              <th style={tableHeadStyle}>User</th>
              <th style={tableHeadStyle}>Time slot</th>
              <th style={tableHeadStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {
            orders.map(order =>
              <OrderListItem
                order={order}
                key={`orderListItem${order.id}`}
              />)
            }
          </tbody>
        </table>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.usersReducer,
    orders: state.ordersReducer.orders,
    isLoad: state.ordersReducer.isLoad
  };
}

export default connect(mapStateToProps)(OrderListContent);