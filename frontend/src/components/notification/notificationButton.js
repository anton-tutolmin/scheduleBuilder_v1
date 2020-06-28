import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import Notifications from './notificationContainer';

const iconStyle = {
  width: '1.4rem',
  margin: "0 5px",
  fontSize: '1.4rem'
}

function NotificationButton(props) {
  const [visibleList, setVisibleList] = useState(false);

  function toggleVisibleList(ev) {
    ev.preventDefault();
    setVisibleList(!visibleList);
  }

  return (
    <div className="navbar-item dropdown is-active">
    <div className="dropdown-trigger">
      <button
        type="button"
        className="button is-text"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        onClick={toggleVisibleList}
      >
        <FontAwesomeIcon icon={faBell} style={iconStyle}/>
      </button>
    </div>
    {visibleList ? <Notifications /> : null}
  </div>
  );
}

export default NotificationButton;