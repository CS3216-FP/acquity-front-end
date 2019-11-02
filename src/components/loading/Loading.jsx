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

const Loading = () => {
  return (
    <FadeIn>
      <div className="loading">
        <Lottie options={defaultOptions} width={400} />
      </div>
    </FadeIn>
  );
};

export default Loading;
