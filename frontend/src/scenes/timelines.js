import { useEffect } from 'react';

import TimelineContent from '../components/timelineContent';

import orderActions from '../store/actions/ordersActions';

function Timelines(props) {

  useEffect(() => {
    return () => {
      orderActions.clear();
    };
  });

  return (
    <TimelineContent />
  );
}

export default Timelines;
