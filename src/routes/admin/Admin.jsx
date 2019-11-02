import React from 'react';
import { Redirect } from 'react-router-dom';

import { useUser } from 'contexts/userContext';
import PageContainer from 'components/pageContainer';
import { isCommittee } from 'utils/userUtils';
import { HOME } from 'constants/routes';

const Admin = () => {
  const user = useUser();

  if (!isCommittee(user)) {
    return <Redirect to={HOME} />;
  }

  return (
    <PageContainer dark>
      <div className="main page">
        <div className="page__content">Admin page</div>
      </div>
    </PageContainer>
  );
};

export default Admin;
