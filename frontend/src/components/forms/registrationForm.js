import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import agent from '../../utils/agent';

import ParamField from './paramField';
import createFormWithParams from './createFormWithParams';

import { formStyle } from '../../utils/style';

import { reducer, initialState, params } from './reducers/registrationFormReducer';

function RegistrationForm(props) {
  const {
    updateState,
    handleSubmit,
    user
  } = props;

  return (
    <div style={formStyle}>
      {user.id ? <Redirect to="/" /> : null}
      <form onSubmit={handleSubmit}>
          
          {
            params.map(param =>
              <ParamField
                 paramName={param.name}
                 actionType={param.actionType}
                 updateParam={updateState}
                 key={`paramField${param.actionType}`}
              />)
          }
  
          <div className="field">
            <div className="control">
              <input
                className="button is-link"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.usersReducer
  };
}

export default createFormWithParams({
  WrappedComponent: connect(mapStateToProps, null)(RegistrationForm),
  reducer,
  initialState,
  sendRequest: agent.auth.register
});