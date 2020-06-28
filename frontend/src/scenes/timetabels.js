import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import agent from '../utils/agent';

import TimetableBox from '../components/timetableBox';
import ScheduleTable from '../components/schedule/scheduleTable';
import CreateTimetableForm from '../components/forms/createTimetableForm';
import orderActions from '../store/actions/ordersActions';

const createTimetableButtonStyle = {
  width: "100%",
  margin: "1% auto",
  display: "flex",
  justifyContent: "center"
}

function CreateTimetableButton(props) {
  const { toggleCreateForm } = props;

  function showForm(ev) {
    ev.preventDefault();
    toggleCreateForm()
  }

  return (
    <div style={createTimetableButtonStyle}>
      <button
        className="button is-primary"
        onClick={showForm}
      >
        + Create Timetable
      </button>
    </div>
  );
}

function TimetableScene(props) {
  const { timetables, isLoad, user } = props;
  const [visibleTimetable, setVisibleTimetable] = useState(null);
  const [visibleCreateForm, setVisibleCreateForm] = useState(false);

  useEffect(() => {
    if (isLoad) {
      agent.timetables.getAll();
    }
    return () => {
      orderActions.clear();
    };
  });

  function openTimetable(timetable) {
    setVisibleTimetable(timetable);
  }

  function closeTimetable() {
    setVisibleTimetable(null);
  }

  function toggleCreateForm(ev) {
    setVisibleCreateForm(!visibleCreateForm);
  }

  function showCreateButton() {
    if (user.adminer) {
      return <CreateTimetableButton
        toggleCreateForm={toggleCreateForm}
      />;
    }
  }

  function showCreateForm() {
    if (visibleCreateForm) {
      return <CreateTimetableForm />;
    }
  }

  function showScene() {
    if (visibleTimetable) {
      return <ScheduleTable
        timetable={visibleTimetable}
        close={closeTimetable}
      />;
    } else {
      return (
        <div>
          {showCreateButton()}
          {showCreateForm()}
          {
            timetables.map(timetable =>
             <TimetableBox
               timetable={timetable}
               openTimetable={openTimetable}
               key={`timetableBox${timetable.id}`}
            />)
          }
        </div>
      );
    }
  }

  return (
    <div>
      {showScene()}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    timetables: state.timetablesReducer.timetables,
    isLoad: state.timetablesReducer.isLoad,
    user: state.usersReducer
  }
}

export default connect(mapStateToProps, null)(TimetableScene);
