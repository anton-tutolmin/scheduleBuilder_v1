import { connect } from 'react-redux';
import agent from '../utils/agent';
import { formStyle } from '../utils/style';

const style = {
  margin: "5px",
  width: "100%",
  textAlign: "center"
}

function OrderBox(props) {
  const { user, order } = props;
  
  function getPeriodString() {
    let date = new Date(order.periodstart);
    return new Date(order.periodstart).toDateString() +
    ' ' + new Date(order.periodstart).getHours() + ":00 - " +
    new Date(order.periodstop).getHours() + ":00";
  }

  function getColor() {
    if (order.status === 'created') {
      return {backgroundColor: 'yellow'};
    }
    if (order.status === 'confirmed') {
      return {backgroundColor: '#7D7'};
    }
    if (order.status === 'canceled') {
      return {backgroundColor: '#D77'}
    }
  }

  function cancelOrder(ev) {
    ev.preventDefault();
    agent.orders.update(order.id, {status: 'canceled'});
  }

  return (
    <div style={{...formStyle, ...getColor()}}>
      <div className="has-text-weight-bold" style={style}>
        {order.timetableName}
      </div>
      <div style={style}>
        { getPeriodString() }
      </div>
      {order.attributes.map(attribute =>
        (
          <div style={style} key={`attribute${attribute.id}`}>
            {attribute.name + ': ' + attribute.value}
          </div>
        ))
      }
      <div style={{display: 'flex', justifyContent: 'center'}}>
        {
        order.status === 'created' ?
        <button
          className="button is-danger"
          onClick={cancelOrder}
        >
          Cancel order
        </button> :
        null
        }
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.usersReducer
  };
}

export default connect(mapStateToProps, null)(OrderBox);