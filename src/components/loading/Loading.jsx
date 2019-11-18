import React from 'react';
import Lottie from 'react-lottie';
import FadeIn from 'react-fade-in';

import * as animationData from 'assets/animations/loading.json';

import './Loading.scss';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const Loading = ({ className = '' }) => {
  return (
    <FadeIn>
      <div className={`loading ${className}`}>
        <Lottie options={defaultOptions} width="auto" />
      </div>
    </FadeIn>
  );
};

export default Loading;
