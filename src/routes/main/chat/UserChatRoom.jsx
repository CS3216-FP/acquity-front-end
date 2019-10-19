import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import differenceInHours from 'date-fns/differenceInHours';

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: 10
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500]
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500]
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  }
}));

const UserChatRoom = ({ chatRoom }) => {
  const classes = useStyles();
  return (
    <div>
      {chatRoom.map(user => (
        <div>
          <List className={classes.root}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={user.author_name}>
                  {user.author_name.match(/\b(\w)/g).join('')}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <div>
                    <span>{user.author_name}</span>
                    <span style={{ float: 'right', fontSize: 12 }}>
                      {differenceInHours(
                        new Date(),
                        new Date(user.created_at * 1000)
                      ) >= 24 ? (
                        <Moment format="D MMM YYYY" withTitle>
                          {new Date(user.created_at * 1000).toDateString()}
                        </Moment>
                      ) : (
                        <Moment fromNow>
                          {new Date(user.created_at * 1000)}
                        </Moment>
                      )}
                    </span>
                  </div>
                }
                secondary={
                  <div style={{ whiteSpace: 'pre-line' }}>{user.text}</div>
                }
              />
            </ListItem>
          </List>
        </div>
      ))}
    </div>
  );
};

function matchStateToProps(state) {
  return {
    chatRoom: state.chat.chatRoom
  };
}

// eslint-disable-next-line no-unused-vars
function matchDispatchToProps(dispatch) {
  return {};
}

export default connect(
  matchStateToProps,
  matchDispatchToProps()
)(UserChatRoom);
