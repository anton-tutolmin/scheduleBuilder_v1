import { useEffect } from 'react';
import orderActions from '../store/actions/ordersActions';

import OrderInfoContent from '../components/orderInfoContent';

function OrderInfo(props) {
  
  useEffect(() => {
    return () => {
      orderActions.clearOrderInfo();
      orderActions.clear();
    }
  });

  return (
    <OrderInfoContent id={props.match.params.id} />
  );
}

export default OrderInfo;