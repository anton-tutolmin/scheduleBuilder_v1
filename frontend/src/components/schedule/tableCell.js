import { connect } from 'react-redux';

import Content from './content';
import { tableCellStyle } from '../../utils/style';

function InfoCellHorizontal(props) {
    const {periodStart, column} = props;
    let title = new Date(periodStart);
    title.setDate(title.getDate() + column - 1);
    return (
      <td style={tableCellStyle}>
        {title.toDateString()}
      </td>
    );
  }

function InfoCellVertical(props) {
    const {row, periodStart} = props;
    let title = new Date(periodStart);
    title.setHours(title.getHours() + row - 1);
    return (
      <td style={tableCellStyle}>
        {`${title.getHours()}:00`}
      </td>
    );
  }
  
function ContentCell(props) {
  const {
    user,
    orders,
    row,
    column,
    toggleOrderModal
  } = props;

  const content =
    orders.find(order =>{
      return (order.row === row && order.column === column) &&
        (order.status === 'confirmed' ||
        (order.authorId === user.id && 
        order.status !== 'canceled')
      )
    });

  function clickHandle() {
    if (!content && user.username) {
      toggleOrderModal('create', row, column);
    } else if (content) {
      toggleOrderModal('info', row, column, content);
    }
  }

  function setColor() {
    if (!content) {
      return {backgroundColor: '#DDD', color: 'balck'};
    } else if (content.status === 'confirmed') {
      return {backgroundColor: 'red', color: 'white'};
    } else {
      return {backgroundColor: 'yellow', color: 'black'};
    }
  }

  return (
    <td
      style={{...tableCellStyle, ...setColor()}}
      onClick={clickHandle}
    >
      {
      content ?
        <Content
          nameOrder={
            content.attributes
            .find(attr => attr.name === 'Name')
          }
          authorName={content.authorName}
        /> :
        null
      }
    </td>
  );
}

function TableCell(props) {
  const { user, params } = props;
  function getCell() {
    if (params.row === 0 && params.column !== 0) {
      return <InfoCellHorizontal {...params}/>;
    } else if (params.column === 0 && params.row !== 0) {
      return <InfoCellVertical {...params} />;
    } else if (params.column !== 0 && params.row !== 0) {
      return <ContentCell {...params} user={user} />;
    } else {
      return <td style={tableCellStyle}></td>;
    }
  }

  return getCell()
}

function mapStateToProps(state) {
  return {
    user: state.usersReducer
  }
}

export default connect(mapStateToProps, null)(TableCell);