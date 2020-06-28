import { useState } from 'react';
import { connect } from 'react-redux';
import agent from "../../utils/agent";

import ModalHeader from './modalHeader';

import { orderModalStyle, buttonStyle } from '../../utils/style';

function Attribute(props) {
  const { attribute, setAttribute } = props;

  function updateValue(ev) {
    ev.preventDefault();
    setAttribute({[`${attribute.name}`]: ev.target.value});
  }

  return (
    <label htmlFor="enter_name">
      {`${attribute.name}`}{attribute.required ? '*:' : null}
      <div name="enter_value" className="control">
        <input className="input" type="text" onChange={updateValue} />
      </div>
    </label>
  );
}

function CreateOrderModal(props) {
  const {
    toggleModal,
    cellInfo,
    timetable,
    user
  } = props;

  const [state, setState] = useState({});

  function closeModal() {
    toggleModal(null);
  }

  function setAttribute(value) {
    setState({...state, ...value});
  }

  function showAttributes() {
    if (timetable.attributes.length !== 0) {
      return timetable.attributes.map(attribute =>
      <Attribute
        attribute={attribute}
        setAttribute={setAttribute}
      />);
    }
  }

  function submit() {

    for (let attribute of timetable.attributes) {
      if (attribute.required && !state[attribute.name]) {
        //TODO notification
        return
      }
    }
    let periodstart = new Date(timetable.periodStart);
    let periodstop = new Date(timetable.periodStart);

    periodstart.setHours(periodstart.getHours() + cellInfo.row - 1);
    periodstart.setDate(periodstart.getDate() + cellInfo.column - 1);

    periodstop.setHours(periodstop.getHours() + cellInfo.row);
    periodstop.setDate(periodstop.getDate() + cellInfo.column - 1);

    agent.orders.create({
      authorId: user.id,
      timetableId: timetable.id,
      periodstart,
      periodstop,
      attribute: state,
      status: 'created'
    });

    toggleModal();
  }

  return (
    <div  className="modal is-active">
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-content" style={orderModalStyle}>
        <ModalHeader
          timetablePeriodStart={timetable.periodStart}
          cellInfo={cellInfo}
        />
        {showAttributes()}
        <button
          className="button is-success"
          onClick={submit}
          style={buttonStyle}
        >
          Create
        </button>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    user: state.usersReducer,
  }
}

export default connect(mapStateToProps, null)(CreateOrderModal);