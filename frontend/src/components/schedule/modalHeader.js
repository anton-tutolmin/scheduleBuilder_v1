
const style = {
  fontSize: "2rem",
  fontWeight: "bold"
}

function ModalHeader(props) {
  const { timetablePeriodStart, cellInfo } = props;

  function getDate() {
    let date = new Date(timetablePeriodStart);
    date.setDate(date.getDate() + cellInfo.column - 1);
    return date.toDateString();
  }

  function getTimeInterval() {
    let date = new Date(timetablePeriodStart);
    return (
      date.getHours() +
      cellInfo.row - 1 +
      ":00 - " +
      (date.getHours() +
      cellInfo.row) +
      ":00"
    );
  }

  return (
    <div style={style}>
      {getDate()}
      <div>
        {getTimeInterval()}
      </div><hr/>
    </div>
  );
}

export default ModalHeader;