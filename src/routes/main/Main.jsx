import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import './Main.scss';

const MainHeader = ({ currActive }) => {
  return (
    <div className="header-container">
      <div className="tabs is-centered is-toggle">
        <ul>
          <li className={`${currActive === 'bids' ? 'is-active' : ''}`}>
            <Link to="/home/bids" className="action-button">
              Bids
            </Link>
          </li>
          <li className={`${currActive === 'offers' ? 'is-active' : ''}`}>
            <Link to="/home/offers" className="action-button">
              Offers
            </Link>
          </li>
          <li className={`${currActive === 'history' ? 'is-active' : ''}`}>
            <Link to="/home/history" className="action-button">
              History
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

// Temporary dummy components
const Bids = () => (
  <div>
    <div>Bids</div>
    <div>Bids</div>
    <div>Bids</div>
    <div>Bids</div>
    <div>Bids</div>
    <div>Bids</div>
    <div>Bids</div>
    <div>Bids</div>
    <div>Bids</div>
    <div>Bids</div>
    <div>Bids</div>
    <div>Bids</div>
    <div>Bids</div>
    <div>Bids</div>
    <div>Bids</div>
  </div>
);
const Offers = () => <div>Offers</div>;
const History = () => <div>History</div>;

const renderPage = page => {
  switch (page) {
    case 'bids':
      return <Bids />;
    case 'offers':
      return <Offers />;
    case 'history':
      return <History />;
    default:
      return <Redirect to="/404" />;
  }
};

const Main = ({ match }) => {
  return (
    <div className="content-container">
      <MainHeader currActive={match.params.page} />
      <SimpleBar className="page-content-container">
        <div>Welcome to main page</div>
        {renderPage(match.params.page)}
      </SimpleBar>
    </div>
  );
};

export default Main;
