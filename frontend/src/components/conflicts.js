import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import agent from '../utils/agent';

const conflictListStyle = {
  width: '100%',
  margin: '1% auto',
  textAlign: 'center'
}

const conflictItemStyle = {
  border: '1px solid black',
  backgroundColor: '#EEE'
}

function Conflicts(props) {
  const {
      conflicts,
      isLoad,
      orderId,
      timetableId,
      periodstart
    } = props;

  useEffect(() => {
    if (isLoad && timetableId && periodstart) {
      agent.orders.getAll(
        `timetableId=${timetableId}&periodstart=${periodstart}`
      );
    }
  });

  return (
    <div>
      <div>
        Conflicts:
      </div>
      <table style={conflictListStyle}>
        {
          conflicts.filter(conflict => conflict.id !== +orderId)
            .map(conflict =>
              <ConflictItem
                conflict={conflict}
                key={`conflictItem${conflict.id}`}
              />
            )
        }
      </table>
    </div>
  );
}

function ConflictItem(props) {
  const { conflict } = props;

  return (
    <tr style={conflictItemStyle}>
      <td>
        <Link to={`/timetableinfo/${conflict.timetableId}`}>
          {conflict.timetableName}
        </Link>
      </td>

      <td>
        <Link to={`/userinfo/${conflict.authorId}`}>
          {conflict.authorName}
        </Link>
      </td>

      <td>{conflict.status}</td>

      <td>
        <Link to={`/orderinfo/${conflict.id}`}>
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
    conflicts: state.ordersReducer.orders,
    isLoad: state.ordersReducer.isLoad
  };
}

export default connect(mapStateToProps)(Conflicts);