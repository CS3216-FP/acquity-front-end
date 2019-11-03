import React, { useEffect, useReducer } from 'react';
import Countdown, { zeroPad } from 'react-countdown-now';

import ErrorMessage from 'components/errorMessage';
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
    timeForRoundEnd: new Date(null),
    isError: false
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const response = await ApiService.get('round/active');
        if (!didCancel) {
          setState({
            timeForRoundEnd: response.data
              ? response.data.endTime * 1000
              : new Date(response.data),
            isLoading: false
          });
        }
      } catch (error) {
        if (!didCancel) {
          setState({
            isLoading: false,
            isError: true
          });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, []);

  return (
    <div className="roundDetails">
      <div className="details__header">Round closing in</div>
      <div className="roundDetails__content">
        {state.isError && (
          <ErrorMessage message="Failed to fetch round data. Please refresh the page to try again." />
        )}
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
