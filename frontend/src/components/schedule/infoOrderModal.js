import { orderModalStyle } from '../../utils/style';
import ModalHeader from './modalHeader';

function InfoOrderModal(props) {
  const { toggleModal, order, timetablePeriodStart } = props;

  function closeModal() {
    toggleModal(null);
  }

  return (
    <div  className="modal is-active">
    <div className="modal-background" onClick={closeModal}></div>
    <div className="modal-content" style={orderModalStyle}>
      <ModalHeader
        timetablePeriodStart={timetablePeriodStart}
        cellInfo={{
          row: order.row,
          column: order.column
        }}
      />
      <ul>
        <li>Order by: {order.authorName}</li>
        {order.attributes.map(attribute =>
          <ParamItem
            {...attribute}
            key={`paramItem${attribute.id}`}
          />
        )}
      </ul>
    </div>
  </div>
  );
}

function ParamItem(props) {
  const { name, value } = props;

  return (
    <li>{name + ': ' + value}</li>
  );
}

export default InfoOrderModal;