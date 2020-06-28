import { timetableBoxStyle } from '../utils/style';
import { Link } from 'react-router-dom';

function TimetableBox(props) {
  const { timetable, openTimetable } = props;

  return (
    <div
      style={timetableBoxStyle}
      onClick={() => {openTimetable(timetable)}}
    >
      <div className="has-text-weight-bold">
        {timetable.name}
      </div>

      <div>
        Timetable type:
        {timetable.slotType}
      </div>
      
      <div>
        Timetabel period:
        {new Date(timetable.periodStart).toDateString()}-
        {new Date(timetable.periodStop).toDateString()}
      </div>
    </div>
  );
}

export default TimetableBox;
