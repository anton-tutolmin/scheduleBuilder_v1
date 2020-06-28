import style from '../../utils/style';

function Content(props) {
  const { nameOrder, authorName } = props;
  return (
    <div>
      <span className="has-text-weight-bold">
        {nameOrder === undefined ? null : nameOrder.value}
      </span><br/>
      <span>
        {authorName}
      </span>
    </div>
  );
}

export default Content;