function ParamField(props) {
  const {
    paramName,
    updateParam,
    actionType
  } = props;

  function changeParam(ev) {
    ev.preventDefault();
    if (actionType) {
      updateParam(actionType, ev.target.value)
    } else {
      updateParam(ev.target.value)
    }
  }

  return (
    <div className="field">
      <label className="label">
        {paramName}:
        <div className="control">
          <input
            className="input"
            type={
              paramName === 'password' ?
              'password' :
              paramName === 'email' ?
              'email':
              'text'
             }
            placeholder={`Enter a ${paramName}`}
            onChange={changeParam}
          />
        </div>
      </label>
    </div>
  );
}

export default ParamField;