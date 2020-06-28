import { useReducer } from "react";

function createFormWithParams(params) {
  const {
    WrappedComponent,
    reducer,
    initialState,
    sendRequest,
    mapStateToProps
  } = params;

  return function (props) {
    const [state, dispatch] = useReducer(reducer, initialState);

    function updateState(actionType, payload) {
      dispatch({ type: actionType, payload });
    }

    function checkMappingToProps() {
      return mapStateToProps ? mapStateToProps(state) : null;
    }

    function handleSubmit(ev) {
      ev.preventDefault();
      sendRequest({...state});
    }

    return (
      <WrappedComponent
        updateState={updateState}
        handleSubmit={handleSubmit}
        {...checkMappingToProps()}
      />
    );
  }
}

export default createFormWithParams;