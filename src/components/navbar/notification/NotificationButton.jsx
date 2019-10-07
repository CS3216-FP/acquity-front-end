import React from 'react';
import { Link } from 'react-router-dom';

const NotificationButton = () => {
  return (
    <Link className="navbar-item" to="/notifications">
      <span className="icon is-medium">
        <i className="far fa-bell fa-lg" />
      </span>
    </Link>
  );
};

export default NotificationButton;
