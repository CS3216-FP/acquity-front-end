import React from 'react';
import { fromUnixTime } from 'date-fns';

import { useUser } from 'contexts/userContext';

import './DisbandInfo.scss';

const DisbandInfo = ({ info }) => {
  const user = useUser();
  const { disbandByUserId, disbandTime } = info;
  const isDisbandedByUser = disbandByUserId === user.id;
  const timeString = fromUnixTime(disbandTime).toLocaleString();

  return (
    <div className="disbandInfo">
      Chat disbanded by {isDisbandedByUser ? 'you' : 'the other user'} on{' '}
      {timeString}
    </div>
  );
};

export default DisbandInfo;
