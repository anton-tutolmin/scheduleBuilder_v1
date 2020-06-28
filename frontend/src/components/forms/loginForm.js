import agent from '../../utils/agent';
import createFormWithParams from './createFormWithParams';
import ParamField from './paramField';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { reducer, params, initialState } from './reducers/loginFormReducer';

import { formStyle } from '../../utils/style';

function LoginForm(props) {
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
          params.map(param => <ParamField
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
              value="Log in"
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
  WrappedComponent: connect(mapStateToProps)(LoginForm),
  reducer,
  initialState,
  sendRequest: agent.auth.login
});