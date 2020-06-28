import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import agent from '../utils/agent';

import Conflicts from './conflicts';

const orderInfoContentStyle = {
  width: '60%',
  margin: '3% auto',
  boxShadow: '0 4px 6px rgba(0,0,0,0.5)',
  padding: '1rem',
  fontSize: '170%',
}

function OrderInfoContent(props) {
  const { id, order, isLoad } = props;

  useEffect(() => {
    if (isLoad) {
      agent.orders.getById(id);
    }
  });

  function updateStatus(ev) {
    agent.orders.update(order.id, {status: ev.target.value});
  }

  return (
    <div style={orderInfoContentStyle}>

      <div>
        timetable:
        {order.timetableName}
      </div>

      <div>
        period: {
          new Date(order.periodstart).toDateString() + ' '
          + new Date(order.periodstart).getHours() + ':00 - '
          + new Date(order.periodstop).getHours() + ':00'
        }
      </div>

      <div>
        ordered by:
        <Link to={`/userinfo/${order.authorId}`}>
          {order.authorName}
        </Link>
      </div>

      <div>
        status:
        <select className="select" onChange={updateStatus}>

          <option
            value="created"
            {...{selected: order.status === 'created' ? true : false}}
          >
            created
          </option>
          
          <option
            value="confirmed"
            {...{selected: order.status === 'confirmed' ? true : false}}
          >
            confirmed
          </option>

          <option
            value="canceled"
            {...{selected: order.status === 'canceled' ? true : false}}
          >
            canceled
          </option>

        </select>
      </div>

      <div>
        {order.attributes.map(attribute =>
          <Attribute
            attribute={attribute}
            key={`orderAttribute${attribute.id}`}
          />
        )}
      </div>
      <Conflicts
        orderId={id}
        timetableId={order.timetableId}
        periodstart={order.periodstart}
      />
    </div>
  );
}

function Attribute(props) {
  const { attribute } = props;
  const [newValue, setNewValue] = useState('');

  function changeNewValue(ev) {
    ev.preventDefault();
    setNewValue(ev.target.value);
  }

  function updateAttribute(ev) {
    ev.preventDefault();
    agent.attributes.update(attribute.id, {value: newValue})
  }

  return (
    <div>
      <div>
        {attribute.name}: {attribute.value}
      </div>
          <input
            className="input"
            type="text" style={{width: '80%'}}
            onChange={changeNewValue}
          />

          <button
            className="button is-primary"
            style={{width: '20%'}}
            onClick={updateAttribute}
          >
            Update
          </button>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    order: state.orderInfoReducer.order,
    isLoad: state.orderInfoReducer.isLoad
  };
}

export default connect(mapStateToProps, null)(OrderInfoContent);