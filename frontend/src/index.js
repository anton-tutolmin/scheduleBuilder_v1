import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import { initFontAwesomeLibrary } from './utils';
import store from './store';

initFontAwesomeLibrary();

render(
  <div>
    <Provider store={store}>
      <App />
    </Provider>
  </div>,
  document.getElementById('app'),
);
