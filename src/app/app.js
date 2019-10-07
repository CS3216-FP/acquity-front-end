import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useUser } from 'contexts/userContext';
import FullPageSpinner from 'components/FullPageSpinner';
import './App.scss';

const loadAuthenticatedApp = () => import('./AuthenticatedApp');
const AuthenticatedApp = React.lazy(loadAuthenticatedApp);
const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'));

toast.configure();

const App = () => {
  const user = useUser();

  React.useEffect(() => {
    loadAuthenticatedApp();
  }, []);

  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
};

export default App;
