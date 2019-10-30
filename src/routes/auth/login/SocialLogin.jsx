import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import SocialAuth from './SocialAuth';

const SocialLogin = () => {
  const [socket, setSocket] = useState(
    io(`${process.env.REACT_APP_BACKEND_API}`)
  );
  useEffect(() => {
    return () => {
      setSocket(socket.disconnect());
    };
  }, [socket]);

  return <SocialAuth socket={socket} />;
};

export default SocialLogin;
