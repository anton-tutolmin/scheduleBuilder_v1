import { Link } from 'react-router-dom';


const tableStyle = {
  border: '1px solid white',
  backgroundColor: '#EEE'
}

const tableItemStyle = {
  padding: '1%'
}

function OrderListItem(props) {
  const { order } = props;

  return (
    <tr style={tableStyle}>
      <td style={tableItemStyle}>{order.timetableName}</td>

      <td style={tableItemStyle}>
        <Link to={`/userinfo/${order.authorId}`}>
          {order.authorName}
        </Link>
      </td>

      <td style={tableItemStyle}>
        {
          new Date(order.periodstart).toDateString() + 
          ' ' + new Date(order.periodstart).getHours() +
          ':00' + '-' + new Date(order.periodstop).getHours() + ':00'
        }
      </td>

      <td style={tableItemStyle}>{order.status}</td>

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

export default OrderListItem;