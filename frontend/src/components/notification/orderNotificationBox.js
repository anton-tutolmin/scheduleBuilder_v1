

const style = {
  margin: '2% auto',
  padding: '2%',
  backgroundColor: '#FFF',
  borderRadius: '3%',
}

const deleteButtonStyle = {
  float: 'right'
}


function OrderNotificationBox(props) {
  const { notification, removeNotification } = props;

  function handleDelete(ev) {
    ev.preventDefault();
    removeNotification(notification.id)
  }

  return (
    <div style={style}>
      <button
        className="delete is-small"
        style={deleteButtonStyle}
        onClick={handleDelete}
      />
      <div className="has-text-weight-bold">
        {notification.message}
      </div>
      <div>
        {notification.order.timetableName}
        {
          new Date(notification.order.periodstart).toDateString() +
          ' ' + new Date(notification.order.periodstart).getHours() +
          ':00'
        }
      </div>
    </div>
  );
}

export default OrderNotificationBox;