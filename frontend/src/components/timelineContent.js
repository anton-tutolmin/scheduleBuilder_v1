import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import agent from '../utils/agent';
import OrderBox from './orderBox';

const timelineTitleStyle = {
  width: "20%",
  margin: "10px auto",
  fontWeight: "bold",
  fontSize: "3rem",
  textAlign: "center"
}


function TimelineList(props) {
  const { user, orders, isLoad } = props;

  useEffect(() => {
    if (isLoad) {
      agent.orders.getAll(`authorId=${user.id}`);
    }
  });

  function getList(name, orders) {

    if (orders.length !== 0) {
      return (
        <div>
          <div style={timelineTitleStyle}>
            {`${name}:`}
          </div>
          {orders.map(order => <OrderBox user={user} order={order} />)}
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <div>

      {
        getList('Upcoming',
          orders.filter(order =>
            new Date('Apr 23 2020') - new Date(order.periodstart) < 0 &&
            (order.status === 'created' || order.status === 'confirmed')
          )
        )
      }

      {
        getList('Previous',
          orders.filter(order =>
            new Date('Apr 23 2020') - new Date(order.periodstart) > 0 &&
            (order.status === 'created' || order.status === 'confirmed')
          )
        )
      }

      {
        getList('Canceled',
          orders.filter(order =>
            order.status === 'canceled'
          )
        )
      }

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

export default connect(mapStateToProps, null)(TimelineList);