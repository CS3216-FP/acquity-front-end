/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import authService from 'services/auth';

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false
      };
    }

    componentDidMount() {
      authService
        .checkToken(localStorage.token)
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(() => {
          this.setState({ loading: false });
          // this.setState({ loading: false, redirect: true });
        });
    }

    componentDidUpdate() {
      const { redirect } = this.state;
      if (redirect) {
        toast('Sorry, you have to be logged in to view that page.', {
          className: 'notification is-warning',
          closeButton: <CloseButton />,
          hideProgressBar: true
        });
      }
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }

      return (
        <>
          <ComponentToProtect {...this.props} />
        </>
      );
    }
  };
}

const CloseButton = ({ closeToast }) => (
  <button
    onClick={closeToast}
    className="delete"
    aria-label="close notification"
    type="button"
  />
);
