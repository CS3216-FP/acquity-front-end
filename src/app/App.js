import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { retryPromise } from 'utils';
import { SocketProvider } from 'contexts/socketContext';
import { useUser } from 'contexts/userContext';
import Loading from 'components/loading';
import './App.scss';

const loadAuthenticatedApp = () => import('./AuthenticatedApp');
const AuthenticatedApp = React.lazy(() => retryPromise(loadAuthenticatedApp));
const UnauthenticatedApp = React.lazy(() =>
  retryPromise(() => import('./UnauthenticatedApp'))
);

toast.configure();

const App = () => {
  const user = useUser();

  React.useEffect(() => {
    loadAuthenticatedApp();
  }, []);

  return (
    <React.Suspense fallback={<Loading />}>
      {user ? (
        <SocketProvider>
          <AuthenticatedApp />
        </SocketProvider>
      ) : (
        <UnauthenticatedApp />
      )}
    </React.Suspense>
  );
};

export default App;
