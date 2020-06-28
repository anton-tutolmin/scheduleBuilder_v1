import { useState } from 'react';
import ParamField from './paramField';
import { formStyle, buttonStyle, addAttributeFormStyle, attributeLabelStyle } from '../../utils/style';
import agent from '../../utils/agent';

import createFormWithParams from './createFormWithParams';

import { reducer, initialState, params } from './reducers/creteTimetableFormReducer';



function CreateTimetableForm(props) {
  const {
    attributes,
    visibleAttributeForm,
    handleSubmit,
    updateState
  } = props;

  function toggleAddAttribute(ev) {
    ev.preventDefault();
    updateState('TOGGLE_ATTRIBUTE');
  }

  function showAddAttribute() {
    if (visibleAttributeForm) {
      return <AddAttributeForm
        updateState={updateState}
        toggleAddAttribute={toggleAddAttribute}
      />
    }
  }

  return (
    <div style={formStyle}>
      <form onSubmit={handleSubmit}>

        {
          params.map(param =>
            <ParamField
              paramName={param.name}
              updateParam={updateState}
              actionType={param.actionType}
              key={`paramField${param.actionType}`}
            />
          )
        }

        {attributes.length !== 0 ? 'Attributes:' : null}
        {
          attributes.map(attribute =>
            <AttributeLabel
            name={attribute.name}
            updateState={updateState}
            key={`attributeLabel${attribute.name}`}
            />
          )
        }
        {showAddAttribute()}
        <div>
          <button
            className="button is-primary"
            onClick={toggleAddAttribute}
            style={buttonStyle}
          >
            Add attribute
          </button>
          <input
            className="button is-link"
            type="submit"
            value="Create"
            style={buttonStyle}
          />
        </div>

      </form>
    </div>
  );
}



function AddAttributeForm(props) {
  const { updateState, toggleAddAttribute } = props;
  const [name, setName] = useState('');
  const [required, setRequired] = useState(false);

  function updateName(newName) {
    setName(newName);
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    if (name.length !== 0) {
      updateState('ADD_ATTRIBUTE', {name, required, type: 'string'});
      toggleAddAttribute(ev);
    } else {
      //TODO notification
    }
  }

  function toggleRequired() {
    setRequired(!required);
  }

  return (
    <div style={addAttributeFormStyle}>
      <ParamField
        paramName={'attribute name'}
        updateParam={updateName}
      />
      <div className="field">
        <label className="label">
          Required:
          <input type="checkbox" onChange={toggleRequired} />
        </label>
      </div>
      <button
        className="button is-primary"
        onClick={handleSubmit}
      >
        Add
      </button>
    </div>
  );
}

function AttributeLabel(props) {
  const { name, updateState } = props;

  function remove() {
    updateState('REMOVE_ATTRIBUTE', name);
  }

  return (
    <div style={attributeLabelStyle} onClick={remove}>
      {name}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    attributes: state.attributes,
    visibleAttributeForm: state.visibleAttributeForm
  };
}


export default createFormWithParams({
  WrappedComponent: CreateTimetableForm,
  reducer,
  initialState,
  sendRequest: agent.timetables.create,
  mapStateToProps
});