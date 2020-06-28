import { useEffect, useState } from 'react';

import OrderListContent from '../components/lists/order/orderListContent';

import orderActions from '../store/actions/ordersActions';

function OrderList(props) {

  useEffect(() => {
    return () => {
      orderActions.clear();
    };
  });

  return (
    <OrderListContent />
  );
}

export default OrderList;