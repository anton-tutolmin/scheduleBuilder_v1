import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Scenes from '../scenes';
import agent from '../utils/agent';

function App(props) {
  const { user } = props;

  useEffect(() => {
    if (!user.auth) {
      agent.auth.profile();
    }
  });

  return (
    <div>
      <BrowserRouter>
        <Scenes />
      </BrowserRouter>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.usersReducer
  };
}

export default connect(mapStateToProps, null)(App);
