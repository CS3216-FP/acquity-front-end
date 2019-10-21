import React from 'react';
import Avatar from 'react-avatar';
import Truncate from 'react-truncate';
import Moment from 'react-moment';
import differenceInHours from 'date-fns/differenceInHours';

const ChatList = () => {
  return (
    <div>
      <div className="columns" style={{ height: 150 }}>
        <div className="column is-one-fifth">
          <div>
            <Avatar color="grey" name="Bar" size={40} round="40px" />
          </div>
        </div>
        <div className="column">
          <div>
            <Truncate
              style={{ fontWeight: 'bold' }}
              lines={1}
              ellipsis={<span>...</span>}
            >
              Brandon Ng
            </Truncate>
            <Truncate
              style={{ fontSize: 14, float: 'right' }}
              lines={1}
              ellipsis={<span>...</span>}
            >
              {differenceInHours(new Date(), new Date(1571656790952)) >= 24 ? (
                <Moment format="D MMM YYYY" withTitle>
                  {new Date(1571656790952).toDateString()}
                </Moment>
              ) : (
                <Moment fromNow>{new Date(1571656790952)}</Moment>
              )}
            </Truncate>
          </div>
          <div>Selling Amt: 2000</div>
          <div>Lowest Prices: $6.10</div>
          <div>
            <Truncate lines={1} ellipsis={<span>...</span>}>
              This is a very long message. I expect to see ellipsis.
            </Truncate>
          </div>
        </div>
      </div>
      <div
        className="columns"
        style={{
          height: 150,
          backgroundColor: 'blue',
          color: 'white'
        }}
      >
        <div className="column is-one-fifth">
          <div>
            <Avatar color="grey" name="Bar" size={40} round="40px" />
          </div>
        </div>
        <div className="column">
          <div>
            <Truncate
              style={{ fontWeight: 'bold' }}
              lines={1}
              ellipsis={<span>...</span>}
            >
              Brandon Ng
            </Truncate>
            <Truncate
              style={{ fontSize: 14, float: 'right' }}
              lines={1}
              ellipsis={<span>...</span>}
            >
              {differenceInHours(new Date(), new Date(1571656790952)) >= 24 ? (
                <Moment format="D MMM YYYY" withTitle>
                  {new Date(1571656790952).toDateString()}
                </Moment>
              ) : (
                <Moment fromNow>{new Date(1571656790952)}</Moment>
              )}
            </Truncate>
          </div>
          <div
            style={{
              float: 'right',
              height: 10,
              width: 10,
              backgroundColor: '#00FF7F',
              borderRadius: 10
            }}
          />
          <div>Selling Amt: 2000</div>
          <div>Lowest Prices: $6.10</div>
          <div>
            <Truncate lines={1} ellipsis={<span>...</span>}>
              This is a very long message. I expect to see ellipsis.
            </Truncate>
          </div>
        </div>
      </div>
      <div
        className="columns"
        style={{
          height: 150,
          backgroundColor: 'white',
          color: 'black'
        }}
      >
        <div className="column is-one-fifth">
          <div>
            <Avatar color="grey" name="Bar" size={40} round="40px" />
          </div>
        </div>
        <div className="column">
          <div>
            <Truncate
              style={{ fontWeight: 'bold' }}
              lines={1}
              ellipsis={<span>...</span>}
            >
              Brandon Ng
            </Truncate>
            <Truncate
              style={{ fontSize: 14, float: 'right' }}
              lines={1}
              ellipsis={<span>...</span>}
            >
              {differenceInHours(new Date(), new Date(1571656790952)) >= 24 ? (
                <Moment format="D MMM YYYY" withTitle>
                  {new Date(1571656790952).toDateString()}
                </Moment>
              ) : (
                <Moment fromNow>{new Date(1571656790952)}</Moment>
              )}
            </Truncate>
          </div>
          <div
            style={{
              float: 'right',
              height: 10,
              width: 10,
              backgroundColor: '#FF0000',
              borderRadius: 10
            }}
          />
          <div>Selling Amt: 2000</div>
          <div>Lowest Prices: $6.10</div>
          <div>
            <Truncate lines={1} ellipsis={<span>...</span>}>
              This is a very long message. I expect to see ellipsis.
            </Truncate>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
