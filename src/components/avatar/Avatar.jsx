import React from 'react';
import { getInitials } from 'utils';

import './Avatar.scss';

// Displays a circular avatar
const Avatar = ({
  userName,
  profileImageUrl,
  diameter = '2.5rem',
  className = ''
}) => {
  return (
    <div className={`${className} avatar`}>
      {profileImageUrl ? (
        <figure
          className="profile-pic"
          style={{ width: diameter, height: diameter }}
        >
          <img alt="user avatar" src={profileImageUrl} />
        </figure>
      ) : (
        <span
          className="initials"
          style={{ width: diameter, height: diameter }}
        >
          {getInitials(userName)}
        </span>
      )}
    </div>
  );
};

export default Avatar;
