import React from 'react';

import { useUser } from 'contexts/userContext';
import { isUnapprovedBuyer } from 'utils/userUtils';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader/PageHeader';
import SocialLogin from './SocialLogin';

const ProfileSettings = () => {
  const user = useUser();

  return (
    <PageContainer>
      <div className="accountSettings page">
        <PageHeader
          hasBackButton
          headerText="Account Settings"
          className="accountSettings"
        />
        <div className="page__content">
          {isUnapprovedBuyer(user) && (
            <div className="notification is-warning">
              You will be unable to post a bid until you connect your account to
              an identity provider
            </div>
          )}
          <div className="accountInfo">
            <div className="form">
              <div className="form__field field">
                <label htmlFor="fullName" className="label">
                  Full name
                </label>
                <div className="control">
                  <input
                    disabled
                    id="fullName"
                    className="input"
                    value={user.fullName}
                    type="text"
                    name="fullName"
                  />
                </div>
              </div>
              <div className="form__field field">
                <label htmlFor="email" className="label">
                  Email address
                </label>
                <div className="control">
                  <input
                    disabled
                    id="email"
                    className="input"
                    value={user.email}
                    type="text"
                    name="email"
                  />
                </div>
                <SocialLogin />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ProfileSettings;
