/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const CloseButton = ({ closeToast }) => (
  <button
    onClick={closeToast}
    className="delete"
    aria-label="close notification"
    type="button"
  />
);

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
      // TODO(#2): replace fake mock failure endpoint with real /checkToken endpoint
      fetch('https://5d99f8a15641430014051d8b.mockapi.io/api/fail')
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(() => {
          toast('Sorry, you have to be logged in to proceed.', {
            className: 'notification is-warning',
            closeButton: <CloseButton />,
            hideProgressBar: true
          });
          this.setState({ loading: false, redirect: true });
        });
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
