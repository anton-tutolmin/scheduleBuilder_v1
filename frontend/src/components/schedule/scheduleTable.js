import { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import agent from '../../utils/agent';
import TableRow from './tableRow';
import CreateOrderModal from './createOrderModal';
import InfoOrderModal from './infoOrderModal';

import { closeButtonStyle, tableStyle } from '../../utils/style';



function reducer(state, action) {
  switch(action.type) {
    case 'CHOOSEN_CELL':
      return {
        ...state,
        cellInfo: action.payload
      };
    case 'TOGGLE_ORDER_MODAL':
      return {
        ...state,
        visibleModal: action.payload
      };
    case 'SET_ATTRIBUTES':
      return {
        ...state,
        attributes: action.payload
      };
    default:
      return state;
  }
}

function ScheduleTable(props) {
  const { timetable, close, orders, isLoad } = props;

  const [state, dispatch] = useReducer(reducer, {
    cellInfo: null,
    visibleModal: false
  });

  useEffect(() => {
    if (isLoad) {
      agent.orders.getAll(`timetablesId=${timetable.id}`);
    }
  });

  function generateTable() {
    const rows = [];
      for (let row = 0; row < timetable.numberRow + 1; ++row) {
        rows.push(<TableRow params={{
          orders,
          row,
          numberColumn: timetable.numberColumn,
          periodStart: new Date(timetable.periodStart),
          toggleOrderModal
        }} key={`tableRow${row}`} />);
      }
    return rows;
  }

  function toggleOrderModal(visibleModal, row, column, order) {
    dispatch({ type: 'CHOOSEN_CELL', payload: {row, column, order} });
    dispatch({ type: 'TOGGLE_ORDER_MODAL', payload: visibleModal });
  }

  function showModal() {
    
    if (state.visibleModal === 'create') {
      return <CreateOrderModal
        toggleModal={toggleOrderModal}
        timetable={timetable}
        cellInfo={state.cellInfo}
        />;
    } else if (state.visibleModal === 'info') {
      return <InfoOrderModal
          toggleModal={toggleOrderModal}
          timetablePeriodStart={timetable.periodStart}
          order={state.cellInfo.order}
        />
    }
  }

  return (
    <div>
      <button
        className="delete is-large"
        onClick={close}
        style={closeButtonStyle}
      />
      <table style={tableStyle}>
        <tbody style={{border: "1px solid black"}}>
          {generateTable()}
        </tbody>
      </table>

      {showModal()}

    </div>
  );
}

function mapStateToProps(state) {
  return {
    orders: state.ordersReducer.orders,
    isLoad: state.ordersReducer.isLoad,
  };
}

export default  connect(mapStateToProps, null)(ScheduleTable);