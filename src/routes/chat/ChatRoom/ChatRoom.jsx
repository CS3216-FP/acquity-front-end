import React from 'react';
import Avatar from 'react-avatar';
import Moment from 'react-moment';
import differenceInHours from 'date-fns/differenceInHours';

const ChatList = () => {
  return (
    <div>
      <div
        className="columns is-marginless"
        style={{
          height: 150,
          backgroundColor: 'white',
          color: 'black',
          paddingLeft: 10,
          paddingRight: 20,
          paddingTop: 10
        }}
      >
        <div className="column is-one-fifth">
          <div>
            <Avatar color="grey" name="Bar" size={40} round="40px" />
          </div>
        </div>
        <div className="column">
          <div>
            <div>Brandon Ng</div>
            <div style={{ fontSize: 14, float: 'right' }}>
              {differenceInHours(new Date(), new Date(1571656790952)) >= 24 ? (
                <Moment format="D MMM YYYY" withTitle>
                  {new Date(1571656790952).toDateString()}
                </Moment>
              ) : (
                <Moment fromNow>{new Date(1571656790952)}</Moment>
              )}
            </div>
          </div>
          <div>This is a very long message. I expect to see ellipsis.</div>
        </div>
      </div>

      <div className="columns is-marginless">
        <div className="column is-8">
          <div
            className="columns"
            style={{
              height: 150,
              backgroundColor: 'white',
              color: 'black',
              paddingLeft: 10,
              paddingRight: 20,
              paddingTop: 10
            }}
          >
            <div className="column is-one-fifth">
              <div>
                <Avatar color="grey" name="Bar" size={40} round="40px" />
              </div>
            </div>
            <div className="column">
              <div>
                <div>Brandon Ng</div>
                <div style={{ fontSize: 14, float: 'right' }}>
                  {differenceInHours(new Date(), new Date(1571656790952)) >=
                  24 ? (
                    <Moment format="D MMM YYYY" withTitle>
                      {new Date(1571656790952).toDateString()}
                    </Moment>
                  ) : (
                    <Moment fromNow>{new Date(1571656790952)}</Moment>
                  )}
                </div>
              </div>
              <div>This is a very long message. I expect to see ellipsis.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
