import React, { useEffect, useReducer } from 'react';
import Countdown, { zeroPad } from 'react-countdown-now';

import ApiService from 'services/apiService';
import NotifyDetails from './NotifyDetails';
import './RoundDetails.scss';
import RoundDetailsGhost from './RoundDetailsGhost';

const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <NotifyDetails />;
  }

  return (
    <div className="countdownDetails">
      <div className="countdownDetails__timer">
        <span className="countdownDetails__timer__counter">
          <span className="countdownDetails__timer__counter__value">
            {zeroPad(days)}
          </span>
          <span className="countdownDetails__timer__counter__text">days</span>
        </span>
        <span className="countdownDetails__timer__colon" />
        <span className="countdownDetails__timer__counter">
          <span className="countdownDetails__timer__counter__value">
            {zeroPad(hours)}
          </span>
          <span className="countdownDetails__timer__counter__text">hours</span>
        </span>
        <span className="countdownDetails__timer__colon" />
        <span className="countdownDetails__timer__counter">
          <span className="countdownDetails__timer__counter__value">
            {zeroPad(minutes)}
          </span>
          <span className="countdownDetails__timer__counter__text">mins</span>
        </span>
        <span className="countdownDetails__timer__colon" />
        <span className="countdownDetails__timer__counter">
          <span className="countdownDetails__timer__counter__value">
            {zeroPad(seconds)}
          </span>
          <span className="countdownDetails__timer__counter__text">secs</span>
        </span>
      </div>
    </div>
  );
};

const RoundDetails = () => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: true,
    timeForRoundEnd: new Date(null)
  });

  // TODO: add catch statement to show error,
  useEffect(() => {
    ApiService.get('round/active').then(res => {
      // Multiply by 1000 since converting timestamp to milliseconds
      if (res.data) {
        setState({
          timeForRoundEnd: res.data.endTime * 1000
        });
      }
      setState({ isLoading: false });
    });
  }, []);

  return (
    <div className="roundDetails">
      <div className="details__header">Round closing in</div>
      <div className="roundDetails__content">
        {state.isLoading ? (
          <RoundDetailsGhost />
        ) : (
          <Countdown
            date={state.timeForRoundEnd}
            renderer={countdownRenderer}
          />
        )}
      </div>
    </div>
  );
};

export default RoundDetails;
