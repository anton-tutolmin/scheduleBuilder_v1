import { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import agent from '../utils/agent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import { formStyle, buttonStyle } from '../utils/style';

const styleParamField = {
  margin: "1rem"
}

function ProfileForm(props) {
  const { userId, username, userEmail } = props;
  const params = [['username', username], ['email', userEmail]];

  return (
    <div style={formStyle}>
      {!userId ? <Redirect to="/" /> : null}
      {params.map(param =>
        <ParamField
          param={param} 
          userId={userId}
          key={`paramField${param[0]}`}
        />)}

    </div>
  );
}

function ParamField(props) {
  const { param, userId } = props;
  const [visibleUpdateField, setVisibleUpdateField] = useState();

  function toggleUpdateField(ev) {
    ev.preventDefault();
    setVisibleUpdateField(!visibleUpdateField);
  }

  return (
    <div style={styleParamField}>
      <div className="level">
        <div className="level-left">
          {param[0] + ': ' + param[1]}
        </div>
        <div className="level-right">
          <button
            className="button"
            onClick={toggleUpdateField}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
      </div>
      {
        visibleUpdateField ?
        <ChangeParamField
          userId={userId}
          param={param}
        />
        : null
      }
    </div>
  );
}

function ChangeParamField(props) {
  const { userId, param } = props;
  const [newValue, setNewValue] = useState('');
  
  const submitForm = ev => {
    ev.preventDefault();
    if (newValue.length === 0) {
      //TODO notification
    } else {
      agent.users.update(userId, {[param[0]]: newValue});
    }
  };
  
  const changeValue = ev => {
    setNewValue(ev.target.value);
  };
  
  return (
    <div style={styleParamField}>
      <form onSubmit={submitForm}>
        <div className="level">

          <div className="level-left">
            <div className="control">
              <input
                name="change_param"
                className="input" 
                type="text"
                onChange={changeValue}
                placeholder={`Enter ${param[0]}`}
              />
            </div>
          </div>

          <div className="level-right">
            <div className="control">
              <input
                className="button is-primary"
                type="submit"
                value="update"
                style={buttonStyle}
              />
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userId: state.usersReducer.id,
    username: state.usersReducer.username,
    userEmail: state.usersReducer.email
  }
}

export default connect(mapStateToProps, null)(ProfileForm);